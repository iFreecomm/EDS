define(function(require) {
	var Model = require("web/common/model");
	
	var AlertModel = Model.extend({
		defaults: {
			title: "提示框",
			content: ""
		}
	});
	
	return AlertModel;
});