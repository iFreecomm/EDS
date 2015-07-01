define(function(require) {
	var $ = require("jquery");
	var Route = require("web/common/route");
	
	var NavLeftView = require("../navLeft/navLeft_view");
	var SpsrView = require("./spsr_view");

	var SpsrRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			
			$.when(
				$.getJSON("getSdiPort.psp"),
				
				$.getJSON("getVgaPort.psp")
			).done(function(sdi,vga) {
				self.SDI = [];
				if(sdi[0].data && sdi[0].data.sdiInfo)
				{
					self.SDI = sdi[0].data.sdiInfo;
				}
				
				self.VGA = [];
				if(vga[0].data && vga[0].data.vgaInfo)
				{
					self.VGA = vga[0].data.vgaInfo;
				}
				
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new SpsrView({
					templateHelpers: {
						SDI: this.SDI,
						VGA: this.VGA
					}
				})
			});
		}
	});
	
	return SpsrRoute;
});