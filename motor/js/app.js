var SD2 = function(options){
	options = options ? options : {};

	this.name = options.name ? options.name : 'application';
	this.refresh = (options.refresh) ? options.refresh : 10;

	this.facebook = null;
	this.twitter = null;
	this.foursquare = null;

	this.tasks = [];


	console.log('refresh: ' + this.refresh);
	console.info('App will refresh in ' + this.refresh + ' minutes.');
	var refresher = setTimeout(function(){
		window.location = window.location.href;
	},this.refresh*60*1000);
}

SD2.prototype = {
	registerAPI: function(options){
		options.appName = this.name;

		if(options.type=='facebook' && this.facebook==null){
			this.facebook = new SDFacebook(options);
		}

		if(options.type=='twitter' && this.twitter==null){
			this.twitter = new SDTwitter(options);
		}

		if(options.type=='foursquare' && this.foursquare==null){
			this.foursquare = new SDFoursquare(options);
		}
	},	

	registerTask: function(options){
		options.appName = this.name;
		options.api = this[options.type];

		if(options.api!==null){
			var task;

			if(options.type=='facebook'){
				task = new FacebookTask(options);
			}

			if(options.type=='twitter'){
				task = new TwitterTask(options);
			}

			if(options.type=='foursquare'){
				task = new FoursquareTask(options);
			}

			if(task){
				this.tasks.push(task);
			}
		}
	}	
}