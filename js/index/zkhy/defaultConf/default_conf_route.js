define(function(require) {
	var $ = require("jquery");
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/zkhy/navLeft/navLeft_view");
	var DefaultConfView = require("web/index/zkhy/defaultConf/default_conf_view");
	
	var DefaultConfRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			
			$.when(
				$.getJSON("getMeeting.psp"),
				
				$.getJSON("getDefBeginMeetingCfg.psp")
			).done(function(meeting, defaultConf) {
				self.meetingList = [];
				if(meeting[0].data && meeting[0].data.meetingList)
				{
					self.meetingList = meeting[0].data.meetingList;
				}
				
				self.meetingId = defaultConf[0].data.meetingId;
				
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new DefaultConfView({
					meetingId: this.meetingId,
					templateHelpers: {
						meetingList: this.meetingList
					}
				})
			});
		}
	});
	
	return DefaultConfRoute;
});