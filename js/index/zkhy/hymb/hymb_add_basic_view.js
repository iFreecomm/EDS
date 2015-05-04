define(function(require) {
	var _ = require("underscore");
	var FormView = require("web/common/formView");
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_basic_template.html");
	
	var BasicView = FormView.extend({
		id: "hymb_add_basic",
		template: tmpl,
		
		bindings: {
			"#name": "name",
			"#desc": "desc",
			"#secVidFlag": "secVidFlag",
			"#enbTransGuard": "enbTransGuard",
			
			"#audProt": {
				observe: "audProt",
				selectName: "audProt"
			},
			"#vidProt": {
				observe: "vidProt",
				selectName: "vidProt"
			},
			"#vidFmt": {
				observe: "vidFmt",
				selectName: "vidFmt"
			},
			"#frameRate": {
				observe: "frameRate",
				selectName: "frameRate"
			},
			"#vidQuality": {
				observe: "vidQuality",
				selectName: "vidQuality"
			},
			"#secProt": {
				observe: "secProt",
				selectName: "secProt"
			},
			"#secFmt": {
				observe: "secFmt",
				selectName: "secFmt"
			},
			"#secFrameRate": {
				observe: "secFrameRate",
				selectName: "secFrameRate"
			},
			"#secQuality": {
				observe: "secQuality",
				selectName: "secQuality"
			},
			"#secVidSend": {
				observe: "secVidSend",
				selectName: "secVidSend"
			}
		},
		
		initialize: function() {
			this.setSelectBindings(this.bindings);
		},
		onRender: function() {
			this.stickit().fixCheckbox();
		},
		onAttach: function() {
			this.selectmenu();
		}
	});
	
	return BasicView;
});