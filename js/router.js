define(function(require) {
    var Backbone = require("backbone");
	var AppView = require("view/app_view");
    
    var Router = Backbone.Router.extend({
    	routes: {
    		"": "login",
    		"login": "login",
    		"portal": "portal",
    		
    		"zkhy": "ydyhy",
    		"zkhy/ydyhy": "ydyhy",
    		"zkhy/addYdyhy(/:hyId)": "addYdyhy",
    		"zkhy/hyjl": "hyjl",
    		"zkhy/yyhy": "yyhy",
    		"zkhy/hymb": "hymb",
    		"zkhy/hymb/add": "addHymb",
    		
    		"lxr": "showLxr",
    		"lxr/show": "showLxr",
    		"lxr/add(/:lxrId)": "addLxr"
    	},
    	initialize: function() {
    		this.view = new AppView();
    	},
    	
    	login: function() {
    		this.view.login();
    	},
    	portal: function() {
    		this.view.portal();
    	},
    	
    	ydyhy: function() {
			this.view.ydyhy();
    	},
    	addYdyhy: function(hyId) {
			this.view.addYdyhy(hyId);
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
    	addHymb: function() {
			this.view.addHymb();
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