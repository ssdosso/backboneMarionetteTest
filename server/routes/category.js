var EventEmitter = process.EventEmitter
    ,_ = require('underscore')
    , fs = require('fs')
    , request = require('request')
    , winston = require('winston')
    ,  Mono = require('../lib/Mono')
    , Cluster = require('cluster')
    , assert= require('assert');

var Router = require('../lib/Router');



exports.CateRouter  = CateRouter;

function CateRouter () {
    this.routerName = 'Cate';
};

_.extend(CateRouter.prototype, Router.prototype, {
    start : function() {
        var app = this.app,self=this;
        app.get('/category', function(req,res){
            var db = self.getDB(),cate='';
            if (!req.param('cate')) cate = 'main';

            cate  = req.param('cate');

            db.query("SELECT * FROM document WHERE name='"+cate+"'",function(err,rows){


                var cate = rows.pop();

                self.toJson(req,res,cate);
            //{cate:cate.name,cateID:cate.id}
            });
        });
    }
});