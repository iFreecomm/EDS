define(function(require) {
	var $ = require("jquery");
	var Mn = require("marionette");
	var Radio = require("radio");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/hykz/ypclq/ypclq_template.html");
	
	var BzhyView = require("web/index/hykz/ypclq/bzhy/panel_view");
	var YyjlView = require("web/index/hykz/ypclq/yyjl/panel_view");
	
	var JybyView = require("web/index/hykz/ypclq/jyby/jyby_view");
	
	var BdsrView = require("web/index/hykz/ypclq/bdsr/panel_view");
	var BdscYlView = require("web/index/hykz/ypclq/bdsc/yl/panel_view");
	
	var JsydhyView = require("web/index/hykz/ypclq/jsydhy/panel_view");
	var FsydhyView = require("web/index/hykz/ypclq/fsydhy/panel_view");
	
	var FkyzView = require("web/index/hykz/ypclq/fkyz/panel_view");
	var ZdjzView = require("web/index/hykz/ypclq/zdjz/panel_view");
	var HsxcView = require("web/index/hykz/ypclq/hsxc/panel_view");
	
	var YxView = require("web/index/hykz/ypclq/yx/panel_view");
	var XfView = require("web/index/hykz/ypclq/xf/panel_view");
	var BdscBzView = require("web/index/hykz/ypclq/bdsc/bz/panel_view");
	
	var JhtjView = require("web/index/hykz/ypclq/jhtj/panel_view");
	
	var YpclqView = Mn.LayoutView.extend({
		id: "hykz_ypclq",
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
			Util.activeLink();
			var self = this;
			$(".contentRight").on("scroll", function() {
				self._stopTimer();
				self._loopTimer(2000);
			});
		},
		
		onShow: function() {
			//每隔1秒刷新实时信息
			this._loopTimer();
		},
		
		onDestroy: function() {
			this._stopTimer();
			$(".contentRight").off("scroll");
			Radio.channel("ypclq").reset();
		},
		
		_loopTimer: function(time) {
			var self = this;
			time = time || 0;
			this.timerId = setTimeout(_getRealtimeInfo, time);
			
			function _getRealtimeInfo() {
				$.getJSON("getYpclq.psp", function(realtime) {
					Radio.channel("ypclq").trigger("refresh", realtime.data);
				});
				
				self.timerId = setTimeout(_getRealtimeInfo, 1000);
			}
		},
		
		_stopTimer: function() {
			clearTimeout(this.timerId);
		}
	});
	
	return YpclqView;
});
