define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Route = require("web/common/route");
	
	var NavLeftView = require("web/index/zkhy/navLeft/navLeft_view");
	var HymbAddView = require("web/index/zkhy/hymb/hymb_add_view");
	var HymbAddBasicView = require("web/index/zkhy/hymb/hymb_add_basic_view");
	var HymbAddYhzView = require("web/index/zkhy/hymb/hymb_add_yhz_view");
	var HymbAddDhmView = require("web/index/zkhy/hymb/hymb_add_dhm_view");
	var HymbAddSpjzView = require("web/index/zkhy/hymb/hymb_add_spjz_view");
	var HymbAddLzbmView = require("web/index/zkhy/hymb/hymb_add_lzbm_view");
	
	var HymbModel = require("web/index/zkhy/hymb/hymb_model");
	
	var Const = require("web/common/const");

	var HymbAddRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			this.hymbModel = new HymbModel();
			
			$.when(
				$.getJSON("getAllAddrBook.psp"),//所有联系人
				
				this.hymbModel.myFetch(options)
			).done(function(allLxr) {
				self.allLxr = allLxr[0].data.bookInfo;

				self.fixSubPicInfo();
				
				self.showView();
			});
		},
		
		//修复多画面中的subPicInfo字段，缺少用来显示的addrName字段
		fixSubPicInfo: function() {
			var allLxr = this.allLxr;
			var subPicInfo = this.hymbModel.get("subPicInfo");
			
			if(_.isEmpty(allLxr) || _.isEmpty(subPicInfo)) return;
			
			var curSub, curLxr, equType, recordId;
			for(var i = 0; curSub = subPicInfo[i]; i++) {
				equType = curSub.equType;
				recordId = curSub.recordId;
				for(var j = 0; curLxr = allLxr[j]; j++) {
					if(equType === curLxr.equType && (equType === Const.EquType_PLAYER || recordId === curLxr.recordId)) {
						curSub.addrName = curLxr.addrName;
					}
				}
			}
		},
		
		getSelectedLxr: function() {
			var allLxr = this.allLxr;
			var venueIdArr = this.hymbModel.get("venueId");
			
			if(_.isEmpty(allLxr) || _.isEmpty(venueIdArr)) return [];
			
			var curVenue, curLxr, result = [];
			for(var i = 0; curVenue = venueIdArr[i]; i++) {
				for(var j = 0; curLxr = allLxr[j]; j++) {
					if(curVenue === curLxr.recordId) {
						result.push(curLxr);
					}
				}
			}
			
			return result;
		},
		
		showView: function() {
			this.show({
				navLeftView: NavLeftView,
				contentRightView: new HymbAddView({
					model: this.hymbModel,
					lxrArr: this.getSelectedLxr()
				}),
				
				zkhyHymbAddBasicView: new HymbAddBasicView({
					//和父层View共享同一个hymbModel
					//表单中所有字段同步
					model: this.hymbModel
				}),
				zkhyHymbAddYhzView: new HymbAddYhzView({
					//该View中initialize方法中会统一转换成templateHelpers
					//至于右侧已经选择的lxr，渲染页面和获取数据都需要使用Radio.channel.request
					allLxr: this.allLxr
				}),
				zkhyHymbAddDhmView: new HymbAddDhmView({
					//和父层View共享同一个hymbModel
					//但是只有enableMP字段同步
					//其它字段对应不了表单元素，所以只能手动初始化页面
					//获取其它字段需要使用Radio.channel.request
					model: this.hymbModel
				}),
				zkhyHymbAddSpjzView: new HymbAddSpjzView({
					//和父层View共享同一个hymbModel
					//但是只有enableVM字段同步
					//其它字段对应不了表单元素，所以只能手动初始化页面
					//获取其它字段需要使用Radio.channel.request
					model: this.hymbModel
				}),
				zkhyHymbAddLzbmView: new HymbAddLzbmView()
			});
		}
	});
	
	return HymbAddRoute;
});