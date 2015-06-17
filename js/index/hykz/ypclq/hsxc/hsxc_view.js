define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/hykz/ypclq/hsxc/hsxc_template.html");
	var HsxcModel = require("web/index/hykz/ypclq/hsxc/hsxc_model");
	
	var HsxcView = Mn.ItemView.extend({
		id: "hykz_ypclq_hsxc",
		template: tmpl,
		bindings: {
			"#aecEn": "aecEn",
			"#agcEn": "agcEn",
			"[name=aecMode]" : "aecMode"
		},
		
		initialize: function() {
			this.listenTo(this.model, "change", this.save);
		},
		onRender: function() {
			this.stickit();
			var $el = this.$el;
			Util.initCheckboxClass($el)
				.addCheckboxEvent($el)
				.initRadioClass($el)
				.addRadioEvent($el);
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
	
	return HsxcView;
});
