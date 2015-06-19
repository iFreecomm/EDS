define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var FormUtil = require("web/common/formUtil");
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
		checkOptions: {
			"#gkIp": {
				constraint: ["ipCheck"],
				appendTo: ".formCell"
			},
			"#regNum": {
				constraint: ["numberCheck"],
				appendTo: ".formCell"
			},
			"#regName": {
				constraint: ["trimCheck"],
				appendTo: ".formCell"
			},
			"#regPwd": {
				constraint: ["passCheck"],
				appendTo: ".formCell"
			},
		},
		ui: {
			formBox: ".formBox",
			select: "select"
		},
		events: {
			"keyup": "checkInput",
			"click .saveBtn" : "saveModel"
		},
		
		onRender: function() {
			this.stickit();
			Util.initCheckboxClass(this.$el).addCheckboxEvent(this.$el);
			this.$(".ip").initIP();
		},
		onAttach: function() {
			Util.activeLink().selectmenu(this.ui.select, this.ui.formBox);
			this.ui.select.change();
		},
		
		checkInput: function(e) {
			FormUtil.checkInput($(e.target), this.checkOptions);
		},
		
		saveModel: function(e) {
			if(FormUtil.checkForm(this.$el, this.checkOptions)) return;
			
			this.model.save().done(this.saveSuccess).fail(this.saveError);
		},
		saveSuccess: function() {
			Util.alert("保存成功！");
		},
		saveError: function() {
			Util.alert("保存失败！");
		}
	});
	
	return H323View;
});
