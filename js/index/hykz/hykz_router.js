define(function(require) {
	var Mn = require("marionette");
	var HcddtRoute = require("web/index/hykz/hcddt/hcddt_route");
	
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
			"hykz/spjz(/:id)": "spjz",
			"hykz/dhm(/:id)": "dhm",
			"hykz/ypclq": "ypclq"
		},
		
		hcddt: function() {
			new HcddtRoute({
				container: this.container
			});
		},
		
		tjhc: function() {
			
		},
		
		spjz: function(id) {
			new SpjzRoute({
				container: this.container,
				id: id
			});
		},
		
		dhm: function(id) {
			new DhmRoute({
				container: this.container,
				id: id
			});
		},
		
		ypclq: function() {
			
		}
	});
	
	return HykzRouter;
});