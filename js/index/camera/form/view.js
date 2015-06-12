define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/camera/form/template.html");
	var Util = require("web/common/util");
	
	var LxrAddView = Mn.ItemView.extend({
		className: "formBox cf",
		template: tmpl,
		bindings: {
			"#comPort": "comPort",
			"#evenOddCheck": "evenOddCheck",
			"#comMode": "comMode",
			"#stopBit": "stopBit",
			"#baudRate": "baudRate",
			"#addr": "addr",
			"#dataBit": "dataBit",
			"#cameraProt": "cameraProt"
		},
		ui: {
			formBox: ".formBox",
			select: "select"
		},
		events: {
			"click .saveBtn": "saveCamera"
		},
		
		onRender: function() {
			this.stickit();
		},
		onAttach: function() {
//			Util.selectmenu(this.ui.select, this.ui.formBox);
		},
		
		saveCamera: function() {
			var self = this;
			this.model.save().done(function() {
				self.saveSuccess();
			}).fail(function() {
				self.saveError();
			});
		},
		saveSuccess: function() {
			Util.alert("保存摄像机成功！");
		},
		saveError: function() {
			Util.alert("保存摄像机失败！");
		}
	});
	
	return LxrAddView;
});