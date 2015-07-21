define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Backbone = require("backbone");
	var Radio = require("radio");
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_template.html");
	var AckId = require("web/common/ackid");
	
	var HymbAddView = Mn.LayoutView.extend({
		id: "zkhy_hymb_add",
		template: tmpl,
		regions: {
			basic: "#zkhy_hymb_add_basic",
			yhz: "#zkhy_hymb_add_yhz",
			dhm: "#zkhy_hymb_add_dhm",
			spjz: "#zkhy_hymb_add_spjz",
			lzbm: "#zkhy_hymb_add_lzbm",
			yppz: "#zkhy_hymb_add_yppz"
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
			this.showChildView("yppz", options.zkhyHymbAddYppzView);
		},
		onAttach: function() {
			Util.activeLink("zkhy/showHymb");
		},
		
		selectTab: function(e) {
			var $tar = $(e.target);
			$tar.addClass("active").siblings().removeClass("active");
			this.$(".tabContentBox").children().removeClass("active").eq($tar.index()).addClass("active");
			
			//解决切换标签页导致提示信息错位的BUG
			if($tar.index() === 0) {
				Radio.channel("basic").request("isFormValid")
			}
		},
		saveTemp: function(e) {
			e.preventDefault();
			var self = this;
			
			var isBasicFormValid = Radio.channel("basic").request("isFormValid");
			if(isBasicFormValid) return;
			
			var recList = Radio.channel("lzbm").request("getRecList");
			if(this.check_RTSP_RTMP(recList)) return;
			
			var yhzArr = Radio.channel("yhz").request("getYhzArr");
			
			var showMpMode = Radio.channel("dhm").request("getShowMpMode");
			var mpMode = Radio.channel("dhm").request("getMpMode");
			
			var matrixInOut = Radio.channel("spjz").request("getMatrixInOut");
			var recList = Radio.channel("lzbm").request("getRecList");
			
			var yppzModel = Radio.channel("yppz").request("getYppzModel");
			
			this.model.set({
				"venueId": yhzArr,
				
				"showMpMode": showMpMode,
				"mpMode": mpMode,
				
				"matrixInOut": matrixInOut,
				"matrixNum": matrixInOut.length,
				"recorder": {recList:recList,recNum:recList.length}
			})
			.set(yppzModel)
			.save()
			.done(function(res) {
				self.saveSuccess(res);
			})
			.fail(function() {
				self.saveError();
			});
		},
		check_RTSP_RTMP: function(list) {
			var arrName=[];
			var arrUrl =[];
			_.each(list, function(obj) {
				arrName.push(obj.vidHdCfg.vodServeParam.name);
				arrName.push(obj.vidSdCfg.vodServeParam.name);
				arrUrl.push(obj.vidHdCfg.pushDumpParam.url);
				arrUrl.push(obj.vidSdCfg.pushDumpParam.url );
			});
			arrName.sort();
			arrUrl.sort();

			for(var i = 0; i < arrName.length - 1; i ++) {
				if(arrUrl[i] != "" && arrUrl[i] == arrUrl[i+1]) {
					Util.alert("RTMP同名冲突！");
					return true;
				}
				if(arrName[i] != "" && arrName[i] == arrName[i+1]) {
					Util.alert("RTSP同名冲突！");
					return true;
				}
			}
			return false;
		},
		saveSuccess: function(res) {
			this.cancelTemp();
			if(res.code != AckId.AckId_Suc)
			{
				switch (res.code){
					case AckId.AckId_NameDup:
						Util.alert("名称重复,保存会议模板失败！");
						break;
					case AckId.AckId_SysInCalling:
						Util.alert("召开的会议使用该模板，不允许修改！");
						break;
					default:
						Util.alert("保存会议模板失败！");
						break;
				}
			}
		},
		saveError: function() {
			Util.alert("保存会议模板失败！");
		},
		cancelTemp: function() {
			Util.navigate("zkhy/showHymb", {trigger: true});
		}
	});
	
	return HymbAddView;
});