define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
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
			this.$(".spinner").spinner();
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
	
	return DkszView;
});
