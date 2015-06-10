define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var FormUtil = require("web/common/formUtil");
	var tmpl = require("text!web/index/pz/wlsz/nat/nat_template.html");
	
	var NATView = Mn.ItemView.extend({
		id: "pz_wlsz_nat",
		template: tmpl,
		bindings: {
			"#enable": "enable",
			"#externalIp": "externalIp",
			"#callBeginPort": "callBeginPort",
			"#callEndPort": "callEndPort",
			"#rtpBeginPort": "rtpBeginPort",
			"#rtpEndPort": "rtpEndPort"
		},
		checkOptions: {
			"#externalIp": {
				constraint: ["ipCheck"],
				appendTo: ".formCell"
			},
			"#callBeginPort": {
				constraint: ["numberCheck"],
				appendTo: ".formCell"
			},
			"#callEndPort": {
				constraint: ["numberCheck"],
				appendTo: ".formCell"
			},
			"#rtpBeginPort": {
				constraint: ["numberCheck"],
				appendTo: ".formCell"
			},
			"#rtpEndPort": {
				constraint: ["numberCheck"],
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
			//alert("保存成功！");
		},
		saveError: function() {
			alert("保存失败！");
		}
	});
	
	return NATView;
});
