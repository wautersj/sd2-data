var SDFacebook = function(options){
	var that = this;

	this.ready = false;
	this.config = options;
	this.id = 'SD2-' + this.config.appName + '-' + this.config.type;

	this.loadSDK();
	this.setup();
}

SDFacebook.prototype = {
	loadSDK: function(){
		// Load the SDK asynchronously
	    (function(d, s, id) {
	      var js, fjs = d.getElementsByTagName(s)[0];
	      if (d.getElementById(id)) return;
	      js = d.createElement(s); js.id = id;
	      js.src = "//connect.facebook.net/en_US/sdk.js";
	      fjs.parentNode.insertBefore(js, fjs);
	    }(document, 'script', 'facebook-jssdk'));
	},

	setup: function(){
		var that = this;
		window.fbAsyncInit = function() {
			FB.init({
				appId      : that.config.appId,
				cookie     : true,  // enable cookies to allow the server to access the session
				xfbml      : true,  // parse social plugins on this page
				version    : 'v2.1' // use version 2.1
			});

			that.checkStatus(function(isReady){
				that.ready = isReady;
			});
		};
	},

	checkStatus: function(callback){
		if(!FB){
			callback(false);
		} else {
			FB.getLoginStatus(function(response) {
		      if (response.status === 'connected') {
		      	callback(true);
		      } else {
		      	callback(false);
		      }
		    });
		}
	},

	call: function(options, callback){
		FB.api(options.query, function(response) {
			callback(response);
		});
	}
}