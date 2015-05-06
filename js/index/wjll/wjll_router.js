define(function(require) {
	var Mn = require("marionette");
	var WjllRoute = require("web/index/wjll/wjll_route");

	var WjllRouter = Mn.AppRouter.extend({
		initialize: function(options) {
			this.container = options.container;
		},
		
		routes: {
			"wjll123": "wjll"
		},
		
		wjll: function() {
			new WjllRoute({
				container: this.container
			});
		}
	});
	
	return WjllRouter;
});