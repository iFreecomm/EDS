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
			//{label: "AUTO",     value: Const.AudCode_Auto},
			{label: "G.711A",   value: Const.AudCode_G711A},
			{label: "G.711C",   value: Const.AudCode_G711C},
			{label: "G.722",    value: Const.AudCode_G722},
			{label: "AAC",      value: Const.AudCode_AAC},
			{label: "G.722.1",  value: Const.AudCode_G722_1},
			{label: "G.722.1C", value: Const.AudCode_G722_1C}
		],
		"vidProt":[
			//{label: "AUTO",    value: Const.VidProt_Auto},
			{label: "H.263",   value: Const.VidProt_H263},
			{label: "H.263+",  value: Const.VidProt_H263P},
			{label: "H.264",   value: Const.VidProt_H264},
			{label: "H.264HP", value: Const.VidProt_H264HP}
		],
		"vidFmt":[
			//{label: "AUTO",             value: Const.VidFmt_Auto},
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
			//{label: "AUTO", value: 0},
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
			//{label: "AUTO",    value: Const.VidProt_Auto},
			{label: "H.263",   value: Const.VidProt_H263},
			{label: "H.263+",  value: Const.VidProt_H263P},
			{label: "H.264",   value: Const.VidProt_H264},
			{label: "H.264HP", value: Const.VidProt_H264HP}
		],
		"secFmt":[
			//{label: "AUTO",             value: Const.VidFmt_Auto},
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
			//{label: "AUTO", value: 0},
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
		],
		"sampleRate":[
			{label: "8KHz", value: 8000},
			{label: "16KHz", value: 16000},
			{label: "32KHz", value: 32000},
			{label: "44.1KHz", value: 44100},
			{label: "48KHz", value: 48000}
		],
		"bitRate":[
			{label: "8K", value: 8000},
			{label: "16K", value: 16000},
			{label: "32K", value: 32000},
			{label: "48K", value: 48000},
			{label: "64K", value: 64000},
			{label: "96K", value: 96000},
			{label: "128K",value: 128000},
			{label: "256K",value: 256000}
		],
		"dispPos":[
			{label: "左下角", value: 0},
			{label: "右下角", value: 1},
			{label: "左上角", value: 2},
			{label: "右上角", value: 3}
		],
		"captionPos":[
			{label: "左1/3", value: 0},
			{label: "右1/3", value: 1},
			{label: "底下单行", value: 2}
		],
		"scrollSpeed":[
			{label: "高", value: 0},
			{label: "中", value: 1},
			{label: "低", value: 2},
			{label: "不滚动", value: 3}
		],
		"fileType":[
			{label: "所有类型", value: Const.FileType_Cnt},
			{label: "音频", value: 0},
			{label: "视频", value: 1},
			{label: "图片", value: 2}
		],
		"recordVidProt":[
			{label: "H.264",   value: Const.VidProt_H264},
			{label: "H.264HP", value: Const.VidProt_H264HP}
		],
		"comPort":[
			{label: "COM1", value: 0},
			{label: "COM2", value: 1},
			{label: "COM3", value: 2},
			{label: "COM4", value: 3},
			{label: "COM5", value: 4},
			{label: "COM6", value: 5},
			{label: "COM7", value: 6},
			{label: "COM8", value: 7},
			{label: "COM9", value: 8},
			{label: "COM10", value: 9}
		],
		"comMode":[
			{label: "RS232", value: 0},
			{label: "RS485", value: 1}
		],
		"baudRate":[
			{label: "2400", value: 0},
			{label: "4800", value: 1},
			{label: "9600", value: 2},
			{label: "14400", value: 3},
			{label: "19200", value: 4},
			{label: "38400", value: 5},
			{label: "57600", value: 6},
			{label: "115200", value: 7},
			{label: "230400", value: 8}
		],
		"dataBit":[
			{label: "5", value: 0},
			{label: "6", value: 1},
			{label: "7", value: 2},
			{label: "8", value: 3}
		],
		"evenOddCheck":[
			{label: "None", value: 0},
			{label: "奇校验", value: 1},
			{label: "偶校验", value: 2},
			{label: "标记", value: 3},
			{label: "空格", value: 4}
		],
		"stopBit":[
			{label: "1", value: 0},
			{label: "1.5", value: 1},
			{label: "2", value: 2}
		],
		"cameraProt":[
			{label: "VISCA", value: 0},
			{label: "PelcoD", value: 1},
			{label: "PelcoP", value: 2}
		],
		"addr":[
			{label: "0", value: 0},
			{label: "1", value: 1},
			{label: "2", value: 2},
			{label: "3", value: 3},
			{label: "4", value: 4},
			{label: "5", value: 5},
			{label: "6", value: 6},
			{label: "7", value: 7}
		],
		"vidPortAuxType":[
			{label: "VGA", value: Const.VidPortType_VGA},
			{label: "YPbPr", value: Const.VidPortType_YPbPr}
		],
		"vidPortType":[
			{label: "DVI", value: Const.VidPortType_Dvi},
			{label: "HDMI", value: Const.VidPortType_Hdmi}
		],
		"speed":[
			{label: "快速", value: 0},
			{label: "中速", value: 1},
			{label: "慢速", value: 2}
		],
		"vidExpandMode":[
			{label: "等比缩放", value: 0},
			{label: "全屏缩放", value: 1},
			{label: "智能缩放", value: 2}
		],
		"vidOutFmt_vga":[
			{label: "1080P60(1920x1080)", value: Const.VidFmt_1080+"060"},
			{label: "1080P50(1920x1080)", value: Const.VidFmt_1080+"050"},
			{label: "720P60(1280x720)",   value: Const.VidFmt_720+"060"},
			{label: "720P50(1280x720)",   value: Const.VidFmt_720+"050"},
			{label: "UXGA(1600x1200)",   value: Const.VidFmt_1600X1200+"060"},
			{label: "SXGA(1280x1024)",  value: Const.VidFmt_1280X1024+"060"},
			{label: "XGA(1024x768)",    value: Const.VidFmt_1024X768+"060"},
			{label: "SVGA(800x600)",    value: Const.VidFmt_800X600+"060"}
		],
		"vidOutFmt_ypbpr":[
			{label: "1080P60(1920x1080)", value: Const.VidFmt_1080+"060"},
			{label: "1080P50(1920x1080)", value: Const.VidFmt_1080+"050"},
			{label: "1080P30(1920x1080)", value: Const.VidFmt_1080+"030"},
			{label: "1080I60(1920x1080)", value: Const.VidFmt_1080+"160"},
			{label: "1080I50(1920x1080)", value: Const.VidFmt_1080+"150"},
			{label: "720P60(1280x720)",   value: Const.VidFmt_720+"060"},
			{label: "720P50(1280x720)",   value: Const.VidFmt_720+"050"}
		],
		"vidOutFmt_hdmi":[
			{label: "1080P60(1920x1080)", value: Const.VidFmt_1080+"060"},
			{label: "1080P50(1920x1080)", value: Const.VidFmt_1080+"050"},
			{label: "1080P30(1920x1080)", value: Const.VidFmt_1080+"030"},
			{label: "1080I60(1920x1080)", value: Const.VidFmt_1080+"160"},
			{label: "1080I50(1920x1080)", value: Const.VidFmt_1080+"150"},
			{label: "720P60(1280x720)",   value: Const.VidFmt_720+"060"},
			{label: "720P50(1280x720)",   value: Const.VidFmt_720+"050"},
			{label: "UXGA(1600x1200)",   value: Const.VidFmt_1600X1200+"060"},
			{label: "SXGA(1280x1024)",  value: Const.VidFmt_1280X1024+"060"},
			{label: "XGA(1024x768)",    value: Const.VidFmt_1024X768+"060"},
			{label: "SVGA(800x600)",    value: Const.VidFmt_800X600+"060"}
		],
		"timezoneArr":[
			{"label":"UTC-12:00", "value":-12},
			{"label":"UTC-11:00", "value":-11},
			{"label":"UTC-10:00", "value":-10},
			{"label":"UTC-9:00", "value":-9},
			{"label":"UTC-8:00", "value":-8},
			{"label":"UTC-7:00", "value":-7},
			{"label":"UTC-6:00", "value":-6},
			{"label":"UTC-5:00","value":-5},
			{"label":"UTC-4:00","value":-4},
			{"label":"UTC-3:00","value":-3},
			{"label":"UTC-2:00","value":-2},
			{"label":"UTC-1:00","value":-1},
			{"label":"UTC","value":0},
			{"label":"UTC+1:00","value":1},
			{"label":"UTC+2:00","value":2},
			{"label":"UTC+3:00","value":3},
			{"label":"UTC+4:00","value":4},
			{"label":"UTC+5:00","value":5},
			{"label":"UTC+6:00","value":6},
			{"label":"UTC+7:00","value":7},
			{"label":"UTC+8:00","value":8},
			{"label":"UTC+9:00","value":9},
			{"label":"UTC+10:00","value":10},
			{"label":"UTC+11:00","value":11},
			{"label":"UTC+12:00","value":12}
		],
		"backgroundColor":[
			{"label":"白色","value":0},
			{"label":"黄色","value":1},
			{"label":"青色","value":2},
			{"label":"绿色","value":3},
			{"label":"品红色/洋红","value":4},
			{"label":"红色","value":5},
			{"label":"蓝色","value":6},
			{"label":"黑色","value":7}
		]
	};
});
