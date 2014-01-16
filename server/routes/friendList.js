var EventEmitter = process.EventEmitter
    ,_ = require('underscore')
    , fs = require('fs')
    , request = require('request')
    , winston = require('winston')
    , assert= require('assert');

var Router = require('../lib/Router');



exports.FriendRouter  = Friend;

function Friend () {

    this.routerName = 'Friend';
};

_.extend(Friend.prototype, Router.prototype, {
    start : function() {

        var app = this.app,self=this;
        app.get('/friendList', function(req,res){


            self.request('get','FollowList',{url:req.param('url'),account_uid:req.param('uid')},function(response,data) {


                    //console.log(data.follow_list);
                //data.follow_list


              //  self.renderToJson(res,data.friend_list);
                var uid_list = [];

                _.each(data.follow_list, function(user){
                    uid_list.push(user.opposite_uid);
                });

                self.getProfile(uid_list,req,function(result){
                    //[ { username: 'sj2', _id: 4, email: 'sjh@rockho.com', race: '0' } ]


                    self.renderToJson(res,result.profiles);
                })

            });
        });
    }
    ,getProfile: function(uid_list,req,callback) {

        var params = {
             uid: req.session.uid,
            session_id: req.session.session_id,
            uid_list: JSON.stringify(uid_list)
        }

        this.request('post','profile/list',params,function(res,data){

              callback(data);
        })
    }
});