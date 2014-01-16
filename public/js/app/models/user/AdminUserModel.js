define([
    'globals',
    'jquery',
    'underscore',
    'backbone',

], function(Globals,$,_, Backbone) {

    var AdminUserModel = Backbone.Model.extend({
        url: '/user',
        idAttribute:'_id',
        defaults: {
            isLogin: Globals.isLogin
        },
        initialize : function() {
            var scope = this;
            if (this.get('isLogin')) {
                this.set('id',Globals.id);
                this.set('session_id',Globals.session_id);



            }

            this.on('logout',function(){
                var url = '/user/' + scope.get('uid') +'/'+ scope.get('session_id') ;
                scope.destroy({
                    url: url,
                    error :function(model, response) {
                        console.log('error');
                    },
                    success: function(model,req){
                        console.log(model)
                        //$.cookie('userinfo',{});
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


        signIn: function(data) {
            var scope = this;
            data.type= 'default';
            this.fetch({
                data: data,
                success: function(model, response) {
                    if (model.get('error') && model.get('error') < 0) {

                        scope.errorMessage( model.get('result_text') );


                    }   else {
//                      console.log(model)
//                      $.cookie('userinfo',{
//                          email:model.get('email'),
//                          username:model.get('username'),
//                          //password:model.get('password'),
//                          session_id:model.get('session_id'),
//                          uid:model.get('uid')
//                      });
//                      scope.set('isLogin',true);
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

    return AdminUserModel;

});
