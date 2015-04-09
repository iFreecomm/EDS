/*
 * greedy=true和helper=clone有冲突
 * 主要是因为greedy=true会触发父容器的out事件，导致内部元素被删除
 * 但是不用greedy=true，又不能获取到拖拽对象的父元素
 */
define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Radio = require("radio");
	var FormView = require("web/common/formView");
	var Handlebars = require("handlebars");
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_dhm_template.html");
	
	var DhmView = FormView.extend({
		id: "hymb_add_dhm",
		template: Handlebars.compile(tmpl),
		
		ui: {
			"mode_box_big": ".mode-box-big",
			"mode_box": ".mode-box-container .mode-box",
			"lxrs": ".lxr-box2 .lxr",
			"appendToBox": ".dhm-pz-container"
		},
		bindings: {
			"#enableDhm": "enableDhm"
		},
		events: {
			"click @ui.mode_box": "selectMode"
		},
		selectMode: function(e) {
			var $tar = $(e.target);
			var $box = $tar.is(".mode-box") ? $tar : $tar.parents(".mode-box");
			$box.addClass("active").siblings().removeClass("active");
			
			this.ui.mode_box_big.html($box.html());
			
			this.enableTdDroppable();
		},
		
		initialize: function() {
			Radio.channel("dhm").reset();
			Radio.channel("dhm").reply("getShowMpMode", this.getShowMpMode, this);
			Radio.channel("dhm").reply("getSubPicInfo", this.getSubPicInfo, this);
		},
		
		getShowMpMode: function() {
			return this.ui.mode_box.filter(".active").data("mode");
		},
		
		getSubPicInfo: function() {
			var $td = this.ui.mode_box_big.find("td").not(".unvisible");
			return $td.map(function() {
				var $this = $(this);
				var ch = $this.data("ch");
				var $span = $this.children(".lxr");
				var equType = $span.data("equtype");
				return {
					equType: _.isNumber(equType) ? equType : 11,
					recordId: $span.data("recordid") || 0,
					camport: $span.data("camport") || 0,
					camport: $span.data("camport") || 0
				}
			}).get();
		},
		
		onRender: function() {
			this.stickit().fixIE8();
			this.renderSelectedMode();
			
			//使联系人可以拖动
			this.enableDraggable(this.ui.lxrs);
			
			//将联系人拖出大盒子，就隐藏它，并去掉td元素的active
//			this.ui.mode_box_big.droppable({
//				accept: ".inTd",
//				addClasses: false,
//				
//				out: function(event, ui) {
//					ui.draggable.hide().parent().removeClass("active");
//				}
//			});
			
			//将联系人拖放到大容器中，就删除掉它
			this.ui.appendToBox.droppable({
				accept: ".inTd",
				addClasses: false,
				
				drop: function(event, ui) {
					ui.draggable.parent().removeClass("active").end().remove();
				}
			});
		},
		
		renderSelectedMode: function() {
			// 选择自动多画面模式，就不处理了
			var enable = this.model.get("enable");
			if(enable) return;
			// 点击选择的模式，手动触发事件
			var modeNum = this.model.get("showMpMode");
			this.ui.mode_box.filter('[data-mode="'+ modeNum +'"]').click();
			// 渲染子画面信息
			this.renderSubPicInfo();
		},
		
		renderSubPicInfo: function() {
			var subPicInfo = this.fixSubPicInfo();
			if(subPicInfo.length === 0) return;
			
			var $td = this.ui.mode_box_big.find("td").not(".unvisible");
			var $span = $('<span class="lxr inTd" data-equtype="" data-recordid=""></span>');
			var $allSpan = $td.map(function() {
				var $this = $(this);
				var ch = $this.data("ch");
				var curSub = subPicInfo[ch];
				
				if(curSub.equType !== 11) {
					var $sp = $span.clone();
					$sp.data("equtype", curSub.equType);
					$sp.data("recordid", curSub.recordId);
					$sp.text(curSub.addrName);
					
					$this.addClass("active").append($sp);
					return $sp;
				}
				
				return false;
			});
			
			this.enableDraggable($allSpan);
		},
		
		fixSubPicInfo: function() {
			var dhmLxr = this.options.templateHelpers.dhmLxr || [];
			var subPicInfo = this.model.get("subPicInfo") || [];
			var curSub, curDhm, equType, recordId;
			for(var i = 0; curSub = subPicInfo[i]; i++) {
				equType = curSub.equType;
				recordId = curSub.recordId;
				for(var j = 0; curDhm = dhmLxr[j]; j++) {
					if(equType === curDhm.equType && (equType === 7 || recordId === curDhm.recordId)) {
						curSub.addrName = curDhm.addrName;
					}
				}
			}
			return subPicInfo;
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
				accept: ".lxr",
				hoverClass: "hover",
				addClasses: false,
				greedy: true,
				
				drop: function(event, ui) {
					var $drag = ui.draggable;
					if(!$drag.is(".inTd")) {
						var $dragClone = $drag.clone().addClass("inTd");
						curView.enableDraggable($dragClone);
						$(this).addClass("active").children(".lxr").remove().end().append($dragClone);
					}
				}
			});
			
//			this.ui.mode_box_big.find(".hzh-in").find("td").droppable("option", "greedy", true);
			
		},
		
		onDestroy: function() {
			Radio.channel("dhm").reset();
		}
	});
	
	return DhmView;
});