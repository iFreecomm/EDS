define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_lzbm_template.html");
	
	var LzbmView = Mn.ItemView.extend({
		id: "hymb_add_lzbm",
		template: tmpl
	});
	
	return LzbmView;
});