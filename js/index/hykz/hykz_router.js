define(function(require) {
	var Mn = require("marionette");
	var HcddtRoute = require("web/index/hykz/hcddt/hcddt_route");
	var TjhcRoute = require("web/index/hykz/tjhc/tjhc_route");
	var SpjzRoute = require("web/index/hykz/spjz/spjz_route");
	var DhmRoute = require("web/index/hykz/dhm/dhm_route");
	
	var HykzRouter = Mn.AppRouter.extend({
		initialize: function(options) {
			this.container = options.container;
		},
		
		routes: {
			"hykz": "hcddt",
			"hykz/hcddt": "hcddt",
			"hykz/tjhc": "tjhc",
			"hykz/spjz": "spjz",
			"hykz/dhm": "dhm",
			"hykz/ypclq": "ypclq"
		},
		
		hcddt: function() {
			new HcddtRoute({
				container: this.container
			});
		},
		
		tjhc: function() {
			new TjhcRoute({
				container: this.container
			});
		},
		
		spjz: function() {
			new SpjzRoute({
				container: this.container
			});
		},
		
		dhm: function() {
			new DhmRoute({
				container: this.container
			});
		},
		
		ypclq: function() {
			
		}
	});
	
	return HykzRouter;
});