define(function(require) {
	var Backbone = require("backbone");
	var Handlebars = require("handlebars");
	
	var tmpl = require("text!tmpl/zkhy_hymb_add_yhz.html");
	
	var YhzView = Backbone.View.extend({
		tmpl: Handlebars.compile(tmpl),
		initialize: function() {
			var self = this;
			var allLxrUrl = "json/allLxr.json";
			var selectedLxrUrl = "json/selectedLxr.json";
			var hyId = JSON.stringify({hyid:"001"});
			
			$.when(
				$.getJSON(allLxrUrl),
				$.getJSON(selectedLxrUrl, hyId)
			).done(function(allLxr, selectedLxr) {
				var data = {
					allLxr: allLxr[0],
					selectedLxr: selectedLxr[0]
				};
				self.render(data);
			});
		},
		render: function(data) {
			this.$el.html(this.tmpl(data));
		},
		close: function() {
			this.remove();
		}
	});
	
	return YhzView;
});