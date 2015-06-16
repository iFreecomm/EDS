define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var FormUtil = require("web/common/formUtil");
	var tmpl = require("text!web/index/pz/wlsz/dksz/dksz_template.html");
	
	var DkszView = Mn.ItemView.extend({
		id: "pz_wlsz_dksz",
		template: tmpl,
		bindings: {
			"#gkdk": "gkdk",
			"#hjjtdk": "hjjtdk",
			"#xydk_min": "xydk_min",
			"#xydk_max": "xydk_max",
			"#mtdk_min": "mtdk_min",
			"#mtdk_max": "mtdk_max"
		},
		checkOptions: {
			"#xydk_min": {
				constraint: ["numberCheck"],
				appendTo: ".formLine"
			},
			"#xydk_max": {
				constraint: ["numberCheck"],
				appendTo: ".formLine"
			},
			"#mtdk_min": {
				constraint: ["numberCheck"],
				appendTo: ".formLine"
			},
			"#mtdk_max": {
				constraint: ["numberCheck"],
				appendTo: ".formLine"
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
			this.$(".spinner").spinner();
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
	
	return DkszView;
});
