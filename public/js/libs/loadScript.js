(function(ua, w, d, undefined) {

    // App Environment
    // ---------------
    //  Tip: Set to true to turn on "production" mode
    var
        filesToLoad,
    //BoilerplateMVC Helper Methods
        boilerplateMVC = {
            loadCSS: function(url, callback) {
                var link = d.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = url;
                d.getElementsByTagName("head")[0].appendChild(link);
                if(callback) {
                    callback();
                }
            },
            loadJS: function(file, callback) {
                var script = d.createElement("script");
                script.type = "text/javascript";
                if (script.readyState) {  // IE
                    script.onreadystatechange = function() {
                        if (script.readyState == "loaded" || script.readyState == "complete") {
                            script.onreadystatechange = null;
                            callback();
                        }
                    };
                } else {  // Other Browsers
                    script.onload = function() {
                        callback();
                    };
                }
                if(((typeof file).toLowerCase()) === "object" && file["data-main"] !== undefined) {
                    script.setAttribute("data-main", file["data-main"]);
                    script.async = true;
                    script.src = file.src;
                } else {
                    script.src = file;
                }
                d.getElementsByTagName("head")[0].appendChild(script);
            },
            loadFiles: function(production, obj, callback) {
                var self = this;
                    var length = obj["prod-css"].length - 1;
                    function _loadCss() {
                        if (length !== -1) {
                            self.loadCSS(obj["prod-css"][length], function() {
                                length--;
                                _loadCss();
                            });
                        } else {
                            if(obj["prod-js"]) {
                                self.loadJS(obj["prod-js"], callback);
                            }
                        }

                    }
                    _loadCss();


            }
        };

    // Mobile/Tablet Logic
    if((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(ua)) {

        // Desktop CSS and JavaScript files to load
        filesToLoad = {
            // CSS file that is loaded when in development mode
            "dev-css": ["/css/game.css","/css/bootstrap-modal.css","/css/bootstrap-responsive.css","/css/bootstrap.css"],
            // CSS file that is loaded when in production mode
            "prod-css":["/css/game.css","/css/bootstrap-modal.css","/css/bootstrap-responsive.css","/css/bootstrap.css"],
            // Require.js configuration file that is also loaded when in development mode
            "dev-js": { "data-main": "/js/app/config/config.js", "src": "/js/libs/require.js" },
            // JavaScript initialization file that is loaded when in development mode
//                      "dev-init": "js/app/init/DesktopInit.js",
            "dev-init": "/js/app/DesktopInit.js",
            // JavaScript file that is loaded when in production mode
            "prod-init": "/js/DesktopInit.min.js",
            "prod-js": { "data-main": "/js/app/config/config.js", "src": "/js/libs/require.js" }
        };

    }

    // Desktop Logic
    else {

        // Desktop CSS and JavaScript files to load
        filesToLoad = {
            // CSS file that is loaded when in development mode
            "dev-css": ["/css/game.css","/css/bootstrap-modal.css","/css/bootstrap-responsive.css","/css/bootstrap.css"],
            // CSS file that is loaded when in production mode
            "prod-css":["/css/game.css","/css/bootstrap-modal.css","/css/bootstrap-responsive.css","/css/bootstrap.css"],
            // Require.js configuration file that is also loaded when in development mode
            "dev-js": { "data-main": "/js/app/config/config.js", "src": "/js/libs/require.js" },
            // JavaScript initialization file that is loaded when in development mode
//                      "dev-init": "js/app/init/DesktopInit.js",
            "dev-init": "/js/app/DesktopInit.js",
            // JavaScript file that is loaded when in production mode
            "prod-init": "/js/DesktopInit.min.js",
            "prod-js": { "data-main": "/js/app/config/config.js", "src": "/js/libs/require.js" }
        };

    }
//
    boilerplateMVC.loadFiles(production, filesToLoad, function() {
        var checkTime =  setInterval(function() {
            if (require !== undefined) {
                require([filesToLoad["prod-init"]])
                clearInterval(checkTime);
            }
        },200);

    });

})(navigator.userAgent || navigator.vendor || window.opera, window, document);