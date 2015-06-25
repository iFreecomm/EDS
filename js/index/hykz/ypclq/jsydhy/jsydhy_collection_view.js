define(function(require) {
	var $ = require("jquery");
	var Mn = require("marionette");
	var Radio = require("radio");
	var Slider2View = require("web/slider/slider2/view");
	
	var JsydhyCollectionView = Mn.CollectionView.extend({
		id: "hykz_ypclq_jsydhy",
		childView: Slider2View,
		
		onRender: function() {
			this.$el.children().each(function(i) {
				$(this).find("h4").text(i+17);
			});
			
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
	
	return JsydhyCollectionView;
});
