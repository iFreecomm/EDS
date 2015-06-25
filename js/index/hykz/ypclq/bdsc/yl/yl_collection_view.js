define(function(require) {
	var $ = require("jquery");
	var Mn = require("marionette");
	var Radio = require("radio");
	var Slider3View = require("web/slider/slider3/view");
	
	var YlCollectionView = Mn.CollectionView.extend({
		id: "hykz_ypclq_bdsc_yl",
		childView: Slider3View,
		
		onRender: function() {
			var prefix = "输出";
			this.$el.children().each(function(i) {
				$(this).find("h4").text(prefix + (i + 1));
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
	
	return YlCollectionView;
});
