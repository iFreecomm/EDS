define(function(require) {
	var ZkhyNavView = require("view/zkhy_nav_view");
	var ZkhyYdyhyView = require("view/zkhy_ydyhy_view");
	var ZkhyYdyhyAddView = require("view/zkhy_ydyhy_add_view");
	var ZkhyHyjlView = require("view/zkhy_hyjl_view");
	var ZkhyYyhyView = require("view/zkhy_yyhy_view");
	var ZkhyHymbView = require("view/zkhy_hymb_view");
	var ZkhyHymbAddView = require("view/zkhy_hymb_add_view");
	
	var ZkhyView = Backbone.View.extend({
		name: "zkhy",
		id: "c1",
		initialize: function() {
			this.navView = new ZkhyNavView();
			this.$el.html(this.navView.el);
		},
		appendContent: function() {
    		this.$el.append(this.contentView.el);
    	},
		ydyhy: function() {
			this.navView.activeLink("ydyhy");
			this.closeView(this.contentView);
			this.contentView = new ZkhyYdyhyView();
			this.appendContent();
		},
		addYdyhy: function(hyId) {
			this.navView.activeLink("ydyhy");
			this.closeView(this.contentView);
			this.contentView = new ZkhyYdyhyAddView({hyId: hyId});
			this.appendContent();
		},
		hyjl: function() {
			this.navView.activeLink("hyjl");
			this.closeView(this.contentView);
			this.contentView = new ZkhyHyjlView();
			this.appendContent();
		},
		yyhy: function() {
			this.navView.activeLink("yyhy");
			this.closeView(this.contentView);
			this.contentView = new ZkhyYyhyView();
			this.appendContent();
		},
		hymb: function() {
			this.navView.activeLink("hymb");
			this.closeView(this.contentView);
			this.contentView = new ZkhyHymbView();
			this.appendContent();
		},
		addHymb: function() {
			this.navView.activeLink("hymb");
			this.closeView(this.contentView);
			this.contentView = new ZkhyHymbAddView();
			this.appendContent();
		},
		closeView: function(view) {
    		view && (view.close ? view.close() : view.remove());
    	},
		close: function() {
			this.closeView(this.navView);
			this.closeView(this.contentView);
			this.remove();
		}
	});
	
	return ZkhyView;
});