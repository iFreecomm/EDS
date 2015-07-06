define(function(require) {
	var Util = require("web/common/util");
	var Route = require("web/common/route");
	
	var PlayFileView = require("web/index/bfq/playFile_view");

	var PlayFileRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			
			this.showView();
		},
		
		showView: function() {
			this.show({
				contentRightView: new PlayFileView()
			});
		}
	});
	
	return PlayFileRoute;
});