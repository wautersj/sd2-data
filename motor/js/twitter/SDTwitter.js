var SDTwitter = function(options){
	var that = this;

	this.ready = true;
	this.config = options;
	this.id = 'SD2-' + this.config.appName + '-' + this.config.type;
}

SDTwitter.prototype = {
	call: function(options, callback){
		options = (options) ? options : {};

		var api = '../../motor/php/twitter_search.php';

		$.post(api,{
			consumerKey: this.config.consumerKey,
			consumerSecret: this.config.consumerSecret,
			accessToken: this.config.accessToken,
			accessTokenSecret: this.config.accessTokenSecret,

			count: 10,
			q: options.query
		},callback);
	}
}