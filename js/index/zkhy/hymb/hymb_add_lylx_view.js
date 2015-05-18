define(function(require) {
	var Radio = require("radio");
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var Const = require("web/common/const");
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_lylx_template.html");
	
	var LzbmView = Mn.ItemView.extend({
		id: "hymb_add_lxly",
		template: tmpl,
		bindings: {
			"#enbRec":         "enbRec",
			
//			"#camPort":        "equSrc.camPort",
//			"#equType":        "equSrc.equType",
//			"#recordId":       "equSrc.recordId",
//			"#vgaPort":        "equSrc.vgaPort",
			//"#equSrc":         "equSrc",
			
			"#HD_enbHandle":   {
				observe: "vidHdCfg.enbHandle",
				visible: true,
				visibleFn: "showMore"
			},
			
			"#HD_enbStoreHd":  "vidHdCfg.enbStoreHd",
			"#HD_vidProt": {
				observe: "vidHdCfg.vidEncParam.vidProt",
				selectName: "vidProt"
			},
			"#HD_fmt": {
				observe: "vidHdCfg.vidEncParam.fmt",
				selectName: "vidFmt"
			},
			"#HD_frameRate": {
				observe: "vidHdCfg.vidEncParam.frameRate",
				selectName: "frameRate"
			},
			"#HD_bitRate": {
				observe: "vidHdCfg.vidEncParam.bitRate",
				selectName: "bandwidth"
			},
			"#HD_RTSP_enable": "vidHdCfg.vodServeParam.enable",
			"#HD_RTSP_name":   "vidHdCfg.vodServeParam.name",
			"#HD_RTMP_enable": "vidHdCfg.pushDumpParam.enable",
			"#HD_RTMP_url":    "vidHdCfg.pushDumpParam.url",
			
			"#SD_enbHandle":   {
				observe: "vidSdCfg.enbHandle",
				visible: true,
				visibleFn: "showMore"
			},
			
			"#SD_enbStoreHd":  "vidSdCfg.enbStoreHd",
			
			"#SD_vidProt": {
				observe: "vidSdCfg.vidEncParam.vidProt",
				selectName: "vidProt"
			},
			"#SD_fmt": {
				observe: "vidSdCfg.vidEncParam.fmt",
				selectName: "vidFmt"
			},
			"#SD_frameRate": {
				observe: "vidSdCfg.vidEncParam.frameRate",
				selectName: "frameRate"
			},
			"#SD_bitRate": {
				observe: "vidSdCfg.vidEncParam.bitRate",
				selectName: "bandwidth"
			},
			
			"#SD_RTSP_enable": "vidSdCfg.vodServeParam.enable",
			"#SD_RTSP_name":   "vidSdCfg.vodServeParam.name",
			"#SD_RTMP_enable": "vidSdCfg.pushDumpParam.enable",
			"#SD_RTMP_url":    "vidSdCfg.pushDumpParam.url",
			
			"#YP_enbHandle":   "audCfg.enbHandle",
			
			"#YP_audProt": {
				observe: "audCfg.audEncParam.audProt",
				selectName: "audProt"
			},
			"#YP_sampleRate": {
				observe: "audCfg.audEncParam.sampleRate",
				selectName: "sampleRate"
			},
			"#YP_bitRate": {
				observe: "audCfg.audEncParam.bitRate",
				selectName: "bitRate"
			},
			
			"#endShowTheme":   "osdCfg.endShowTheme",
			"#enbShowMark":    "osdCfg.enbShowMark",
			"#dispPos": {
				observe: "osdCfg.dispPos",
				selectName: "dispPos"
			},
			
			"#enbShowVolume":  "osdCfg.enbShowVolume",
			"#volPos": {
				observe: "osdCfg.volPos",
				selectName: "dispPos"
			},
			"#enbShowCaption": "osdCfg.enbShowCaption",
			
			"#capPos": {
				observe: "osdCfg.capPos",
				selectName: "captionPos"
			},
			"#scrollSpeed": {
				observe: "osdCfg.scrollSpeed",
				selectName: "scrollSpeed"
			},
			
			"#caption":        "osdCfg.caption"
		},
		ui: {
			formBox: ".formBox",
			select: "select",
			equSrc: "#equSrc"
		},
		events: {
			"click .btn-switch6": "toggleSwitch",
			"change @ui.equSrc": "getSelectEquSrc"
		},
		initialize: function() {
			Util.setSelectBindings(this.bindings);
		},
		onRender: function() {
			Radio.channel("yhz").on("addLxr", this.addVidSrc, this);
			Radio.channel("yhz").on("subLxr", this.subVidSrc, this);
			
			this.stickit();
			Util.initCheckboxClass(this.$el).addCheckboxEvent(this.$el);
			this.ui.equSrc.append(this._getOptions(this.getVidSrcArr()));
			this.setSelectEquSrc();
		},
		onAttach: function() {
			Util.selectmenu(this.ui.select, this.ui.formBox);
			this.ui.select.change();
		},
		onDestroy: function() {
			Radio.channel("yhz").off("addLxr", this.addVidSrc);
			Radio.channel("yhz").off("subLxr", this.subVidSrc);
		},
		
		/**
		 * @onRender
		 * 获取录制视频源的数组
		 */
		getVidSrcArr: function() {
			return [{equType: Const.EquType_MP, addrName: "多画面"}].concat(this.options.vidSrcArr);
		},
		
		/**
		 * @onRender
		 * 修改录制视频源的select哪个选项被选中
		 * 如果一个选项都没有命中，则默认选择第一个，并且写回model中
		 */
		setSelectEquSrc: function() {
			var lxr = _.pick(this.model.toJSON(), "equSrc.camPort", "equSrc.equType", "equSrc.recordId", "equSrc.vgaPort");
			var isMatch = false;
			this.ui.equSrc.find("option").each(function() {
				var $this = $(this);
				var optData = $this.data();
				if(lxr["equSrc.camPort"] === optData["camPort"] &&
				lxr["equSrc.equType"] === optData["equType"] &&
				lxr["equSrc.recordId"] === optData["recordId"] &&
				lxr["equSrc.vgaPort"] === optData["vgaPort"]) {
					isMatch = true;
					$this.attr("selected", true);
				}
			});
			if(!isMatch) {
				this.ui.equSrc.get(0).selectedIndex = 0;
				this.getSelectEquSrc();
			}
		},
		
		/************************************/
		/*************页面交互事件**************/
		/************************************/
		
		/**
		 * 复选框是否选中决定相应配置选项是否显示
		 * @param {Object} $el
		 * @param {Object} isVisible
		 */
		showMore: function($el, isVisible) {
			var $nextFieldBox = $el.parents(".fieldBox").eq(0).next(".fieldBox");
			isVisible && $nextFieldBox.slideDown() || $nextFieldBox.slideUp();
		},
		
		/**
		 * 点击高级按钮，显示高级配置选项
		 * @param {Object} e
		 */
		toggleSwitch: function(e) {
			$(e.target).toggleClass("active").parents(".fieldBox").eq(0).next(".fieldBox").slideToggle();
		},
		
		/**
		 * 修改录制视频源的model数据
		 */
		getSelectEquSrc: function() {
			var lxr = this.ui.equSrc.find("option:selected").data();
			if(_.isEmpty(lxr)) return;
			this.model.set({
				"equSrc.camPort": lxr.camPort,
				"equSrc.equType": lxr.equType,
				"equSrc.recordId": lxr.recordId,
				"equSrc.vgaPort": lxr.vgaPort
			});
		},
		
		/************************************/
		/*************对外接口事件**************/
		/************************************/
		
		addVidSrc: function(lxrArr) {
			this.ui.equSrc.append(this._getOptions(lxrArr)).selectmenu("refresh");
		},
		_getOptions: function(lxrArr) {
			if(_.isEmpty(lxrArr)) return;
			lxrArr = Util.transSDI2Lxr(lxrArr);
			
			var $option = $('<option></option>');
			var $curOption;
			
			return _.map(lxrArr, function(lxr) {
				$curOption = $option.clone();
				$curOption.data(lxr);
				$curOption.text(lxr.addrName);
				return $curOption;
			});
		},
		
		subVidSrc: function(lxrArr) {
			if(_.isEmpty(lxrArr)) return;
			
			this.ui.equSrc.children().each(function() {
				var $this = $(this);
				var lxrObj = $this.data();
				if(Util.isLxrInArr(lxrObj, lxrArr)) {
					$this.remove();
				}
			});
			
			this.setSelectEquSrc();
			
			this.ui.equSrc.selectmenu("refresh");
		}
	});
	
	return LzbmView;
});