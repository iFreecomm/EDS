define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/hykz/ypclq/fkyz/fkyz_template.html");
	
	var FkyzView = Mn.ItemView.extend({
		id: "hykz_ypclq_fkyz",
		template: tmpl,
		bindings: {
			"#afrEn": "afrEn",
			"[name=afrRange]": "afrRange",
			"[name=afrMode]": "afrMode"
		},
		
		initialize: function() {
			this.listenTo(this.model, "change:afrEn", this.save);
			this.listenTo(this.model, "change:afrRange", this.save);
			this.listenTo(this.model, "change:afrMode", this.save);
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
	
	return FkyzView;
});
