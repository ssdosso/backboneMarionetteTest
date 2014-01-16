define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'text!templates/portfolio/projejctSelectList.html',
    'models/Model'
], function($, _, Backbone,marionette,  template,Model){
    return Backbone.Marionette.ItemView.extend( {
        model: Model,
        initialize : function() {
            var self = this;
            this.on('show',function(e) {
            });


        },
        tagName:'option',

        onBeforeRender: function(){
            var self = this;


            this.template =   function(){

                return _.template( template, {
                    data:self.model
                } );
            }

        },
        events: {

        },
        attributes : function() {
            return {
                value : this.model.get('id')
            }
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


        errorMessage : function(message){
            App.trigger('errorMessage',{'message':message});
        }


    });

});


//Backbone.Marionette.CollectionView.extend