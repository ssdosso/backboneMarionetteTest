var Mono = require('./server/lib/Mono')
    , Backbone = require('backbone')
    , _ = require('underscore') ;



var app = Mono.getInstance();
process.on('uncaughtException', function (err) {
  //  app.log.exception('App Caught Exception', {err:err});
    app.log.error('App Caught Exception Stack', {err:err,stack:err.stack});
});


app.on("initialize:after", function(options){

});
app.on("initialize:before", function(options){

});

app.start({
    config: [
            {short:"p",long:"port",description:"port", value:true},
            {short:"u",long:"url",description:"apiURL 주소", value:true},
            {short:"c",     long:"cache",           description:"cache 사용여부", value:true, parser:function (value) {
                if (value == 'true') {
                    return true;
                } else {
                    return false;
                }
            }},
            {short:"d",long:"debug",  description:"debug 사용여부 ", value:true, parser:function (value) {
                if (value == 'true') {
                    return true;
                } else {
                    return false;
                }
            }}
            ]

    });

//test
//
//var fs = require('fs');
//
//
//var path = './async.txt';
//
