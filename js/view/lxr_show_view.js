define(function(require) {
	var tmpl = require("text!tmpl/lxr_show.html");
	var LxrList = require("collection/lxr_collection");
	
	var Backbone = require("backbone");
	var Handlebars = require("handlebars");
	
	var classes = ["","sxj","zk","zkhy"];
	Handlebars.registerHelper("getClass", function(hclx) {
		return classes[hclx];
	});
	Handlebars.registerHelper("getInfo", function(hclx) {
		var result;
		if(hclx === "1") {
			result = this.hcmc;
		} else if(hclx === "2") {
			result = this.hcmc + "<br>" + this.IPdz;
		} else if(hclx === "3") {
			result = this.hcmc + "<br>" + this.dbURL;
		}
		return new Handlebars.SafeString(result);
	});
	
	var ShowLxrView = Backbone.View.extend({
		id: "lxr_show",
		tmpl: Handlebars.compile(tmpl),
		initialize: function() {
			var self = this;
			this.collection = new LxrList();
			this.collection.fetch({
				reset: true
			}).done(function() {
				self.$el.html(self.tmpl(self.collection.toJSON()));
			}).fail(function() {
				alert("获取数据失败！");
			});
		}
	});
	
	return ShowLxrView;
});
