define(function(require) {
	var $ = require("jquery");
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/pz/navLeft/navLeft_view");
	var SpsrView = require("web/index/pz/spsr/spsr_view");
	
	var SpsrModel = require("web/index/pz/spsr/spsr_model");

	var SpsrRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			this.spsrModel = new SpsrModel();
			
			$.getJSON("spsr_lxr.psp").done(function(lxrs) {
				self.templateHelpers = lxrs;
				
				$.when(self.spsrModel.myFetch({
					id: lxrs.SDI[0].recordId || lxrs.VGA[0].recordId
				})).done(function() {
					self.showView();
				});
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new SpsrView({
					model: this.spsrModel,
					templateHelpers: this.templateHelpers
				})
			});
		}
	});
	
	return SpsrRoute;
});