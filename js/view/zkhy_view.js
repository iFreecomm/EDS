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
		renderYdyhy: function(hyId) {
			this.navView.activeLink("ydyhy");
			this.closeView(this.contentView);
			this.contentView = new ZkhyYdyhyView({hyId: hyId});
			this.renderContent();
		},
		renderHyjl: function() {
			this.navView.activeLink("hyjl");
			this.closeView(this.contentView);
			this.contentView = new ZkhyHyjlView();
			this.renderContent();
		},
		renderYyhy: function() {
			this.navView.activeLink("yyhy");
			this.closeView(this.contentView);
			this.contentView = new ZkhyYyhyView();
			this.renderContent();
		},
		renderHymb: function() {
			this.navView.activeLink("hymb");
			this.closeView(this.contentView);
			this.contentView = new ZkhyHymbView();
			this.renderContent();
		},
		renderContent: function() {
			$("#c1").append(this.contentView.el);
		},
		close: function() {
			this.closeView(this.navView);
			this.closeView(this.contentView);
			this.remove();
		},
		closeView: function(view) {
    		view && (view.close ? view.close() : view.remove());
    	}
	});
	
	return ZkhyView;
});