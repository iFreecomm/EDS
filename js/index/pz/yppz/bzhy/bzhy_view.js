define(function(require) {
	var FormView = require("web/common/formView");
	var Handlebars = require("handlebars");
	
	var tmpl = require("text!web/index/pz/yppz/bzhy/bzhy_template.html");
	
	var BdsrView = FormView.extend({
		id: "pz_yppz_bzhy",
		template: Handlebars.compile(tmpl),
		bindings: {
		},
		events: {
			"click .btn" : "switchBtn"
		},
		switchBtn: function(e) {
			$(e.target).toggleClass("active");
		},
		
		onRender: function() {
			this.stickit().initSlider();
		},
		onAttach: function() {
			this.activeLink().selectmenu();
		}
	});
	
	return BdsrView;
});
