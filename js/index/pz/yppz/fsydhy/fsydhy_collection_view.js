define(function(require) {
	var Mn = require("marionette");
	var FsydhyView = require("web/index/pz/yppz/fsydhy/fsydhy_view");
	
	var FsydhyCollectionView = Mn.CollectionView.extend({
		id: "pz_yppz_fsydhy",
		childView: FsydhyView
	});
	
	return FsydhyCollectionView;
});
