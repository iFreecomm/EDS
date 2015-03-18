define(function(require) {
	var tmpl = require("text!tmpl/zkhy_ydyhy.html");
	var YdyhyList = require("collection/ydyhy_collection");
	
	var Backbone = require("backbone");
	var Handlebars = require("handlebars");
	
	var ZkhyHymbView = Backbone.View.extend({
		id: "ydyhy_show",
		className: "contentRight",
		tmpl: Handlebars.compile(tmpl),
		initialize: function() {
			var self = this;
			this.collection = new YdyhyList();
			this.collection.fetch({
				reset: true
			}).done(function() {
				self.$el.html(self.tmpl(self.collection.toJSON()));
			}).fail(function() {
				alert("获取数据失败！");
			});
		}
	});
	
	return ZkhyHymbView;
});