define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/hykz/ypclq/xf/panel_template.html");
	
//	var XfModel = require("web/index/hykz/ypclq/xf/xf_model");
//	var XfView = require("web/index/hykz/ypclq/xf/xf_view");
	
	var PanelView = Mn.LayoutView.extend({
		className: "panel-blue",
		template: tmpl,
		regions: {
			container: ".panel-body"
		},
		
		onAttach: function() {
//			var model = new XfModel();
//			model.fetch().done(function() {
//				this.showChildView("container", new XfView({
//					model: model
//				}));
//			});
		}
	});
	
	return PanelView;
});
