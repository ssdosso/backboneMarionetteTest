
define( ['App', 'backbone', 'marionette', 'jquery','text!templates/user/profileTemplate.html'
    ,'bootstrap'
    ,'../../../upload/jquery.fileupload-validate'
   // , 'jquery.fileupload'
    , '../../../upload/jquery.iframe-transport'

],
    function(App, Backbone, Marionette, $, template,userProfileModel) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: function(){

                return _.template( template, {
                    user:App.userModel,
                    profile: App.profileModel
                } );
            },
            _setFileUpload : function() {
                $(function () {
                    'use strict';
                 var url = '/upload/'+ App.userModel.get('username')
                     ,extension;
                //    var url = 'http://localhost:8888/files';
                    $('#fileupload').fileupload({

                        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                        url: url,
                        dataType: 'json',
                        done: function (e, data) {

                            $.each(data.result.files, function (index, file) {

                                    switch(file.type) {
                                        case 'image/jpeg':
                                            extension = 'jpg';
                                            break;
                                        case 'image/gif':
                                            extension = 'gif';
                                            break;
                                        case 'image/png':
                                            extension = 'png';
                                            break;
                                        default :
                                            extension = 'jpg';
                                            break;
                                    }
//                                var image = '<img src="/images/profile/'+App.profileModel.get('race')+'/'+file.username+'.jpg">';
                                var image = '/images/profile/'+App.profileModel.get('race')+'/'+file.username+'.'+extension+'?t=' + new Date().getTime();

                                $('#profileImage').attr('src',image);
                               // $('#profileImage').html(image);
                            });
                        },

                        progressall: function (e, data) {

                            var progress = parseInt(data.loaded / data.total * 100, 10);

                            $('#progress .bar').css(
                                'width',
                                progress + '%'
                            );
                        }
                    });
                });
            },
            initialize : function() {

                this.on('show',function(){

                    this._setFileUpload();
                })

                $('.nav li').removeClass('active');
                $('.nav li a[href="#"]').parent().addClass('active');
            },

            events: {
                'submit form':'profileUpdate'
            },
            profileUpdate: function(e) {

                var userField = {},userEl={};

                App.userModel.set('current_password',App.userModel.get('password'));
                $(e.currentTarget).find('input').each(function(){
                    userEl[$(this).attr('id')] = $(this);
                    userField[$(this).attr('id')] = $(this).attr('value');

                });

                if (userField['password'] !== userField['password1']) {
                    $('#password1').parent().addClass('error');
                } else {
                    App.userModel.set(userField);
                    App.userModel.sync('update', App.userModel, {
                        success: function(model,reddd) {
                            if (model.get('error') < 0 ) {

                            }  else {
                                App.appRouter.navigate('/',true);
                            }

                        }
                    });
                    //  userModel.signUp(userEl);
                }

                return false;

            }
        });
    });
