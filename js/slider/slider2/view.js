define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/slider/slider2/template.html");
	
	var BdsrView = Mn.ItemView.extend({
		className: "slide-vertical-box-1",
		template: tmpl,
		bindings: {
			"[name=audInPort]": "audInPort",
			"[name=audInName]": "audInName",
			"[name=enable]": "enable",
			"[name=phtPwrEn]": "phtPwrEn",
			".sliderValue": "involume"
		},
		initialize: function() {
			this.listenTo(this.model, "change", this.save);
		},
		onRender: function() {
			this.stickit();
			Util.initCheckboxClass(this.$el)
				.addCheckboxEvent(this.$el)
				.initSlider(this.$el);
		},
		
		save: function() {
			this.model
			.save()
			.done(function() {
				alert("保存成功！");
			})
			.fail(function() {
				alert("保存失败！");
			});
		}
	});
	
	return BdsrView;
});
