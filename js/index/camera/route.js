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
			this.model = new CameraFormModel();
			
			$.getJSON("getSdiPort.psp").done(function(sdi) {
				self.SDI = [];
				if(sdi.data && sdi.data.sdiInfo)
				{
					self.SDI = sdi.data.sdiInfo;
					//self.vidInPort = _.isNumber(options.id)?options.id:self.SDI[0].camPort;
					self.vidInPort = options.id==-1?self.SDI[0].camPort:options.id;
				}
				$.when(
					$.getJSON("getCameraPreset.psp",JSON.stringify({
		  				vidInPort:self.vidInPort
		  			})), //预置位状态数组
		  			self.model.mustFetch({ //摄像机配置信息
						vidInPort: self.vidInPort
					})
					
				).done(function(yzwState) {
					self.yzwState = [];
					if(yzwState[0].data && yzwState[0].data.presetArr)
					{
						self.yzwState = yzwState[0].data.presetArr;
					}
					self.model.set("vidInPort", self.vidInPort);
					
					self.showView();
				});
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
					vidInPort: this.vidInPort,
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