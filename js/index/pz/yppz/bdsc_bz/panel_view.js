define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/pz/yppz/bdsc_bz/panel_template.html");
	
	var BdscModel = require("web/index/pz/yppz/bdsc_bz/bdsc_model");
	var BdscView = require("web/index/pz/yppz/bdsc_bz/bdsc_view");
	
	var PanelView = Mn.LayoutView.extend({
		className: "panel-blue",
		template: tmpl,
		regions: {
			container: ".panel-body"
		},
		
		onAttach: function() {
			var self = this;
			var model = new BdscModel();
			model.fetch().done(function() {
				self.showChildView("container", new BdscView({
					model: model
				}));
			});
		}
	});
	
	return PanelView;
});
