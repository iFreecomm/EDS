define(function(require) {
    var Backbone = require("backbone");
    
    var Router = Backbone.Router.extend({
    	routes: {
    		"zkhy": "ydyhy",
    		"zkhy/ydyhy": "ydyhy",
    		"zkhy/hyjl": "hyjl",
    		"zkhy/yyhy": "yyhy",
    		"zkhy/hymb": "hymb",
    		
    		"lxr": "showLxr",
    		"lxr/show": "showLxr",
    		"lxr/add(/:lxrId)": "addLxr"
    	},
    	resetView: function() {
    		this.view && this.view.close();
    	},
    	
    	zkhy: function() {
    		if(!(this.view && this.view.name === "zkhy")) {
    			this.resetView();
    			var ZkhyView = require("view/zkhy_view");
    			this.view = new ZkhyView();
    		}
    	},
    	ydyhy: function() {
    		this.zkhy();
			this.view.renderYdyhy();
    	},
    	hyjl: function() {
    		this.zkhy();
			this.view.renderHyjl();
    	},
    	yyhy: function() {
    		this.zkhy();
			this.view.renderYyhy();
    	},
    	hymb: function() {
    		this.zkhy();
			this.view.renderHymb();
    	},
    	
    	lxr: function() {
    		if(!(this.view && this.view.name === "lxr")) {
    			this.resetView();
    			var LxrView = require("view/lxr_view");
    			this.view = new LxrView();
    		}
    	},
    	showLxr: function() {
    		this.lxr();
    		this.view.renderShowLxr();
    	},
    	addLxr: function(lxrId) {
    		this.lxr();
    		this.view.renderAddLxr(lxrId);
    	}
    });
    
    var router = new Router();
    Backbone.history.start();
    
    return router;
});