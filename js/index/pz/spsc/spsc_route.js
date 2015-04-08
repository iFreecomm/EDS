define(function(require) {
	var $ = require("jquery");
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/pz/navLeft/navLeft_view");
	var SpscView = require("web/index/pz/spsc/spsc_view");
	
	var SpscModel = require("web/index/pz/spsc/spsc_model");

	var SpscRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			this.spscModel = new SpscModel();
			
			$.getJSON("spsc_lxr.psp").done(function(lxrs) {
				self.templateHelpers = lxrs;
				
				$.when(self.spscModel.myFetch({
					id: lxrs[0].recordId
				})).done(function() {
					self.showView();
				});
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new SpscView({
					model: this.spscModel,
					templateHelpers: {
						VGA: this.templateHelpers
					}
				})
			});
		}
	});
	
	return SpscRoute;
});