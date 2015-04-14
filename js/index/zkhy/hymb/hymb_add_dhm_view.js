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
	var Const = require("web/common/const");
	
	var DhmView = FormView.extend({
		id: "hymb_add_dhm",
		template: Handlebars.compile(tmpl),
		
		ui: {
			"mode_box_big": ".mode-box-big",
			"mode_box": ".mode-box-container .mode-box",
			"dhmLxrs": ".dhmLxrs",
			"appendToBox": ".dhm-pz-container"
		},
		bindings: {
			"#enableMp": "enableMp"
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
			
			// 渲染子画面信息
			if($box.data("mode") === this.model.get("showMpMode")) {
				this.renderSubPicInfo();
			}
		},
		
		renderSubPicInfo: function() {
			var subPicInfo = this.model.get("subPicInfo");
			if(_.isEmpty(subPicInfo)) return;
			
			var $td = this.ui.mode_box_big.find("td").not(".unvisible");
			var $span = $('<span class="lxr inTd"></span>');
			var $allSpan = $td.map(function() {
				var $this = $(this);
				var ch = $this.data("ch");
				var curSub = subPicInfo[ch];
				
				if(curSub.equType !== Const.EquType_NONE) {
					var $sp = $span.clone();
					$sp.data("equType", curSub.equType);
					$sp.data("recordId", curSub.recordId);
					$sp.text(curSub.addrName);
					
					$this.addClass("active").append($sp);
					return $sp;
				}
			});
			
			this.enableDraggable($allSpan);
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
						$dragClone.data($drag.data());
						curView.enableDraggable($dragClone);
						$(this).addClass("active").children(".lxr").remove().end().append($dragClone);
					}
				}
			});
		},
				
		initialize: function() {
			Radio.channel("dhm").reset();
			Radio.channel("dhm").reply("getShowMpMode", this.getShowMpMode, this);
			Radio.channel("dhm").reply("getSubPicInfo", this.getSubPicInfo, this);
			
			Radio.channel("dhm").comply("addDhmlxr", this.addDhmlxr, this);
			Radio.channel("dhm").comply("subDhmlxr", this.subDhmlxr, this);
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
				var equType = $span.data("equType");
				return {
					equType: _.isNumber(equType) ? equType : 11,
					recordId: $span.data("recordId") || 0,
					camPort: $span.data("camPort") || 0,
					vgaPort: $span.data("vgaPort") || 0
				}
			}).get();
		},
				
		addDhmlxr: function(lxrArr) {
			if(_.isEmpty(lxrArr)) return;
			
			var $li = $('<li></li>');
			var $span = $('<span class="lxr"></span>');
			var $cur;
			
			var spanArr = $.map(lxrArr, function(lxr) {
				$cur = $span.clone();
				$cur.data("equType", lxr.equType);
				$cur.data("recordId", lxr.recordId);
				$cur.data("camPort", lxr.camPort);
				$cur.data("vgaPort", lxr.vgaPort);
				$cur.text(lxr.addrName);
				return $cur;
			});
			
			this.enableDraggable($(spanArr));
			
			var liArr = $.map(spanArr, function($span) {
				return $li.clone().append($span);
			});
			
			this.ui.dhmLxrs.append(liArr);
		},
		
		subDhmlxr: function(lxrArr) {
			if(_.isEmpty(lxrArr)) return;
			
			var self = this;
			this.ui.appendToBox.find(".lxr").each(function() {
				var $this = $(this);
				var lxrObj = {
					equType: $this.data("equType"),
					recordId: $this.data("recordId")
				};
				if(self._isLxrInArr(lxrObj, lxrArr)) {
					if($this.is(".inTd")) {
						$this.parent().removeClass("active").end().remove();
					} else {
						$this.parent().remove();
					}
				}
			});
		},
		
		_isLxrInArr: function(lxrObj, lxrArr) {
			var equType = lxrObj.equType;
			var recordId = lxrObj.recordId;
			
			return _.some(lxrArr, function(lxr) {
				if(equType === lxr.equType && (equType === Const.EquType_PLAYER || recordId === lxr.recordId)) {
					return true;
				}
			});
		},
		
		onRender: function() {
			this.stickit().fixIE8();
			
			// 点击选择的模式，手动触发事件
			var modeNum = this.model.get("showMpMode");
			this.ui.mode_box.filter('[data-mode="'+ modeNum +'"]').click();
			
			//将联系人拖放到大容器中，就删除掉它
			this.ui.appendToBox.droppable({
				accept: ".inTd",
				addClasses: false,
				
				drop: function(event, ui) {
					ui.draggable.parent().removeClass("active").end().remove();
				}
			});
		},
		
		onDestroy: function() {
			Radio.channel("dhm").reset();
		}
	});
	
	return DhmView;
});