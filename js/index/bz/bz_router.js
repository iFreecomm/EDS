define(function(require) {
	var Mn = require("marionette");
	var BbxxRoute = require("web/index/bz/bbxx/route");
	var CzznRoute = require("web/index/bz/czzn/route");
	var ZddtRoute = require("web/index/bz/zddt/route");
	
	var BzRouter = Mn.AppRouter.extend({
		initialize: function(options) {
			this.container = options.container;
		},
		
		routes: {
			"bz": "bbxx",
			"bz/bbxx": "bbxx",
			"bz/czzn": "czzn",
			"bz/zddt": "zddt"
		},
		
		bbxx: function() {
			new BbxxRoute({
				container: this.container
			});
		},
		
		czzn: function() {
			new CzznRoute({
				container: this.container
			});
		},
		
		zddt: function() {
			new ZddtRoute({
				container: this.container
			});
		}
	});
	
	return BzRouter;
});