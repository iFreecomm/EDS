define(function(require) {
	var $ = require("jquery");
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/zkhy/navLeft/navLeft_view");
	var DefaultConfView = require("web/index/zkhy/defaultConf/default_conf_view");
	
	var DefaultConfModel = require("web/index/zkhy/defaultConf/default_conf_model");

	var DefaultConfRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			this.defaultConfModel = new DefaultConfModel();
			
			$.getJSON("getMeeting.psp").done(function(meeting) {
				self.meetingList = [];
				if(meeting.data && meeting.data.meetingList)
				{
					self.meetingList = meeting.data.meetingList;
				}
				
				$.when(
					self.defaultConfModel.fetch()
				).done(function() {
					self.showView();
				});
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new DefaultConfView({
					model: this.defaultConfModel,
					templateHelpers: {
						meetingList: this.meetingList
					}
				})
			});
		}
	});
	
	return DefaultConfRoute;
});