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
		ui: {
			popupContainer: ".popup-container",
			moreBtn: ".more"
		},
		events: {
			"click .more": "showMore"
		},
		
		onAttach: function() {
			var self = this;
			var slideModel = new SlideModel();
			
			$.when(
				$.getJSON("getAudExcitedJoinVenueInfo.psp"),
				$.getJSON("getExcitedAudVenueCfg.psp"),
				$.getJSON("getExcitedAudSeniorCfg.psp"),						
				$.getJSON("getExcitedAudVenueInfo.psp"),
				
				slideModel.fetch()
			).done(function(allVenueRst, lockedVenueRst, advanceCfg, cameraArrRst) {
				var allVenue = [];
				if(allVenueRst[0].data && allVenueRst[0].data.venueArr)
				{
					allVenue = allVenueRst[0].data.venueArr
				}
				
				var lockedVenue = [];
				if(lockedVenueRst[0].data && lockedVenueRst[0].data.lockedVenue)
				{
					lockedVenue = lockedVenueRst[0].data.lockedVenue
				}
				
				self.showChildView("pzTableContainer", new PzTableView({
					allVenue: allVenue,
					lockedVenue: lockedVenue
				}));
				
				self.showChildView("slideContainer", new SlideView({
					model: slideModel
				}));
				
				var cameraArr = [];
				if(cameraArrRst[0].data && cameraArrRst[0].data.cameraArr)
				{
					cameraArr = cameraArrRst[0].data.cameraArr;
				}
				self.showChildView("formBoxContainer", new AdvanceView({
					model: new AdvanceModel(Util.flat(advanceCfg[0].data)),
					templateHelpers: {
						cameraArr: cameraArr
					}
				}));
			});
		},
		
		showMore: function() {
			var con = this.ui.popupContainer;
			var btn = this.ui.moreBtn;
			
			if(btn.is(".active")) {
				con.animate({top:240}, "fast", function() {
					con.hide();
				});
				btn.text("更多");
			} else {
				con.show().animate({top:32}, "fast");
				btn.text("关闭");
			}
			btn.toggleClass("active");
		}
	});
	
	return PanelView;
});
