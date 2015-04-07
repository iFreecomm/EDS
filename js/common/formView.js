define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Radio = require("radio");
	var Mn = require("marionette");
	
	var FormView = Mn.ItemView.extend({
		
		navigate: function(url, options) {
		    Backbone.history.navigate(url, options);
  		},
  		
  		getBindings: function(bindings, selectIdArr) {
  			bindings = bindings || {};
  			var selectBindings = Radio.channel("app").request("getSelectBindings", selectIdArr);
  			return _.extend(bindings, selectBindings);
  		},
  		
  		activeLink: function() {
	  		Radio.channel("index").command("activeLink");
	  		return this;
  		},
		
		// 使用jqueryui中的自定义的下拉列表
		selectmenu: function() {
			this.$("select").selectmenu({
				change: this._changeEvent,
				appendTo: this.$(".formBox")
			});
			return this;
		},
		_changeEvent: function(event, ui) {
			$(event.target).change();
		},
		
		// 修复IE8中自定义的checkbox的样式问题
		fixIE8: function() {
			if(this.isIE8()) {
				this.initCheckboxClass();
				this.addCheckboxEvent();
			}
			return this;
		},
  		isIE8: function() {
			return document.all && !document.addEventListener;
		},
		initCheckboxClass: function() {
			this.$(".label-checkbox").each(function() {
				var $label = $(this);
				var $checkbox = $label.prev();
				$checkbox.is(":checked") ? $label.addClass("active") : $label.removeClass("active");
			});
		},
		addCheckboxEvent: function() {
			this.$el.on("click", ".label-checkbox", function() {
				var $label = $(this);
				var $checkbox = $label.prev();
				var box = $checkbox.get(0);
				box.checked = !box.checked;
				box.checked ? $label.addClass("active") : $label.removeClass("active");
				$checkbox.change();
				return false;
			});
		}
  		
	});
	
	return FormView;
});