var EventEmitter = process.EventEmitter
    ,_ = require('underscore')
    , fs = require('fs')
    , request = require('request')
    , winston = require('winston')
    ,  Mono = require('../lib/Mono')
    , Cluster = require('cluster')
    , assert= require('assert');

var Router = require('../lib/Router');



exports.MainRouter  = MainRouter;

function MainRouter () {
    this.routerName = 'Main';
};

_.extend(MainRouter.prototype, Router.prototype, {
    start : function() {
        var app = this.app,self=this, maxAge = 60 * 60 * 24 * 7 ;

        if(process.env['NODE_ENV'] != 'development') {

//            app.get('/*', function (req, res, next) {
//                console.log(req.originalUrl)
//                res.setHeader('Cache-Control', 'public, max-age=' + (maxAge ));
//                next();
//            });
//            app.get('/js/app/*', function (req, res, next) {
//                res.setHeader('Cache-Control', 'public, max-age=' + (maxAge ));
//                next();
//            });
            app.get('/js/*', function (req, res, next) {
                res.setHeader('Cache-Control', 'public, max-age=' + (maxAge ));
                next();
            });


        }


        app.get('/', function(req,res){


            self.render(res,req,'index');
        });

        app.get('/who', function(req,res){


            self.render(res,req,'index');
        });
        app.get('/portfolio', function(req,res){


            self.render(res,req,'index');
        });

    }
});