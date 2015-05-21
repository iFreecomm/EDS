define(function(require) {
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/pz/navLeft/navLeft_view");
	var YppzView = require("web/index/pz/yppz/yppz_view");
	
	var YppzRoute = Route.extend({
		
		initialize: function(options) {
			this.container = options.container;
			this.showView();
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new YppzView()
			});
		}
	});
	
	return YppzRoute;
});