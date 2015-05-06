define(function(require) {
	var Model = require("web/common/model");
	
	var SearchTermsModel = Model.extend({
		defaults: {		
			startTime: "",
			endTime: "",
			diskId: 0,
			fileType: 0,
			confNum: -1,
			confName: "",
			convenor: ""
		}
	});
	
	return SearchTermsModel;
});