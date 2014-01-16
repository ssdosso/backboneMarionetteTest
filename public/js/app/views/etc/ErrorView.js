define(['App','jquery', 'text!templates/etc/errorTemplate.html', 'backbone','models/etc/ErrorModel', 'marionette'],
    function (App,$, template, Backbone,errorModel) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:function(){

                return _.template( template, {error:App.errorModel} );

            },
            initialize: function() {
            }  ,
           resetMessage: function() {
               // this.$el.html('');
            }

        });
    });
//define([
//    'app',
//    'jquery',
//    'underscore',
//    'backbone',
//    'text!templates/etc/errorTemplate.html'
//], function(app,$, _, Backbone,  errorTemplateHtml){
//
//
//    //var contributorsListView;
//
//    var errorView = Backbone.Blueark.View.extend({
//        el: $("#message"),
//        initialize: function() {
//
//        },
//        render: function(){
//            var data = {
//                error: app.errorModel
//            };
//
//            var errorTemplate = _.template( errorTemplateHtml, data );
//            app.errorModel.clear();
//            this.$el.html( errorTemplate );
//
//
//        },
//        resetMessage: function() {
//            this.$el.html('');
//        }
//    });
//    return errorView;
//});
