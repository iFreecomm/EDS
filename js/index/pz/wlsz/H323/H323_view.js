define(function(require) {
	var FormView = require("web/common/formView");
	var tmpl = require("text!web/index/pz/wlsz/H323/H323_template.html");
	
	var H323View = FormView.extend({
		id: "pz_wlsz_h323",
		template: tmpl,
		bindings: {
			"#qygk": "qygk",
			"#gkdz": "gkdz",
			"#hchm": "hchm",
			"#rzmc": "rzmc",
			"#rzmm": "rzmm"
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
		},
		onAttach: function() {
			this.selectmenu();
		}
	});
	
	return H323View;
});
