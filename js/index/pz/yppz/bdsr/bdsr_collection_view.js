define(function(require) {
	var Mn = require("marionette");
	var Slider1View = require("web/slider/slider1/view");
	var Slider2View = require("web/slider/slider2/view");
	
	var BdsrCollectionView = Mn.CollectionView.extend({
		id: "pz_yppz_bdsr",
		
		getChildView: function(model) {
			if(model.get("audInPort") < 12) {
				return Slider1View;
			} else {
				return Slider2View;
			}
		}
	});
	
	return BdsrCollectionView;
});
