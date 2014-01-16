var EventEmitter = process.EventEmitter
    ,_ = require('underscore')
    , fs = require('fs')
    , request = require('request')
    , winston = require('winston')
    ,  Mono = require('../lib/Mono')
    , Cluster = require('cluster')
    , assert= require('assert');

var Router = require('../lib/Router');



exports.LoginRouter  = LoginRouter;

function LoginRouter () {
    this.routerName = 'Login';
};

_.extend(LoginRouter.prototype, Router.prototype, {
    start : function() {
        var app = this.app,scope=this;



        app.get('/login', function(req,res){
            scope.render(res,req,'index');
        });
    }
});