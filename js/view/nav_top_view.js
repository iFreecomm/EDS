define(function(require) {
	var tmpl = require("text!tmpl/nav_top.html");
	
	var Backbone = require("backbone");
	
	var NavTopView = Backbone.View.extend({
		className: "navTop",
		
		initialize: function() {
			this.render();
		},
		render: function() {
			this.$el.html(tmpl);
		},
		activeLink: function(href) {
			this.$("a").removeClass("active");
    		this.$("a[href*="+href+"]").addClass("active");
		}
	});
	
	return NavTopView;
});