define(function(require) {
	var Backbone = require("backbone");
	var FsydhyModel = require("web/index/hykz/ypclq/fsydhy/fsydhy_model");
	
	var FsydhyCollection = Backbone.Collection.extend({
		model: FsydhyModel,
		urls: {
			"read": "yppz_fsydhy.psp"
		},
		parse: function(res) {
			if(res && res.data && res.data.fsydhy)
				return res.data.fsydhy;
			return [];
		}
	});
	
	return FsydhyCollection;
});