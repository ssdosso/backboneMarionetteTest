var GLOBAL = this;
define([
    'configure',
    'underscore'
], function(config) {


    var globals = CFG;
    _.extend(globals, config);

    globals.global = GLOBAL;
    return globals;

});