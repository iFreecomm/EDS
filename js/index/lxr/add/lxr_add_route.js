define(function(require) {
	var $ = require("jquery");
	var Route = require("web/common/route");
	
	var LxrAddView = require("web/index/lxr/add/lxr_add_view");
	var LxrModel = require("web/index/lxr/lxr_model");

	var LxrAddRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			this.lxrModel = new LxrModel();
			
			$.when(
				$.getJSON("getMicPort.psp"),
				$.getJSON("getSdiPort.psp"),
				this.lxrModel.myFetch(options)
			).done(function(camMic,sdiInfo) {
				self.micInfo = [];
				if(camMic[0].data && camMic[0].data.micInfo)
				{
					self.micInfo = camMic[0].data.micInfo;
				}
				self.sdiInfo = [];
				if(sdiInfo[0].data && sdiInfo[0].data.sdiInfo)
				{
					self.sdiInfo = sdiInfo[0].data.sdiInfo;
				}
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				contentRightView: new LxrAddView({
					model: this.lxrModel,
					templateHelpers:{
						micInfo:this.micInfo,
						sdiInfo:this.sdiInfo
					}
				})
			});
		}
	});
	
	return LxrAddRoute;
});