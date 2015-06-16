define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var FormUtil = require("web/common/formUtil");
	var tmpl = require("text!web/index/pz/wlsz/sip/sip_template.html");
	
	var SIPView = Mn.ItemView.extend({
		id: "pz_wlsz_sip",
		template: tmpl,
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
		checkOptions: {
			"#fwqdz": {
				constraint: ["ipCheck"],
				appendTo: ".formCell"
			},
			"#dlfwqdz": {
				constraint: ["ipCheck"],
				appendTo: ".formCell"
			},
			"#hyfwhm": {
				constraint: ["numberCheck"],
				appendTo: ".formCell"
			},
			"#hchm": {
				constraint: ["numberCheck"],
				appendTo: ".formCell"
			},
			"#yhm": {
				constraint: ["trimCheck"],
				appendTo: ".formCell"
			},
			"#mm": {
				constraint: ["passCheck"],
				appendTo: ".formCell"
			}
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
	
	return SIPView;
});
