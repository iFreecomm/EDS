define(function(require) {
	var Model = require("web/common/model");
	
	var FileModel = Model.extend({
		defaults: {
			ip: "",
			fileName: "",
			bandWidth: "",
			startTime: ""
		}
	});
	
	return FileModel;
});