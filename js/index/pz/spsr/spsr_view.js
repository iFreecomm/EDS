define(function(require) {
	var $ = require("jquery");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	var FormUtil = require("web/common/formUtil");
	var tmpl = require("text!web/index/pz/spsr/spsr_template.html");
	
	var SpsrView = Mn.ItemView.extend({
		id: "pz_spsr",
		template: Handlebars.compile(tmpl),
		bindings: {
			"#cameraName": "cameraName",
			"#vidPortType": {
				observe: "vidPortType",
				selectName: "vidPortType"
			},
			
			"#bright": "bright",
			"#contrast": "contrast",
			"#saturation": "saturation",
			"#clock": "clock",
			"#phase": "phase",
			"#horOffset": "horOffset",
			"#vertOffset": "vertOffset",
			"#nr2d": "nr2d",
			"#nr3d": "nr3d",
			"#acutance": "acutance"
		},
		checkOptions: {
			"#cameraName": {
				constraint: ["notNull", "trimCheck"],
				appendTo: ".formCell"
			}
		},
		ui: {
			formBox: ".formBox",
			select: "select"
		},
		events: {
			"keyup": "checkInput",
			"click .lxr" : "selectLxr",
			"click .saveBtn" : "saveModel"
		},
		initialize: function(opt) {
			Util.setSelectBindings(this.bindings);
		},
		onRender: function() {
			this.stickit();
			Util.initSlider(this.$el);
		},
		onAttach: function() {
			Util.activeLink().selectmenu(this.ui.select, this.ui.formBox);
			this.ui.select.change();
		},
		
		checkInput: function(e) {
			FormUtil.checkInput($(e.target), this.checkOptions);
		},
		saveModel: function(e) {
			var self = this;
			if(FormUtil.checkForm(this.$el, this.checkOptions)) return;	
			
			this.model.save().done(function(res) {
				
			}).fail(function() {
				
			});
		},
		selectLxr: function(e) {
			var self = this;
			var $tar = $(e.target);
			var $lxr = $tar.is(".lxr") ? $tar : $tar.parents(".lxr");
			$lxr.addClass("active").siblings().removeClass("active");
			
			this.model.set("recordId",$lxr.data("id"));
			this.model.mustFetch({
				"recordId": $lxr.data("id")
			}).done(function() {
				Util.refreshSelectmenu(self.$el).refreshSlider(self.$el);
			});
		}
	});
	
	return SpsrView;
});
