define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var FormView = require("web/common/formView");
	var Handlebars = require("handlebars");
	
	var SpsrModel = require("web/index/pz/spsr/spsr_model");
	var tmpl = require("text!web/index/pz/spsr/spsr_template.html");
	
	var SpsrView = FormView.extend({
		id: "pz_spsr",
		template: Handlebars.compile(tmpl),
		bindings: {
			"#name": "name",
			"#kzck": "kzck",
			"#ydsd": "ydsd",
			"#srjkxh": "srjkxh"
		},
		events: {
			"click .lxr" : "selectLxr"
		},
		selectLxr: function(e) {
			var self = this;
			var $tar = $(e.target);
			var $lxr = $tar.is(".lxr") ? $tar : $tar.parents(".lxr");
			$lxr.addClass("active").siblings().removeClass("active");
			this.model.fetch().done(function() {
				console.log(123+self.model);
			});
		},
		
		initialize: function() {
			this.model = new SpsrModel();
		},
		onRender: function() {
			this.stickit().fixIE8();
			function slideEvent(event, ui) {
				$(event.target).siblings(".sliderValue").text(ui.value);
			}
			this.$(".slider").slider({
				range: "min",
				value: 100,
				min: 0,
				max: 255,
				slide: slideEvent
			});
		},
		onAttach: function() {
			var $appendTo = this.$(".formBox");
			function changeEvent(event, ui) {
				$(event.target).change();
			}
			this.$("select").selectmenu({
				change: changeEvent,
				appendTo: $appendTo
			});
			Radio.channel("index").command("activeLink");
		},
		onShow: function() {
			this.$(".lxr").eq(0).click();
		}
	});
	
	return SpsrView;
});
