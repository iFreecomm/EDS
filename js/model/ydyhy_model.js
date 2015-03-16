define(function(require) {
	var Backbone = require("backbone");
	
	var YdyhyModel = Backbone.Model.extend({
		defaults: {
			hcmc: "会场名称333",
			hclx: "3",
			sxj: "3",
			dyyzw: "3",
			cyyyjl: true,
			MIC: ["6","12"],
			jlyxj: "3",
			hcdk: "3",
			hm: "号码333",
			IPdz: "172.18.0.1333",
			dbdk: "3",
			dbURL: "点播URL333",
			pxh: "pxh333"
		},
		urls: {
			"create": "json/zkhy_ydyhy.do",
			"update": "json/zkhy_ydyhy.do",
			"delete": "json/zkhy_ydyhy.do",
			"read": "json/zkhy_ydyhy.do"
		}
	});
	
	return YdyhyModel;
});