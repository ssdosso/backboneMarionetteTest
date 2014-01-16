define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'text!templates/portfolio/portfolioGridRowTemplate.html',
    'models/Model'
], function($, _, Backbone,marionette,  template,Model){
    return Backbone.Marionette.ItemView.extend( {
        model: Model,
        initialize : function() {
            var self = this;
            this.on('show',function(e) {


                $(self.el).find('.date-picker').datepicker({
                    autoclose: true
                });
                var el = $(self.el).find('.summernote-history');

                el.summernote({
                    lang: 'ko-KR',
                    toolbar: []
                });
                $('.note-toolbar').remove();

            });

            this.model.on('remove',function(){
                self.model.destroy({data:{image:self.model.get('image')}, processData: true});
            });
            this.model.bind('dataUpdate',function(){
                self.resetProgress();
            })
        },
        template: function(){

            return _.template( template, {
                data:this.model

            } );
        },

        onBeforeRender: function(){
            var self = this;


            this.template =   function(){

                return _.template( template, {
                    data:self.model
                } );
            }

        },
        events: {
            'submit form':'_save',
            'click .fileinput-button':'resetProgress',
            'click .checkbox input': '_selectRemove',
            'click .removeFianl' : '_removeItem'
        },
        _removeItem : function(e) {
            this.trigger('final_remove', this.model);
        },
        _selectRemove: function(e) {

            this.trigger('removeSelect',this.model.get('id'),$(e.target).is(":checked"));
        },
        resetProgress: function() {

            $(this.el).find('.progress-bar').css('width',  '0%');
        },
        onAfterItemAdded: function(itemView){

            console.log("item was added");
        },
        onRender: function(){

        },
        _save : function(e) {
            e.stopPropagation();
            var el = $(this.el);
            if (el.find('.summernote-history').code() == '') {
                alert('내용을 입력하세요');

                return false;
                //  this.errorMessage('error');
            }
            if (el.find('.date-picker').val() == '') {
                alert('날짜를 선택하세요');
                el.find('.date-picker').focus();
                return false;
            }


            this.model.set('history',el.find('.summernote-history').code());
            this.model.set('date',el.find('.date-picker').val() );

            this.model.saveData();

            return false;
        },
        attributes : function () {
            return {
                //class :'panel-body'

            };
        },
        errorMessage : function(message){
            App.trigger('errorMessage',{'message':message});
        }


    });

});


//Backbone.Marionette.CollectionView.extend