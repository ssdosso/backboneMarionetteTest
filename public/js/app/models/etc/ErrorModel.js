define([
   'App',
  'underscore',
  'backbone'
], function(App,_, Backbone) {

  var OwnerModel = Backbone.Model.extend({
      initialize: function( options ) {
          this.on('change:message',function(model){
          });
  		},
		url : function() {
	        return 'error';
	    }
    });

  	return OwnerModel;

});
