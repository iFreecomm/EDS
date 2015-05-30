define(function(require) {
	var Route = require("web/common/route");
	
	var LxrShowView = require("web/index/lxr/show/lxr_show_view");
	var LxrCollection = require("web/index/lxr/lxr_collection");

	var LxrShowRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			this.lxrCollection = new LxrCollection();
		/*	$.when(
				$.getJSON("getSdiPort.psp"),
				this.lxrCollection.fetch()
			).done(function(sdiInfo) {
				self.sdiInfo = [];
				if(sdiInfo[0].data && sdiInfo[0].data.sdiInfo)
				{
					self.sdiInfo = sdiInfo[0].data.sdiInfo;
				}
				self.showView();
			});*/
			
			this.lxrCollection.fetch().done(function() {
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				contentRightView: new LxrShowView({
					collection: this.lxrCollection,
					templateHelpers:{
						sdiInfo:this.sdiInfo
					}
				})
			});
		}
	});
	
	return LxrShowRoute;
});