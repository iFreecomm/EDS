define(function(require) {
	var Mn = require("marionette");
	var tmpl = require("text!web/index/pz/yppz/fsydhy/panel_template.html");
	
	var FsydhyModel = require("web/index/pz/yppz/fsydhy/fsydhy_model");
	var FsydhyView = require("web/index/pz/yppz/fsydhy/fsydhy_view");
	
	var PanelView = Mn.LayoutView.extend({
		className: "panel-blue",
		template: tmpl,
		regions: {
			container: ".panel-body"
		},
		
		onAttach: function() {
			var self = this;
			var model = new FsydhyModel();
			model.fetch().done(function() {
				self.showChildView("container", new FsydhyView({
					model: model
				}));
			});
		}
	});
	
	return PanelView;
});
