define(function(require) {
	var $ = require("jquery");
	var Mn = require("marionette");
	var Radio = require("radio");
	var Slider1View = require("web/slider/slider1/view");
	var Slider2View = require("web/slider/slider2/view");
	
	var BdsrCollectionView = Mn.CollectionView.extend({
		id: "hykz_ypclq_bdsr",
		
		getChildView: function(model) {
			if(model.get("audInPort") < 12) {
				return Slider1View;
			} else {
				return Slider2View;
			}
		},
		
		onRender: function() {
			this.$el.children().each(function(i) {
				$(this).find("h4").text(i+1);
			}).eq(12).css({
				marginLeft: "20px"
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
	
	return BdsrCollectionView;
});
