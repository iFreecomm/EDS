define(function(require) {
	var Backbone = require("backbone");
	var LoginView = require("view/login_view");
	var PortalView = require("view/portal_view");
	var IndexView = require("view/index_view");
	
	var AppView = Backbone.View.extend({
		el: "body",
		
		resetView: function() {
    		this.curView && this.curView.close();
    	},
		setContent: function() {
    		this.$el.html(this.curView.el);
    	},
		
		login: function() {
    		if(!(this.curView && this.curView.name === "login")) {
    			this.resetView();
    			this.curView = new LoginView();
    			this.setContent();
    		}
    	},
    	
    	portal: function() {
    		if(!(this.curView && this.curView.name === "portal")) {
    			this.resetView();
    			this.curView = new PortalView();
    			this.setContent();
    		}
    	},
		
		index: function() {
    		if(!(this.curView && this.curView.name === "index")) {
    			this.resetView();
    			this.curView = new IndexView();
    			this.setContent();
    		}
    	},
    	showLxr: function() {
    		this.index();
    		this.curView.showLxr();
    	},
    	addLxr: function(lxrId) {
    		this.index();
    		this.curView.addLxr(lxrId);
    	},
    	ydyhy: function(hyId) {
    		this.index();
			this.curView.ydyhy(hyId);
    	},
    	hyjl: function() {
    		this.index();
			this.curView.hyjl();
    	},
    	yyhy: function() {
    		this.index();
			this.curView.yyhy();
    	},
    	hymb: function() {
    		this.index();
			this.curView.hymb();
    	},
    	addHymb: function() {
    		this.index();
			this.curView.addHymb();
    	}
	});
	
	return AppView;
});