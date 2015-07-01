define(function(require) {
	var $ = require("jquery");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	var FormUtil = require("web/common/formUtil");
	var tmpl = require("text!./form_template.html");
	
	var FormView = Mn.ItemView.extend({
		className: "shadow-box",
		template: tmpl,
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
			select: "select",
			h3: "h3",
			vga: ".vga"
		},
		events: {
			"keyup": "checkInput",
			"click .saveBtn" : "saveModel"
		},
		initialize: function(opt) {
			Util.setSelectBindings(this.bindings);
		},
		onRender: function() {
			this.stickit();
			Util.initSlider(this.$el);
			this.ui.h3.text(this.options.type + "接口配置");
			
			if(this.options.type === "SDI") {
				this.ui.vga.hide();
			} else {
				this.ui.vga.show();
			}
		},
		onAttach: function() {
			Util.activeLink().selectmenu(this.ui.select, this.ui.formBox);
		},
		
		checkInput: function(e) {
			FormUtil.checkInput($(e.target), this.checkOptions);
		},
		
		saveModel: function(e) {
			var self = this;
			if(FormUtil.checkForm(this.$el, this.checkOptions)) return;	
			
			this.model.save().done(function(res) {
				if(res.code == 0) {
					self.trigger("changeName", self.model.get("cameraName"));
				}
			}).fail(function() {
				
			});
		},
		
		updateView: function(id, type) {
			var self = this;
			this.options.type = type;
			this.model.set("recordId", id).mustFetch({
				"recordId": id
			}).done(function() {
				self.render();
				Util.selectmenu(self.ui.select, self.ui.formBox);
			});
		}
	});
	
	return FormView;
});
