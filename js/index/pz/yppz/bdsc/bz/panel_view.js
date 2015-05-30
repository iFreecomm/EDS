define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/pz/yppz/bdsc/bz/panel_template.html");
	
	var BdscCollection = require("web/index/pz/yppz/bdsc/bdsc_collection");
	var BzView = require("web/index/pz/yppz/bdsc/bz/bz_view");
	
	var PanelView = Mn.LayoutView.extend({
		className: "panel-blue",
		template: tmpl,
		regions: {
			container: ".panel-body"
		},
		
		onAttach: function() {
			var self = this;
			var collection = new BdscCollection();
			collection.fetch().done(function() {
				self.showChildView("container", new BzView({
					collection: collection
				}));
			});
		}
	});
	
	return PanelView;
});
