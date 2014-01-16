define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'text!templates/main/rinkRowTemplate.html',
    'models/RinkModel'
], function($, _, Backbone,marionette,  template,Model){
    return Backbone.Marionette.ItemView.extend( {
        model: Model,
        initialize : function() {
            var self = this;
            this.on('show',function(e){

                this._setFileUpload();
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
        _setFileUpload : function() {
            var ID = this.model.get('id'),self = this;;
            $(function () {
                'use strict';
                var url = '/upload/rink',extension;
                //    var url = 'http://localhost:8888/files';
                $('#fileupload_'+ID).fileupload({

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
                            $('#rink_image').val('/uploads/'+file.name);
                            self.model.set('image','/uploads/'+file.name);
                            self.model.set('imageUpdate',true);

                        });
                    },

                    progressall: function (e, data) {

                        var progress = parseInt(data.loaded / data.total * 100, 10);
                        $(self.el).find('.progress-bar').css('width',progress + '%');

                    }
                });
            });
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
            'click .checkbox input': '_selectRemove'
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

           // this.render();
        },
        _save : function(e) {

            if ($(e.currentTarget).find('div .rink-title').val() == '') {
                alert('제목을 입력하세요');
                $(e.currentTarget).find('div .rink-title').focus();
                return false;
              //  this.errorMessage('error');
            }
            if ($(e.currentTarget).find('div .rink_link').val() == '') {
                alert('LINK 를 입력하세요');
                $(e.currentTarget).find('div .rink_link').focus();
                return false;
                //  this.errorMessage('error');
            }
            this.model.set('title',$(e.currentTarget).find('div .rink-title').val());
            this.model.set('link',$(e.currentTarget).find('div .rink_link').val());
            this.model.saveData();

            return false;
        },
        attributes : function () {
            return {
                class :'panel-body'

            };
        },
        errorMessage : function(message){
            App.trigger('errorMessage',{'message':message});
        }


    });

});


//Backbone.Marionette.CollectionView.extend