define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/slider/slider3/template.html");
	
	var SliderView = Mn.ItemView.extend({
		className: "slide-vertical-box-2",
		template: tmpl,
		bindings: {
			"[name=audOutPort]": "audOutPort",
			"[name=audOutName]": "audOutName",
			"[name=enable]": "enable",
			".sliderValue": "outVol"
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
			.done(function(res) {
				if(res.code != 0)
				{
					Util.alert("保存失败!");
				}
				//alert("保存成功！");
			})
			.fail(function() {
				Util.alert("保存失败！");
			});
		}
	});
	
	return SliderView;
});
