define( [
    'App', 'backbone', 'marionette', 'jquery','text!templates/who/whoTemplate.html'
],
    function(App, Backbone, Marionette, $, template,testView) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: function(){
                return template;
            },
            //template :template,
            initialize : function() {
                App.categoryModel.getCategory('who');
                 var self = this;

                this.Model =  Backbone.Blueark.Model.extend({
                    url:'/history',

                    initialize: function() {
                    },
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

                    var el = $(self.el).find('.summernote-history');

                    el.summernote({
                        lang: 'ko-KR',
                        toolbar: []
                    });
                    $('.note-toolbar').remove();
                })



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
                if($.trim(el.find('.date-history').val()) === '' ) {
                    alert('연도를 선택하세요');
                    el.find('.date-history').focus();
                    return false;
                }



                if(el.find('.summernote-history').code() ==='') {
                    alert('내용을 입력하세요');
                    return false;
                }

                var data = {
                    categoryID:categoryID,
                    date: el.find('.date-history').val(),
                    history:el.find('.summernote-history').code()

                }

                var model = new  this.Model;
                model.saveData(data);
                return false;
            },
            errorMessage : function(message){
                App.trigger('errorMessage',{'message':message});
            }

        });
    });