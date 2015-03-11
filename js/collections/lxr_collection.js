define(function(require) {
	var Backbone = require("backbone");
	var LxrModel = require("models/lxr_model");
	
	var LxrList = Backbone.Collection.extend({
		model: LxrModel,
		sync: function(method, collection) {
			var self = this;
			$.ajax({
	    		type: "GET",
	    		url: "json/lxr_show.json",
	    		dataType: "json"
	    	}).done(function(data) {
	    		self.reset(data);
	    	});
		}
	});
	
	return LxrList;
});