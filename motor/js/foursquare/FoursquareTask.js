var FoursquareTask = function(options){
	this.options = options ? options : {};
	this.api = options.api;

	this.init();
}

FoursquareTask.prototype = {
	init: function(){
		var that = this;

		//create view
		this.$el = $(that.template(that.options));
		this.$el.show();

		//append view
		$('body').append(this.$el);

		this.api.checkStatus(function(bool){
			if(bool===true){
				that.setStatusView('waiting');
				that.setStatusTest('preparing');
			}
		});

		this.intervaller = setInterval(function(){
			if(that.api.ready===true){
				that.api.call(that.options, function(json, status){
					//todo: if json validates
					if(json.hasOwnProperty('error')){
						that.api.ready = false;

						that.setStatusView('offline');
						that.setStatusTest('offline');

						console.info('Unable to load Foursquare task data.');
						console.info('App will restart in 10 seconds.');
						var refresher = setTimeout(function(){
							window.location = window.location.href;
						},10000);
					} else {
						that.saveData(json);
						that.setStatusView('online');

						var hours = (new Date()).getHours();
						var minutes = (new Date()).getMinutes()	;

						hours = (String(hours).length==2) ? hours : '0' + hours;
						minutes = (String(minutes).length==2) ? minutes : '0' + minutes;

						that.setStatusTest(hours + ':' + minutes);
					}
				});
			}
		}, this.options.interval*1000);
	},

	setStatusView: function(toStatus){
		var $status = this.$el.find('.status');

		$status.removeClass('offline');
		$status.removeClass('waiting');
		$status.removeClass('online');

		$status.addClass(toStatus);
		$status.hide().fadeIn();
	},

	setStatusTest: function(statusText){
		var $statusText = this.$el.find('.last-update');

		$statusText.html(statusText);
		$statusText.hide().fadeIn();
	},

	saveData: function(json){
		var that = this;
		var saver = '../../motor/php/sd2-save.php';
		var data = JSON.stringify(json);

		//console.info('SD2:saving to: ' + that.options.file);

		$.post(saver,{
			app: that.options.appName,
			type: that.options.type,
			file: that.options.file,
			data: data
		}, function(data, textStatus, xhr) {
		    //console.info('SD2:save completed - ' + that.options.file);
		});	
	},

	template: function(options){
		var authUrl = 'https://foursquare.com/oauth2/authenticate?client_id=';
		authUrl += options.api.config.clientID;
		authUrl += '&amp;response_type=token&amp;redirect_uri=';
		authUrl += options.api.config.redirectURI;

		var el = '<div class="white foursquare platform wrapper">';
		el += '<div class="status offline"></div>';
		el += '<span class="last-update">';
		el += '<a class="foursquare-login" href="' + authUrl + '">Authenticate</a>';
		el += '</span>';
		el += '<span class="task-name">' + options.name + '</span>';
		el += '</div>';
		return el;
	}
}