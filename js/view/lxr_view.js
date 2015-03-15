define(function(require) {
	require("css!style/lxr.css");
	var ShowLxrView = require("view/lxr_show_view");
	var AddLxrView = require("view/lxr_add_view");
	
	var LxrView = Backbone.View.extend({
		name: "lxr",
		renderShowLxr: function() {
			this.closeContent();
			this.contentView = new ShowLxrView();
			this.renderContent();
		},
		renderAddLxr: function(lxrId) {
			this.closeContent();
			this.contentView = new AddLxrView({lxrId: lxrId});
			this.renderContent();
		},
		renderContent: function() {
			$("#c1").append(this.contentView.el);
		},
		closeContent: function() {
			this.contentView && this.contentView.close();
		},
		close: function() {
			this.closeContent();
			this.remove();
		}
	});
	
	return LxrView;
});