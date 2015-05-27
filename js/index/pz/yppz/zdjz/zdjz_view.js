define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/yppz/zdjz/zdjz_template.html");
	var ZdjzModel = require("web/index/pz/yppz/zdjz/zdjz_model");
	
	var ZdjzView = Mn.ItemView.extend({
		id: "pz_yppz_zdjz",
		template: tmpl,
		bindings: {
			"#ansEn": "ansEn",
			"[name=ansMode]" : "ansMode"
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
	
	return ZdjzView;
});
