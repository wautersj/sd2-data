var SDFoursquare = function(options){
	var that = this;

	this.ready = false;
	this.config = options;
	this.id = 'SD2-' + this.config.appName + '-' + this.config.type;

	this.checkStatus(function(){
		window.location.hash = '';
		that.ready = true;
	});
}

SDFoursquare.prototype = {
	checkStatus: function(callback){
		if(!localStorage[this.id]) {
			var ifAccess = window.location.hash.substr(1,12);
			if(ifAccess=='access_token'){
				localStorage[this.id] = window.location.hash.substr(14,window.location.hash.length-14);
				callback(true);
			} else {
				callback(false);
			}
		} else {
			callback(true);
		}
	},

	call: function(options, callback){
		var api = 'https://api.foursquare.com/v2';
		var token = localStorage[this.id];

		var auth = '?oauth_token=' + token;
		var call_version = '&v=20141109';

		var url = api + options.query + auth + call_version;

		$.getJSON(url, callback).error(function() {
			var error = {error: "Error loading Foursquare data!"}
			callback(error);
		});
	}
}