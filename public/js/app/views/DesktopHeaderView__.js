define(['jquery', 'hbs!templates/desktopHeader', 'backbone', 'marionette'],
    function ($, template, Backbone) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend({
            template:template ,

            events: {
                'click': 'rowClicked'
            },
              onALink: function(e,t) {
                  console.log('1111')
    //              e.preventDefault();
    //              var newBaseURL = e.currentTarget.href.split('/');
    //              var t = newBaseURL.pop();
    //              Backbone.history.navigate('#'+t,true);
              }

        });
    });