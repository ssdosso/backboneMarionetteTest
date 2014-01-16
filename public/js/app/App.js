define(['globals',
    'jquery',
    'backbone',
    'marionette',
    'blueark',
    'underscore',
    'handlebars',
    'models/user/AdminUserModel',
    'models/etc/ErrorModel',
    "jquery-cookie" , 'fullcalendar', "bootstrap", "backbone.validateAll",'placeholder','daterangepicker',
    "jquery-ui",
    "jquery.blockUI",
    "jquery.icheck",
    "jquery.mousewheel",
    "perfect-scrollbar",
    "less",
    "bootstrap-colorpalette"
    ],
    function (globals,$, Backbone, Marionette,Blueark, _, Handlebars,UserModel,ErrorModel) {
        var App = new Backbone.Blueark.Application();

        function isMobile() {
            var userAgent = navigator.userAgent || navigator.vendor || window.opera;
            return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
        }

        //Organize Application into regions corresponding to DOM elements
        //Regions can contain views, Layouts, or subregions nested as necessary
        App.addRegions({
            headerRegion:"header",
            mainRegion:"main",
            errorRegion:"message" ,
            rightRegion:"#rightContent",
            leftRegion: "nav"

        });


        App.addInitializer(function () {

            $.cookie.json = true;
            Backbone.history.start({pushState: true});
        });

        App.mobile = isMobile();

        return App;
    });