define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/camera/form/template.html");
	var Util = require("web/common/util");
	
	var LxrAddView = Mn.ItemView.extend({
		template: tmpl,
		bindings: {
			"#comPort": {
				observe: "comPort",
				selectName: "comPort"
			},
			"#evenOddCheck": {
				observe: "evenOddCheck",
				selectName: "evenOddCheck"
			},
			"#comMode": {
				observe: "comMode",
				selectName: "comMode"
			},
			"#stopBit": {
				observe: "stopBit",
				selectName: "stopBit"
			},
			"#baudRate": {
				observe: "baudRate",
				selectName: "baudRate"
			},
			"#addr": {
				observe: "addr",
				selectName: "addr"
			},
			"#dataBit": {
				observe: "dataBit",
				selectName: "dataBit"
			},
			"#cameraProt": {
				observe: "cameraProt",
				selectName: "cameraProt"
			},
			"#speed": {
				observe: "speed",
				selectName: "speed"
			}
		},
		ui: {
			formBox: ".formBox",
			select: "select"
		},
		events: {
			"click .saveBtn": "saveCamera",
			"click .cameraFormHead": "toggleFormBox"
		},
		initialize: function(opt) {
			Util.setSelectBindings(this.bindings);
		},
		onRender: function() {
			this.stickit();
		},
		onAttach: function() {
			Util.selectmenu(this.ui.select, this.$el);
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
		},
		
		toggleFormBox: function() {
			this.ui.formBox.toggle();
		}
	});
	
	return LxrAddView;
});