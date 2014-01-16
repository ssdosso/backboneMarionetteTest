var EventEmitter = process.EventEmitter
    ,_ = require('underscore')
    , fs = require('fs')
    , winston = require('winston')
    , assert= require('assert');

exports = module.exports = Logger;

function Logger (mgr, name) {
    this.options = {
        log:true,
        info:true,
        warn:true,
        file:true,
        console:true,
        mail:true
    };
    this.trigger = require('./triggerMethod');
    this.logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)(),
            new (winston.transports.File)({ filename: '../logs/service_.log' })
        ]
    });

         var str = "Aaa";
    str.replace()
};

_.extend(Logger.prototype, EventEmitter.prototype, {
          info : function() {

             // this.winConsole.info.apply(this.winConsole, arguments);

             this.logger.info.apply(this.files, arguments);
             // this.files.info.apply(this.files, arguments);
          } ,
        error: function(log,err) {
          //  console.log(arguments)
            this.logger.error( log);

            this.logger.error(err.stack);
            //stack
          //  this.logger.error.apply(this.files, arguments);
        } ,
        warn: function() {
            this.logger.warn.apply(this.files, arguments);
        }
});