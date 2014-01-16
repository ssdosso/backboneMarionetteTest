define([
    'App',
    'jquery',
    'underscore',
    'backbone',
    'text!templates/game/gamePlayTemplate.html',
    'marionette',
    'http://webplayer.unity3d.com/download_webplayer-3.x/3.0/uo/UnityObject.js'
    //   'http://webplayer.unity3d.com/download_webplayer-3.x/3.0/uo/UnityObject2.js'
], function(App,$, _, Backbone,  template){




    return Backbone.Marionette.ItemView.extend( {

//        template: function(){
//            return template;
//        },
        events: {
            'click a': 'onTopNavigation'
        },
        onBeforeRender : function() {
            var self = this;
            this.template = function() {
                return _.template(template,{game:self.game})
            }

        },
        onTopNavigation: function(e) {
            e.preventDefault();

            var targetUrl = e.currentTarget.href.split(window.location.host),
                targetHref =  targetUrl.pop();

            Backbone.history.navigate(targetHref,true);

        },
        initialize : function(options) {
            var self = this;
            this.game = options.game;
            this.on('show',function(){
                $('.nav li').removeClass('active');
                $('.nav li a[href="'+window.location.pathname+'"]').parent().addClass('active');
                self._onRender();
            });
        } ,
        attributes : function() {
            return {
                class :'gameBody'
            }
        },
        _onRender: function() {
            var self = this;
            function GetUnity() {
                if (typeof unityObject != "undefined") {
                    return unityObject.getObjectById("unityPlayer");
                }
                return null;
            }

            var gamePath='http://ktidc.instudio.kr',
                configData = {
                    backgroundcolor: "57cbf7",
                    bordercolor: "57cbf7",
                    textcolor: "FFFFFF",
                    logoimage: gamePath+"/WebPlayer/imgs/titlelogo.png",
                    progressbarimage: gamePath+"/WebPlayer/imgs/bar_filled.png",
                    progressframeimage: gamePath+"/WebPlayer/imgs/bar_empty.png",
                    disableContextMenu: true,

                };
            // gamePath ='../';
            Global.WebLoadStart = function()
            {


                var params = 'first_scene='+self.game;

                //  var params = 'first_scene=farm';
                params +='&id='+App.userModel.get('uid');
                params +='&path='+gamePath;
                params +='&otp='+App.userModel.get('session_id');
                params +='&name='+App.userModel.get('username');

                params +='&language=kor';

                GetUnity().SendMessage( "ScriptLoader", "LoadOTP", params );
            }
            Global.EndLoading= function()
            {

//                 var $url = "Loading?STATE=end&KEY="+App.userModel.get('uid');
//                 $.ajaxSetup({
//                     url : $url,
//                     Global: false,
//                     type: "GET"
//                 });
//                 $.ajax(	{ state:"end"} ).done(
//                     function($data)
//                     {
//
//                     }
//                 );
            }


            Global.StartLoading = function()
            {


//                 var $url = "Loading?STATE=start&KEY="+App.userModel.get('uid');
//                 $.ajaxSetup({
//                     url : $url,
//                     Global: false,
//                     type: "GET"
//                 });
//                 $.ajax(	{ state:"start"} ).done(
//                     function($data)
//                     {
//                     }
//                 );
            }

            if (typeof unityObject != "undefined") {
                // StartLoading();
                unityObject.embedUnity("unityPlayer", gamePath+"/WebPlayer/WebPlayer.unity3d", 944, 590,configData);

            }

        }

    });

});
