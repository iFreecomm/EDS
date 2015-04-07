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
				$.getJSON("getCamMic.psp"),
				this.lxrModel.myFetch(options)
			).done(function(camMic) {
				self.templateHelpers = camMic[0].data;
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				contentRightView: new LxrAddView({
					model: this.lxrModel,
					templateHelpers: this.templateHelpers
				})
			});
		}
	});
	
	return LxrAddRoute;
});