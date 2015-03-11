define(function(require) {
    var Backbone = require("backbone");
    
    var Router = Backbone.Router.extend({
    	routes: {
    		"lxr": "showLxr",
    		"lxr/show": "showLxr",
    		"lxr/add(/:lxrId)": "addLxr"
    	},
    	resetView: function() {
    		this.view && (this.view.close ? this.view.close() : this.view.remove());
    	},
    	showLxr: function() {
    		var ShowLxrView = require("views/lxr_show_view");
    		this.resetView();
    		this.view = new ShowLxrView();
    	},
    	addLxr: function(lxrId) {
    		var AddLxrView = require("views/lxr_add_view");
    		this.resetView();
    		this.view = new AddLxrView({lxrId:lxrId});
    	}
    });
    
    new Router();
    Backbone.history.start();
});