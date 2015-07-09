define(function(require) {
	var Mn = require("marionette");
	var BfqRoute = require("./bfq_route");
	var PlayFileRoute = require("./playFile_route");

	var BfqRouter = Mn.AppRouter.extend({
		initialize: function(options) {
			this.container = options.container;
		},
		
		routes: {
			"bfq": "bfq",
			"playFile": "playFile"
		},
		
		bfq: function() {
			new BfqRoute({
				container: this.container
			});
		},
		
		playFile: function() {
			new PlayFileRoute({
				container: this.container
			});
		}
	});
	
	return BfqRouter;
});