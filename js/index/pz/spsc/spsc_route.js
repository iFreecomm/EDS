define(function(require) {
	var $ = require("jquery");
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/pz/navLeft/navLeft_view");
	var SpscView = require("web/index/pz/spsc/spsc_view");
	
	var SpscRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			
			$.getJSON("getVidOutPort.psp").done(function(vga) {
				self.VGA = [];
				if(vga.data && vga.data.outPortInfo)
				{
					self.VGA = vga.data.outPortInfo;
				}
				
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new SpscView({
					templateHelpers: {
						VGA: this.VGA
					}
				})
			});
		}
	});
	
	return SpscRoute;
});