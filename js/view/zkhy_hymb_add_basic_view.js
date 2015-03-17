define(function(require) {
	var Backbone = require("backbone");
	
	var tmpl = require("text!tmpl/zkhy_hymb_add_basic.html");
	require("customSelect");
	
	var BasicView = Backbone.View.extend({
		className: "tabContent",
		bindings: {
			
		},
		initialize: function() {
			this.render();
		},
		render: function() {
			this.$el.html(tmpl);
//			this.stickit();
			this.$("select").customSelect();
		},
		close: function() {
			this.unstickit();
			this.remove();
		}
	});
	
	return BasicView;
});