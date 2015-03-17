define(function(require) {
	var ShowLxrView = require("view/lxr_show_view");
	var AddLxrView = require("view/lxr_add_view");
	
	var LxrView = Backbone.View.extend({
		name: "lxr",
		id: "c1",
		setContent: function() {
    		this.$el.html(this.contentView.el);
    	},
		showLxr: function() {
			this.closeView(this.contentView);
			this.contentView = new ShowLxrView();
			this.setContent();
		},
		addLxr: function(lxrId) {
			this.closeView(this.contentView);
			this.contentView = new AddLxrView({lxrId: lxrId});
			this.setContent();
		},
		closeView: function(view) {
    		view && (view.close ? view.close() : view.remove());
    	},
		close: function() {
			this.closeView(this.contentView);
			this.remove();
		}
	});
	
	return LxrView;
});