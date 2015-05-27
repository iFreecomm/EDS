define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/pz/yppz/yx/panel_template.html");
	
//	var YxModel = require("web/index/pz/yppz/yx/yx_model");
//	var YxView = require("web/index/pz/yppz/yx/yx_view");
	
	var PanelView = Mn.LayoutView.extend({
		className: "panel-blue",
		template: tmpl,
		regions: {
			container: ".panel-body"
		},
		
		onAttach: function() {
//			var model = new YxModel();
//			model.fetch().done(function() {
//				this.showChildView("container", new YxView({
//					model: model
//				}));
//			});
		}
	});
	
	return PanelView;
});
