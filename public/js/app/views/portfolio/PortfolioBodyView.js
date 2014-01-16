define( [
    'App', 'backbone','underscore', 'marionette', 'jquery','text!templates/portfolio/portfolioBodyTemplate.html'

],
    function(App, Backbone,_ ,Marionette, $, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {

            onBeforeRender: function(){
                var self = this;
                this.template =   function(){
                    return _.template( template, {
                        data:self.model
                    } );
                }

            },

            attributes : function() {
                return {
                   // class :'panel-body'
                };
            },
            //template :template,
            initialize : function(data) {

                var self = this;
                this._selectformView = '#panel_default';

                var Model =  Backbone.Blueark.Model.extend({
                    url:'/project',

                    initialize: function() {
                    },
                    defaults: {},
                    saveData : function() {
                        var message = "추가했습니다.";
                        if (!this.isNew()) {
                            message = "수정했습니다.";
                        }
                        this.save( this.attributes, {
                            wait:true,
                            success:function(model, response) {
                                if (model.get('error') < 0) {
                                    self.errorMessage(model.get('message'));
                                } else {

                                    alert(message);
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
                this.model = new Model();
                if (data) {
                    this.model.fetch({
                        data:{id:data.id},
                        success : function(model) {
                            console.log(model)
                            self._reload();
                        }
                    });
                }

                this.on('show',function(){

                    this._setFileUpload();
                    $(self.el).find('.date-picker').datepicker({
                        autoclose: true
                    });

                    var el = $(self.el).find('.summernote');

                    el.summernote({
                        lang: 'ko-KR',
                        toolbar: []
                    });
                    $('.note-toolbar').remove();
                });



            },
            _setFileUpload : function() {
                var self = this;;
                $(function () {
                    'use strict';
                    var url = '/upload/rink',extension;
                    //    var url = 'http://localhost:8888/files';

                    $(self.el).find('.fileupload').fileupload({

                        acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
                        url: url,
                        dataType: 'json',
                        done: function (e, data) {

                            var p = $(e.target);
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

                                p.parent().parent().find('.img-thumbnail').attr('src',image);

                                if (!p.attr('field')) {
                                    self.errorMessage('이미지 필드가 없음');
                                }
                                self.model.set(p.attr('field'),'/uploads/'+file.name);
                               // $('#rink_image').val('/uploads/'+file.name);
                               // self.model.set('image','/uploads/'+file.name);
                                //self.model.set('imageUpdate',true);

                            });
                        },

                        progressall: function (e, data) {
                            var p = $(e.target);

                            var progress = parseInt(data.loaded / data.total * 100, 10);
                            p.parent().parent().find('.progress-bar').css('width',progress + '%');

                        }
                    });
                });
            },
            create : function(layout) {
                this.layout = layout;
            },
            events: {
                'click .project-save' :  'save',
                'click .fileinput-button':'resetProgress',
                'click .project-write':'_createProject',
                'click .final_add_field':'_add_final_field',
                'click .add_grid':'_add_grid',
                'click .add_color':'_add_color',
                'click .add_type' : '_add_type',
                'click .nav li' :'_checkData'
            },
            _checkData: function(e) {


                if (!this.model.get('id')) {
                    this.errorMessage('프로젝트 기본정보를 먼저 입력하지 않으면 적용안됩니다.');
                }
                this._selectformView = $(e.target).attr('href');


            },
            _reload : function() {
                this.layout.trigger('data_reload');
            },
            _add_type : function() {

                this.layout.trigger('add_type');
            },
            _add_grid: function() {
                this.layout.trigger('add_grid');
            },
            _add_color: function() {
                this.layout.trigger('add_color');
            },
            _add_final_field: function() {
                this.layout.trigger('add_final_field');
            },
            resetProgress: function() {

                $(this.el).find('.progress-bar').css('width',  '0%');
            },
            _createProject: function() {

                this.layout.trigger('projectWrite');
            },
            save_default: function(e) {
                var el = $(this.el);

                if (!App.categoryModel.get('id')) {
                    alert('잘못된 접근입니다.');
                    return false;
                }
                var categoryID = App.categoryModel.get('id');
                // console.log(el.find('.gubun').val())


                if (el.find('.regDate').val() === '') {
                    alert('입력날짜를 입력하세요');
                    return false;
                }
                if (el.find('.project_name').code() === '') {
                    alert('프로젝트명을 입력하세요');
                    return false;
                }

                if (el.find('.client').val() === '') {
                    alert('클라이언트를 입력하세요');
                    return false;
                }

                if (el.find('.work_start').val() === '') {
                    alert('제작기간 시작일을 입력하세요');
                    return false;
                }

                if (el.find('.work_end').val() === '') {
                    alert('제작기간 종료일을 입력하세요');
                    return false;
                }

                if (el.find('.overview').code() === '') {
                    alert('overview을 입력하세요');
                    return false;
                }
                if (el.find('.concept').code() === '') {
                    alert('concept을  입력하세요');
                    return false;
                }
                if (el.find('.feature').code() === '') {
                    alert('Special feature을  입력하세요');
                    return false;
                }
                if (el.find('.rfp').code() === '') {
                    alert('RFP 을  입력하세요');
                    return false;
                }

                if (el.find('.research').code() === '') {
                    alert('Analysis And Research 을  입력하세요');
                    return false;
                }
                if (el.find('.keyword').val() === '') {
                    alert('keyword 을  입력하세요');
                    return false;
                }
                if (el.find('.strategy').code() === '') {
                    alert('strategy 을  입력하세요');
                    return false;
                }
                if (el.find('.proposal').code() === '') {
                    alert('proposal 을  입력하세요');
                    return false;
                }

                var gubun = el.find('.gubun').val();
                this.model.set('gubun',el.find('.gubun').val());
                this.model.set('regDate',el.find('.regDate').val())
                this.model.set('project_name',el.find('.project_name').code());
                this.model.set('client',el.find('.client').val());
                this.model.set('work_start',el.find('.work_start').val() );
                this.model.set('work_end',el.find('.work_end').val());
                this.model.set('overview',el.find('.overview').code() );
                this.model.set('concept',el.find('.concept').code());
                this.model.set('feature',el.find('.feature').code());
                this.model.set('rfp',el.find('.rfp').code());
                this.model.set('research',el.find('.research').code());
                this.model.set('strategy',el.find('.strategy').code());
                this.model.set('proposal',el.find('.proposal').code());
                this.model.set('analysis_image_text_1',el.find('.analysis_image_text_1').code());
                this.model.set('analysis_image_text_2',el.find('.analysis_image_text_2').code());
                this.model.set('bg_color',el.find('.bg_color').val());
                this.model.saveData();

            },
            save: function(e) {
                e.stopPropagation();

                switch (this._selectformView) {
                    case '#panel_default':
                        this.save_default(e);
                        break;
                }



                //var model = new  this.Model;
                //model.saveData(data);
                return false;
            },
            errorMessage : function(message){
                App.trigger('errorMessage',{'message':message});
            }

        });
    });