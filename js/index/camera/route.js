define(function(require) {
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/camera/navLeft/navLeft_view");
	
	var CameraView = require("web/index/camera/view");
	
	var CameraFormModel = require("web/index/camera/form/model");
	var CameraFormView = require("web/index/camera/form/view");

	var CameraRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			this.cameraId = options.id;
			
			this.model = new CameraFormModel();
			this.model.mustFetch({
				cameraId: options.id
			}).done(function() {
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new CameraView({
					cameraId: this.cameraId
				}),
				cameraFormView: new CameraFormView({
					model: this.model
				})
			});
		}
	});
	
	return CameraRoute;
});