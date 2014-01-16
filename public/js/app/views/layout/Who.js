

define( [
    'App', 'backbone', 'marionette', 'jquery','text!templates/layout/whoTemplate.html'
    ,'views/who/History','collections/HistoryCollectionView'


],
    function(App, Backbone, Marionette, $, whoTemplate,WhoHistoryView,HistoryCollectionView) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.Layout.extend( {
            template: function(){
                return whoTemplate;
            },
            categoryID: null,
            initialize : function() {
                this.collectionView = new HistoryCollectionView;

            },
            create: function(categoryModel) {
                var self = this;
                this.viewItem = new WhoHistoryView;
                this.historyWrite.show(this.viewItem);
                this.viewItem.bind('onDataChange',function(model){
                    self.collectionView.collection.add(model);

                });

                categoryModel.on('change',function(model){
                    if (model.get('name') === 'who') {
                        self.categoryID = model.get('id');
                        self.collectionView.fetch();


                    }
                });

                 this.list.show(this.collectionView);
            },
            addRinkItem : function() {

            },
            regions: {
                historyWrite: "#historyWrite",
                list : "#history-data"


            },
            events: {

                'click .data-delete' : '_itemRemove'
            },
            errorMessage : function(message){
                App.trigger('errorMessage',{'message':message});
            },

            _itemRemove : function(e) {
                var target = this.collectionView.getRemoveItem();
                for (var t in target) {
                    this.collectionView.collection.remove( target[t]);
                }

            }

        });
    });