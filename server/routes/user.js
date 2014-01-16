var EventEmitter = process.EventEmitter
    ,_ = require('underscore')
    , fs = require('fs')
    , Mono = require('../lib/Mono')
    , request = require('request')
    , winston = require('winston')
    , assert= require('assert')
    , util = require('util')
    , formidable = require('formidable');

var Router = require('../lib/Router');
var uuid = require('node-uuid');

/**
 * 필수   exports, 라우터 네임
 * @type {Function}
 */
exports.UserRouter  = UserRouter;

function UserRouter() {

}

_.extend(UserRouter.prototype, Router.prototype, {
    data :null,

    lastRender: function(res,req,obj) {
        this.renderToJson(res,req,obj);
    },
    _setSession : function(req,data) {

        assert(data.id);
        req.session.id = data.id;
        req.session.session_id =  uuid.v1();
        req.session.isLogin = true;

    },
    start : function() {
        var app = this.app,self=this;




        app.get('/user', function(req,res){
                var db = Mono.getInstance().getDb();
                var userid = req.param('userid');
                var userpw = req.param('password');

                db.query('SELECT * FROM member where userid = ?',[userid],function(err,rows){
                    console.log(err);
                    var user = rows.pop();
                    if (user) {

                        user.isLogin = true;
                        self._setSession(req,user);
                    } else {

                        user = {};
                        user.isLogin = false;
                        user.result_text = '그런 사용자가 없습니다.';
                        user.error = -1;
                    }
                    self.lastRender(res,req,user);
                });


        });


        app.get('/list', function(req,res){


        });

        app.post('/sendMessage', function(req,res){


        });



    }
});