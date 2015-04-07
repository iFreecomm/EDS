define(function() {
	return {
		//音频协议
		AudCode_G711A: 0,
		AudCode_G711C: 1,
		AudCode_G723: 2,
		AudCode_G728: 3,
		AudCode_G729: 4,
		AudCode_G722: 5,
		AudCode_MP3: 6,
		AudCode_AACPlus: 7,
		AudCode_AAC: 8,
		AudCode_G722_1: 9,
		AudCode_G722_1C: 10,
		AudCode_Auto: 11,
		AudCode_Cnt: 12,
		
		//视频协议
		VidProt_H263: 0,
		VidProt_H263P: 1,   //H263 plus
		VidProt_H264: 2,
		VidProt_H264MP: 4,
		VidProt_H264HP: 5,
		VidProt_H264SVC: 3,
		VidProt_Auto: 6,
		VidProt_Cnt: 7,
		
		//视频格式
		VidFmt_QCif: 0,
		VidFmt_Cif: 1,     //CIF
		VidFmt_WCif: 2,    
		VidFmt_480: 3,
		VidFmt_4Cif: 4,     //  4 CIF
		VidFmt_576: 5,
		VidFmt_720: 6,       //720
		VidFmt_1080: 7,      //1080
		VidFmt_640X480: 8,     //VGA
		VidFmt_800X600: 9,     //SVGA
		VidFmt_1024X768: 10,    //XGA
		VidFmt_1280X768: 11,  //WXGA
		VidFmt_1280X800: 12,  //WXGA
		VidFmt_1366X768: 13,    //WXGA
		VidFmt_1280X1024: 14,   //SXGA
		VidFmt_1600X1200: 15,   //UXGA
		VidFmt_1920X1200: 16,   //WUXGA
		VidFmt_Custom: 17, //自定义
		VidFmt_Auto: 18,       //自动
		VidFmt_Cnt: 19,
		
		//图像质量
		VidQuality_Fluency: 0,//流畅
		VidQuality_Clear: 1 //清晰
	};
});
