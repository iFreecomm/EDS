define(function(require) {
	var FormView = require("web/common/formView");
	var Handlebars = require("handlebars");
	var tmpl = require("text!web/index/lxr/add/lxr_add_template.html");
	
	var LxrAddView = FormView.extend({
		id: "lxr_add",
		template: Handlebars.compile(tmpl),
		
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
			
			this.bindings = this.getBindings({
				"#addrName": "addrName",
				"#camPort": "camPort",
				"#voiIncentive": "voiIncentive",
				"[name=micPort]": "micPort",
				"#e164": "e164",
				"#ip": "ip",
				"#url": "url",
				"#storNum": "storNum"
			}, [
				"equType",
				"presetNum",
				"incPriLev",
				"bandwidth"
			]);
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