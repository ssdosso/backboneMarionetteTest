define([
    'App',
    'jquery',
    'underscore',
    'backbone',
    'collections/FriendCollection',
    'views/game/FriendRowView',
    'text!templates/right/friendRow.html',
    'marionette'
], function(App,$, _, Backbone,FriendCollection,FriendView,  template){

    var friendCollectionView =   Backbone.Marionette.CollectionView.extend( {

        initialize : function() {
            var self = this;
            this.collection = new FriendCollection();
            this.view = true;
            this.collection.fetch(

                {

                    //ktidc.instudio.kr
                    /**
                     * url 값이 있으면 server 에서 해당 url 값으로 api 서버를 바꾼다.
                     *
                     */
                    data:{url:'http://ktidc.instudio.kr:15000',uid:App.userModel.get('uid')},
                    success: function(model, response) {


                    }
                }
            );

            App.on('resize',function(type){

                switch (type) {
                    case 'off':
                        if (self.view === true) {
                            self.view = false;
                            $('#rightContent').hide();
                        }
                        break;
                    case 'on':
                        if (self.view === false) {
                            self.view = true;
                            $('#rightContent').show();
                        }
                        break;
                }

            });

        },
        tagName:'ul',
        attributes : function () {
            return {
                class :'media-list'

            };
        },
        itemView: FriendView,

    });
    return friendCollectionView;

});