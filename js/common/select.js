define(function(require) {
	var Const = require("web/common/const");
	
	return {
		"equType":[
			{label: "SDI摄像机",  value: 0},
			{label: "远程H.323",  value: 1},
			{label: "远程SIP",    value: 2},
			{label: "远程RTSP",   value: 3}
		],
		"presetNum":[
			{label: "对应预置位0", value: 0},
			{label: "对应预置位1", value: 1},
			{label: "对应预置位2", value: 2},
			{label: "对应预置位3", value: 3}
		],
		"incPriLev":[
			{label: "优先级1(最高)",  value: 0},
			{label: "优先级2",       value: 1},
			{label: "优先级3",       value: 2},
			{label: "优先级4",       value: 3},
			{label: "优先级5",       value: 4},
			{label: "优先级6",       value: 5},
			{label: "优先级7",       value: 6},
			{label: "优先级8",       value: 7},
			{label: "优先级9",       value: 8},
			{label: "优先级10(最低)", value: 9}
		],
		"bandwidth":[
			{label: "384K", value: 384000},
			{label: "512K", value: 512000},
			{label: "768K", value: 768000},
			{label: "1M",   value: 960000},
			{label: "2M",   value: 1920000},
			{label: "4M",   value: 3840000},
			{label: "5M",   value: 4800000},
			{label: "6M",   value: 5760000},
			{label: "8M",   value: 7680000}
		],
		"audProt":[
			{label: "AUTO",     value: Const.AudCode_Auto},
			{label: "G.711A",   value: Const.AudCode_G711A},
			{label: "G.711C",   value: Const.AudCode_G711C},
			{label: "G.722",    value: Const.AudCode_G722},
			{label: "AAC",      value: Const.AudCode_AAC},
			{label: "G.722.1",  value: Const.AudCode_G722_1},
			{label: "G.722.1C", value: Const.AudCode_G722_1C}
		],
		"vidProt":[
			{label: "AUTO",    value: Const.VidProt_Auto},
			{label: "H.263",   value: Const.VidProt_H263},
			{label: "H.263+",  value: Const.VidProt_H263P},
			{label: "H.264",   value: Const.VidProt_H264},
			{label: "H.264HP", value: Const.VidProt_H264HP}
		],
		"vidFmt":[
			{label: "AUTO",             value: Const.VidFmt_Auto},
			{label: "1080P(1920x1080)", value: Const.VidFmt_1080},
			{label: "SXGA(1280x1024)",  value: Const.VidFmt_1280X1024},
			{label: "720P(1280x720)",   value: Const.VidFmt_720},
			{label: "XGA(1024x768)",    value: Const.VidFmt_1024X768},
			{label: "SVGA(800x600)",    value: Const.VidFmt_800X600},
			{label: "4CIF(704x576)",    value: Const.VidFmt_4Cif},
			{label: "WCIF(512x288)",    value: Const.VidFmt_WCif},
			{label: "CIF(352x288)",     value: Const.VidFmt_Cif},
			{label: "QCIF(176x144)",    value: Const.VidFmt_QCif}
		],
		"frameRate":[
			{label: "AUTO", value: 0},
			{label: "15",   value: 15},
			{label: "20",   value: 20},
			{label: "25",   value: 25},
			{label: "30",   value: 30},
			{label: "50",   value: 50},
			{label: "60",   value: 60}
		],
		"vidQuality":[
			{label: "流畅", value: Const.VidQuality_Fluency},
			{label: "清晰", value: Const.VidQuality_Clear}
		],
		"secProt":[
			{label: "AUTO",    value: Const.VidProt_Auto},
			{label: "H.263",   value: Const.VidProt_H263},
			{label: "H.263+",  value: Const.VidProt_H263P},
			{label: "H.264",   value: Const.VidProt_H264},
			{label: "H.264HP", value: Const.VidProt_H264HP}
		],
		"secFmt":[
			{label: "AUTO",             value: Const.VidFmt_Auto},
			{label: "1080P(1920x1080)", value: Const.VidFmt_1080},
			{label: "SXGA(1280x1024)",  value: Const.VidFmt_1280X1024},
			{label: "720P(1280x720)",   value: Const.VidFmt_720},
			{label: "XGA(1024x768)",    value: Const.VidFmt_1024X768},
			{label: "SVGA(800x600)",    value: Const.VidFmt_800X600},
			{label: "4CIF(704x576)",    value: Const.VidFmt_4Cif},
			{label: "WCIF(512x288)",    value: Const.VidFmt_WCif},
			{label: "CIF(352x288)",     value: Const.VidFmt_Cif},
			{label: "QCIF(176x144)",    value: Const.VidFmt_QCif}
		],
		"secFrameRate":[
			{label: "AUTO", value: 0},
			{label: "15",   value: 15},
			{label: "20",   value: 20},
			{label: "25",   value: 25},
			{label: "30",   value: 30},
			{label: "50",   value: 50},
			{label: "60",   value: 60}
		],
		"secQuality":[
			{label: "流畅", value: Const.VidQuality_Fluency},
			{label: "清晰", value: Const.VidQuality_Clear}
		],
		"secVidSend":[
			{label: "自动", value: 0},
			{label: "手动", value: 1}
		]
	};
});
