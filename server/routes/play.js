var EventEmitter = process.EventEmitter
    ,_ = require('underscore')
    , fs = require('fs')
    , request = require('request')
    , winston = require('winston')
    , Mono = require('../lib/Mono')
    , formidable = require('formidable')
    , assert= require('assert');

var Router = require('../lib/Router');
exports.PlayRouter  = PlayRouter;

function PlayRouter() {
    this.routerName = 'PlayItem';
}

_.extend(PlayRouter.prototype, Router.prototype, {
    start : function() {
        var app = this.app ,self=this;


        app.del('/playData/:id',function(req,res){
            var id = req.param('id');
            var db = Mono.getInstance().getDb();
            var sql = "DELETE FROM play_item where id=?";
            var image = req.param('image');
            db.query(sql,[id],function(err,result){
                if (err) {
                    self.toError(req,res,'mysql error : '+ err.errno);
                } else {
                    var obj = {id:result.insertId,success:true};


                    fs.unlink(process.cwd() +'/public/'+image) ;
                    self.toJson(req,res,obj);
                }
            });
        });

        app.put('/playData/:id',function(req,res){
            var db = Mono.getInstance().getDb();
            var title = req.param('title');
            var image = req.param('image');
            var link = req.param('link');
            var date = req.param('date');
            var id = req.param('id');
            var imageUpdate = req.param('imageUpdate') ? req.param('imageUpdate') : false;
            if (imageUpdate) {
                var newImage = image.split('/uploads/')[1];
                fs.renameSync( process.cwd() +image,  process.cwd() +'/public/images/'+newImage);
                image = '/images/'+newImage;
            }




            var sql = "UPDATE play_item set title='"+title+"',image='"+image+"',link='"+link+"',date='"+date+"' WHERE id= '"+id+"'";

            db.query(sql,function(err,result){
                if (err) {
                    self.toError(req,res,'mysql error : '+ err.errno);
                } else {
                    var obj = {id:id,success:true,image:image,imageUpdate:imageUpdate}
                    self.toJson(req,res,obj);
                }
            });

        });
        app.get('/playData',function(req,res){
            assert(req.param('categoryID'));
            var categoryID = req.param('categoryID');
            var db = Mono.getInstance().getDb();
            var sql = "SELECT * FROM play_item WHERE categoryID="+categoryID;

            db.query(sql,function(err,rows){

                self.toJson(req,res,rows);
            });




        });

        app.post('/play', function(req,res){

            var title = req.param('title');
            var image = req.param('image');
            var link = req.param('link');
            var date = req.param('date');
            var categoryID = req.param('categoryID');
            assert(image);
            assert(title);
            assert(link);
            assert(categoryID);

            var newImage = image.split('/uploads/')[1];

            fs.renameSync( process.cwd() +image,  process.cwd() +'/public/images/'+newImage);
            image = '/images/'+newImage;
            var db = Mono.getInstance().getDb();


            db.query(" INSERT INTO play_item (title, image, link, categoryID,date) VALUES ('"+title+"','"+image+"','"+link+"','"+categoryID+"','"+date+"')",function(err,result){
                if (err) {
                    self.toError(req,res,'mysql error : '+ err.errno);
                } else {
                    var obj = {id:result.insertId,success:true,image:image}
                    self.toJson(req,res,obj);
                }
            });
        });
        app.post('/upload/playItemImage', function(req,res){


            var form = new formidable.IncomingForm(),
                files = [],
                user={},
                fields = [];

            form.uploadDir = process.cwd() +"/tmp";
            form.fileDir = process.cwd() +"/uploads";
            form.maxFieldsSize = 5 * 1024 * 1024;
            form.on('fileBegin', function (name, file) {
                //self.getProfile(req,function(profile){
                //  user.profile = profile;
                // });
            });
            form.on('field', function(field, value) {
                fields.push([field, value]);
            })
            form.on('file', function(field, file) {
                user.file = file;
                user.resize = true;
                user.width = 128;
                user.height = 128;
                user.outdata= {};

            })
            form.on('progress', function (bytesReceived, bytesExpected) {
            });
            form.on('end', function() {

                var extension = user.file.name.split('.')[1];
                var fileName = user.file.name;

                fs.renameSync(user.file.path, form.fileDir +'/'+fileName);

                user.outdata = {
                    files : [{
                        size :  user.file.size,
                        name :  user.file.name,
                        type :   user.file.type

                    }]
                }
                res.contentType('application/json');
                var jsonData = JSON.stringify(user.outdata);

                res.send(jsonData);
            });
            form.parse(req);


        });
    }
});