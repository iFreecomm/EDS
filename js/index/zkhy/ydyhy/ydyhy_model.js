define(function(require) {
	var Model = require("web/common/model");
	
	var YdyhyModel = Model.extend({
		idAttribute: "recordId",
		defaults: {
			venueId: [2, 4, 5],
			name: "会场名称444",
			number: "0007",
			pwChairman: "123456",
			date: "2015-04-01",
			time: "11:01:21",
			desc: "test",
			meetingType: 0,
			bandwidth: 1920000,
			pwMeeting: "123456789",
			duration: 30
		},
		urls: {
			"create": "addMeeting.psp",
			"update": "modifyMeeting.psp",
			"delete": "delMeeting.psp",
			"read": "getMeetingDetail.psp"
		},
		parse: function(res, options) {
			if(options.collection) {
				return res;
			} else {
				return res.data;
			}
		}
	});
	
	return YdyhyModel;
});