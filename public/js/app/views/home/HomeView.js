define( [
    'App', 'backbone', 'marionette', 'jquery','text!templates/home/homeTemplate.html'
    , 'views/WelcomeView'
    ,'../../../upload/jquery.fileupload-validate'
     , 'jquery.fileupload'

    , '../../../upload/jquery.iframe-transport'


],
    function(App, Backbone, Marionette, $, template,testView) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: function(){

               return template;
            },
            //template :template,
             initialize : function() {



                //var layout = new MainView();
                 //layout.render();

                // layout.list.show(new testView);
                 var runCustomCheck = function () {
                     if ($('input[type="checkbox"]').length || $('input[type="radio"]').length) {
                         $('input[type="checkbox"].grey, input[type="radio"].grey').iCheck({
                             checkboxClass: 'icheckbox_minimal-grey',
                             radioClass: 'iradio_minimal-grey',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].red, input[type="radio"].red').iCheck({
                             checkboxClass: 'icheckbox_minimal-red',
                             radioClass: 'iradio_minimal-red',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].green, input[type="radio"].green').iCheck({
                             checkboxClass: 'icheckbox_minimal-green',
                             radioClass: 'iradio_minimal-green',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].teal, input[type="radio"].teal').iCheck({
                             checkboxClass: 'icheckbox_minimal-aero',
                             radioClass: 'iradio_minimal-aero',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].orange, input[type="radio"].orange').iCheck({
                             checkboxClass: 'icheckbox_minimal-orange',
                             radioClass: 'iradio_minimal-orange',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].purple, input[type="radio"].purple').iCheck({
                             checkboxClass: 'icheckbox_minimal-purple',
                             radioClass: 'iradio_minimal-purple',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].yellow, input[type="radio"].yellow').iCheck({
                             checkboxClass: 'icheckbox_minimal-yellow',
                             radioClass: 'iradio_minimal-yellow',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].square-black, input[type="radio"].square-black').iCheck({
                             checkboxClass: 'icheckbox_square',
                             radioClass: 'iradio_square',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].square-grey, input[type="radio"].square-grey').iCheck({
                             checkboxClass: 'icheckbox_square-grey',
                             radioClass: 'iradio_square-grey',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].square-red, input[type="radio"].square-red').iCheck({
                             checkboxClass: 'icheckbox_square-red',
                             radioClass: 'iradio_square-red',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].square-green, input[type="radio"].square-green').iCheck({
                             checkboxClass: 'icheckbox_square-green',
                             radioClass: 'iradio_square-green',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].square-teal, input[type="radio"].square-teal').iCheck({
                             checkboxClass: 'icheckbox_square-aero',
                             radioClass: 'iradio_square-aero',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].square-orange, input[type="radio"].square-orange').iCheck({
                             checkboxClass: 'icheckbox_square-orange',
                             radioClass: 'iradio_square-orange',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].square-purple, input[type="radio"].square-purple').iCheck({
                             checkboxClass: 'icheckbox_square-purple',
                             radioClass: 'iradio_square-purple',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].square-yellow, input[type="radio"].square-yellow').iCheck({
                             checkboxClass: 'icheckbox_square-yellow',
                             radioClass: 'iradio_square-yellow',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].flat-black, input[type="radio"].flat-black').iCheck({
                             checkboxClass: 'icheckbox_flat',
                             radioClass: 'iradio_flat',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].flat-grey, input[type="radio"].flat-grey').iCheck({
                             checkboxClass: 'icheckbox_flat-grey',
                             radioClass: 'iradio_flat-grey',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].flat-red, input[type="radio"].flat-red').iCheck({
                             checkboxClass: 'icheckbox_flat-red',
                             radioClass: 'iradio_flat-red',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].flat-green, input[type="radio"].flat-green').iCheck({
                             checkboxClass: 'icheckbox_flat-green',
                             radioClass: 'iradio_flat-green',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].flat-teal, input[type="radio"].flat-teal').iCheck({
                             checkboxClass: 'icheckbox_flat-aero',
                             radioClass: 'iradio_flat-aero',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].flat-orange, input[type="radio"].flat-orange').iCheck({
                             checkboxClass: 'icheckbox_flat-orange',
                             radioClass: 'iradio_flat-orange',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].flat-purple, input[type="radio"].flat-purple').iCheck({
                             checkboxClass: 'icheckbox_flat-purple',
                             radioClass: 'iradio_flat-purple',
                             increaseArea: '10%' // optional
                         });
                         $('input[type="checkbox"].flat-yellow, input[type="radio"].flat-yellow').iCheck({
                             checkboxClass: 'icheckbox_flat-yellow',
                             radioClass: 'iradio_flat-yellow',
                             increaseArea: '10%' // optional
                         });
                     };
                 };
                 App.categoryModel.getCategory('main');


                this.on('show',function(){
                     this._setFileUpload();
                    runCustomCheck();
                })


             },

            events: {
                'submit form':'_save'
            },
            _save: function() {
                console.log(App.categoryModel.get('id'))
                if (!App.categoryModel.get('id')) {
                    alert('잘못된 접근입니다.');
                    return;
                }
                var categoryID = App.categoryModel.get('id');
                if($.trim($('#rink_title').val()) === '' ) {
                   this.errorMessage('제목을 입력하세요');
                    $('#rink_title').focus();
                }

                if($.trim($('#rink_image').val()) === '' ) {
                   this.errorMessage('이미지를 선택후 업로드 하세요');

                }

                return false;
            },
            errorMessage : function(message){
                App.trigger('errorMessage',{'message':message});
            },
            _setFileUpload : function() {
                $(function () {
                    'use strict';
                    var url = '/upload/rink',extension;
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

                                var image = '/uploads/'+file.name+'?t=' + new Date().getTime();

                                $('.img-thumbnail').attr('src',image);
                                $('#rink_image').val('/uploads/'+file.name);

                            });
                        },

                        progressall: function (e, data) {

                            var progress = parseInt(data.loaded / data.total * 100, 10);

                            $('.progress-bar').css('width',progress + '%');
                        }
                    });
                });
            },
        });
    });