define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	
	var tmpl = require("text!web/index/hykz/hcddt/hcddt_template.html");
	
	require("mobilyblocks");
	
	var LxrShowView = Mn.ItemView.extend({
		id: "hykz_hcddt",
		template: Handlebars.compile(tmpl),
		events: {
			"click .circleMenu img": "circleMenu"
		},
		circleMenu: function(e) {
			e.preventDefault();
			
			var src = $(e.target).attr("src");
			console.log(src);
		},
		
		onAttach: function() {
			this.$(".circleMenu").mobilyblocks();
			Radio.channel("index").command("activeLink");
		}
	});
	
	return LxrShowView;
});
