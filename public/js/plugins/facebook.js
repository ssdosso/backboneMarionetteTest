// Filename: app.js
// <script src="js/plugins/facebook.js"></script>


window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
        appId      : cfg.fbid,                       // App ID from the app dashboard
       // channelUrl : '//WWW.YOUR_DOMAIN.COM/channel.html', // Channel file for x-domain comms
        status     : true,                                 // Check Facebook Login status
        xfbml      : true                                  // Look for social plugins on the page
    });

};
(function(d){
    var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
    js = d.createElement('script'); js.id = id; js.async = true;
    js.src = "//connect.facebook.net/es_LA/all.js";
    d.getElementsByTagName('head')[0].appendChild(js);
}(document));