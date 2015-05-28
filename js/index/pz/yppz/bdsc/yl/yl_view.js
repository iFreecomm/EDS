define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/yppz/bdsc/yl/yl_template.html");
	
	var YlView = Mn.ItemView.extend({
		className: "slide-vertical-box-2",
		template: tmpl,
		bindings: {
			"[name=audOutPort]": "audOutPort",
			"[name=audOutName]": "audOutName",
			"[name=enable]": "enable",
			".sliderValue": "outVol"
		},
		initialize: function() {
			this.listenTo(this.model, "change", this.saveYl);
		},
		onRender: function() {
			this.stickit();
			Util.initCheckboxClass(this.$el)
				.addCheckboxEvent(this.$el)
				.initSlider(this.$el);
		},
		
		saveYl: function() {
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
	
	return YlView;
});
