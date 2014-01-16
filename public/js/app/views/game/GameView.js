define([
    'App',
    'jquery',
    'underscore',
    'backbone',
    'text!templates/game/gameTemplate.html',
    'marionette'
], function(App,$, _, Backbone,  template){
    return Backbone.Marionette.ItemView.extend( {
        template: function(){

            return template;
        },
        initialize : function() {

            if ($(window).width() < 1700) {
                App.trigger('resize','off');
            }
            this.on('show',function(){
                $('.nav li').removeClass('active');
                $('.nav li a[href="'+window.location.pathname+'"]').parent().addClass('active');

                $(window).resize(function(e) {

                    if (1700 > $(window).width() ) {
                        App.trigger('resize','off');
                    }  else {
                        App.trigger('resize','on');
                    }

                });
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
