define(function(require) {
	var $ = require("jquery");
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/pz/navLeft/navLeft_view");
	var SpsrView = require("web/index/pz/spsr/spsr_view");

	var SpsrRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			
			$.getJSON("json/spsr_lxr.json").done(function(lxrs) {
				self.templateHelpers = lxrs;
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new SpsrView({
					templateHelpers: this.templateHelpers
				})
			});
		}
	});
	
	return SpsrRoute;
});