define([

  'jquery',
  'underscore',
  'backbone'

], function($,_, Backbone) {

  var UserModel = Backbone.Model.extend({
      url: '/user',
      idAttribute:'_id',
      defaults: {
          isLogin: false,
          race: 'krab'
      },
      initialize : function() {
        var scope = this;
        this.on('logout',function(){
            var url = '/user/' + scope.get('uid') +'/'+ scope.get('session_id') ;
            scope.destroy({
                  url: url,
                    error :function(model, response) {
                    },
                  success: function(model,req){
                      $.cookie('userinfo',{});
                      model.clear();
                      model.set('isLogin',false);
                 }
            })
        });
      },

      setController: function(controller) {
        this.controller = controller;
        this.app = controller.app;
      },
      fbRegister : function(userinfo,authResponse,callback) {
          var userData ={

              fb_id:userinfo.id,
              email : userinfo.email,
              username  :userinfo.username,
              fb_access_token : authResponse.accessToken
              }
              , scope = this;

          this.set(userData);


          this.save( this.attributes, {
              wait:true,

              url:this.url + '/fb',
              success:function(model, response) {
                  if (model.get('error') < 0 ) {
                      scope.errorMessage(model.get('result_text'));
                      callback(false);
                  } else {
                     // console.log(111111)
                      $.cookie('userinfo',{
                          email:model.get('email'),
                          username:model.get('username'),
                          session_id:model.get('session_id'),
                          uid:model.get('uid')
                      });
                      scope.set('isLogin',true);
                     // callback(true);


                  }

              },
              error: function(model, error) {
                  console.log(model.toJSON());
                  console.log('error.responseText');
              }
          });


      },
      fbLogin: function(type,userinfo,authResponse) {

          if (!userinfo.email) {
               console.log('There is no e-mail')
          }
          var userData ={
              type :'fb',
              fb_id : userinfo.id,
              email : userinfo.email,
              username  :userinfo.username,
              fb_access_token : authResponse.accessToken
          }


          // console.log(userData)
          this.fetch({
              data:userData,
              success: function(model, response) {

                  $.cookie('userinfo',{
                      userid:model.get('userid'),
                      // password:model.get('password'),
                      session_id:model.get('session_id'),
                      uid:model.get('uid')
                  });
              }
          })

      },
      signIn: function(data) {
          var scope = this;
          data.type= 'default';
          this.fetch({
              data: data,
              success: function(model, response) {
                  if (model.get('error') && model.get('error') < 0) {
                      scope.errorMessage( model.get('result_text') );
                  }  else {

                      $.cookie('userinfo',{
                          email:model.get('email'),
                          username:model.get('username'),
                          //password:model.get('password'),
                          session_id:model.get('session_id'),
                          uid:model.get('uid')
                      });
                  }

              }
          });
      },
      isEmpty : function() {
          console.log(this.get('isEmpty'));
      },

      errorMessage : function(message){

          this.controller.trigger('errorMessage',{'message':message});
      },
      signUp: function(userEl) {
          var scope = this;
          console.log(this.get('race'))
          if (this.get('race')) {
             var profile_info = {race:this.get('race')};
              this.set('profile_info',profile_info);
          }
          this.save({type:'coconut', nuts:true}, {
              wait:true,
              success:function(model, response) {
                  if (model.get('error') < 0 ) {
                       switch (model.get('error'))  {
                           default:
                               scope.errorMessage(model.get('result_text'));
                               break;
                           case -201:
                               userEl['email'].parent().addClass('error');
                               break;

                       }
                  } else {
                      $.cookie('userinfo',{
                          email:model.get('email'),
                          username:model.get('username'),
                          //password:model.get('password'),
                          session_id:model.get('session_id'),
                          uid:model.get('uid')
                      });
                      scope.set('isLogin',true);
                  }

              },
              error: function(model, error) {
                  console.log(model.toJSON());
                  console.log('error.responseText');
              }
          });
      }

  });

  return UserModel;

});
