define([
    'App',
    'jquery',
    'underscore',
    'backbone',
    'text!templates/user/loginTemplate.html'
], function(App,$, _, Backbone,  template){


    //var contributorsListView;

    return Backbone.Marionette.ItemView.extend( {

        initialize: function() {

            App.userModel.on('change:isLogin',function(model){

                if(model.get('isLogin') === true) {

                   // App.appRouter.navigate('/',true);
                }
            });
        },
        events: {
            'submit form':'onLogin',
        },

        onLogin: function(e) {


            var userField = {};

            $(e.currentTarget).find('input').each(function(){

                userField[$(this).attr('id')] = $(this).val();

            });

            if (!userField.userid) {
                App.trigger('errorMessage',{message:'아이디를 입력해주세요'});
                return false;
            }
            if (!userField.password) {
                App.trigger('errorMessage',{message:'패스워드를 입력해주세요'});
                return false;
            }

            App.userModel.signIn(userField);
            return false;
        },

        onRender: function() {

        },
        template: function(){
            return template;
        }
    });

});
