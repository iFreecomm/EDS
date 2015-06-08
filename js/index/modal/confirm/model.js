define(function(require) {
	var Model = require("web/common/model");
	
	var ConfirmModel = Model.extend({
		defaults: {
			title: "确认框",
			content: ""
		}
	});
	
	return ConfirmModel;
});