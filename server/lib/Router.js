var EventEmitter = process.EventEmitter
    ,_ = require('underscore')
    , fs = require('fs')
    , request = require('request')
    , winston = require('winston')
    ,Mono = require('./Mono')
    , assert= require('assert');


exports= module.exports = Router;
function Router (mgr, name) {


};

_.extend(Router.prototype, EventEmitter.prototype, {
           init : function(app) {
              this.app = app;
              this.config = Mono.getInstance().config;
              this.start();
           },
           getDB : function() {
             return  Mono.getInstance().getDb();
           },
           toError: function(req,res,message,errorNo){
               if (!errorNo) errorNo = -1;
               this.toJson(req,res,{error:errorNo,message:message});
           },
            toJson:function(req,res,obj) {
                assert(res);
                assert(req);
                assert(obj);
                if (!obj.success) obj.success = true;
                this.renderToJson(res,req,obj);
            },
           render : function(res,req,layout,variables) {
               assert(res);
               assert(req);
               var config = this.app.get('config'),userData;
               if (layout === null) layout = 'index';
               if (!_.isObject(variables)) variables = {};

//              '

               if (req.session.session_id) {
                   userData = {
                       id : req.session.id,
                       session_id : req.session.session_id
                   }
               }else {
                   userData = {
                       session_id:''
                   }
               }

               variables = _.extend(variables,userData,{
                   fbId:config.fbId,
                   production :process.env['NODE_ENV'] == 'development' ? 'false' : 'true'
               });
               res.render(layout,variables);
           },
            encrypt :function (text){
                var crypto = require('crypto');
                var cipher = crypto.createCipher('aes-256-cbc','d6F3Efeq');
                var crypted = cipher.update(text,'utf8','hex')
                crypted += cipher.final('hex');
                return crypted;
            },

            decrypt: function (text){
                var crypto = require('crypto');
                var decipher = crypto.createDecipher('aes-256-cbc','d6F3Efeq');
                var dec = decipher.update(text,'hex','utf8')
                dec += decipher.final('utf8');
                return dec;
            },
        /**
         *  request rest 통신을 한다.
         * @param method
         * @param path
         * @param data
         * @param next
         */
            request: function(method,path,data,next) {
                assert(path);
                assert(next);
                if (!_.isObject(data)) {
                    assert(0);
                }
                var scope = this
                    ,url=  data.url ? data.url +'/' + path :this.config.url +'/' + path
                    ,qs = require('querystring').stringify(data)
                    ,options={};

                method = method === undefined ? 'get' : method;
                switch(method) {
                    case 'get':
                        options.headers = {'content-type' : 'application/x-www-form-urlencoded'};
                        options.url = url + '?' + qs;
                        break;
                    default :
                        options.headers = {'content-type' : 'application/x-www-form-urlencoded'};
                        options.url = url;
                        options.body = qs;
                        break;
                }


                request[method](options, function(error, response, body){
                    //  console.log(response)
                    if (error) {
                        Mono.getInstance().log.warn('Error Message:'+error);
                    }

                    if (body){
                        try {
                            var data = JSON.parse(body);

                            if (data.error && data.error < 0)  {
                                Mono.getInstance().log.info('error', data.error,data.result_text);
                            }

                            if (data.result_code && data.result_code < 0) {
                                data.error = data.result_code;
                            } else {
                                data.error = 0;
                            }
                            next(response, data);

                        } catch(e) {

                            Mono.getInstance().log.warn('Error Message: ' + body);
                        }


                    } else {
                        Mono.getInstance().log.warn('Error Message: No Body ');
                    }
                });
            },
            renderToJson : function(res,req,data) {
                    assert(data);
                    res.contentType('application/json');
                    var jsonData = JSON.stringify(data);
                    res.send(jsonData);
            }

});