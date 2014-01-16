var EventEmitter = process.EventEmitter
    ,_ = require('underscore')
    , fs = require('fs')
    , request = require('request')
    , winston = require('winston')
    ,  Mono = require('../lib/Mono')
    , Cluster = require('cluster')
    , assert= require('assert');

var Router = require('../lib/Router');



exports.ProjectRouter  = ProjectRouter;

function ProjectRouter () {
    this.routerName = 'Project';
};

_.extend(ProjectRouter.prototype, Router.prototype, {
    start : function() {
        var app = this.app,self=this;

        app.get('/project',function(req,res){
            var id = req.param('id');
            var sql = "SELECT *,from_unixtime(regDate,'%Y.%m.%d') as regDate FROM projects where id=?";
            var db = Mono.getInstance().getDb();
            db.query(sql,[id],function(err,rows){
                if (err) {
                    console.log(err)
                    self.toError(req,res,'mysql error : '+ err.errno);
                } else {


                    self.toJson(req,res,rows.pop());
                }
            });

        });
        app.get('/project/list',function(req,res){

            var db = Mono.getInstance().getDb();
            var sql = "SELECT id,gubun,project_name,from_unixtime(regDate,'%Y.%m.%d') as date FROM projects order by regDate desc;";

            db.query(sql,function(err,rows){
                if (err) {
                    console.log(err)
                    self.toError(req,res,'mysql error : '+ err.errno);
                } else {

                    _.each(rows,function(row){

                        row.name = row.date +' '+row.project_name;
                    });
                    self.toJson(req,res,rows);
                }
            });
        });
        app.put('/project', function(req,res) {

            var id = req.param('id');
            var gubun = req.param('gubun');
            var project_name = req.param('project_name');
            var client = req.param('client');
            var work_start = req.param('work_start');
            var work_end = req.param('work_end');
            var overview = req.param('overview');
            var concept = req.param('concept');
            var feature = req.param('feature');
            var rfp = req.param('rfp');
            var research = req.param('research');
            var keyword = req.param('keyword');
            var strategy = req.param('strategy');
            var proposal = req.param('proposal');
            var analysis_image_text_1 = req.param('analysis_image_text_1');
            var analysis_image_text_2 = req.param('analysis_image_text_2');
            var image1 = req.param('image1');
            var image2 = req.param('image2');
            var image3 = req.param('image3');
            var analysis_image_1 = req.param('analysis_image_1');
            var analysis_image_2 = req.param('analysis_image_2')
            var regDate = req.param('regDate');
            var bg_high = req.param('bg_high');
            var bg_down = req.param('bg_down');
            var bg_color = req.param('bg_color');
            assert(id);
            assert(project_name);
            assert(regDate);
            assert(gubun);

            image1 = self.changeImage(image1);
            image2 = self.changeImage(image2);
            image3 = self.changeImage(image3);


            analysis_image_1 = self.changeImage(analysis_image_1);
            analysis_image_2 = self.changeImage(analysis_image_2);
            bg_high = self.changeImage(bg_high);
            bg_down = self.changeImage(bg_down);

            var sql = "UPDATE projects SET "+
                "gubun='"+gubun+"'"+
                ",project_name='"+project_name+"'"+
                ",regDate=UNIX_TIMESTAMP('"+regDate+"')"+
                ",client='"+client+"'"+
                ",work_start='"+work_start+"'"+
                ",work_end='"+work_end+"'"+
                ",image1='"+image1+"'"+
                ",image2='"+image2+"'"+
                ",image3='"+image3+"'"+
                ",overview='"+overview+"'"+
                ",concept='"+concept+"'"+
                ",feature='"+feature+"'"+
                ",rfp='"+rfp+"'"+
                ",research='"+research+"'"+
                ",keyword='"+keyword+"'"+
                ",strategy='"+strategy+"'"+
                ",proposal='"+proposal+"'"+
                ",bg_high='"+bg_high+"'"+
                ",bg_down='"+bg_down+"'"+
                ",bg_color='"+bg_color+"'"+
                ",analysis_image_1='"+analysis_image_1+"'"+
                ",analysis_image_text_1='"+analysis_image_text_1+"'"+
                ",analysis_image_2='"+analysis_image_2+"'"+
                ",analysis_image_text_2='"+analysis_image_text_2+"'"+
                " WHERE id='"+id+"'";









            var db = Mono.getInstance().getDb();

            db.query(sql,function(err,result){
                if (err) {

                    self.toError(req,res,'mysql error : '+ err.errno);
                } else {
                    var obj = {id:result.insertId,success:true}
                    self.toJson(req,res,obj);
                }
            });
        });


        app.post('/project', function(req,res) {
            var gubun = req.param('gubun');
            var project_name = req.param('project_name');
            var client = req.param('client');
            var work_start = req.param('work_start');
            var work_end = req.param('work_end');
            var overview = req.param('overview');
            var concept = req.param('concept');
            var feature = req.param('feature');
            var rfp = req.param('rfp');
            var research = req.param('research');
            var keyword = req.param('keyword');
            var strategy = req.param('strategy');
            var proposal = req.param('proposal');
            var analysis_image_text_1 = req.param('analysis_image_text_1');
            var analysis_image_text_2 = req.param('analysis_image_text_2');
            var image1 = req.param('image1');
            var image2 = req.param('image2');
            var image3 = req.param('image3');
            var analysis_image_1 = req.param('analysis_image_1');
            var analysis_image_2 = req.param('analysis_image_2')
            var regDate = req.param('regDate');
            var bg_high = req.param('bg_high');
            var bg_down = req.param('bg_down');
            var bg_color = req.param('bg_color');

            assert(project_name);
            assert(regDate);
            assert(gubun);

            image1 = self.changeImage(image1);
            image2 = self.changeImage(image2);
            image3 = self.changeImage(image3);


            analysis_image_1 = self.changeImage(analysis_image_1);
            analysis_image_2 = self.changeImage(analysis_image_2);
            bg_high = self.changeImage(bg_high);
            bg_down = self.changeImage(bg_down);

            var sql = "INSERT INTO projects ("+
                "gubun,project_name,regDate,client"+
                ",work_start"+
                ",work_end"+
            ",image1"+
            ",image2"+
            ",image3"+
            ",overview"+
            ",concept"+
            ",feature"+
            ",rfp"+
            ",research"+
            ",keyword"+
            ",strategy"+
            ",proposal"+
            ",bg_high"+
            ",bg_down"+
            ",bg_color"+
            ",analysis_image_1"+
            ",analysis_image_text_1"+
            ",analysis_image_2"+
            ",analysis_image_text_2) VALUES ("+
            "'"+gubun+"',"+
            "'"+project_name+"',"+
            "UNIX_TIMESTAMP('"+regDate+"'),"+
            "'"+client+"',"+
            "'"+work_start+"',"+
            "'"+work_end+"',"+
            "'"+image1+"',"+
            "'"+image2+"',"+
            "'"+image3+"',"+
            "'"+overview+"',"+
            "'"+concept+"',"+
            "'"+feature+"',"+
            "'"+rfp+"',"+
            "'"+research+"',"+
            "'"+keyword+"',"+
            "'"+strategy+"',"+
            "'"+proposal+"',"+
            "'"+bg_high+"',"+
            "'"+bg_down+"',"+
            "'"+bg_color+"',"+
            "'"+analysis_image_1+"',"+
            "'"+analysis_image_text_1+"',"+
            "'"+analysis_image_2+"',"+
            "'"+analysis_image_text_2+"'"+
            ")";










            var db = Mono.getInstance().getDb();

            db.query(sql,function(err,result){
                if (err) {
                    console.log(err)
                    self.toError(req,res,'mysql error : '+ err.errno);
                } else {
                    var obj = {id:result.insertId,success:true}
                    self.toJson(req,res,obj);
                }
            });
        });
    },
    changeImage: function(image) {

        if (image !== undefined) {
            var chk=/uploads/;
            if (chk.test(image)) {
                var newImage = image.split('/');
                newImage = newImage[newImage.length -1];
                if (fs.existsSync( process.cwd() +image)) {
                    fs.renameSync( process.cwd() +image,  process.cwd() +'/public/images/'+newImage);
                }

                return '/images/' +newImage;
            } else {
                return image;
            }

        } else {
            return;
        }

    }
});