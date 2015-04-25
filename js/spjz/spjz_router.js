define(function(require) {
	var Mn = require("marionette");
	var SpjzView = require("web/index/zkhy/hymb/hymb_add_spjz_view");
	
	var SpjzModel = require("web/spjz/spjz_model");
	
	var SpjzRouter = Mn.AppRouter.extend({
		initialize: function(options) {
			this.container = options.container;
		},
		
		routes: {
			"spjz": "spjz"
		},
		
		spjz: function() {
			var self = this;
			this.spjzModel = new SpjzModel();
			
			$.when(
				$.getJSON("getAllAddrBook.psp"),//所有联系人
				$.getJSON("getVidOutPort_VMatrix.psp")//视频输出端口
//				this.spjzModel.myFetch(options)
			).done(function(allLxr, outPort) {
				self.container.show(new SpjzView({
					model: self.spjzModel,
					allLxr: allLxr[0].data.bookInfo,
					dviArr: outPort[0].data.outPortInfo
				}));
			});
		}
	});
	
	return SpjzRouter;
});