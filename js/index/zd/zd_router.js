define(function(require) {
	var Mn = require("marionette");
	var XtztRoute = require("./xtzt/route");
	var DbcxRoute = require("./dbcx/route");
	var MicRoute = require("./mic/route");
	var PingRoute = require("./ping/route");
	var CzrzRoute = require("./czrz/route");
	
	var ZdRouter = Mn.AppRouter.extend({
		initialize: function(options) {
			this.container = options.container;
		},
		
		routes: {
			"zd": "xtzt",
			"zd/xtzt": "xtzt",
			"zd/dbcx": "dbcx",
			"zd/mic": "mic",
			"zd/ping": "ping",
			"zd/czrz": "czrz"
		},
		
		xtzt: function() {
			new XtztRoute({
				container: this.container
			});
		},
		
		dbcx: function() {
			new DbcxRoute({
				container: this.container
			});
		},
		
		mic: function() {
			new MicRoute({
				container: this.container
			});
		},
		
		ping: function() {
			new PingRoute({
				container: this.container
			});
		},
		
		czrz: function() {
			new CzrzRoute({
				container: this.container
			});
		}
	});
	
	return ZdRouter;
});