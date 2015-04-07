define(function(require) {
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/pz/navLeft/navLeft_view");
	var WlszView = require("web/index/pz/wlsz/wlsz_view");

	var Wk1Model = require("web/index/pz/wlsz/wk1/wk1_model");
	var Wk1View = require("web/index/pz/wlsz/wk1/wk1_view");

	var WlszRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			
			this.wk1Model = new Wk1Model();
			this.wk1Model.fetch().done(function() {
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new WlszView(),
				pzWlszWk1View: new Wk1View({
					model: this.wk1Model
				})
			});
		}
	});
	
	return WlszRoute;
});