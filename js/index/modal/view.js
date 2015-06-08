define(function(require) {
	var $ = require("jquery");
	var Backbone = require("backbone");
	var Radio = require("radio");
	var Mn = require("marionette");
	var tmpl = require("text!web/index/modal/template.html");
	
	var LoadingView = require("web/index/modal/loading/view");
	var AlertView = require("web/index/modal/alert/view");
	var ConfirmView = require("web/index/modal/confirm/view");
	
	var LayoutView = Mn.LayoutView.extend({
		className: "modal fade in",
		template: tmpl,
		regions: {
			dialog: ".modal_dialog"
		},
		
		initialize: function() {
			Radio.channel("modal").reply({
				"loading": this.loading,
				"alert": this.alert,
				"confirm": this.confirm,
				"close": this.close
			}, this);
		},
		
		loading: function() {
			var view = new LoadingView();
			this.open(view);
		},
		
		alert: function(options) {
			var deferred = $.Deferred();
			var view = new AlertView(options);
			view.on({
				"confirm": deferred.resolve,
				"cancel": deferred.resolve
			});
			this.open(view);
			return deferred;
		},
		
		confirm: function(options) {
			var deferred = $.Deferred();
			var view = new ConfirmView(options);
			view.on({
				"confirm": deferred.resolve,
				"cancel": deferred.reject
			});
			this.open(view);
			return deferred;
		},
		
		open: function(view) {
			this.showChildView("dialog", view);
			if(!this.isOpen) {
				this.$el.show();
				this.isOpen = true;
			}
		},

		close: function() {
			if(this.isOpen) {
				this.$el.hide();
				this.dialog.empty();
				this.isOpen = false;
			}
			return $.Deferred().resolve();
		}
	});
	
	return LayoutView;
});