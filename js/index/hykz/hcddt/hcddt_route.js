define(function(require) {
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/hykz/navLeft/navLeft_view");
	
	var HcddtView = require("web/index/hykz/hcddt/hcddt_view");
	var LxrCollection = require("web/index/hykz/hcddt/lxr_collection");

	var HcddtRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			this.lxrCollection = new LxrCollection();
			
			this.lxrCollection.fetch({
				reset: true
			}).done(function() {
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new HcddtView({
					collection: this.lxrCollection
				})
			});
		}
	});
	
	return HcddtRoute;
});