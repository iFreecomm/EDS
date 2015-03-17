define(function(require) {
    var tmpl = require("text!tmpl/portal.html");
	
    var Backbone = require("backbone");
    
    var PortalView = Backbone.View.extend({
    	name: "portal",
    	id: "wrapper",
        initialize: function() {
        	this.render();
        },
        render: function() {
        	this.$el.html(tmpl);
        },
        close: function() {
        	this.remove();
        }
    });
    
    return PortalView;
});