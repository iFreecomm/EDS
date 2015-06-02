define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
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
			//alert("保存成功！");
		},
		saveError: function() {
			alert("保存失败！");
		}
	});
	
	return NATView;
});
