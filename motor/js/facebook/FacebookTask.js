var FacebookTask = function(options){
	this.options = options ? options : {};
	this.api = options.api;

	this.init();
}

FacebookTask.prototype = {
	init: function(){
		var that = this;

		//create view
		this.$el = $(that.template(that.options));
		this.$el.show();

		//append view
		$('body').append(this.$el);

		
		this.setStatusView('waiting');
		this.setStatusTest('preparing');

		this.intervaller = setInterval(function(){
			if(that.api.ready===true){
				
				that.api.call(that.options, function(json, status){
					//todo: if json validates
					if(json.hasOwnProperty('error')){
						that.api.ready = false;

						that.setStatusView('offline');
						that.setStatusTest('offline');

						console.info('Unable to load Facebook task data.');
						console.info('App will restart in 10 seconds.');
						var refresher = setTimeout(function(){
							window.location = window.location.href;
						},10000);
					} else {
						that.saveData(json);					
						that.setStatusView('online');

						var hours = (new Date()).getHours();
						var minutes = (new Date()).getMinutes();

						hours = (String(hours).length==2) ? hours : '0' + hours;
						minutes = (String(minutes).length==2) ? minutes : '0' + minutes;

						that.setStatusTest(hours + ':' + minutes);
					}
				});
			} else {
				if(that.$el.find('.status').hasClass('waiting')){
					that.setStatusView('offline');
					that.setStatusTest('offline');

					console.info('Unable to load Facebook task data.');
				}
			}
		}, this.options.interval*1000);
	},

	setStatusView: function(toStatus){
		var $status = this.$el.find('.status');
		var hadClass = $status.hasClass(toStatus);

		$status.removeClass('offline');
		$status.removeClass('waiting');
		$status.removeClass('online');

		$status.addClass(toStatus);

		if(!hadClass){
			$status.hide().fadeIn();
		}
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
		   // console.info('SD2:save completed - ' + that.options.file);
		});	
	},

	template: function(options){
		var el = '<div class="white facebook platform wrapper">';
		el += '<div class="status offline"></div>';
		el += '<span class="last-update">';
		el += 'Offline';
		el += '</span>';
		el += '<span class="task-name">' + options.name + '</span>';
		el += '</div>';
		return el;
	}
}