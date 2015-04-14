define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Backbone = require("backbone");
	var Radio = require("radio");
	var Mn = require("marionette");
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_template.html");
	var Const = require("web/common/const");
	
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
			var subPicInfo = Radio.channel("dhm").request("getSubPicInfo");
			
			var matrixInOut = Radio.channel("spjz").request("getMatrixInOut");
			
			this.model.set({
				"venueId": yhzArr,
				
				"showMpMode": showMpMode,
				"subPicInfo": subPicInfo,
				"subPicCnt": subPicInfo.length,
				
				"matrixInOut": matrixInOut,
				"matrixNum": matrixInOut.length
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
		},
		
		onBeforeShow: function(view, region, options) {
			this.showChildView("basic", options.zkhyHymbAddBasicView);
			this.showChildView("yhz", options.zkhyHymbAddYhzView);
			this.showChildView("dhm", options.zkhyHymbAddDhmView);
			this.showChildView("spjz", options.zkhyHymbAddSpjzView);
			this.showChildView("lzbm", options.zkhyHymbAddLzbmView);
		},
		onAttach: function() {
			Radio.channel("index").command("activeLink");
			//初始化与会者页面右侧已经选择的联系人
			Radio.channel("yhz").command("loadHymb", this.model.get("venueId"));
			//初始化多画面左侧可以拖拽的联系人
			Radio.channel("dhm").command("addDhmlxr", this.getDhmLxr());
			//初始化视频矩阵，表格行头和表格列头需要联系人
			Radio.channel("spjz").command("addMatrix", this.getMatrixLxr());
		},
		
		getDhmLxr: function() {
			return [
				{
					equType: Const.EquType_PLAYER,
					addrName: "播放器"
				}
			].concat(this._getLxrDataById());
		},
		getMatrixLxr: function() {
			return this._getLxrDataById();
		},
		_getLxrDataById: function() {
			var allLxr = this.options.allLxr;
			var venueIdArr = this.model.get("venueId");
			
			if(_.isEmpty(allLxr) || _.isEmpty(venueIdArr)) return [];
			
			return _.filter(allLxr, function(lxr) {
				return _.contains(venueIdArr, lxr.recordId);
			});
		}
	});
	
	return HymbAddView;
});