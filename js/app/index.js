define(function(require) {
    var Backbone = require("backbone");
    
    var Router = Backbone.Router.extend({
    	routes: {
    		"*path": "load"
    	},
    	load: function(path) {
    		alert(path);
    	}
    });
    
    new Router();
    Backbone.history.start();
});