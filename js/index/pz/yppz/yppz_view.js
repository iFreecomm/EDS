define(function(require) {
	var Radio = require("radio");
	var Mn = require("marionette");
	var tmpl = require("text!web/index/pz/yppz/yppz_template.html");
	
	var BzhyView = require("web/index/pz/yppz/bzhy/panel_view");
	var YyjlView = require("web/index/pz/yppz/yyjl/panel_view");
	
	var JybyView = require("web/index/pz/yppz/jyby/jyby_view");
	
	var BdsrView = require("web/index/pz/yppz/bdsr/panel_view");
	var BdscYlView = require("web/index/pz/yppz/bdsc_yl/panel_view");
	
	var JsydhyView = require("web/index/pz/yppz/jsydhy/panel_view");
	var FsydhyView = require("web/index/pz/yppz/fsydhy/panel_view");
	
	var FkyzView = require("web/index/pz/yppz/fkyz/panel_view");
	var ZdjzView = require("web/index/pz/yppz/zdjz/panel_view");
	var HsxcView = require("web/index/pz/yppz/hsxc/panel_view");
	
	var YxView = require("web/index/pz/yppz/yx/panel_view");
	var XfView = require("web/index/pz/yppz/xf/panel_view");
	var BdscBzView = require("web/index/pz/yppz/bdsc_bz/panel_view");
	
	var JhtjView = require("web/index/pz/yppz/jhtj/panel_view");
	
	var YppzView = Mn.LayoutView.extend({
		id: "pz_yppz",
		template: tmpl,
		regions: {
			jybyContainer: "#jyby_container",
			bdsrContainer: "#bdsr_container",
			bdscYlContainer: "#bdsc_yl_container",
			jsydhyContainer: "#jsydhy_container",
			fsydhyContainer: "#fsydhy_container",
			bzhyContainer: "#bzhy_container",
			yyjlContainer: "#yyjl_container",
			jhtjContainer: "#jhtj_container",
			fkyzContainer: "#fkyz_container",
			zdjzContainer: "#zdjz_container",
			hsxcContainer: "#hsxc_container",
			yxContainer: "#yx_container",
			xfContainer: "#xf_container",
			bdscBzContainer: "#bdsc_bz_container"
		},
		
		onBeforeShow: function(view, region, options) {
			this.showChildView("bzhyContainer", new BzhyView());
			this.showChildView("yyjlContainer", new YyjlView());
			
			this.showChildView("jybyContainer", new JybyView());
			
			this.showChildView("bdsrContainer", new BdsrView());
			this.showChildView("bdscYlContainer", new BdscYlView());
			
			this.showChildView("jsydhyContainer", new JsydhyView());
			this.showChildView("fsydhyContainer", new FsydhyView());
			
			this.showChildView("fkyzContainer", new FkyzView());
			this.showChildView("zdjzContainer", new ZdjzView());
			this.showChildView("hsxcContainer", new HsxcView());
			
			this.showChildView("yxContainer", new YxView());
			this.showChildView("xfContainer", new XfView());
			this.showChildView("bdscBzContainer", new BdscBzView());
			
			this.showChildView("jhtjContainer", new JhtjView());
		},
		
		onAttach: function() {
			Radio.channel("index").command("activeLink");
		}
	});
	
	return YppzView;
});
