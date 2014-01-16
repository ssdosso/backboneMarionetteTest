var EventEmitter = process.EventEmitter
    ,_ = require('underscore')
    , fs = require('fs')
    , request = require('request')
    , winston = require('winston')
    ,  Mono = require('../lib/Mono')
    , Cluster = require('cluster')
    , assert= require('assert');

var Router = require('../lib/Router');



exports.HistoryRouter  = HistoryRouter;

function HistoryRouter () {
    this.routerName = 'Cate';
};

_.extend(HistoryRouter.prototype, Router.prototype, {
    start : function() {
        var app = this.app,self=this;


        app.del('/historyData/:id',function(req,res){
            var id = req.param('id');
            var db = Mono.getInstance().getDb();
            var sql = "DELETE FROM history where id=?";

            db.query(sql,[id],function(err,result){
                if (err) {
                    self.toError(req,res,'mysql error : '+ err.errno);
                } else {
                    var obj = {id:result.insertId};
                    self.toJson(req,res,obj);
                }
            });
        });

        app.put('/historyData/:id',function(req,res){
            var db = Mono.getInstance().getDb();
            var history = req.param('history');
            var date = req.param('date');
            var id = req.param('id');
            assert(history);
            assert(date);




            var sql = "UPDATE history set history='"+history+"',date='"+date+"' WHERE id= '"+id+"'";

            db.query(sql,function(err,result){
                if (err) {
                    self.toError(req,res,'mysql error : '+ err.errno);
                } else {
                    var obj = {id:id,success:true}
                    self.toJson(req,res,obj);
                }
            });

        });


        app.post('/history', function(req,res) {
            var date = req.param('date');
            var history = req.param('history');

            var categoryID = req.param('categoryID');
            assert(date);
            assert(history);
            assert(categoryID);

            var db = Mono.getInstance().getDb();


            db.query(" INSERT INTO history (date, history) VALUES ('"+date+"','"+history+"')",function(err,result){
                if (err) {
                    self.toError(req,res,'mysql error : '+ err.errno);
                } else {
                    var obj = {id:result.insertId,success:true}
                    self.toJson(req,res,obj);
                }
            });
        });


        app.get('/historyData',function(req,res){
            assert(req.param('categoryID'));
            var categoryID = req.param('categoryID');
            var db = Mono.getInstance().getDb();
            var sql = "SELECT * FROM history";

            db.query(sql,function(err,rows){

                self.toJson(req,res,rows);
            });




        });


    }
});