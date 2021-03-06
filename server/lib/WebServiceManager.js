var EventEmitter = process.EventEmitter
    ,_ = require('underscore')
    , fs = require('fs')
    , Express = require('express')
    , Mono = require('./Mono')
    , Https = require('https')
    , Http = require('http')
    , path = require('path')
    , assert= require('assert')
    , engine = require('ejs-locals')
    , request = require('request')
    , Cluster = require('cluster')
    , ChildServer = require('./cluster/Child')
    , MasterServer = require('./cluster/Master')
    , FB = require( 'fb' );





exports =  module.exports  = WebServiceManager;

function WebServiceManager() {
    "use strict";
    this.trigger = require('./triggerMethod');
    if (Cluster.isWorker) {
        this._worker = new ChildServer;
    } else {
        this._master = new  MasterServer();
    }

}

_.extend(WebServiceManager.prototype, EventEmitter.prototype, {
          _service:null,
          _workers :null,
          _worker:null,
          _master:null,
          create : function(options) {
              var scope = this
                  , server
                  ,secureOptions;
              var cpus = require('os').cpus().length;
              this.options = options; //json 환경 데이터
              /**
               * S3 set
               */

               //webstorm debug 모드가 동작하겠금 설정
              var debug = Mono.getInstance().config.debug;
              if (!debug) {
                  if ( Cluster.isWorker ) {
                      this._worker = new ChildServer;
                  } else {
                      this._master = new  MasterServer();
                  }
              }

              Mono.getInstance().storage.create();

              if (Cluster.isMaster && !debug) {

                  this._workers = {};
                  for (var i = 0; i < cpus; i++) {
                      this._workers[i] = Cluster.fork();
                  }
                  this._master.create();
                  this._master.on('message', function (data, id) {

                         console.log('child on message');
                         console.log(data)
                  });
              }  else  {
                  if(!debug) this._worker.create();

                  var port = options.port;
                  if (options.SSL && options.SSL === true) {
                      assert(options.secureOptions.pfx)
                      secureOptions = {
                          pfx:fs.readFileSync(options.secureOptions.pfx)
                      };
                  } else {
                      secureOptions = null;
                  }
                  var app =  this.app = Express();

                  if (secureOptions) {
                      this._server = Https.createServer(secureOptions, this.app);
                      Mono.getInstance().info('SSL Server create');
                  } else {
                      this._server = Http.createServer(this.app);
                      Mono.getInstance().log.info('http Server create');
                  }
                  this.baseConfigure(server,options);
              }



          },
         baseConfigure: function(server,options) {
                var app = this.app,scope=this;

                var allowCrossDomain =function(req, res, next) {

                    res.header('Access-Control-Allow-Origin', '*');
                    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
                    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

                    // intercept OPTIONS method
                    if ('OPTIONS' == req.method) {
                        res.send(200);
                    }
                    else {
                        next();
                    }
                };
                var myErrorHandler=function(err, req, res, next){

                    res.render('error',{});
                };

                app.configure(function () {

                    app.set('config',Mono.getInstance().config) ;
                    app.set('port', options.port);
                    app.set('views', process.cwd() + '/server/views');
                    app.set('view engine', 'ejs');
                    app.engine('ejs', engine);
                    app.use(Express.favicon());
                    app.use(Express.cookieParser());
                    app.use(Express.cookieSession({ secret: 'tobojmono!', cookie: { maxAge: 60 * 60 * 1000 }}));

                    app.use(function (error, req, res, next) {
                        if (!error) {
                            next();
                        } else {
                            console.error(error.stack);
                            res.send(500);
                        }
                    });
//                    app.use(app.router);
                    app.use(Express.compress());

                    app.use(Express.methodOverride());
                  //  app.use(Express.bodyParser());
                    app.use(Express.json());
                   // app.use(Express.multipart({defer: true }));
                    app.use(Express.urlencoded());
                   app.use(allowCrossDomain);
                    app.use('/uploads',Express.static(process.cwd() + '/uploads'));

                    scope.routerFactory = new RouterFactory(app);
                    scope.routerFactory.addRouters('../routes');

                });

                app.configure('production', function() {
                    app.use(Express.logger());
                    app.use(myErrorHandler);
                    app.use(Express.static(process.cwd() + '/public', { maxAge: 31557600000 }));

                });


                app.configure('development', function () {
                    // app.use(express.logger());

                    app.use(Express.static(process.cwd() + '/public'));
                   // app.use(Express.static(process.cwd() + '/public', { maxAge: 31557600000 }));
                    app.use(Express.errorHandler({ dumpExceptions: true, showStack: true }));
                });

          },
          listen : function() {
              var self = this;
              this._server.listen(this.options.port, function () {
                  console.info("Express server listening on port " + self.options.port);
                 if(!Mono.getInstance().config.debug) self._worker.onActive();
              });
              this._server.on('clientError',function(exception) {
                 // sv.logger.warn('## WebServer Client Error', {exception:exception});
                  console.log('## ' + exception);
              });
          }
});


var RouterFactory = require('./RouterFactory');