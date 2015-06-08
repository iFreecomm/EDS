define(function(require) {
	var Backbone = require("backbone");
	var Radio = require("radio");
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/modal/loading/template.html");
	
	var View = Mn.ItemView.extend({
		className: "modal_loading",
		template: tmpl
	});
	
	return View;
});