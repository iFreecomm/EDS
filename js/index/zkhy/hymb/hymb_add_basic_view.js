define(function(require) {
	var _ = require("underscore");
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_basic_template.html");
	
	var BasicView = Mn.ItemView.extend({
		id: "hymb_add_basic",
		template: tmpl,
		ui: {
			formBox: ".formBox",
			select: "select"
		},
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
			Util.setSelectBindings(this.bindings);
		},
		onRender: function() {
			this.stickit();
			Util.initCheckboxClass(this.$el).addCheckboxEvent(this.$el);
		},
		onAttach: function() {
			Util.selectmenu(this.ui.select, this.ui.formBox);
		}
	});
	
	return BasicView;
});