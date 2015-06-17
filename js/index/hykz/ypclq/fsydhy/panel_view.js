define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/hykz/ypclq/fsydhy/panel_template.html");
	
	var FsydhyCollection = require("web/index/hykz/ypclq/fsydhy/fsydhy_collection");
	var FsydhyCollectionView = require("web/index/hykz/ypclq/fsydhy/fsydhy_collection_view");
	
	var PanelView = Mn.LayoutView.extend({
		className: "panel-blue",
		template: tmpl,
		regions: {
			container: ".panel-body"
		},
		
		onAttach: function() {
			var self = this;
			var collection = new FsydhyCollection();
			collection.fetch().done(function() {
				self.showChildView("container", new FsydhyCollectionView({
					collection: collection
				}));
			});
		}
	});
	
	return PanelView;
});
