define(function(require) {
    var Backbone = require("backbone");
    
    var IndexView = Backbone.View.extend({
    	el: "body",
    	events: {
    		"click .header a": "clickHeader"
    	},
    	clickHeader: function(e) {
    		var $tar = $(e.target);
    		var $a = $tar.parents("a");
    		$(".header").find("a").removeClass("active");
    		$a.addClass("active");
    	},
    	
    	resetView: function() {
    		this.subview && this.subview.close();
    	},
    	
    	zkhy: function() {
    		if(!(this.subview && this.subview.name === "zkhy")) {
    			this.resetView();
    			var ZkhyView = require("view/zkhy_view");
    			this.subview = new ZkhyView();
    		}
    	},
    	ydyhy: function(hyId) {
    		this.zkhy();
			this.subview.renderYdyhy(hyId);
    	},
    	hyjl: function() {
    		this.zkhy();
			this.subview.renderHyjl();
    	},
    	yyhy: function() {
    		this.zkhy();
			this.subview.renderYyhy();
    	},
    	hymb: function() {
    		this.zkhy();
			this.subview.renderHymb();
    	},
    	
    	lxr: function() {
    		if(!(this.subview && this.subview.name === "lxr")) {
    			this.resetView();
    			var LxrView = require("view/lxr_view");
    			this.subview = new LxrView();
    		}
    	},
    	showLxr: function() {
    		this.lxr();
    		this.subview.renderShowLxr();
    	},
    	addLxr: function(lxrId) {
    		this.lxr();
    		this.subview.renderAddLxr(lxrId);
    	}
    });
    
    return IndexView;
});