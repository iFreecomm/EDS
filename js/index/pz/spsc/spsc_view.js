define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var FormView = require("web/common/formView");
	var Handlebars = require("handlebars");
	
	var tmpl = require("text!web/index/pz/spsc/spsc_template.html");
	
	var SpscView = FormView.extend({
		id: "pz_spsc",
		template: Handlebars.compile(tmpl),
		bindings: {
			"#name": "name",
			"#szxh": "szxh",
			"#mnxh": "mnxh",
			"#fbl": "fbl",
			"#xsms": "xsms",
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
			var $tar = $(e.target);
			var $lxr = $tar.is(".lxr") ? $tar : $tar.parents(".lxr");
			$lxr.addClass("active").siblings().removeClass("active");
			var self = this;
			this.model.fetch().done(function() {
				self.model;
			});
		},
		
		onRender: function() {
			this.stickit().fixIE8();
			
			function slideEvent(event, ui) {
				$(event.target).siblings(".sliderValue").text(ui.value);
			}
			this.$(".slider").each(function() {
				var $this = $(this);
				$this.slider({
					range: "min",
					min: 0,
					max: "255",
					value: $this.next(".sliderValue").text(),
					slide: slideEvent
				});
			});
		},
		onAttach: function() {
			this.activeLink().selectmenu();
		}
	});
	
	return SpscView;
});
