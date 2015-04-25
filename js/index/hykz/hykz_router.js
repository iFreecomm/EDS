define(function(require) {
	var Mn = require("marionette");
	var SpjzRoute = require("web/index/hykz/spjz/spjz_route");
	var DhmRoute = require("web/index/hykz/dhm/dhm_route");
	
	var HykzRouter = Mn.AppRouter.extend({
		initialize: function(options) {
			this.container = options.container;
		},
		
		routes: {
			"hykz": "spjz",
			"hykz/spjz": "spjz",
			"hykz/dhm": "dhm"
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
		}
	});
	
	return HykzRouter;
});