define(function(require) {
	var _ = require("underscore");
	var Mn = require("marionette");
	var IndexView = require("web/index/index_view");
	
	var Route = Mn.Object.extend({
  		
		show: function(options) {
			var indexView = this.container.currentView, navLeftRegion, navLeftView, contentRightRegion;
			var optNavLeftView = options.navLeftView;
			if(indexView && indexView instanceof IndexView) {
				navLeftRegion = indexView.getRegion("navLeft");
				navLeftView = navLeftRegion.currentView;
				contentRightRegion = indexView.getRegion("contentRight");
				
				if(navLeftView && !optNavLeftView) {
					navLeftRegion.empty();
				} else if(optNavLeftView) {
					if(_.isFunction(optNavLeftView)) {
						if(!(navLeftView instanceof optNavLeftView)) {
							navLeftRegion.show(new optNavLeftView());
						}
					} else {
						if(!(navLeftView && navLeftView.id === optNavLeftView.id)) {
							navLeftRegion.show(optNavLeftView);
						}
					}
				}
				
				contentRightRegion.show(options.contentRightView, options);
			} else {
				this.container.show(new IndexView(), options);
			}
		}
  		
	});
	
	return Route;
});