define(function(require) {
	var Backbone = require("backbone");
	
	var YdyhyModel = Backbone.Model.extend({
		defaults: {
			lxrs: ["001", "002", "003"],
			hymc: "会场名称444",
			hyhm: "0007",
			zxmm: "123456",
			yyrq: "2015-04-01",
			hymb: "4",
			hydk: "70KB",
			hymm: "123456789",
			cxsj: "3h"
		},
		urls: {
			"create": "json/ydyhy.do",
			"update": "json/ydyhy.do",
			"delete": "json/ydyhy.do",
			"read": "json/ydyhy.do"
		}
	});
	
	return YdyhyModel;
});