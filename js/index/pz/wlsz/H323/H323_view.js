define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/wlsz/H323/H323_template.html");
	
	var H323View = Mn.ItemView.extend({
		id: "pz_wlsz_h323",
		template: tmpl,
		bindings: {
			"#enable": "enable",
			"#gkIp": "gkIp",
			"#regNum": "regNum",
			"#regName": "regName",
			"#regPwd": "regPwd"
		},
		ui: {
			formBox: ".formBox",
			select: "select"
		},
		events: {
			"click .saveBtn" : "saveModel"
		},
		
		onRender: function() {
			this.stickit();
			Util.initCheckboxClass(this.$el).addCheckboxEvent(this.$el);
		},
		onAttach: function() {
			Util.activeLink().selectmenu(this.ui.select, this.ui.formBox);
			this.ui.select.change();
		},
		
		saveModel: function(e) {
			this.model.save().done(this.saveSuccess).fail(this.saveError);
		},
		saveSuccess: function() {
			alert("保存成功！");
		},
		saveError: function() {
			alert("保存失败！");
		}
	});
	
	return H323View;
});
