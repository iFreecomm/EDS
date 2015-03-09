define(function(require) {
	var Backbone = require("backbone");
	var Handlebars = require("handlebars");
	require("jquery.handlebars");
	
	Handlebars.registerHelper("typeToClass", function(type) {
		if(type === 1) {
			return "sxj";
		} else if(type === 2) {
			return "zk";
		} else if(type === 3) {
			return "zkhy";
		}
	});
	
	var Lxr = new Backbone.Model();
	
	var LxrList = Backbone.Collection.extend({
		model: Lxr,
	});
	
	var Lxrs = new LxrList();
	
	var LxrView = Backbone.View.extend({
		el: "#mainContent",
		tmpl: Handlebars.compile($("#template").html()),
		initialize: function() {
			
		},
		render: function() {
			this.$el.html();
		}
	});
	
	$("#mainContent").handlebars($("#template"), "json/lxr_show.json");
});
