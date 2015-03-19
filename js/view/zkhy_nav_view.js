define(function(require) {
	var nav_tmpl = require("text!tmpl/zkhy_nav.html");
	
	var Backbone = require("backbone");
	
	var ZkhyNavView = Backbone.View.extend({
		className: "navLeft",
		initialize: function() {
			this.render();
		},
		render: function() {
			this.$el.html(nav_tmpl);
		},
		activeLink: function(href) {
			this.$("a").removeClass("active");
    		this.$("a[href*="+href+"]").addClass("active");
		}
	});
	
	return ZkhyNavView;
});