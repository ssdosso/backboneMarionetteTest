var EventEmitter = process.EventEmitter
    ,_ = require('underscore')
    , fs = require('fs')
    , request = require('request')
    , winston = require('winston')
    , Mono = require('../lib/Mono')
    , formidable = require('formidable')
    , assert= require('assert')
    , uuid = require('node-uuid');

var Router = require('../lib/Router');


/**
 * 필수   exports, 라우터 네임
 * @type {Function}
 */
exports.RinkeRouter  = RinkeRouter;

function RinkeRouter () {
    this.routerName = 'Profile';
};

_.extend(RinkeRouter.prototype, Router.prototype, {
//    getProfile: function(req,next) {
//        var self = this;
//        var param = {
//            view_uid : req.param('view_uid') || req.session.uid,
//            uid :  req.session.uid,
//            session_id : req.session.session_id
//        }
//
//        this.request('post','profile/view',param,function(response,data){
//            // _.extend(data,data.profile);
//            if( typeof  next !=='function') {
//
//                self.renderToJson(next,data.profile);
//            }
//            else {
//                next(data.profile);
//
//            }
//        });
//    },
//    updateProfile: function(req,profile,next) {
//        var param = {
//            uid :  req.session.uid,
//            session_id : req.session.session_id,
//            profile_info : JSON.stringify(profile)
//        }
//
//        this.request('post','profile/edit',param,function(response,data){
//            //     console.log(data)
//        });
//    },
    start : function() {
        var app = this.app
            ,self=this
            , bucket = Mono.getInstance().storage.addBucket('blueark-test-00');

        app.put('/rinkData/:id',function(req,res){
            var db = Mono.getInstance().getDb();
            var title = req.param('title');
            var image = req.param('image');
            var link = req.param('link');
            var id = req.param('id');
            var imageUpdate = req.param('imageUpdate') ? req.param('imageUpdate') : false;
            if (imageUpdate) {
                var newImage = image.split('/');
                var newImage = newImage[newImage.length -1];
                fs.renameSync( process.cwd() +image,  process.cwd() +'/public/images/'+newImage);
                image = '/images/'+newImage;
            }
            var sql = "UPDATE rink set title='"+title+"',image='"+image+"',link='"+link+"' WHERE id= '"+id+"'";

            db.query(sql,function(err,result){
                if (err) {

                    self.toError(req,res,'mysql error : '+ err.errno);

                } else {

                    var obj = {id:id,success:true,image:image,imageUpdate:imageUpdate}
                    self.toJson(req,res,obj);
                }
            });

        });


        app.del('/rinkData/:id',function(req,res){
            var id = req.param('id');
            var db = Mono.getInstance().getDb();
            var sql = "DELETE FROM rink where id=?";
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
        app.post('/rink',function(req,res){
            var title = req.param('title');
            var image = req.param('image');
            var link = req.param('link');
            var categoryID = req.param('categoryID');
            assert(image);
            assert(title);
            assert(link);
            assert(categoryID);

           var newImage = image.split('/');
           var newImage = newImage[newImage.length -1];


           fs.renameSync( process.cwd() +image,  process.cwd() +'/public/images/'+newImage);
            image = '/images/'+newImage;
            var db = Mono.getInstance().getDb();
            var userid = req.param('userid');
            var userpw = req.param('password');

            db.query(" INSERT INTO rink (title, image, link, categoryID) VALUES ('"+title+"','"+image+"','"+link+"','"+categoryID+"')",function(err,result){
                if (err) {

                    self.toError(req,res,'mysql error : '+ err.errno);

                } else {

                   var obj = {id:result.insertId,success:true,image:image}
                    self.toJson(req,res,obj);
                }
            });
           // INSERT INTO `monoshift`.`rink` (`title`, `image`, `link`, `categoryID`) VALUES ('sdsd', 'sdsd', 'ssdsd', '1');


        });
        app.get('/rinkData',function(req,res){
                assert(req.param('categoryID'));
            var categoryID = req.param('categoryID');
            var db = Mono.getInstance().getDb();
            var sql = "SELECT * FROM rink WHERE categoryID="+categoryID;

                db.query(sql,function(err,rows){

                    self.toJson(req,res,rows);
                });




        });


        app.get('/profile', function(req,res){
            self.render(res,'index');
        });

        app.get('/profile/view',function(req,res){

            self.getProfile(req,res);
        });
        /**
         * 사용자 이미지를 가져온다.
         */
        app.get('/images/profile/:race/:username',function(req,res){

            var bucket = Mono.getInstance().storage.addBucket('blueark-test-00');
            var extension = req.param('username').split('.')[1];
            var maxAge = 60 * 60 * 24 * 7 ;
            bucket.get({name:req.param('username')},function(result){
                res.setHeader('Cache-Control', 'public, max-age=' + (maxAge ));
                if (result  === null) {
                    var img = fs.readFileSync('./public/img/profile/'+req.param('race')+'.jpg');
                    res.writeHead(200, {'Content-Type': 'image/jpg' });
                    res.end(img, 'binary');
                }  else {

                    res.writeHead(200, {'Content-Type': 'image/'+extension });
                    res.end(result, 'binary');
                }
            });
        });
        app.post('/upload/rink', function(req,res){


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
               // user.username = req.param('username')
                user.resize = true;
                user.width = 128;
                user.height = 128;
                user.outdata= {};

            })
            form.on('progress', function (bytesReceived, bytesExpected) {
            });
            form.on('end', function() {

                var extensions = user.file.name.split('.');
                var fileName = user.file.name;
                var d = new Date;
                var newImage = extensions[0]+ d.getTime() +'.' +extensions[1];
                var now = d.getFullYear()+''+d.getMonth()+''+ d.getDate();
                var uploadDir =  form.fileDir+'/'+now+'/';

                if (!fs.existsSync(uploadDir)) {
                    fs.mkdirSync(uploadDir);
                }
                fs.renameSync(user.file.path, form.fileDir+'/'+now+'/'+newImage);

                    user.outdata = {
                        files : [{
                            size :  user.file.size,
                            name :  now+'/'+newImage,
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