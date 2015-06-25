define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/hykz/ypclq/yyjl/panel_template.html");
	
	var PzTableView = require("web/index/hykz/ypclq/yyjl/pzTable_view");
	
	var SlideModel = require("web/index/hykz/ypclq/yyjl/slide_model");
	var SlideView = require("web/index/hykz/ypclq/yyjl/slide_view");
	
	var AdvanceModel = require("web/index/hykz/ypclq/yyjl/advance_model");
	var AdvanceView = require("web/index/hykz/ypclq/yyjl/advance_view");
	
	var PanelView = Mn.LayoutView.extend({
		className: "panel-blue",
		template: tmpl,
		regions: {
			pzTableContainer: ".pzTable-container",
			slideContainer: ".slide-container",
			formBoxContainer: ".formBox-container"
		},
		
		onAttach: function() {
			var self = this;
			var slideModel = new SlideModel();
			
			$.when(
				$.getJSON("getYyjlAllVenue.psp"),
				$.getJSON("getYyjlLockedVenue.psp"),
				
				$.getJSON("getYyjlAdvanceCfg.psp"),
				
				slideModel.fetch()
			).done(function(allVenue, lockedVenue, advanceCfg) {
				self.showChildView("pzTableContainer", new PzTableView({
					allVenue: allVenue[0].data.allVenue,
					lockedVenue: lockedVenue[0].data.lockedVenue
				}));
				
				self.showChildView("slideContainer", new SlideView({
					model: slideModel
				}));
				
				self.showChildView("formBoxContainer", new AdvanceView({
					model: new AdvanceModel(Util.flat(advanceCfg[0].data))
				}));
			});
		}
	});
	
	return PanelView;
});
