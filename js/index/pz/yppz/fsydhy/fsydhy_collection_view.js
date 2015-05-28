define(function(require) {
	var Mn = require("marionette");
	var Slider3View = require("web/slider/slider3/view");
	
	var FsydhyCollectionView = Mn.CollectionView.extend({
		id: "pz_yppz_fsydhy",
		childView: Slider3View
	});
	
	return FsydhyCollectionView;
});
