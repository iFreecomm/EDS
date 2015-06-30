define(function(require) {
	var $ = require("jquery");
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/hykz/navLeft/navLeft_view");
	
	var DhmView = require("web/index/hykz/dhm/dhm_view");
	
	var HymbAddDhmView = require("web/index/zkhy/hymb/hymb_add_dhm_view");
	
	var DhmModel = require("web/index/hykz/dhm/dhm_model");

	var DhmRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			this.dhmModel = new DhmModel();
			
			$.when(
				$.getJSON("getAllAddrBook.psp"),//所有联系人
				
				$.getJSON("getVenueCfg.psp"),//会场
				$.getJSON("getMeetingSecVidInfo.psp"),//是否支持辅流
				this.dhmModel.fetch()
			).done(function(allLxr,venue,secVid) {
				var venueId = [];
				if(venue && venue[0].data && venue[0].data.venueId)
				{
					venueId = venue[0].data.venueId;
				}
				self.dhmModel.set({
					"venueId": venueId
				});
				
				if(secVid && secVid[0].data && secVid[0].data.supportSecVid)
				{
					self.dhmModel.set({
						"secVidFlag": secVid[0].data.supportSecVid
					});
				}
				
				self.allLxr = allLxr[0].data.bookInfo;
				
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new DhmView({
					model: this.dhmModel
				}),
				hykzHymbAddDhmView: new HymbAddDhmView({
					model: this.dhmModel,
					allLxr: this.allLxr
				}),
			});
		}
	});
	
	return DhmRoute;
});