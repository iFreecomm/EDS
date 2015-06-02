define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/wlsz/qos/qos_template.html");
	
	var QosView = Mn.ItemView.extend({
		id: "pz_wlsz_qos",
		template: tmpl,
		bindings: {
			"#swzwk": "swzwk",
			"#wllx":  "wllx",
			"#ipdz":  "ipdz",
			"#zwym":  "zwym",
			"#wgdz":  "wgdz",
			"#dns":   "dns",
			"#sxdk":  "sxdk",
			"#xxdk":  "xxdk" 
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
	
	return QosView;
});
