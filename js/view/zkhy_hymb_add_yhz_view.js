define(function(require) {
	var Backbone = require("backbone");
	
	var tmpl = require("text!tmpl/zkhy_hymb_add_yhz.html");
	
	var YhzView = Backbone.View.extend({
		className: "tabContent",
		bindings: {
			
		},
		initialize: function() {
			this.render();
		},
		render: function() {
			this.$el.html(tmpl);
//			this.stickit();
		},
		close: function() {
			this.unstickit();
			this.remove();
		}
	});
	
	return YhzView;
});