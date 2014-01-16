define( [
    'App', 'backbone', 'marionette', 'jquery','text!templates/main/playItem.html'

    ,'../../../upload/jquery.fileupload-validate'

    , 'jquery.fileupload'
    , '../../../upload/jquery.iframe-transport'
    , "../../../plugins/summernote/build/summernote.min"
    , "../../../plugins/bootstrap-datepicker/js/bootstrap-datepicker"


],
    function(App, Backbone, Marionette, $, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: function(){
                return template;
            },
            //template :template,
            //panel-body
            initialize : function() {
                var self = this;

                this.Model =  Backbone.Blueark.Model.extend({
                    url:'/play',

                    initialize: function() { },
                    defaults: {},
                    saveData : function(data) {
                        this.set(data);



                        this.save( this.attributes, {
                            wait:true,
                            success:function(model, response) {
                                if (model.get('error') < 0) {
                                    self.errorMessage(model.get('message'));
                                } else {
                                    alert("추가했습니다.");
                                    self.trigger('onDataChange',model);
                                }
                            },
                            error: function(model, error) {

                                console.log(model.toJSON());

                                console.log('error.responseText');
                            }
                        });

                    }
                });
                this.on('show',function(){

               $(self.el).find('.date-picker').datepicker({
                   autoclose: true
               });

                    var el = $(self.el).find('.summernote-title');

                    el.summernote({
                        lang: 'ko-KR',
                        toolbar: []
                    });
                    $('.note-toolbar').remove();
                    this._setFileUpload();
                })
            },
            attributes : function () {
                return {
                    class :'panel-body'

                };
            },
            events: {
                'click .fileinput-button':'resetProgress',
                'submit form':'_save'
            },
            resetProgress: function() {

               $(this.el).find('.progress-bar').css('width',  '0%');
            },
            _save: function(e) {
                e.stopPropagation();
                var el = $(this.el);

                if (!App.categoryModel.get('id')) {
                    alert('잘못된 접근입니다.');
                    return;
                }

                var categoryID = App.categoryModel.get('id');
                if(el.find('.summernote-title').code() === '' ) {
                    alert('제목을 입력하세요');

                    return false;
                }

                if($.trim(el.find('.date-picker').val()) === '' ) {
                    alert('날짜를 선택하세요');
                    el.find('.date-picker').focus();
                    return false;
                }
                if($.trim(el.find('.input-image').val()) === '' ) {
                    alert('이미지를 선택후 업로드 하세요');
                    return false;
                }


                if(el.find('.play-link').val() ==='') {
                    alert('link 를 입력하세요');
                    el.find('.play-link').focus();
                    return false;
                }


                var data = {
                    categoryID:categoryID,
                    title   :   el.find('.summernote-title').code() ,
                    image   :   el.find('.input-image').val(),
                    link    :   el.find('.play-link').val(),
                    date    :   el.find('.date-picker').val()

                }

                var model = new  this.Model;

                model.saveData(data);
                return false;
            },
            errorMessage : function(message){
                App.trigger('errorMessage',{'message':message});
            },
            _setFileUpload : function() {
                var self = this;


                $(function () {
                    'use strict';
                    //var url = '/upload/rink',extension;
                    var url = '/upload/playItemImage',extension;
                    //    var url = 'http://localhost:8888/files';


                   $(self.el).find('.fileupload').fileupload({

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

                                $(self.el).find('.img-thumbnail').attr('src',image);
                                $(self.el).find('.input-image').val('/uploads/'+file.name);

                            });
                        },

                        progressall: function (e, data) {

                            var progress = parseInt(data.loaded / data.total * 100, 10);
                            $(self.el).find('.progress-bar').css('width',progress + '%');
                        }
                    });
                });
            },
        });
    });