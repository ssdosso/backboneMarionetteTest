
define( ['App', 'backbone', 'marionette', 'jquery','text!templates/user/sign/signTemplate.html'],
    function(App, Backbone, Marionette, $, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: function(){
                return template;
            },

            initialize : function() {
                App.userModel.on('change:isLogin',function(model){


                    if(model.get('isLogin') === true) {
                       // App.appRouter.navigate('/',true);
                    }
                });
                $('.nav li').removeClass('active');
                $('.nav li a[href="#"]').parent().addClass('active');
            },

            events: {
               'submit form':'register',
                'click #facebookLogin':'_fbRegister'
            },
            _fbRegister: function(e) {
                $('#followingMemberBar').hide();
                $('.progress').show();
                FB.getLoginStatus(function(response) {
                    if (response.status === 'connected') {
                        FB.api('/me', function(userinfo) {

                            App.userModel.fbRegister(userinfo,response.authResponse,function(state){
                                 if(state === false) {
                                     $('.progress').hide();
                                     $('#followingMemberBar').show();

                                 }
                            });
                        });

                    } else if (response.status === 'not_authorized') {
                        FB.login(function(response) {
                            if (response.authResponse) {
                                //회원 인증이 됨.
                                FB.api('/me', function(userinfo) {
                                   App.userModel.fbRegister('fb',userinfo,response.authResponse,function(state){
                                       if(state === false) {
                                           $('.progress').hide();
                                           $('#followingMemberBar').show();

                                       }

                                   });
                                });
                            } else {
                                console.log('but has not authenticated your app');
                            }
                        },{scope:'email'});
                    } else {
                        FB.login(function(response) {
                            if (response.authResponse) {
                                //회원 인증이 됨.
                                FB.api('/me', function(userinfo) {

                                    App.userModel.fbRegister('fb',userinfo,response.authResponse,function(state){
                                        if(state === false) {
                                            $('.progress').hide();
                                            $('#followingMemberBar').show();

                                        }
                                    });
                                });
                            } else {
                                console.log('but has not authenticated your app');
                            }
                        },{scope:'email'});
                    }
                });

            },
            register: function(e) {

                var userEl = {},userField={};
//                $(this).find('input').each(function(){
//                    userEl[$(this).attr('id')] = $(this);
//                    userField[$(this).attr('id')] = $(this).attr('value');
//                });
                $(e.currentTarget).find('input').each(function(){

                        userEl[$(this).attr('id')] = $(this);
                        userField[$(this).attr('id')] = $(this).attr('value');
                });
                $(e.currentTarget).find('select').each(function(){

                    userEl[$(this).attr('id')] = $(this);
                    userField[$(this).attr('id')] = $(this).attr('value');
                });

                if (userField['password'] !== userField['password1']) {

                    $('#password').parent().addClass('error');
                    $('#password').parent().children().each(function(){
                            if( $(this).context.localName == 'span' ) {
                                 $(this).html('Minimum length is 5');
                            }
                    });


            } else {
                   App.userModel.set(userField);
                   App.userModel.signUp(userEl);
            }

            //    e.stopPropagation();
                return false;
            }
        });
    });
//
//
//define([
//    'app',
//  'jquery',
//  'underscore',
//  'backbone',
//  'text!templates/sign/signTemplate.html'
//], function(app,$, _, Backbone,  signTemplate){
//
//
//  //var contributorsListView;
//
//  var SignView = Backbone.Blueark.View.extend({
//    el: $("#page"),
//    initialize: function() {
//        app.userModel.on('change:isLogin',function(model){
//            if(model.get('isLogin') === true) {
//                app.router.navigate('#',true);
//            }
//        });
//    },
//    render: function(){
//        var userModel=app.userModel;
//
//      $('.nav li').removeClass('active');
//      $('.nav li a[href="'+window.location.hash+'"]').parent().addClass('active');
//
//      this.$el.html( signTemplate );
//
//        $('#facebookLogin').bind('click',function(){
//            $('.progress').show();
//            $('#facebookSingBtn').hide();
//            FB.getLoginStatus(function(response) {
//                if (response.status === 'connected') {
//
//                    FB.api('/me', function(userinfo) {
//                        userModel.auth('fb',userinfo,response.authResponse);
//                     ;
//                    });
//
//                } else if (response.status === 'not_authorized') {
//
//                    FB.login(function(response) {
//                        if (response.authResponse) {
//                            //회원 인증이 됨.
//                            FB.api('/me', function(userinfo) {
//                                userModel.auth('fb',userinfo,response.authResponse);
//                            });
//                        } else {
//                            console.log('but has not authenticated your app');
//                        }
//                    });
//                } else {
//                    FB.login(function(response) {
//                        if (response.authResponse) {
//                            //회원 인증이 됨.
//                            FB.api('/me', function(userinfo) {
//                                userModel.auth('fb',userinfo,response.authResponse);
//                            });
//                        } else {
//                            console.log('but has not authenticated your app');
//                        }
//                    });
//                }
//            });
//        });
//        $('#signfrm').submit(function() {
//            var userField = {},userEl={};
//                //error
//
//            $(this).find('input').each(function(){
//                userEl[$(this).attr('id')] = $(this);
//               userField[$(this).attr('id')] = $(this).attr('value');
//            });
//
//            if (userField['password'] !== userField['password1']) {
//
//                //Minimum length is 5
//                $('#password').parent().addClass('error');
//                $('#password').parent().children().each(function(){
//
//                             if( $(this).context.localName == 'span' ) {
//                                 $(this).html('Minimum length is 5');
//                             }
//                })
//
//
//            } else {
//                userModel.set(userField);
//                userModel.signUp(userEl);
//            }
//
//
//            return false;
//        });
//    }
//  });
//  return SignView;
//});
