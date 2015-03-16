define(function(require) {
	require("css!style/lxr.css");
	var ShowLxrView = require("view/lxr_show_view");
	var AddLxrView = require("view/lxr_add_view");
	
	var LxrView = Backbone.View.extend({
		name: "lxr",
		renderShowLxr: function() {
			this.closeView(this.contentView);
			this.contentView = new ShowLxrView();
			this.renderContent();
		},
		renderAddLxr: function(lxrId) {
			this.closeView(this.contentView);
			this.contentView = new AddLxrView({lxrId: lxrId});
			this.renderContent();
		},
		renderContent: function() {
			$("#c1").append(this.contentView.el);
		},
		close: function() {
			this.closeView(this.contentView);
			this.remove();
		},
		closeView: function(view) {
    		view && (view.close ? view.close() : view.remove());
    	}
	});
	
	return LxrView;
});