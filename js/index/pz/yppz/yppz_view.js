define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var Mn = require("marionette");
	var tmpl = require("text!web/index/pz/yppz/yppz_template.html");
	
	var JybyView = require("web/index/pz/yppz/jyby/jyby_view");
	var BdsrView = require("web/index/pz/yppz/bdsr/bdsr_view");
//	var BdscYlView = require("web/index/pz/yppz/bdsc_yl/bdsc_view");
//	var BdscBzView = require("web/index/pz/yppz/bdsc_bz/bdsc_view");
//	var JhtjView = require("web/index/pz/yppz/jhtj/jhtj_view");
//	var FsydhyView = require("web/index/pz/yppz/fsydhy/fsydhy_view");
//	var JsydhyView = require("web/index/pz/yppz/jsydhy/jsydhy_view");
//	var BzhyView = require("web/index/pz/yppz/bzhy/bzhy_view");
//	var HsxcView = require("web/index/pz/yppz/hsxc/hsxc_view");
//	var ZdjzView = require("web/index/pz/yppz/zdjz/zdjz_view");
//	var FkyzView = require("web/index/pz/yppz/fkyz/fkyz_view");
	
	var YppzView = Mn.LayoutView.extend({
		id: "pz_yppz",
		template: tmpl,
		regions: {
			jybyContainer: "#jyby_container",
			bdsrContainer: "#bdsr_container .panel-body",
			bdscYlContainer: "#bdsc_yl_container .panel-body",
			jsydhyContainer: "#jsydhy_container .panel-body",
			fsydhyContainer: "#fsydhy_container .panel-body",
			bzhyContainer: "#bzhy_container .panel-body",
			yyjlContainer: "#yyjl_container .panel-body",
			jhtjContainer: "#jhtj_container .panel-body",
			fkyzContainer: "#fkyz_container .panel-body",
			zdjzContainer: "#zdjz_container .panel-body",
			hsxcContainer: "#hsxc_container .panel-body",
			yxContainer: "#yx_container .panel-body",
			xfContainer: "#xf_container .panel-body",
			bdscBzContainer: "#bdsc_bz_container .panel-body"
		},
		
		onBeforeShow: function(view, region, options) {
			this.showChildView("jybyContainer", new JybyView());
			this.showChildView("bdsrContainer", new BdsrView());
//			this.showChildView("bdscYlContainer", new BdscYlView());
//			this.showChildView("jsydhyContainer", new JsydhyView());
//			this.showChildView("fsydhyContainer", new FsydhyView());
//			this.showChildView("bzhyContainer", new BzhyView());
//			this.showChildView("yyjlContainer", new YyjlView());
//			this.showChildView("jhtjContainer", new JhtjView());
//			this.showChildView("fkyzContainer", new FkyzView());
//			this.showChildView("zdjzContainer", new ZdjzView());
//			this.showChildView("hsxcContainer", new HsxcView());
//			this.showChildView("yxContainer", new YxView());
//			this.showChildView("xfContainer", new XfView());
//			this.showChildView("bdscBzContainer", new BdscBzView());
		},
		
		onAttach: function() {
			Radio.channel("index").command("activeLink");
		}
	});
	
	return YppzView;
});
