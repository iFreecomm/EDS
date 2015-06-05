/*
 * greedy=true和helper=clone有冲突
 * 主要是因为greedy=true会触发父容器的out事件，导致内部元素被删除
 * 但是不用greedy=true，又不能获取到拖拽对象的父元素
 */
define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Radio = require("radio");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	var Const = require("web/common/const");
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_dhm_template.html");
	
	var DhmView = Mn.ItemView.extend({
		id: "hymb_add_dhm",
		template: Handlebars.compile(tmpl),
		bindings: {
			"#enableMp": "enableMp"
		},
		ui: {
			"mode_box_big": ".mode-box-big",
			"mode_box": ".mode-box-container .mode-box",
			"dhmLxrs": ".dhmLxrs",
			"appendToBox": ".dhm-pz-container"
		},
		events: {
			"click @ui.mode_box": "selectMode"
		},
		
		onRender: function() {
			Radio.channel("dhm").reply("getShowMpMode", this.getShowMpMode, this);
			Radio.channel("dhm").reply("getMpMode", this.getMpMode, this);
			
			Radio.channel("yhz").on("addLxr", this.addDhmlxr, this);
			Radio.channel("yhz").on("subLxr", this.subDhmlxr, this);
			
			this.initMpMode();
			this.fixMpMode();
			this.stickit();
			Util.initCheckboxClass(this.$el).addCheckboxEvent(this.$el);
			
			//初始化多画面左侧可以拖拽的联系人
			this.addDhmlxr(this.getDhmLxr());
			
			// 点击选择的模式，手动触发事件
			var modeNum = this.model.get("showMpMode");
			this.ui.mode_box.filter('[data-mode="'+ modeNum +'"]').click();
			
			//将联系人拖放到大容器中，就删除掉它
			this.ui.appendToBox.droppable({
				accept: ".lxr-span",
				addClasses: false,
				
				drop: function(event, ui) {
					ui.draggable.parent().removeClass("active").end().remove();
				}
			});
		},
		onDestroy: function() {
			Radio.channel("dhm").reset();
			Radio.channel("yhz").off("addLxr", this.addDhmlxr);
			Radio.channel("yhz").off("subLxr", this.subDhmlxr);
		},
		
		/**
		 * @initialize
		 * 修复多画面中的subPicInfo字段，缺少用来显示的addrName字段
		 */
		fixMpMode: function() {
			var allLxr = this.options.allLxr;
			var mpMode = this.mpMode;
			var self = this;
			
			if(_.isEmpty(allLxr) || _.isEmpty(mpMode)) return;
			
			_.each(mpMode, function(curMode) {
				var subPicInfo = curMode.subPicInfo;
				Util.addAddrName(subPicInfo, allLxr);
			});
		},
		
		/**
		 * @onRender
		 * 添加播放器这个联系人
		 */
		initMpMode: function() {
			var mpMode = this.model.get("mpMode") || [];
			//填充空数据，否则后台出错
			var tempArr = [], curView = this;
			this.ui.mode_box.each(function() {
				var $this = $(this);
				var curMode = $this.data("mode");
				var isExist = _.some(mpMode, function(obj) {
					if(obj.mpMode === curMode) return true;
				});
				if(!isExist) {
					var length = $this.find("td").not(".unvisible").length;
					tempArr.push(curView.getEmptyMode(curMode, length));
				}
			});
			this.mpMode = mpMode.concat(tempArr);
		},
		getEmptyMode: function(mode, num) {
			var result = {};
			result.mpMode = mode;
			result.subPicCnt = num;
			result.subPicInfo = [];
			for(var i = 0; i < num; i ++) {
				result.subPicInfo.push(this.getEmptyLxr());
			}
			return result;
		},
		getEmptyLxr: function() {
			return {
				equType: Const.EquType_Cnt,
				recordId: 0,
				vgaPort: 0,
				camPort: 0
			}
		},
		getMode: function(mode) {
			if(!mode) return;
			var result = null;
			_.some(this.mpMode, function(curMode) {
				if(curMode.mpMode === mode) {
					result = curMode;
					return true;
				}
			});
			return result;
		},
		
		getDhmLxr: function() {
			return [
				{
					equType: Const.EquType_PLAYER,
					addrName: "播放器"
				}
			].concat(Util.getLxrDataById(this.model.get("venueId"), this.options.allLxr));
		},
		
		/************************************/
		/*************页面交互事件**************/
		/************************************/
		
		selectMode: function(e) {
			this.saveCurrentSubPicInfo();
			
			var $tar = $(e.target);
			var $box = $tar.is(".mode-box") ? $tar : $tar.parents(".mode-box");
			$box.addClass("active").siblings().removeClass("active");
			
			this.ui.mode_box_big.html($box.html());
			
			this.enableTdDroppable();
			
			// 渲染子画面信息
			var mode = $box.data("mode");
			this.renderSubPicInfo(this.getMode(mode)["subPicInfo"]);
		},
		renderSubPicInfo: function(subPicInfo) {
			var curView = this;
			var $span = $('<span class="lxr-span"></span>');
			this.ui.mode_box_big.find("td").not(".unvisible").each(function() {
				var $this = $(this);
				var ch = $this.data("ch");
				var curSub = subPicInfo[ch];
				
				if(curSub.equType !== Const.EquType_Cnt) {
					var $sp = $span.clone();
					$sp.data(curSub);
					$sp.text(curSub.addrName);
					
					curView.enableDraggable($sp);
					$this.addClass("active").append($sp);
				}
			});
			
		},
		enableDraggable: function($obj) {
			$obj.draggable({
				helper: "clone",
				addClasses: false,
				appendTo: this.ui.appendToBox,
				containment: this.ui.appendToBox
			});
		},
		enableTdDroppable: function() {
			var curView = this;
			this.ui.mode_box_big.find("td").not(".unvisible").droppable({
				accept: ".lxr-li",
				hoverClass: "hover",
				addClasses: false,
				greedy: true,
				
				drop: function(event, ui) {
					var $drag = ui.draggable.children(".lxr-span");
					var $dragClone = $drag.clone();
					//因为$drag.data()里面含有其它不需要的数据，所以这里只获取需要的数据
					$dragClone.data(curView._getDataInfo($drag));
					curView.enableDraggable($dragClone);
					$(this).addClass("active").children(".lxr-span").remove().end().append($dragClone);
				}
			});
		},
		_getDataInfo: function($obj) {
			var result = {}, temp;
			
			temp = $obj.data("equType");
			result.equType = _.isNumber(temp) ? temp : Const.EquType_Cnt;
			//result.equType = $obj.data("equType") || Const.EquType_Cnt;
			temp = $obj.data("recordId");
			_.isNumber(temp) && (result.recordId = temp); //不是数字就不设置该值，以免污染数据库
			temp = $obj.data("camPort");
			_.isNumber(temp) && (result.camPort = temp);
			temp = $obj.data("vgaPort");
			_.isNumber(temp) && (result.vgaPort = temp);
			
			result.addrName = $obj.text();
			return result;
		},
				
		/************************************/
		/*************对外接口事件**************/
		/************************************/
		
		getShowMpMode: function() {
			return this.ui.mode_box.filter(".active").data("mode");
		},
		
		getMpMode: function() {
			this.saveCurrentSubPicInfo();
			return this.mpMode;
		},
		
		saveCurrentSubPicInfo: function() {
			var curMode = this.getMode(this.getShowMpMode());
			if(!curMode) return;
			
			var subPic = curMode["subPicInfo"];
 			var curView = this;
 			this.ui.mode_box_big.find("td").not(".unvisible").each(function() {
 				var $this = $(this);
 				var ch = $this.data("ch"); //当前TD元素的序号
 				var $span = $this.children(".lxr-span");
				var newInfo = curView._getDataInfo($span);
				
				_.extend(subPic[ch], newInfo);
 			});
 		},
		
		addDhmlxr: function(lxrArr) {
			if(_.isEmpty(lxrArr)) return;
			lxrArr = Util.transSDI2Lxr(lxrArr);
			
			var $li = $('<li class="lxr-li"></li>');
			var $span = $('<span class="lxr-span"></span>');
			var $curLi, $curSpan;
			var curView = this;
			
			var $liArr = _.map(lxrArr, function(lxr) {
				$curSpan = $span.clone();
				$curSpan.data(lxr);
				$curSpan.text(lxr.addrName);
				
				$curLi = $li.clone().append($curSpan);
				curView.enableDraggable($curLi);
				
				return $curLi;
			});
			
			this.ui.dhmLxrs.append($liArr);
		},
		
		subDhmlxr: function(lxrArr) {
			if(_.isEmpty(lxrArr)) return;
			
			this.ui.appendToBox.find(".lxr-span").each(function() {
				var $this = $(this);
				var lxrObj = $this.data();
				if(Util.isLxrInArr(lxrObj, lxrArr)) {
					if($this.parent().is("li")) {
						$this.parent().remove();
					} else {
						$this.parent().removeClass("active").end().remove();
					}
				}
			});
			
			_.each(this.mpMode, function(curMode) {
				var subPicInfo = curMode.subPicInfo;
				_.each(subPicInfo, function(info) {
					if(Util.isLxrInArr(info, lxrArr)) {
						info.equType = Const.EquType_Cnt;
						info.recordId = 0;
						info.vgaPort = 0;
						info.camPort = 0;
					}
				});
			});
		}
	});
	
	return DhmView;
});