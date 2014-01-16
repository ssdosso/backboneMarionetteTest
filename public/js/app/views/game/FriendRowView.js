define([
    'jquery',
    'underscore',
    'backbone',
    'marionette',
    'text!templates/right/friendRow.html',
    'models/RinkModel'
], function($, _, Backbone,marionette,  template,Model){
    return Backbone.Marionette.ItemView.extend( {
        model: Model,

        onBeforeRender: function(){
            var self = this;

           var gameTempKeys = _.shuffle([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20]);
            this.model.set('gamePlayKey',gameTempKeys);
            this.template =   function(){

                return _.template( template, {
                    data:self.model
                } );
            }

        },
//        onAfterItemAdded: function(itemView){
//            console.log("item was added");
//        },
//        onRender: function(){
//            console.log("render");
//           // this.render();
//        },
        tagName:'li',
        attributes : function () {
            return {
                class :'media'

            };
        },
        initialize : function() {
            //  new FriendCollection;   media
        }

    });

});


//Backbone.Marionette.CollectionView.extend