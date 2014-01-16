define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'text!templates/portfolio/portfolioTypeRowTemplate.html',
    'models/Model',
    'collections/portfolio/type/GridRowCollectionView',
    'collections/portfolio/type/ColorCollectionView',
    'collections/portfolio/type/ImageCollectionView'

], function($, _, Backbone,marionette,  template,Model,GridRowCollectionView,ColorCollectionView,ImageCollectionView){
    return Backbone.Marionette.ItemView.extend( {
        model: Model,
        initialize : function() {
            var self = this;
            this.gridRowCollectionView = new GridRowCollectionView;
            this.colorCollectionView = new ColorCollectionView;

            var template = '<div id="panel_grid_body_'+this.model.get('len')+'"></div>'+
                '<div class="form-group">'+
                '<a class="btn btn-blue col-sm-offset-5 add_grid"><i class="fa fa-plus"></i> Grid  추가</a>'+
                '</div>';

            var layout =  Backbone.Marionette.Layout.extend( {
                el :'#panel_grid_'+this.model.get('len'),
                template: _.template(template),
                regions :{
                    body:'#panel_grid_body_'+this.model.get('len')
                },
                events : {
                    'click .add_grid' :'add_item'
                },
                add_item : function() {
                    self.gridRowCollectionView.collection.add({create:true});
                }

            });
            var template = '<div id="panel_color_Body_'+this.model.get('len')+'"></div>'+
                '<div class="form-group">'+
                '<a class="btn btn-blue col-sm-offset-5 add_color"><i class="fa fa-plus"></i> Color  추가</a>'+
                '</div>';

            var ColorLayout =  Backbone.Marionette.Layout.extend( {
                el :'#panel_color_'+this.model.get('len'),
                template: _.template(template),
                regions :{
                    body:'#panel_color_Body_'+this.model.get('len')
                },
                events : {
                    'click .add_color' :'add_item'
                },
                add_item : function() {
                  //  self.gridRowCollectionView.collection.add({create:true});
                }

            });

            this.on('show',function(e) {

                this.gridLayout = new layout;
                this.colorLayout = new ColorLayout;
                this.gridLayout.render();
                this.colorLayout.render();

                this.gridLayout.body.show( this.gridRowCollectionView );
                this.colorLayout.body.show(this.colorCollectionView);
                this.gridRowCollectionView.collection.add({create:true});
                this.colorCollectionView.collection.add({create:true});

                var el = $(self.el).find('.summernote');

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
            //layout

        },
        _save : function(e) {
            e.stopPropagation();
            var el = $(this.el);
            if (el.find('.summernote-history').code() == '') {
                alert('내용을 입력하세요');

                return false;

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
           var self = this;
            return {
                class :'panel panel-default'

            };
        },
        errorMessage : function(message){
            App.trigger('errorMessage',{'message':message});
        }


    });

});


//Backbone.Marionette.CollectionView.extend