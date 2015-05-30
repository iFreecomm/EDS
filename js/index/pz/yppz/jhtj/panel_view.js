define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/yppz/jhtj/panel_template.html");
	
	var JhtjCollection = require("web/index/pz/yppz/jhtj/jhtj_collection");
	var JhtjCollectionView = require("web/index/pz/yppz/jhtj/jhtj_collection_view");
	
	var PanelView = Mn.LayoutView.extend({
		className: "panel-blue",
		template: tmpl,
		regions: {
			container: ".slide-container"
		},
		events: {
			"click .btn" : "changeOutport"
		},
		onAttach: function() {
			this.$(".btn").eq(0).click();
		},
		
		changeOutport:function(e) {
			var $btn = $(e.target);
			if($btn.is(".active")) return;
			
			$btn.addClass("active").siblings().removeClass("active");
			
			var port = $btn.data("value");
			var view = this;
			var collection = new JhtjCollection();
			
			collection.fetch({
				data: Util.encode({
					outPort: port
				})
			})
			.done(function() {
				view.showChildView("container", new JhtjCollectionView({
					collection: collection,
					outPort: port
				}));
			});
		}
	});
	
	return PanelView;
});
