define(function(require) {
    var Backbone = require("backbone");
	var IndexView = require("view/index_view");
    
    var Router = Backbone.Router.extend({
    	routes: {
    		"": "ydyhy",
    		
    		"zkhy": "ydyhy",
    		"zkhy/ydyhy(/:hyId)": "ydyhy",
    		"zkhy/hyjl": "hyjl",
    		"zkhy/yyhy": "yyhy",
    		"zkhy/hymb": "hymb",
    		
    		"lxr": "showLxr",
    		"lxr/show": "showLxr",
    		"lxr/add(/:lxrId)": "addLxr"
    	},
    	initialize: function() {
    		this.view = new IndexView();
    	},
    	
    	ydyhy: function(hyId) {
			this.view.ydyhy(hyId);
    	},
    	hyjl: function() {
			this.view.hyjl();
    	},
    	yyhy: function() {
			this.view.yyhy();
    	},
    	hymb: function() {
			this.view.hymb();
    	},
    	
    	showLxr: function() {
    		this.view.showLxr();
    	},
    	addLxr: function(lxrId) {
    		this.view.addLxr(lxrId);
    	}
    });
    
    var router = new Router();
    Backbone.history.start();
    
    return router;
});