define([
    'App',
    'jquery',
    'underscore',
    'backbone',
    'collections/collection',
    'views/portfolio/ProjectSelectListView',

    'marionette'
], function(App,$, _, Backbone,Collection,ProjectSelectListView){

    var CollectionView =   Backbone.Marionette.CollectionView.extend( {
        viewItems :null,
        tagName:'select',

        initialize : function() {
            var self = this;
            //url:'/historyData',
            Collection = Backbone.Collection.extend({
                url :'/project/list'
            })
            this.collection = new Collection();
            this.view = true;
            this.viewItems = {};
        },
        getRemoveItem: function() {
            return this.viewItems;
        },
        fetch: function() {

            this.collection.fetch(

                {

                    data:{categoryID:App.categoryModel.get('id')},
                    success: function(model, response) {

                        //  console.log(self.collection.get(3));

                    }
                }
            );
        },
        onBeforeItemAdded: function(){

        },
        onAfterItemAdded: function(){

            //console.log(this.collection.get(1))
        },
        attributes : function () {
            return {
                  class :'form-control search-select nopadding '

            };
        },
        itemView: ProjectSelectListView

    });
    return CollectionView;

});