define(function(require) {
	var tmpl = require("text!tmpl/zkhy_hymb.html");
	var HymbList = require("collection/hymb_collection");
	
	var Backbone = require("backbone");
	var Handlebars = require("handlebars");
	
	var ZkhyHymbView = Backbone.View.extend({
		id: "hymb_show",
		className: "contentRight",
		tmpl: Handlebars.compile(tmpl),
		initialize: function() {
			var self = this;
			this.collection = new HymbList();
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