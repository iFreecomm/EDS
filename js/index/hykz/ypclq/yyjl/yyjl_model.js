define(function(require) {
	var Model = require("web/common/model");
	
	var YyjlModel = Model.extend({
		defaults: {
			duration: 1,
			minimum: 10,
			
			zbEn: 0,
			duration1: 100,
			camera1: 0,
			
			jmEn: 0,
			duration2: 100,
			camera2: 0
		},
		urls: {
			"create": "setYyjlCfg.psp",
			"read": "getYyjlCfg.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return YyjlModel;
});