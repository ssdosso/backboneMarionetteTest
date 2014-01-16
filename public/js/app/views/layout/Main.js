

define( [
    'App', 'backbone', 'marionette', 'jquery','text!templates/layout/mainTemplate.html'
    ,'views/main/RinkView'
    ,'collections/RinkDataCollectionsView'
    , 'views/main/PlayItemView'
    , 'collections/PlayDataCollectionsView'


],
    function(App, Backbone, Marionette, $, template,RinkView,RinkDataCollectionsView,PlayItemView,PlayDataCollectionsView) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.Layout.extend( {
            template: function(){

                return template;
            },
            categoryID: null,
            initialize : function() {
                this.rinkDataCollectionsView = new RinkDataCollectionsView;
                this.playDataCollectionsView = new PlayDataCollectionsView;
            },
            create: function(categoryModel) {
                var self = this;
                this.addRinkItem();
                this.rink_list.show(this.rinkDataCollectionsView);
                this.play_list.show(this.playDataCollectionsView);

                categoryModel.on('change',function(model){
                        if (model.get('name') === 'main') {
                            self.categoryID = model.get('id');
                            self.rinkDataCollectionsView.fetch();
                            self.playDataCollectionsView.fetch();

                        }
                });

                // this.rink_list.show(this.rinkDataCollectionsView);
            },
            addRinkItem : function() {
                var self = this;
                this.rinkview = new RinkView();
                this.rink.show(this.rinkview);

                this.playItemView = new PlayItemView();
                this.playitem.show(this.playItemView);

                this.playItemView.bind('onDataChange',function(model){
                    self.playDataCollectionsView.collection.add(model);

                });
                this.rinkview.bind('onDataChange',function(model){
                    self.rinkDataCollectionsView.collection.add(model);

                });
            },
            regions: {
                rink: "#rink",
                rink_list :"#rink-data",
                playitem: "#playitem",
                play_list :"#play-list"

            },
            events: {
                'click .rink-delete' : '_itemRemove',
                'click .play-delete' : '_itemPlayRemove'
            },
            errorMessage : function(message){
                App.trigger('errorMessage',{'message':message});
            },
            _itemPlayRemove : function(e) {
                var target = this.playDataCollectionsView.getRemoveItem();
                for (var t in target) {
                    this.playDataCollectionsView.collection.remove( target[t]);
                }
            },
            _itemRemove : function(e) {
                var target = this.rinkDataCollectionsView.getRemoveItem();
                for (var t in target) {
                    this.rinkDataCollectionsView.collection.remove( target[t]);
                }

            }

        });
    });