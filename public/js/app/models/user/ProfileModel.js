define([

    'jquery',
    'underscore',
    'backbone',

], function($,_, Backbone) {

    var UserProfile = Backbone.Model.extend({
        url: '/profile/view',
        defaults: {
            isLogin: false,
            race: 'krab'
        } ,
        initialize : function() {


        } ,
        getProfile : function(callback) {
            this.fetch({
                data:{view_uid:this.get('uid')},
                success: function(model, response) {
                    callback();
                }
            })
        }
    });

    return UserProfile;

});