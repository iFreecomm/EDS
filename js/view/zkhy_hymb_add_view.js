define(function(require) {
	var Backbone = require("backbone");
	
	var tmpl = require("text!tmpl/zkhy_hymb_add.html");
	
	var BasicView = require("view/zkhy_hymb_add_basic_view");
	var YhzView = require("view/zkhy_hymb_add_yhz_view");
	var DhmView = require("view/zkhy_hymb_add_dhm_view");
	var SpjzView = require("view/zkhy_hymb_add_spjz_view");
	var LzbmView = require("view/zkhy_hymb_add_lzbm_view");
	
	var ZkhyHymbAddView = Backbone.View.extend({
		id: "hymb_add",
		className: "contentRight",
		events: {
			"click .tabBox li": "selectTab"
		},
		initialize: function() {
			this.basicView = new BasicView();
			this.yhzView = new YhzView();
			this.yhzView.$el.addClass("tabContent").attr("id", "hymb_add_yhz"); //这是公用View，其它地方不需要这个class和这个id
			this.dhmView = new DhmView();
			this.spjzView = new SpjzView();
			this.lzbmView = new LzbmView();
			this.render();
		},
		render: function() {
			this.$el.html(tmpl);
			this.$(".tabContentBox")
				.append(this.basicView.el)
				.append(this.yhzView.el)
				.append(this.dhmView.el)
				.append(this.spjzView.el)
				.append(this.lzbmView.el);
		},
		selectTab: function(e) {
			var $tar = $(e.target);
			$tar.addClass("active").siblings().removeClass("active");
			this.$(".tabContentBox").children().removeClass("active").eq($tar.index()).addClass("active");
		},
		closeView: function(view) {
    		view && (view.close ? view.close() : view.remove());
    	},
		close: function() {
			this.closeView(this.basicView);
			this.closeView(this.yhzView);
			this.closeView(this.dhmView);
			this.closeView(this.spjzView);
			this.closeView(this.lzbmView);
			this.remove();
		}
	});
	
	return ZkhyHymbAddView;
});