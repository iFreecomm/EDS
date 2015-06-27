define(function(require) {
	var Mn = require("marionette");
	var SpsrRoute = require("web/index/pz/spsr/spsr_route");
	var SpscRoute = require("web/index/pz/spsc/spsc_route");
	var WlszRoute = require("web/index/pz/wlsz/wlsz_route");
	var RqsjRoute = require("web/index/pz/rqsj/rqsj_route");
	var CcszRoute = require("web/index/pz/ccsz/ccsz_route");
	var DyxxRoute = require("web/index/pz/dyxx/dyxx_route");
	var AqbmRoute = require("web/index/pz/aqbm/aqbm_route");
	var XtgxRoute = require("web/index/pz/xtgx/xtgx_route");
	
	var PzRouter = Mn.AppRouter.extend({
		initialize: function(options) {
			this.container = options.container;
		},
		
		routes: {
			"pz": "spsr",
			"pz/spsr": "spsr",
			"pz/spsc": "spsc",
			"pz/wlsz": "wlsz",
			"pz/rqsj": "rqsj",
			"pz/ccsz": "ccsz",
			"pz/dyxx": "dyxx",
			"pz/aqbm": "aqbm",
			"pz/xtgx": "xtgx"
		},
		
		spsr: function() {
			new SpsrRoute({
				container: this.container
			});
		},
		
		spsc: function() {
			new SpscRoute({
				container: this.container
			});
		},
		
		wlsz: function() {
			new WlszRoute({
				container: this.container
			});
		},

		rqsj: function() {
			new RqsjRoute({
				container:this.container
			});
		},

		ccsz: function() {
			new CcszRoute({
				container:this.container
			});
		},

		dyxx: function() {
			new DyxxRoute({
				container:this.container
			});
		},
		
		aqbm: function() {
			new AqbmRoute({
				container:this.container
			});
		},

		xtgx: function() {
			new XtgxRoute({
				container:this.container
			});
		}
	});
	
	return PzRouter;
});