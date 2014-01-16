/**
 * Singleton Class
 * @type {*}
 */
 var Backbone = require('backbone')
     , _ = require('underscore')
     , EventEmitter = process.EventEmitter
     ,  Cluster = require('cluster')
     , async = require('async');

 var Mono = {};

 /**
  * singleton Object
  * @type {{getInstance: Function}}
  */
var MonoService  = {
     getInstance: function () {
         if (this._instance === undefined) {
             this._instance = new  Mono.Application();
         }
         return this._instance;
     }
}

    exports = module.exports =  MonoService;



    Mono.Application = function(options){
        this.trigger = Mono.triggerMethod;
        this.config = new Mono.config;
        this.storage = new Mono.Storage;
        this.logger =   new Mono.Logger;
        this.webServices = {};
    };

     Mono.Application.prototype.__defineGetter__('log', function () {
         var logger = this.logger;

         logger.level =  -1;
         return logger;
     });
     /**
      * async 모듈함수들을 현재의 객체에 extend 함.
      */
    _.extend(Mono.Application.prototype,async);
    _.extend(Mono.Application.prototype, EventEmitter.prototype, {
        start: function(options){
             var fs = require('fs');
             var path = './async.txt';

            var scope = this;
            this.trigger("initialize:before", options);
            this.trigger("initialize:after", options);

            this.config.start(options.config,this);

            this.on('ready',function(){
               for (var key in scope.config.service) {
                   scope.listenService(scope.config.service[key],key);
               }
            })
        } ,
        listenService : function(listenInfo,index) {

            if (index ==0 && this.config.port) {
                listenInfo.port =  this.config.port;
            }
            if (!listenInfo.namespace) assert(0,'환경 변수 값에 namespace 값이 존재 해야 함..');
            this.db = new Mono.Db();
            this.db.create();
            this.webServices[listenInfo.namespace] =  new Mono.WebServiceManager();
            this.webServices[listenInfo.namespace].create(listenInfo);
            if (Cluster.isWorker) this.webServices[listenInfo.namespace].listen();
            if(this.config.debug) this.webServices[listenInfo.namespace].listen();
        }
        ,getConfig:function(name){
            if (!name) return this.config;
            return this.config[name];
        },
        getDb: function(){
            return this.db;
        }
    });


  Mono.Logger =  require('./Logger');
  Mono.Storage = require('./Storage');
  Mono.WebServiceManager =  require('./WebServiceManager');
  Mono.config =  require('./configure');
  Mono.triggerMethod = require('./triggerMethod');
  Mono.Db = require('./Db');
