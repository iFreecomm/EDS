define(function(require) {
    var Backbone = require("backbone");
    
    var Router = Backbone.Router.extend({
    	routes: {
    		":container/*path": "load"
    	},
    	load: function(container, path) {
    		$("#"+container).load(path);
    	}
    });
    
    new Router();
    Backbone.history.start();
});