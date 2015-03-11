define(function(require) {
	require("css!style/lxr_show.css");
	var tmpl = require("text!tmpl/lxr_show.html");
	var LxrList = require("collections/lxr_collection");
	
	var Backbone = require("backbone");
	var Handlebars = require("handlebars");
	
	var classes = ["","sxj","zk","zkhy"];
	Handlebars.registerHelper("typeToClass", function(type) {
		return classes[type];
	});
	
	var ShowLxrView = Backbone.View.extend({
		tmpl: Handlebars.compile(tmpl),
		
		initialize: function() {
			this.collection = new LxrList();
			
			this.listenTo(this.collection, "reset", this.addAll);
			
			this.collection.fetch();
		},
		render: function() {
		},
		addAll: function() {
			this.$el.html(this.tmpl(this.collection.toJSON())).appendTo($("#c1"));
		}
	});
	
	return ShowLxrView;
});