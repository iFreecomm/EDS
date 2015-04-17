define(function(require) {
	var $ = require("jquery");
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/pz/navLeft/navLeft_view");
	var YppzView = require("web/index/pz/yppz/yppz_view");
	
	var YppzModel = require("web/index/pz/yppz/yppz_model");

	var YppzRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			this.yppzModel = new YppzModel();
			
			$.getJSON("yppz_bdsr.psp").done(function(lxrs) {
				self.templateHelpers = lxrs;
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new YppzView({
					model: this.yppzModel,
					templateHelpers: this.templateHelpers
				})
			});
		}
	});
	
	return YppzRoute;
});