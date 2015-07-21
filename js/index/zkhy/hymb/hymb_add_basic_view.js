define(function(require) {
	var _ = require("underscore");
	var Mn = require("marionette");
	var Radio = require("radio");
	var Util = require("web/common/util");
	var FormUtil = require("web/common/formUtil");
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_basic_template.html");
	
	var BasicView = Mn.ItemView.extend({
		id: "hymb_add_basic",
		template: tmpl,
		bindings: {
			"#name": "name",
			"#desc": "desc",
			"#secVidFlag": "secVidFlag",
			"#enbTransGuard": "enbTransGuard",
			
			"#audProt": {
				observe: "audProt",
				selectName: "audProt"
			},
			"#vidProt": {
				observe: "vidProt",
				selectName: "vidProt"
			},
			"#vidFmt": {
				observe: "vidFmt",
				selectName: "vidFmt"
			},
			"#frameRate": {
				observe: "frameRate",
				selectName: "frameRate"
			},
			"#vidQuality": {
				observe: "vidQuality",
				selectName: "vidQuality"
			},
			"#secProt": {
				observe: "secProt",
				selectName: "secProt"
			},
			"#secFmt": {
				observe: "secFmt",
				selectName: "secFmt"
			},
			"#secFrameRate": {
				observe: "secFrameRate",
				selectName: "secFrameRate"
			},
			"#secQuality": {
				observe: "secQuality",
				selectName: "secQuality"
			},
			"#secVidSend": {
				observe: "secVidSend",
				selectName: "secVidSend"
			}
		},
		checkOptions: {
			"#name": {
				constraint: ["notNull", "trimCheck"],
				appendTo: ".formLine",
				offsetTop: 5
			},
			"#desc": {
				constraint: ["trimCheck"],
				appendTo: ".formLine"
			}
		},
		ui: {
			formBox: ".formBox",
			select: "select",
			name: "#name",
			desc: "#desc"
		},
		events: {
			"keyup": "checkInput"
		},
		
		initialize: function() {
			Util.setSelectBindings(this.bindings);
		},
		onRender: function() {
			this.stickit();
			Util.initCheckboxClass(this.$el).addCheckboxEvent(this.$el);
			
			Radio.channel("basic").reply("isFormValid", this.isFormValid, this);
			
			this.listenTo(this.model, "change:secVidFlag", this.secVidFlagChange);
		},
		onAttach: function() {
			Util.selectmenu(this.ui.select, this.ui.formBox);
		},
		onDestroy: function() {
			Radio.channel("basic").reset();
		},
		
		checkInput: function(e) {
			FormUtil.checkInput($(e.target), this.checkOptions);
		},
		
		isFormValid: function() {
			return FormUtil.checkInput(this.ui.name, this.checkOptions) || FormUtil.checkInput(this.ui.desc, this.checkOptions);
		},
		secVidFlagChange:function(){
			Radio.channel("basic").trigger("secVidFlgChange");
		}
	});
	
	return BasicView;
});