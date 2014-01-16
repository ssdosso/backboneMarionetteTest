define(['App','jquery', 'text!templates/header/desktopHeader.html', 'backbone','models/user/UserModel', 'marionette'],
    function (App,$, template, Backbone,userModel) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:function(){

               return _.template( template, {user:App.userModel} );

            },
            tagName:'div',
            initialize: function() {
                var scope = this;

                App.userModel.on('change:isLogin', function(model){
                    scope.render();
                    if( model.get('isLogin') === true) {

                        App.appRouter.navigate('/',true);
                    }
                });

                this.on('show',function() {

                    if ($(window).width() < 1100) {

                        $('#loginBtn').removeClass('pull-right');
                    }
                  $(window).resize(function(){
                      if (1170 > $(window).width() ) {
                          $('#loginBtn').removeClass('pull-right');
                      } else {
                          $('#loginBtn').addClass('pull-right')

                      }

                  });
                });
            },
            attributes : function () {
                return {
                    class :'navbar navbar-inverse navbar-fixed-top'

                };
            },
            events: {
                'click a': 'onTopNavigation'
            },
            onTopNavigation: function(e) {
                e.preventDefault();

                var targetUrl = e.currentTarget.href.split(window.location.host),
                    targetHref =  targetUrl.pop();

                Backbone.history.navigate(targetHref,true);

            }
        });
    });
//
//define([
//    'app',
//    'jquery',
//    'underscore',
//    'backbone',
//    'text!templates/header/top.html'
//], function(app,$, _, Backbone, topTemplate){
//
//    var HomeView = Backbone.Blueark.View.extend({
//        el: $("#toppage"),
//        initialize : function() {
//            //회원 로그인 시도가 일어 난다면..
//           var scope = this;
//          app.userModel.on('change:isLogin', function(model){
//              scope.render();
//
//              if( !model.get('isLogin')) {
//
//                   app.router.navigate('/',true);
//              }
//          });
//        },
//        render: function(){
//            var userModel=app.userModel,data = {
//                user: app.userModel
//            };
//            var topRenderTemplate = _.template( topTemplate, data );
//
//            this.$el.html(topRenderTemplate);
//          //  $('#signinFrm').submit(function() {
//            $('#userid').focus(function(){
//                   $(this).removeClass('errorA');
//            });
//
//
//        }
//
//    });
//
//    return HomeView;
//
//});
