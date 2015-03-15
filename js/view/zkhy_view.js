define(function(require) {
	require("css!style/zkhy.css");
	var ZkhyNavView = require("view/zkhy_nav_view");
	var ZkhyYdyhyView = require("view/zkhy_ydyhy_view");
	var ZkhyHyjlView = require("view/zkhy_hyjl_view");
	var ZkhyYyhyView = require("view/zkhy_yyhy_view");
	var ZkhyHymbView = require("view/zkhy_hymb_view");
	
	var ZkhyView = Backbone.View.extend({
		name: "zkhy",
		initialize: function() {
			this.navView = new ZkhyNavView();
			this.render();
		},
		render: function() {
			$("#c1").append(this.navView.el);
		},
		renderYdyhy: function() {
			this.closeContent();
			this.contentView = new ZkhyYdyhyView();
			this.renderContent();
		},
		renderHyjl: function() {
			this.closeContent();
			this.contentView = new ZkhyHyjlView();
			this.renderContent();
		},
		renderYyhy: function() {
			this.closeContent();
			this.contentView = new ZkhyYyhyView();
			this.renderContent();
		},
		renderHymb: function() {
			this.closeContent();
			this.contentView = new ZkhyHymbView();
			this.renderContent();
		},
		renderContent: function() {
			$("#c1").append(this.contentView.el);
		},
		closeContent: function() {
			this.contentView && this.contentView.remove();
		},
		close: function() {
			this.navView.remove();
			this.closeContent();
			this.remove();
		}
	});
	
	return ZkhyView;
});