define(function(require) {
    var Backbone = require("backbone");
    var NavTopView = require("view/nav_top_view");
    var LxrView = require("view/lxr_view");
    var ZkhyView = require("view/zkhy_view");
    
    var IndexView = Backbone.View.extend({
    	name: "index",
    	id: "wrapper",
    	initialize: function() {
    		this.navTopView = new NavTopView();
    		this.$el.html(this.navTopView.el);
    	},
    	appendContent: function() {
    		this.$el.append(this.contentView.el);
    	},
    	
    	zkhy: function() {
    		if(!(this.contentView && this.contentView.name === "zkhy")) {
    			this.closeView(this.contentView);
    			this.navTopView.activeLink("zkhy");
    			this.contentView = new ZkhyView();
				this.appendContent();
    		}
    	},
    	ydyhy: function(hyId) {
    		this.zkhy();
			this.contentView.ydyhy(hyId);
    	},
    	hyjl: function() {
    		this.zkhy();
			this.contentView.hyjl();
    	},
    	yyhy: function() {
    		this.zkhy();
			this.contentView.yyhy();
    	},
    	hymb: function() {
    		this.zkhy();
			this.contentView.hymb();
    	},
    	
    	lxr: function() {
    		if(!(this.contentView && this.contentView.name === "lxr")) {
    			this.closeView(this.contentView);
    			this.navTopView.activeLink("lxr");
    			this.contentView = new LxrView();
				this.appendContent();
    		}
    	},
    	showLxr: function() {
    		this.lxr();
    		this.contentView.showLxr();
    	},
    	addLxr: function(lxrId) {
    		this.lxr();
    		this.contentView.addLxr(lxrId);
    	},
    	closeView: function(view) {
    		view && (view.close ? view.close() : view.remove());
    	},
    	close: function() {
    		this.closeView(this.navTopView);
    		this.closeView(this.contentView);
    		this.remove();
    	}
    });
    
    return IndexView;
});