define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/hykz/ypclq/yyjl/slide_template.html");
	
	var SlideView = Mn.ItemView.extend({
		template: tmpl,
		bindings: {
			"#time": "time",
			"#decibel": "decibel"
		},
		
		initialize: function() {
			this.listenTo(this.model, "change", this.save);
		},
		onRender: function() {
			this.stickit();
			Util.initSlider(this.$el);
		},
		
		save: function() {
			this.model.save()
			.done(function() {
				//success
			})
			.fail(function() {
				//error
			});
		}
	});
	
	return SlideView;
});
