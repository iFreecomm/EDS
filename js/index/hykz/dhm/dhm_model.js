define(function(require) {
	var Model = require("web/common/model");
	
	var DhmModel = Model.extend({
		defaults: {
			venueId: [],
			enableVM: 0
		},
		urls: {
			"create": "addMeetingTemp.psp",
			"update": "modifyMeetingTemp.psp",
			"delete": "delMeetingTemp.psp",
			"read": "getMeetingTempDetail.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return DhmModel;
});