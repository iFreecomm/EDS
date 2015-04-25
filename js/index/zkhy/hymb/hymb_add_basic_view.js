define(function(require) {
	var _ = require("underscore");
	var FormView = require("web/common/formView");
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_basic_template.html");
	
	var BasicView = FormView.extend({
		id: "hymb_add_basic",
		template: tmpl,
		
		initialize: function() {
			this.bindings = this.getBindings({
				"#name": "name",
				"#desc": "desc",
				"#secVidFlag": "secVidFlag",
				"#enbTransGuard": "enbTransGuard"
			}, [
				"audProt",
				"vidProt",
				"vidFmt",
				"frameRate",
				"vidQuality",
				"secProt",
				"secFmt",
				"secFrameRate",
				"secQuality",
				"secVidSend"
			]);
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