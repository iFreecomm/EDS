define(function(require) {
	var $ = require("jquery");
	var FormView = require("web/common/formView");
	var Handlebars = require("handlebars");
	
	var tmpl = require("text!web/index/pz/spsr/spsr_template.html");
	
	var SpsrView = FormView.extend({
		id: "pz_spsr",
		template: Handlebars.compile(tmpl),
		bindings: {
			"#name": "name",
			"#kzck": "kzck",
			"#ydsd": "ydsd",
			"#srjkxh": "srjkxh",
			
			"#ld": "ld",
			"#dbd": "dbd",
			"#bhd": "bhd",
			"#sppy": "sppy",
			"#czpy": "czpy"
		},
		events: {
			"click .lxr" : "selectLxr"
		},
		selectLxr: function(e) {
			var self = this;
			var $tar = $(e.target);
			var $lxr = $tar.is(".lxr") ? $tar : $tar.parents(".lxr");
			$lxr.addClass("active").siblings().removeClass("active");
			
			this.model.myFetch({
				id: $lxr.data("id")
			}).done(function() {
				self.refreshForm();
			});
		},
		
		onRender: function() {
			this.stickit().initSlider();
		},
		onAttach: function() {
			this.activeLink().selectmenu();
		}
	});
	
	return SpsrView;
});
