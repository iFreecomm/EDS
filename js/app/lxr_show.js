define(function(require) {
	var Backbone = require("backbone");
	var Handlebars = require("handlebars");
	
	var classes = ["","sxj","zk","zkhy"];
	Handlebars.registerHelper("typeToClass", function(type) {
		return classes[type];
	});
	
	var Lxr = Backbone.Model.extend();
	
	var LxrList = Backbone.Collection.extend({
		model: Lxr,
		url: "json/lxr_show.json",
		sync: function(method, collection) {
			var self = this;
			$.ajax({
	    		type: "GET",
	    		url: self.url,
	    		dataType: "json"
	    	}).done(function(data) {
	    		self.reset(data);
	    	});
		}
	});
	
	var Lxrs = new LxrList();
	
	var LxrView = Backbone.View.extend({
		el: "#lxr_show_container",
		tmpl: Handlebars.compile($("#lxr_show_template").html()),
		
		events: {
			"click .lxr": "addOrUpdate"
		},
		
		initialize: function() {
			this.listenTo(Lxrs, "reset", this.addAll);
			
			Lxrs.fetch();
		},
		render: function() {
		},
		addAll: function() {
			this.$el.html(this.tmpl(Lxrs.toJSON()));
		},
		addOrUpdate: function() {
			this.close();
		},
		close: function() {
			this.remove();
		}
	});
	
	new LxrView;
});
