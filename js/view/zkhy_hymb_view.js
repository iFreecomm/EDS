define(function(require) {
	var nav_tmpl = require("text!tmpl/zkhy_nav.html");
	
	var Backbone = require("backbone");
	
	var ZkhyHymbView = Backbone.View.extend({
		initialize: function() {
			this.render();
		},
		render: function() {
			this.$el.html(nav_tmpl);
		}
	});
	
	return ZkhyHymbView;
});