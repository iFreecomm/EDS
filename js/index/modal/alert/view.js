define(function(require) {
	var Backbone = require("backbone");
	var Radio = require("radio");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/modal/alert/template.html");
	
	var AlertModel = require("web/index/modal/alert/model");
	
	var View = Mn.ItemView.extend({
		className: "modal_alert",
		template: Handlebars.compile(tmpl),
		events: {
			"click .confirmBtn": "confirm",
			"click .closeBtn": "cancel"
		},
		
		initialize: function() {
			this.model = new AlertModel(this.options);
		},
		
		confirm: function() {
			var self = this;
			Util.close().then(function() {
				self.trigger("confirm");
			});
		},
		
		cancel: function() {
			var self = this;
			Util.close().then(function() {
				self.trigger("cancel");
			});
		}
	});
	
	return View;
});