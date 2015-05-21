define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/yppz/zdjz/zdjz_template.html");
	
	var ZdjzView = Mn.ItemView.extend({
		id: "pz_yppz_zdjz",
		template: tmpl,
		
		events: {
			"click .btn-switch3": "toggleSwitch",
			"click .saveBtn" : "saveZdjz"
		},
		toggleSwitch: function(e) {
			$(e.target).toggleClass("active");
		},
		saveZdjz: function() {
			this.model.set(this._getZdjz())
			.save()
			.done(function() {
				alert("保存成功！");
			})
			.fail(function() {
				alert("保存失败！");
			});
		},
		_getZdjz: function() {
			var $el = this.$el;
			return {
				ansEn: $el.find("#ansEn").is(".active") ? 1 : 0,
				ansMode: +$el.find("[name=ansMode]:checked").val()
			};
		},
		
		onRender: function() {
			this.renderData();
			Util.initRadioClass(this.$el)
				.addRadioEvent(this.$el);
		},
		renderData: function() {
//			var $el = this.$el;
//			var model = this.model;
//			model.get("ansEn") && $el.find("#ansEn").addClass("active");
//			var ansMode = model.get("ansMode");
//			$el.find("[name=ansMode][value=" + ansMode + "]").prop("checked", true);
			return this;
		},
		onAttach: function() {
			Util.activeLink();
		}
	});
	
	return ZdjzView;
});
