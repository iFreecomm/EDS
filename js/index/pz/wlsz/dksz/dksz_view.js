define(function(require) {
	var FormView = require("web/common/formView");
	var tmpl = require("text!web/index/pz/wlsz/dksz/dksz_template.html");
	
	var DkszView = FormView.extend({
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
			this.stickit().fixCheckbox();
			this.$(".spinner").spinner();
		},
		onAttach: function() {
			this.selectmenu();
		}
	});
	
	return DkszView;
});
