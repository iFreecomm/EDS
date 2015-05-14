define(function(require) {
	var $ = require("jquery");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/spsr/spsr_template.html");
	
	var SpsrView = Mn.ItemView.extend({
		id: "pz_spsr",
		template: Handlebars.compile(tmpl),
		
		ui: {
			formBox: ".formBox",
			select: "select"
		},
		
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
				//TODO
//				self.refreshForm();
			});
		},
		
		onRender: function() {
			this.stickit();
			Util.initSlider(this.$el);
		},
		onAttach: function() {
			Util.activeLink().selectmenu(this.ui.select, this.ui.formBox);
			this.ui.select.change();
		}
	});
	
	return SpsrView;
});
