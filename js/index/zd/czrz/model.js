define(function(require) {
	var Model = require("web/common/model");
	
	var SearchModel = Model.extend({
		defaults: {
			startTime: "",
			endTime: "",
			level: 0
		},
		
		resetDefaults: function() {
			this.set(this.defaults);
		}
	});
	
	return SearchModel;
});