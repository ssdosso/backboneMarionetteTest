define(['App','jquery', 'text!templates/sidebar/sidebar.html', 'backbone','models/user/UserModel', 'marionette'],
    function (App,$, template, Backbone,userModel) {
        //ItemView provides some default rendering logic

        return Backbone.Marionette.ItemView.extend({

            template:function(){

                return _.template( template, {user:App.userModel} );

            },
            attributes : function () {
                return {
                    class :'navbar-content'

                };
            },
            initialize: function() {
                var scope = this;

                App.userModel.on('change:isLogin', function(model){
                    scope.render();

                    if( model.get('isLogin') === true) {
                      //  App.appRouter.navigate('/',true);
                    } else {

                    }
                });
                //id="sidebar-left" class="col-lg-2 col-sm-1 "
                this.on('show',function() {

                });
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

