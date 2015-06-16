define(function(require) {
	var _ = require("underscore");
	var Backbone = require("backbone");
	var Radio = require("radio");
	var Mn = require("marionette");
	var tmpl = require("text!web/index/index_template.html");
	
	var ModalView = require("web/index/modal/view");
	
	var LayoutView = Mn.LayoutView.extend({
		id: "wrapper",
		template: tmpl,
		regions: {
			container: "#c1",
			navLeft: ".navLeft",
			contentRight: ".contentRight",
			modalContainer: ".modal_container"
		},
		
		initialize: function() {
			Radio.channel("index").comply("activeLink", this.activeLink, this);
		},
		onBeforeShow: function(view, region, options) {
			var navLeftRegion = this.getRegion("navLeft");
			var optNavLeftView = options.navLeftView;
			
			if(!optNavLeftView) {
				navLeftRegion.empty();
			} else {
				if(_.isFunction(optNavLeftView)) {
					navLeftRegion.show(new optNavLeftView());
				} else {
					navLeftRegion.show(optNavLeftView);
				}
			}
			
			this.getRegion("contentRight").show(options.contentRightView, options);
			this.showChildView("modalContainer", new ModalView());
		},
		onDestroy: function() {
			Radio.channel("index").reset();
		},
		
		activeLink: function(path) {
			var hash = path || Backbone.history.getHash();
			var num = hash.indexOf("/");
			var hashRoot = num === -1 ? hash : hash.slice(0, num);
			this.$(".navTop").find("a").removeClass("active").filter("[href='#"+hashRoot+"']").addClass("active");
			var $a = this.$(".navLeft").find("a");
			if($a.length === 0) return;
			$a.removeClass("active").filter("[href*='"+hash+"']").eq(0).addClass("active");
		}
	});
	
	return LayoutView;
});