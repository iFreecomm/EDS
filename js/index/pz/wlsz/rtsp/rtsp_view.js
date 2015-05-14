define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/wlsz/rtsp/rtsp_template.html");
	
	var RTSPView = Mn.ItemView.extend({
		id: "pz_wlsz_rtsp",
		template: tmpl,
		ui: {
			formBox: ".formBox",
			select: "select"
		},
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
			this.stickit();
			Util.initCheckboxClass(this.$el).addCheckboxEvent(this.$el);
		},
		onAttach: function() {
			Util.activeLink().selectmenu(this.ui.select, this.ui.formBox);
			this.ui.select.change();
		}
	});
	
	return RTSPView;
});
