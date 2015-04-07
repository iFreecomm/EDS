define(function(require) {
	var FormView = require("web/common/formView");
	var tmpl = require("text!web/index/pz/wlsz/nat/nat_template.html");
	
	var NATView = FormView.extend({
		id: "pz_wlsz_nat",
		template: tmpl,
		bindings: {
			"#qynat": "qynat",
			"#ipdz": "ipdz",
			"#hjqsdk": "hjqsdk",
			"#hjjsdk": "hjjsdk",
			"#mtqsdk": "mtqsdk",
			"#mtjsdk": "mtjsdk"
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
			this.stickit().fixIE8();
			this.$(".spinner").spinner();
		},
		onAttach: function() {
			this.selectmenu();
		}
	});
	
	return NATView;
});
