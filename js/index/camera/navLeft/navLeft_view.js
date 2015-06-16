define(function(require) {
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var tmpl = require("text!web/index/camera/navLeft/navLeft_template.html");
	
	var NavLeftView = Mn.ItemView.extend({
		id: "navLeft_camera",
		tagName: "ul",
		template: Handlebars.compile(tmpl)
	});
	
	return NavLeftView;
});
