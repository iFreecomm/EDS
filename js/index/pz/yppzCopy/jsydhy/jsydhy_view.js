define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var Handlebars = require("handlebars");
	var tmpl = require("text!web/index/pz/yppz/jsydhy/jsydhy_template.html");
	
	var BdsrView = Mn.ItemView.extend({
		id: "pz_yppz_jsydhy",
		template: Handlebars.compile(tmpl),
		ui: {
			formBox: ".formBox",
			select: "select"
		},
		bindings: {
		},
		events: {
			"click .btn" : "switchBtn"
		},
		switchBtn: function(e) {
			$(e.target).toggleClass("active");
		},
		
		onRender: function() {
			this.stickit();
			Util.initSlider(this.$el);
		},
		onAttach: function() {
			Util.activeLink().selectmenu(this.ui.select, this.ui.formBox);
		}
	});
	
	return BdsrView;
});
