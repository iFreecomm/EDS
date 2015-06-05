define(function(require) {
	var $ = require("jquery");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	
	var tmpl = require("text!web/index/hykz/hcddt/hcddt_template.html");
	
	require("mobilyblocks");
	
	var LxrShowView = Mn.ItemView.extend({
		id: "hykz_hcddt",
		template: Handlebars.compile(tmpl),
		events: {
			"click .circleMenu img": "circleMenu"
		},
		
		onAttach: function() {
			this.$(".circleMenu").mobilyblocks();
			Util.activeLink();
		},
		
		circleMenu: function(e) {
			e.preventDefault();
			
			var src = $(e.target).attr("src");
			console.log(src);
		}
	});
	
	return LxrShowView;
});
