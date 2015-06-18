define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	
	var tmpl = require("text!web/index/camera/template.html");
	
	var CameraView = Mn.LayoutView.extend({
		id: "camera",
		template: Handlebars.compile(tmpl),
		ui: {
			"lis": ".yzw_container li",
			"activeBtn": ".yzw_container .activeBtn",
			"saveBtn": ".yzw_container .saveBtn",
			"cancelBtn": ".yzw_container .cancelBtn"
		},
		regions: {
			formContainer: ".formContainer"
		},
		events: {
			"click @ui.lis": "selectLi",
			        
			"click @ui.activeBtn": "activeYzw",
			"click @ui.saveBtn": "saveYzw",
			"click @ui.cancelBtn": "cancelYzw",
			
			"mousedown .camera_container .btn-area .btn": "startControlCamera"
		},
		
		onBeforeShow: function(view, region, options) {
			this.showChildView("formContainer", options.cameraFormView);
		},
		onAttach: function() {
			Util.activeLink();
			this.ui.activeBtn.addClass("disabled");
			this.ui.saveBtn.addClass("disabled");
			this.ui.cancelBtn.addClass("disabled");
		},
		
		selectLi: function(e) {
			this.ui.lis.eq(this.selectedYzwIndex).removeClass("selected");
			var $li = $(e.target);
			if(!$li.is("li")) {
				$li = $li.parents("li");
			}
			$li.addClass("selected");
			this.selectedYzwIndex = $li.index();
			
			if($li.is(".using")) {
				this.ui.cancelBtn.removeClass("disabled");
				this.ui.saveBtn.removeClass("disabled");
				this.ui.activeBtn.addClass("disabled");
			} else if($li.is(".unused")) {
				this.ui.saveBtn.removeClass("disabled");
				this.ui.activeBtn.addClass("disabled");
				this.ui.cancelBtn.addClass("disabled");
			} else if($li.is(".used")) {
				this.ui.saveBtn.removeClass("disabled");
				this.ui.cancelBtn.removeClass("disabled");
				this.ui.activeBtn.removeClass("disabled");
			}
		},
		
		activeYzw: function() {
			var index = this.selectedYzwIndex;
			if(!_.isNumber(index)) return;
			var $li = this.ui.lis.eq(index);
			if($li.is(".using")) return;
			if($li.is(".unused")) return;
			
			var self = this;
			$.getJSON("activeCameraPreset.psp", Util.encode({
				vidInPort: this.options.cameraId,
				presetNum: index
			})).done(function(res) {
				if(res.code === 0) {
					self.ui.lis.filter(".using").removeClass("using").addClass("used");
					if($li.is(".unused")) {
						$li.append('<img src="img/camera/cover.png" width="224" height="119" alt="cover"/>');
					}
					$li.removeClass("unused used").addClass("using");
				}
			});
		},
		
		saveYzw: function() {
			var index = this.selectedYzwIndex;
			if(!_.isNumber(index)) return;
			
			var self = this;
			$.getJSON("setCameraPreset.psp", Util.encode({
				vidInPort: this.options.cameraId,
				presetNum: index
			})).done(function(res) {
				if(res.code === 0) {
					var $li = self.ui.lis.eq(index);
					if($li.is(".unused")) {
						$li.removeClass("unused").addClass("used").append('<img src="img/camera/cover.png" alt="cover"/>');
					}
				}
			});
		},
		
		cancelYzw: function() {
			var index = this.selectedYzwIndex;
			if(!_.isNumber(index)) return;
			var $li = this.ui.lis.eq(index);
			if($li.is(".unused")) return;
			
			var self = this;
			$.getJSON("delCameraPreset.psp", Util.encode({
				vidInPort: this.options.cameraId,
				presetNum: index
			})).done(function(res) {
				if(res.code === 0) {
					$li.removeClass("using used").addClass("unused").find("img").remove();
				}
			});
		},
		
		startControlCamera: function(e) {
			var $btn = $(e.target);
			if(!$btn.is("button")) {
				$btn = $btn.parents("button");
			}
			
			var self = this;
			var vidInPort = this.options.cameraId;
			var ctrlType = $btn.data("ctrltype");
			
			$btn.one("mouseup mouseleave", _.bind(this.endControlCamera, this));
			
			_start();
			
			function _start() {
				$.getJSON("cameraPTZF.psp", Util.encode({
					vidInPort: vidInPort,
					ctrlType: ctrlType,
					cameraAct: 0
				}));
				self.timerId = setTimeout(_start, 1000);
			}
		},
		
		endControlCamera: function() {
			clearTimeout(this.timerId);
		}
	});
	
	return CameraView;
});