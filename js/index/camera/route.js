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
			
			$.when(
				$.getJSON("getCameraPreset.psp"), //预置位状态数组
				$.getJSON("getSdiPort.psp"),
				this.model.mustFetch({ //摄像机配置信息
					vidInPort: options.id
				})
			).done(function(yzwState,sdi) {
				self.yzwState = yzwState[0].data;
				self.model.set("cameraId", options.id);
				
				self.SDI = [];
				if(sdi[0].data && sdi[0].data.sdiInfo)
				{
					self.SDI = sdi[0].data.sdiInfo;
				}
				
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				//navLeftView: NavLeftView,
				navLeftView: new NavLeftView({
					templateHelpers: {
						SDI: this.SDI
					}
				}),
				contentRightView: new CameraView({
					cameraId: this.cameraId,
					templateHelpers: {
						yzwState: this.yzwState
					}
				}),
				cameraFormView: new CameraFormView({
					model: this.model
				})
			});
		}
	});
	
	return CameraRoute;
});