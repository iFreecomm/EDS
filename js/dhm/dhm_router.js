define(function(require) {
	var Mn = require("marionette");
	var DhmView = require("web/index/zkhy/hymb/hymb_add_dhm_view");
	
	var DhmModel = require("web/dhm/dhm_model");
	
	var DhmRouter = Mn.AppRouter.extend({
		initialize: function(options) {
			this.container = options.container;
		},
		
		routes: {
			"dhm": "dhm"
		},
		
		dhm: function() {
			var self = this;
			this.dhmModel = new DhmModel();
			
			$.when(
				$.getJSON("getAllAddrBook.psp")//所有联系人
//				this.dhmModel.myFetch(options)
			).done(function(allLxr) {
				self.container.show(new DhmView({
					model: self.dhmModel,
					allLxr: allLxr.data.bookInfo
				}));
			});
		}
	});
	
	return DhmRouter;
});