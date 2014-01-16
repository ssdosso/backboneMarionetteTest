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

/**
 * 필수   exports, 라우터 네임
 * @type {Function}
 */
exports.UploadRouter  = UploadRouter;

function UploadRouter () {
    this.routerName = 'upload';
};

_.extend(UploadRouter.prototype, Router.prototype, {
    start : function() {
        var app = this.app
            ,self=this
            bucket = Mono.getInstance().storage.addBucket('Mono-test-00');

        app.get('/upload', function(req,res){
            var form = req.form;
            console.log(form)
        });




    }
});