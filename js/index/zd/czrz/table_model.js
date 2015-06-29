define(function(require) {
	var Model = require("web/common/model");
	
	var FileModel = Model.extend({
		defaults: {
			level: "",
			operate: "",
			time: ""
		}
	});
	
	return FileModel;
});