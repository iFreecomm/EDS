define(function(require) {
	var Mn = require("marionette");
	var Radio = require("radio");
	var Slider3View = require("web/slider/slider3/view");
	
	var FsydhyCollectionView = Mn.CollectionView.extend({
		id: "hykz_ypclq_fsydhy",
		childView: Slider3View,
		
		onRender: function() {
			Radio.channel("ypclq").on("refresh", this._refresh, this);
		},
		
		onDestroy: function() {
			Radio.channel("ypclq").off("refresh", this._refresh);
		},
		
		_refresh: function(data) {
			var bdsrArr = data.bdsr;
			this.children.each(function(view, index) {
				view._refresh(1);
			});
		}
	});
	
	return FsydhyCollectionView;
});
