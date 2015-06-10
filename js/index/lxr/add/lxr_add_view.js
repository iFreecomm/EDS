define(function(require) {
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var tmpl = require("text!web/index/lxr/add/lxr_add_template.html");
	var Util = require("web/common/util");
	var FormUtil = require("web/common/formUtil");
	
	var LxrAddView = Mn.ItemView.extend({
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
		checkOptions: {
			"#addrName": {
				constraint: ["notNull", "trimCheck"],
				appendTo: ".formLine"
			},
    		"#e164": {
    			constraint: ["e164Check"],
    			appendTo: ".formLine"
    		},
    		"#ip": {
				constraint: ["ipCheck"],
				appendTo: ".formLine"
			},
			"#url": {
				constraint: ["urlCheck"],
				appendTo: ".formLine"
			},
			"#storNum": {
				constraint: ["numberCheck"],
				appendTo: ".formLine"
			}
		},
		ui: {
			formBox: ".formBox",
			select: "select"
		},
		events: {
			"keyup": "checkInput",
			"click .saveBtn": "saveLxr",
			"click .cancelBtn": "cancelLxr"
		},
		
		initialize: function(opt) {
			this.listenTo(this.model, "change:equType", this.changeEquType);
			
			Util.setSelectBindings(this.bindings);
		},
		onRender: function() {
			this.stickit();
			Util.initCheckboxClass(this.$el).addCheckboxEvent(this.$el);
			this.changeEquType();
		},
		onAttach: function() {
			Util.activeLink().selectmenu(this.ui.select, this.ui.formBox);
			//同步select默认值到model中
			this.ui.select.change();
		},
		
		checkInput: function(e) {
			FormUtil.checkInput($(e.target), this.checkOptions);
		},
		
		saveLxr: function(e) {
			e.preventDefault();
			if(FormUtil.checkForm(this.$el, this.checkOptions)) return;
			
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
			Util.navigate("lxr", {trigger: true});
		},
		
		changeEquType: function() {
			var curHclx = this.model.get("equType");
			var preHclx = this.model.previous("equType");
			this.$("[equType*="+preHclx+"]").hide();
			this.$("[equType*="+curHclx+"]").show();
		}
	});
	
	return LxrAddView;
});