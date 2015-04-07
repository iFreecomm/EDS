define(function(require) {
	var Radio = require("radio");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	
	var tmpl = require("text!web/index/zkhy/ydyhy/ydyhy_show_template.html");
	
	var YdyhyShowView = Mn.ItemView.extend({
		id: "zkhy_ydyhy_show",
		template: Handlebars.compile(tmpl),
		
		onAttach: function() {
			Radio.channel("index").command("activeLink");
		}
	});
	
	return YdyhyShowView;
});
