define(function(require) {
	var $ = require("jquery");
	var FormView = require("web/common/formView");
	var Handlebars = require("handlebars");
	
	var tmpl = require("text!web/index/pz/yppz/yppz_template.html");
	
	var YppzView = FormView.extend({
		id: "pz_spsr",
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
	
	return YppzView;
});
