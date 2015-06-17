define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/hykz/ypclq/bzhy/panel_template.html");
	
	var BzhyCollection = require("web/index/hykz/ypclq/bzhy/bzhy_collection");
	var BzhyView = require("web/index/hykz/ypclq/bzhy/bzhy_view");
	
	var PanelView = Mn.LayoutView.extend({
		className: "panel-blue",
		template: tmpl,
		regions: {
			container: ".panel-body"
		},
		
		onAttach: function() {
			var self = this;
			var collection = new BzhyCollection();
			collection.fetch().done(function() {
				self.showChildView("container", new BzhyView({
					collection: collection
				}));
			});
		}
	});
	
	return PanelView;
});
