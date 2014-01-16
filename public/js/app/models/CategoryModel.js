define([
    'globals',
    'jquery',
    'underscore',
    'backbone',

], function(Globals,$,_, Backbone) {

    var CategoryModel = Backbone.Model.extend({
        url: '/category',
        //idAttribute:'_id',
        defaults: {

        },
        initialize : function() {

        },


        isEmpty : function() {

        },

        errorMessage : function(message){
            this.controller.trigger('errorMessage',{'message':message});
        },
        getCategory : function(cate) {

            this.fetch({
                data:{cate:cate},
                success: function(model, response) {


                }
            })
        }

    });

    return CategoryModel;

});
