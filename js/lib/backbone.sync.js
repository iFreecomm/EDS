define(["backbone"], function(Backbone) {
	
	Backbone.sync = function(method, model, options) {
	    var xhr = Backbone.$.ajax({
	    	url: "json/login.json",
	    	type: "POST",
	    	dataType: "json",
	    	data: model.attributes,
	    	success: function(resp) {
	        	if(resp.state) {
	    			location.href = "portal.html";
	    		} else {
	    			console.log("login failed");
	    		}
	        }
	    });
	    
	    model.trigger('request', model, xhr, options);
	    return xhr;
	};
	
	// Map from CRUD to HTTP for our default `Backbone.sync` implementation.
	var methodMap = {
	   	'create': 'POST',
		'update': 'PUT',
		'patch':  'PATCH',
		'delete': 'DELETE',
		'read':   'GET'
	};
	
	return Backbone;
});
