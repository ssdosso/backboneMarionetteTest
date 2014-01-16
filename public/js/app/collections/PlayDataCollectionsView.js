define([
    'App',
    'jquery',
    'underscore',
    'backbone',
    'collections/PlayDataCollection',
    'views/main/PlayRowView',

    'marionette'
], function(App,$, _, Backbone,PlayDataCollection,PlayRowView){

    var friendCollectionView =   Backbone.Marionette.CollectionView.extend( {
        viewItems :null,
        initialize : function() {
            var self = this;
            this.collection = new PlayDataCollection();
            this.view = true;
            this.viewItems = {};


        this.on("before:item:added", function(viewInstance){
            (
            function(veiw){

                veiw.bind('removeSelect',function(viewid,checked){
                    if (checked) {

                        self.viewItems[viewid] = viewid;
                    } else {
                        delete self.viewItems[viewid];
                    }

                })
            }
            )(viewInstance);
        });


        },
        getRemoveItem: function() {
            return this.viewItems;
        },
        fetch: function() {

            this.collection.fetch(

                {
                    /**
                     * url 값이 있으면 server 에서 해당 url 값으로 api 서버를 바꾼다.
                     *
                     */
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
              //  class :'media-list'

            };
        },
        itemView: PlayRowView,

    });
    return friendCollectionView;

});