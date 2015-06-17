define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/hykz/ypclq/yx/panel_template.html");
	
//	var YxModel = require("web/index/hykz/ypclq/yx/yx_model");
//	var YxView = require("web/index/hykz/ypclq/yx/yx_view");
	
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
