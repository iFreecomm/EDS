define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/slider/slider4/template.html");
	
	var SliderView = Mn.ItemView.extend({
		className: "slide-vertical-box-3",
		template: tmpl,
		bindings: {
			".sliderValue": "volume"
		},
		initialize: function() {
			this.listenTo(this.model, "change", function() {
				this.trigger("save:collection");
			});
		},
		onRender: function() {
			this.stickit();
			Util.initSlider(this.$el);
		}
	});
	
	return SliderView;
});
