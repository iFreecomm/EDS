define(function(require) {
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/hykz/navLeft/navLeft_view");
	var YpclqView = require("web/index/hykz/ypclq/ypclq_view");
	
	var YpclqRoute = Route.extend({
		
		initialize: function(options) {
			this.container = options.container;
			this.showView();
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new YpclqView()
			});
		}
	});
	
	return YpclqRoute;
});