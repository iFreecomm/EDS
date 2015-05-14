define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/yppz/fkyz/fkyz_template.html");
	
	var FkyzView = Mn.ItemView.extend({
		id: "pz_yppz_fkyz",
		template: tmpl,
		
		events: {
			"click .btn-switch3": "toggleSwitch",
			"click .saveBtn" : "saveFkyz"
		},
		saveFkyz: function(e) {
			this.model.set(this._getFkyz())
			.save()
			.done(function() {
				alert("保存成功！");
			})
			.fail(function() {
				alert("保存失败！");
			});
		},
		_getFkyz: function() {
			var $el = this.$el;
			return {
				afrEn: $el.find("#afrEn").is(".active") ? 1 : 0,
				afrMode: +$el.find("[name=afrMode]:checked").val(),
				afrRange: +$el.find("[name=afrRange]:checked").val()
			};
		},
		
		onRender: function() {
			this.renderData();
			Util.initRadioClass(this.$el)
				.addRadioEvent(this.$el);
		},
		renderData: function() {
			var $el = this.$el;
			var model = this.model;
			model.get("afrEn") && $el.find("#afrEn").addClass("active");
			var afrMode = model.get("afrMode");
			$el.find("[name=afrMode][value=" + afrMode + "]").prop("checked", true);
			var afrRange = model.get("afrRange");
			$el.find("[name=afrRange][value=" + afrRange + "]").prop("checked", true);
			return this;
		},
		onAttach: function() {
			Util.activeLink();
		}
	});
	
	return FkyzView;
});
