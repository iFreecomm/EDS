define(function(require) {
	var Backbone = require("backbone");
	
	var HymbModel = Backbone.Model.extend({
		defaults: {
			name: "模板名称333",
			desc: "这是一个默认模板",
			audProt: "3",
			vidProt: "3",
			vidFmt: "3",
			frameRate: "3",
			vidQuality: "3",
			secVidFlag: true,
			secProt: "3",
			secFmt: "3",
			secFrameRate: "3",
			secQuality: "3",
			secVidSend: "1",
			enbTransGuard: true
		},
		urls: {
			"create": "json/hymb.do",
			"update": "json/hymb.do",
			"delete": "json/hymb.do",
			"read": "json/hymb.do"
		}
	});
	
	return HymbModel;
});