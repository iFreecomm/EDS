define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/wlsz/sip/sip_template.html");
	
	var SIPView = Mn.ItemView.extend({
		id: "pz_wlsz_sip",
		template: tmpl,
		ui: {
			formBox: ".formBox",
			select: "select"
		},
		bindings: {
			"#zcfwq": "zcfwq",
			"#fwqdz": "fwqdz",
			"#qydlfwq": "qydlfwq",
			"#dlfwqdz": "dlfwqdz",
			"#hyfwhm": "hyfwhm",
			"#hchm": "hchm",
			"#yhm": "yhm",
			"#mm": "mm" 
		},
		events: {
			"click .saveBtn" : "saveModel"
		},
		saveModel: function(e) {
			this.model.save().done(this.saveSuccess).fail(this.saveError);
		},
		saveSuccess: function() {
			alert("保存成功！");
		},
		saveError: function() {
			alert("保存失败！");
		},
		
		onRender: function() {
			this.stickit();
			Util.initCheckboxClass(this.$el).addCheckboxEvent(this.$el);
		},
		onAttach: function() {
			Util.activeLink().selectmenu(this.ui.select, this.ui.formBox);
			this.ui.select.change();
		}
	});
	
	return SIPView;
});
