define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Backbone = require("backbone");
	var Radio = require("radio");
	var Mn = require("marionette");
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_template.html");
	
	var HymbAddView = Mn.LayoutView.extend({
		id: "zkhy_hymb_add",
		template: tmpl,
		regions: {
			basic: "#zkhy_hymb_add_basic",
			yhz: "#zkhy_hymb_add_yhz",
			dhm: "#zkhy_hymb_add_dhm",
			spjz: "#zkhy_hymb_add_spjz",
			lzbm: "#zkhy_hymb_add_lzbm"
		},
		events: {
			"click .tabBox li": "selectTab",
			"click .saveBtn": "saveTemp",
			"click .cancelBtn": "cancelTemp"
		},
		
		onBeforeShow: function(view, region, options) {
			this.showChildView("basic", options.zkhyHymbAddBasicView);
			this.showChildView("yhz", options.zkhyHymbAddYhzView);
			this.showChildView("dhm", options.zkhyHymbAddDhmView);
			this.showChildView("spjz", options.zkhyHymbAddSpjzView);
			this.showChildView("lzbm", options.zkhyHymbAddLzbmView);
		},
		onAttach: function() {
			Radio.channel("index").command("activeLink", "zkhy/showHymb");
		},
		
		selectTab: function(e) {
			var $tar = $(e.target);
			$tar.addClass("active").siblings().removeClass("active");
			this.$(".tabContentBox").children().removeClass("active").eq($tar.index()).addClass("active");
		},
		saveTemp: function(e) {
			e.preventDefault();
			var self = this;
			
			var yhzArr = Radio.channel("yhz").request("getYhzArr");
			
			var showMpMode = Radio.channel("dhm").request("getShowMpMode");
			var mpMode = Radio.channel("dhm").request("getMpMode");
			
			var matrixInOut = Radio.channel("spjz").request("getMatrixInOut");
			var recList = Radio.channel("lzbm").request("getRecList");
			
			this.model.set({
				"venueId": yhzArr,
				
				"showMpMode": showMpMode,
				"mpMode": mpMode,
				
				"matrixInOut": matrixInOut,
				"matrixNum": matrixInOut.length,
				"recorder": {recList:recList,recNum:recList.length}
			})
			.save()
			.done(function() {
				self.saveSuccess();
			})
			.fail(function() {
				self.saveError();
			});
		},
		saveSuccess: function() {
			this.cancelTemp();
		},
		saveError: function() {
			alert("保存会议模板失败！");
		},
		cancelTemp: function() {
			Backbone.history.navigate("zkhy/showHymb", {trigger: true});
		}
	});
	
	return HymbAddView;
});