define(['backbone', 'marionette','blueark'], function(Backbone, Marionette,Blueark) {

    return Backbone.Blueark.AppRouter.extend({
       //"index" must be a method in AppRouter's controller

       appRoutes: {
           "": "index",
            "who":"showWho",
           "portfolio":"showPortfolio",
           'about': 'showAbout' ,
           'signup': 'showSignup',

           'logout':'showLogout',
           'login': 'showLogin',
           'game' :'showGame',
           "game/:game" : 'gamePlay',

//           // Default   1111
//           '*actions': 'index'
       }
   });
});