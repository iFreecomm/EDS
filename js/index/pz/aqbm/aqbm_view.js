define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var FormUtil = require("web/common/formUtil");
	
	var tmpl = require("text!./aqbm_template.html");
	
	var AqbmView = Mn.ItemView.extend({
		id: "pz_aqbm",
		template: tmpl,
		bindings: {
			"#enable": "enable",
			"#user": "username",
			"#pwd": "password", 
			"#port": "port"
		},
		checkOptions: {
			"#user": {
				constraint: ["trimCheck"],
				appendTo: ".formCell"
			},
			"#pwd": {
				constraint: ["trimCheck"],
				appendTo: ".formCell"
			},
			"#port": {
				constraint: ["numberCheck"],
				appendTo: ".formCell"
			}
		},
		events: {
			"keyup": "checkInput",
			"click .saveBtn" : "saveModel"
		},
		
		onRender: function() {
			this.stickit();
			Util.initCheckboxClass(this.$el).addCheckboxEvent(this.$el);
		},
		onAttach: function() {
			Util.activeLink();
		},
		
		checkInput: function(e) {
			FormUtil.checkInput($(e.target), this.checkOptions);
		},
		
		saveModel: function(e) {
			var self = this;
			if(FormUtil.checkForm(this.$el, this.checkOptions)) return;
			
			this.model.save().done(function(res) {
				self.saveSuccess(res);
			}).fail(function() {
				self.saveError();
			});
		},
		saveSuccess: function(res) {
			if(res.code != 0) {
				Util.alert("保存失败！");
			}
		},
		saveError: function() {
			Util.alert("保存失败！");
		}
	});
	
	return AqbmView;
});
