define(function(require) {
	var $ = require("jquery");
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/hykz/navLeft/navLeft_view");
	
	var TjhcView = require("web/index/hykz/tjhc/tjhc_view");
	
	var HymbAddYhzView = require("web/index/zkhy/hymb/hymb_add_yhz_view");
	
	var TjhcModel = require("web/index/hykz/tjhc/tjhc_model");

	var TjhcRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			this.tjhcModel = new TjhcModel();
			
			$.when(
				$.getJSON("getAllAddrBook.psp"),//所有联系人
				
				$.getJSON("getVenueCfg.psp"),//会场
				this.tjhcModel.fetch()
			).done(function(allLxr,venue) {
				var venueId = [];
				if(venue && venue[0].data && venue[0].data.venueId)
				{
					venueId = venue[0].data.venueId;
				}
				self.tjhcModel.set({
					"venueId": venueId
				});
				
				self.allLxr = allLxr[0].data.bookInfo;
				
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new TjhcView({
					model: this.tjhcModel
				}),
				hykzHymbAddYhzView: new HymbAddYhzView({
					model: this.tjhcModel,
					allLxr: this.allLxr
				}),
			});
		}
	});
	
	return TjhcRoute;
});