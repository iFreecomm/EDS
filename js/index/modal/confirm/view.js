define(function(require) {
	var Backbone = require("backbone");
	var Radio = require("radio");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/modal/confirm/template.html");
	
	var ConfirmModel = require("web/index/modal/confirm/model");
	
	var View = Mn.ItemView.extend({
		className: "modal_confirm",
		template: Handlebars.compile(tmpl),
		events: {
			"click .confirmBtn": "confirm",
			"click .cancelBtn": "cancel",
			"click .closeBtn": "cancel"
		},
		
		initialize: function() {
			this.model = new ConfirmModel(this.options);
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