Backbone.Blueark = (function(Backbone,Marionette, _, $) {
    var Blueark = {};


    Blueark.Application = function(options){
        Marionette.Application.prototype.constructor.apply(this, arguments);

    };

    _.extend(Blueark.Application.prototype,Marionette.Application.prototype,  {

    });
    Blueark.Model =  Backbone.Model.extend({
        save: function(key, val, options) {

            var attrs, success, method, xhr, attributes = this.attributes;

            // Handle both `"key", value` and `{key: value}` -style arguments.
            if (key == null || typeof key === 'object') {
                attrs = key;
                options = val;
            } else {
                (attrs = {})[key] = val;
            }

            // If we're not waiting and attributes exist, save acts as `set(attr).save(null, opts)`.
            if (attrs && (!options || !options.wait) && !this.set(attrs, options)) return false;

            options = _.extend({validate: true}, options);

            // Do not persist invalid models.
            if (!this._validate(attrs, options)) return false;

            // Set temporary attributes if `{wait: true}`.
            if (attrs && options.wait) {
                this.attributes = _.extend({}, attributes, attrs);
            }

            // After a successful server-side save, the client is (optionally)
            // updated with the server-side state.
            if (options.parse === void 0) options.parse = true;
            success = options.success;
            options.success = function(model, resp, options) {
                // Ensure attributes are restored during synchronous saves.
                model.attributes = attributes;
                var serverAttrs = model.parse(resp, options);
                if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
                if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
                    return false;
                }
                if (success) {

                    success(model, resp, options);
                }
            };

            // Finish configuring and sending the Ajax request.
            method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
            if (method === 'patch') options.attrs = attrs;
            xhr = this.sync(method, this, options);

            // Restore attributes.
            if (attrs && options.wait) this.attributes = attributes;

            return xhr;
        }
    });
    Blueark.AppRouter = Marionette.AppRouter.extend({
        constructor : function(options)  {
            Marionette.AppRouter.prototype.constructor.apply(this,arguments);
        },
        route: function(route, name, callback,controller) {

            if (!_.isRegExp(route)) route = this._routeToRegExp(route);
            if (!callback) callback = this[name];
            Backbone.history.route(route, _.bind(function(fragment) {
                if(controller.permissionCheck(route,fragment)) {
                    var args = this._extractParameters(route, fragment);
                    callback && callback.apply(this, args);
                    this.trigger.apply(this, ['route:' + name].concat(args));
                    this.trigger('route', name, args);
                    Backbone.history.trigger('route', this, name, args);
                }

            }, this));
            return this;
        },
        processAppRoutes: function(controller, appRoutes) {
            var method, methodName;
            var route, routesLength, i;
            var routes = [];
            var router = this;


            for(route in appRoutes){
                if (appRoutes.hasOwnProperty(route)){
                    routes.unshift([route, appRoutes[route]]);
                }
            }



            routesLength = routes.length;
            for (i = 0; i < routesLength; i++){
                route = routes[i][0];
                methodName = routes[i][1];
                method = controller[methodName];

                if (!method){
                    var msg = "Method '" + methodName + "' was not found on the controller";
                    var err = new Error(msg);
                    err.name = "NoMethodError";
                    throw err;
                }

                method = _.bind(method, controller);

                router.route(route, methodName, method,controller);
            }
        }
    });


    return Blueark;
})(Backbone,Backbone.Marionette, _, window.jQuery);
//
