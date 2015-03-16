define(function(require) {
	var ydyhy_tmpl = require("text!tmpl/zkhy_ydyhy.html");
	
	var Backbone = require("backbone");
	var Handlebars = require("handlebars");
	
	
	var ZkhyYdyhyView = Backbone.View.extend({
		id: "ydyhy",
		className: "contentRight",
		tmpl: Handlebars.compile(ydyhy_tmpl),
		initialize: function(opt) {
			this.model = new Backbone.Model();
			this.render();
		},
		render: function() {
			this.$el.html(this.tmpl(this.model.toJSON()));
		}
	});
	
	return ZkhyYdyhyView;
});