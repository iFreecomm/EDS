define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/pz/yppz/jsydhy/panel_template.html");
	
	var JsydhyModel = require("web/index/pz/yppz/jsydhy/jsydhy_model");
	var JsydhyView = require("web/index/pz/yppz/jsydhy/jsydhy_view");
	
	var PanelView = Mn.LayoutView.extend({
		className: "panel-blue",
		template: tmpl,
		regions: {
			container: ".panel-body"
		},
		
		onAttach: function() {
			var self = this;
			var model = new JsydhyModel();
			model.fetch().done(function() {
				self.showChildView("container", new JsydhyView({
					model: model
				}));
			});
		}
	});
	
	return PanelView;
});
