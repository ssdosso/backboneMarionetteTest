require.config({
    baseUrl:"/js/app",
    waitSeconds: 200,
    // 3rd party script alias names (Easier to type "jquery" than "libs/jquery, etc")
    // probably a good idea to keep version numbers in the file names for updates checking
//    packages: ['core'],
    paths:{
        // Core Libraries
        "jquery":"../libs/jquery",
        "jquery.ui.widget" :"../libs/jquery.ui.widget",
        "jquerymobile":"../libs/jquery.mobile",
        "underscore":"../libs/underscore",
        "backbone":"../libs/backbone",
        "marionette":"../libs/backbone.marionette",
        "blueark": "../libs/backbone.blueark",
        "handlebars":"../libs/handlebars",
        "hbs":"../libs/hbs",
        "i18nprecompile":"../libs/i18nprecompile",
        "json2":"../libs/json2",
        "jasmine": "../libs/jasmine",
        "jasmine-html": "../libs/jasmine-html",
        'jquery-cookie': '../libs/jquery.cookie',
        "backbone.validateAll":"../libs/plugins/Backbone.validateAll",
        "load-image":"../upload/load-image",
        "jquery.fileupload": "../upload/jquery.fileupload",
        "bootstrap":"../libs/plugins/bootstrap",
        "modalmanager":"../libs/plugins/bootstrap-modalmanager",
        "jasminejquery": "../libs/plugins/jasmine-jquery",
        "text":"../libs/plugins/text"
    },
    shim:{
        "bootstrap":["jquery"],

        "jquery-cookie":["jquery"],
        "jquery.ui.widget":{
            "deps": ["jquery"] ,
            "exports": "jquery.ui.widget"
        },


        "modalmanager": {
            "deps":["jquery"],
            "exports": "modalmanager"
        },
        "underscore" :{
            "deps":["jquery"],
            "exports":"_"
        },
        "backbone":{
            "deps":["underscore", "jquery"],
            "exports":"Backbone"
        },
        "marionette":{
            "deps":["underscore", "backbone", "jquery"],
            "exports":"Marionette"
        },
        "blueark":{
            "deps":["underscore", "backbone", "jquery","marionette"],
            "exports":"Blueark"
        },
        //Handlebars
        "handlebars":{
            "exports":"Handlebars"
        },
        // Backbone.validateAll plugin that depends on Backbone
        "backbone.validateAll":["backbone"],

        "jasmine": {
            // Exports the global 'window.jasmine' object
            "exports": "jasmine"
        },

        "jasmine-html": {
            "deps": ["jasmine"],
            "exports": "jasmine"
        }
    },
    // hbs config - must duplicate in Gruntfile.js Require build
    hbs: {
        templateExtension: "html",
        helperDirectory: "templates/helpers/",
        i18nDirectory: "templates/i18n/",

        compileOptions: {}        // options object which is passed to Handlebars compiler
    }
});


require(['js/DesktopInit.min'], function(){



});

