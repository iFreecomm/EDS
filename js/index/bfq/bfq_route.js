define(function(require) {
	var Util = require("web/common/util");
	var Route = require("web/common/route");
	
	var BfqView = require("web/index/bfq/bfq_view");

	var BfqRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			
			this.showView();
		},
		
		showView: function() {
			this.show({
				contentRightView: new BfqView()
			});
		}
	});
	
	return BfqRoute;
});