define(function(require) {
	var FormView = require("web/common/formView");
	var Handlebars = require("handlebars");
	var tmpl = require("text!web/index/lxr/add/lxr_add_template.html");
	var Const = require("web/common/const");
	
	var LxrAddView = FormView.extend({
		id: "lxr_add",
		template: Handlebars.compile(tmpl),
		
		bindings: {
			"#addrName": "addrName",
			"#camPort": "camPort",
			"#vgaPort": "vgaPort",
			"#voiIncentive": "voiIncentive",
			"[name=micPort]": "micPort",
			"#e164": "e164",
			"#ip": "ip",
			"#url": "url",
			"#storNum": "storNum",
			
			"#equType": {
				observe: "equType",
				selectName: "equType"
			},
			"#presetNum": {
				observe: "presetNum",
				selectName: "presetNum"
			},
			"#incPriLev": {
				observe: "incPriLev",
				selectName: "incPriLev"
			},
			"#bandwidth": {
				observe: "bandwidth",
				selectName: "bandwidth"
			}
		},
		
		events: {
			"click .saveBtn": "saveLxr",
			"click .cancelBtn": "cancelLxr"
		},
		saveLxr: function(e) {
			e.preventDefault();
			var self = this;
			this.model.save().done(function() {
				self.saveSuccess();
			}).fail(function() {
				self.saveError();
			});
		},
		saveSuccess: function() {
			this.cancelLxr();
		},
		saveError: function() {
			alert("保存联系人失败！");
		},
		cancelLxr: function() {
			this.navigate("lxr", {trigger: true});
		},
		
		initialize: function(opt) {
			this.listenTo(this.model, "change:equType", this.changeEquType);
			
			this.setSelectBindings(this.bindings);
		},
		changeEquType: function() {
			var curHclx = this.model.get("equType");
			var preHclx = this.model.previous("equType");
			this.$("[equType*="+preHclx+"]").hide();
			this.$("[equType*="+curHclx+"]").show();
		},
		onRender: function() {
			this.stickit().fixCheckbox().changeEquType();
		},
		onAttach: function() {
			this.activeLink().selectmenu();
		}
	});
	
	return LxrAddView;
});