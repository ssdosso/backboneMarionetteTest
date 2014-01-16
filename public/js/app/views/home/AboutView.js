


define( ['App', 'backbone', 'marionette', 'jquery','text!templates/home/aboutTemplate.html'],
    function(App, Backbone, Marionette, $, template) {
        //ItemView provides some default rendering logic
        return Backbone.Marionette.ItemView.extend( {
            template: function(){

                return template;
            },
            //template :template,
            initialize : function() {


                this.on('show',function(){
                    $('.nav li').removeClass('active');
                    $('.nav li a[href="'+window.location.pathname+'"]').parent().addClass('active');
                });
            },


            events: {

            }
        });
    });