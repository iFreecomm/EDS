define(function(require) {
	var Mn = require("marionette");
	var SpsrRoute = require("web/index/pz/spsr/spsr_route");
	var SpscRoute = require("web/index/pz/spsc/spsc_route");
	var WlszRoute = require("web/index/pz/wlsz/wlsz_route");
	var RqsjRoute = require("web/index/pz/rqsj/rqsj_route");
	var CcszRoute = require("web/index/pz/ccsz/ccsz_route");
	var DyxxRoute = require("web/index/pz/dyxx/dyxx_route");
	
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
			"pz/dyxx":"dyxx"
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

		rqsj:function(){
			new RqsjRoute({
				container:this.container
			});
		},

		ccsz:function(){
			new CcszRoute({
				container:this.container
			});
		},

		dyxx:function(){
			new DyxxRoute({
				container:this.container
			});
		}
	});
	
	return PzRouter;
});