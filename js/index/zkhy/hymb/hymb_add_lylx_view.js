define(function(require) {
	var FormView = require("web/common/formView");
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_lylx_template.html");
	
	var LzbmView = FormView.extend({
		id: "hymb_add_lxly",
		template: tmpl,
		
		bindings: {
			"#enbRec":         "enbRec",
			"#equSrc":         "equSrc",
			
			"#HD_enbHandle":   {
				observe: "vidHdCfg.enbHandle",
				visible: true,
				visibleFn: "showMore"
			},
			
			"#HD_enbStoreHd":  "vidHdCfg.enbStoreHd",
			"#HD_vidProt":     "vidHdCfg.vidEncParam.vidProt",
			"#HD_fmt":         "vidHdCfg.vidEncParam.fmt",
			"#HD_frameRate":   "vidHdCfg.vidEncParam.frameRate",
			"#HD_bitRate":     "vidHdCfg.vidEncParam.bitRate",
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
			"#SD_vidProt":     "vidSdCfg.vidEncParam.vidProt",
			"#SD_fmt":         "vidSdCfg.vidEncParam.fmt",
			"#SD_frameRate":   "vidSdCfg.vidEncParam.frameRate",
			"#SD_bitRate":     "vidSdCfg.vidEncParam.bitRate",
			"#SD_RTSP_enable": "vidSdCfg.vodServeParam.enable",
			"#SD_RTSP_name":   "vidSdCfg.vodServeParam.name",
			"#SD_RTMP_enable": "vidSdCfg.pushDumpParam.enable",
			"#SD_RTMP_url":    "vidSdCfg.pushDumpParam.url",
			
			"#YP_enbHandle":   "audCfg.enbHandle",
			"#YP_audProt":     "audCfg.audEncParam.audProt",
			"#YP_sampleRate":  "audCfg.audEncParam.sampleRate",
			"#YP_bitRate":     "audCfg.audEncParam.bitRate",
			
			"#enbShowTheme":   "osdCfg.enbShowTheme",
			"#enbShowMark":    "osdCfg.enbShowMark",
			"#dispPos":        "osdCfg.dispPos",
			"#enbShowVolume":  "osdCfg.enbShowVolume",
			"#volPos":         "osdCfg.volPos",
			"#enbShowCaption": "osdCfg.enbShowCaption",
			"#capPos":         "osdCfg.capPos",
			"#scrollSpeed":    "osdCfg.scrollSpeed",
			"#caption":        "osdCfg.caption"
		},
		
		showMore: function($el, isVisible) {
			var $nextFieldBox = $el.parents(".fieldBox").eq(0).next(".fieldBox");
			isVisible && $nextFieldBox.slideDown() || $nextFieldBox.slideUp();
		},
		
		events: {
			"click .btn-switch6": "toggleSwitch"
		},
		toggleSwitch: function(e) {
			$(e.target).toggleClass("active").parents(".fieldBox").eq(0).next(".fieldBox").slideToggle();
		},
		
		initialize: function() {
		},
		
		onRender: function() {
			this.stickit().fixCheckbox();
		},
		onAttach: function() {
			this.selectmenu();
		}
	});
	
	return LzbmView;
});