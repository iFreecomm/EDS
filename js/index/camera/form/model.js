define(function(require) {
	var Model = require("web/common/model");
	
	var CameraModel = Model.extend({
		defaults: {
			comPort: 0,
			evenOddCheck: 0,
			comMode: 0,
			stopBit: 0,
			baudRate:0,
			addr: 0,
			dataBit: 0,
			cameraProt: 0
		},
		urls: {
			"create": "temp.psp",
			"read": "temp.psp"
		},
		parse: function(res) {
			return res.data;
		}
	});
	
	return CameraModel;
});