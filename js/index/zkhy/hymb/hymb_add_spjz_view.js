define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_spjz_template.html");
	
	var SpjzView = Mn.ItemView.extend({
		id: "hymb_add_spjz",
		template: tmpl
	});
	
	return SpjzView;
});