define(function(require) {
	var $ = require("jquery");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var tmpl = require("text!web/index/lxr/add/lxr_add_template.html");
	var Util = require("web/common/util");
	var FormUtil = require("web/common/formUtil");
	var Const = require("web/common/const");
	var AckId = require("web/common/ackid");
	
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
			
			this.setMicInfoClass(opt.templateHelpers.micInfo);
		},
		onRender: function() {
			this.stickit();
			Util.initCheckboxClass(this.$el).addCheckboxEvent(this.$el);
			this.$(".ip").initIP();
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
			this.model.save().done(function(res) {
				self.saveSuccess(res);
			}).fail(function() {
				self.saveError();
			});
		},
		saveSuccess: function(res) {
			if(res.code != AckId.AckId_Suc)
			{
				switch (res.code){
					case AckId.AckId_NameDup:
						Util.alert("名称重复,保存联系人失败！");
						break;
					case AckId.AckId_NumberDup:
						Util.alert("号码重复,保存联系人失败！");
						break;
					case AckId.AckId_SysInCalling:
						Util.alert("在召开的会议中，不允许修改！");
						break;
					default:
						Util.alert("保存联系人失败！");
//						var self = this;
//						Util.alert("保存联系人失败！").then(function() {
//							self.cancelLxr();
//						});
						break;
				}
			}
			else
			{
				this.cancelLxr();
			}
		},
		saveError: function() {
			Util.alert("保存联系人失败！");
		},
		cancelLxr: function() {
			Util.navigate("lxr", {trigger: true});
		},
		
		changeEquType: function() {
			var curHclx = this.model.get("equType");
			var preHclx = this.model.previous("equType");
			this.$("[equType*="+preHclx+"]").hide();
			this.$("[equType*="+curHclx+"]").show();
		},
		
		setMicInfoClass: function(micInfo) {
			var micPortArr = this.model.get("micPort");
			_.each(micInfo, function(mic) {
				_.contains(micPortArr, mic.micPort) && (mic.enable = 1);
				mic.className = mic.enable ? "" : "disabled";
			});
		}
	});
	
	return LxrAddView;
});