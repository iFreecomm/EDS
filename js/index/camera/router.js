define(function(require) {
	var Mn = require("marionette");
	var CameraRoute = require("web/index/camera/route");
	
	var CameraRouter = Mn.AppRouter.extend({
		initialize: function(options) {
			this.container = options.container;
		},
		
		routes: {
			"camera": "camera",
			"camera/:id": "camera"
		},
		
		camera: function(id) {
			new CameraRoute({
				container: this.container,
				id: id || 1
			});
		}
	});
	
	return CameraRouter;
});