define(function(require) {
	var $ = require("jquery");
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
			"#enable": "enable"
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
				return {
					equType: $span.data("equtype"),
					recordId: $span.data("recordid"),
					camport: $span.data("camport")
				}
			}).get();
		},
		
		onRender: function() {
			this.stickit().fixIE8();
//			this.renderSelectedMode();
			
			//使联系人可以拖动
			this.enableDraggable(this.ui.lxrs);
			
			//将联系人拖出大盒子，就删除它
			this.ui.mode_box_big.droppable({
				accept: ".lxr",
				addClasses: false,
				
				out: function(event, ui) {
					var $drag = ui.draggable;
					if($drag.is(".inTd")) {
						$drag.remove();
					}
				}
			});
		},
		
		renderSelectedMode: function() {
			var enable = this.model.get("enable");
			// 选择自动多画面模式，就不处理了
			if(enable) return;
			
			var modeNum = this.model.get("showMpMode");
			this.ui.mode_box.filter('[data-mode="'+ modeNum +'"]').click();
			
			var dhmLxr = this.options.templateHelpers.dhmLxr;
			var subPicInfo = this.model.get("subPicInfo");
			var curSub, curDhm, equType, recordId;
			for(var i = 0; curSub = subPicInfo[i]; i++) {
				equType = curSub.equType;
				recordId = curSub.recordId;
				for(var j = 0; curDhm = dhmLxr[j]; j++) {
					if(equType === curDhm.equType && recordId === curDhm.recordId) {
						curSub.addrName = curDhm.addrName;
					}
				}
			}
			
			var $td = this.ui.mode_box_big.find("td").not(".unvisible");
			var curView = this;
			$td.each(function() {
				var $this = $(this);
				var ch = $this.data("ch");
				curSub = subPicInfo[ch];
				var $span = $("<span></span>");
				$span.addClass("lxr inTd");
				$span.data("equType", curSub.equType);
				$span.data("recordId", curSub.recordId);
				$span.text(curSub.addrName);
				
				$this.append($span).addClass("active");
				
				$span.draggable({
					helper: "clone",
					addClasses: false,
					appendTo: curView.ui.appendToBox,
					containment: curView.ui.appendToBox
				});
				
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
				accept: ".lxr",
				hoverClass: "hover",
				addClasses: false,
//				greedy: true,
				
				drop: function(event, ui) {
					var $drag = ui.draggable;
					var $this = $(this);
					if($drag.is(".inTd")) {
						var $chi = $this.children(".lxr");
						if($chi.length > 0) {
							$drag.parent().addClass("active");
						}
						$drag.replaceWith($chi);
						$this.append($drag);
					} else {
						var $dragClone = $drag.clone();
						curView.enableDraggable($dragClone);
						$this.addClass("active").html($dragClone.addClass("inTd"));
					}
				},
				
				out: function(event, ui) {
					var $drag = ui.draggable;
					if(!$drag.is(".inTd")) return;
					
					var $this = $(this);
					var $dragTd = $drag.parent();
					
					if($this.data("ch") === $dragTd.data("ch")) {
						$this.removeClass("active");
					}
				}
			});
		},
		
		onDestroy: function() {
			Radio.channel("dhm").reset();
		}
	});
	
	return DhmView;
});