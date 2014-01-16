define( ['App', 'backbone', 'marionette', 'jquery', 'models/Model',   'text!templates/user/loginTemplate.html'],
    function(App, Backbone, Marionette, $, Model, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: template,
            model: new Model({
                mobile: App.mobile
            }),
            initialize : function() {

            },
            // View Event Handlers
            events: {

            }
        });
    });