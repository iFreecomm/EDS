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
			"lis": ".yzw_container li"
		},
		regions: {
			formContainer: ".formContainer"
		},
		events: {
			"click .yzw_container li": "selectLi",
			
			"click .yzw_container .activeBtn": "activeYzw",
			"click .yzw_container .saveBtn": "saveYzw",
			"click .yzw_container .cancelBtn": "cancelYzw",
			
			"click .camera_container .btn-area .btn": "controlCamera"
		},
		
		onBeforeShow: function(view, region, options) {
			this.showChildView("formContainer", options.cameraFormView);
		},
		onAttach: function() {
			Util.activeLink();
		},
		
		selectLi: function(e) {
			this.ui.lis.eq(this.selectedYzwIndex).removeClass("selected");
			var $li = $(e.target);
			if(!$li.is("li")) {
				$li = $li.parents("li");
			}
			$li.addClass("selected");
			this.selectedYzwIndex = $li.index();
		},
		
		activeYzw: function() {
			var index = this.selectedYzwIndex;
			if(!_.isNumber(index)) return;
			var $li = this.ui.lis.eq(index);
			if($li.is(".active")) return;
			
			var self = this;
			$.getJSON("temp.psp", Util.encode({
				index: index
			})).done(function(res) {
				if(res.code === 0) {
					self.ui.lis.removeClass("active");
					$li.addClass("active");
				}
			});
		},
		
		saveYzw: function() {
			var index = this.selectedYzwIndex;
			if(!_.isNumber(index)) return;
			
			var self = this;
			$.getJSON("temp.psp", Util.encode({
				index: index
			}));
		},
		
		cancelYzw: function() {
			var index = this.selectedYzwIndex;
			if(!_.isNumber(index)) return;
			var $li = this.ui.lis.eq(index);
			var $img = $li.find("img");
			if(!$img.length) return;
			
			var self = this;
			$.getJSON("temp.psp", Util.encode({
				index: index
			})).done(function(res) {
				if(res.code === 0) {
					$li.removeClass("active");
					$img.remove();
				}
			});
		},
		
		controlCamera: function(e) {
			var $btn = $(e.target);
			if(!$btn.is("button")) {
				$btn = $btn.parents("button");
			}
			$.getJSON("temp.psp", Util.encode({
				optcode: $btn.data("optcode")
			}));
		}
	});
	
	return CameraView;
});
