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
  		
		// 刷新表单，主要是为了同步数据
		refreshForm: function() {
			this.refreshSelectmenu();
			this.refreshSlider();
		},
		// 刷新jqueryui中的selectmenu
		refreshSelectmenu: function() {
			this.$("select").selectmenu("refresh");
		},
		// 刷新jqueryui中的slider
		refreshSlider: function() {
			this.$(".slider").each(function() {
				var $this = $(this);
				$this.slider("value", $this.siblings(".sliderValue").text());
			});
		},
		
		// 使用jqueryui中的selectmeu控件
		selectmenu: function() {
			this.$("select").selectmenu({
				change: this._selectChangeEvent,
				appendTo: this.$(".formBox")
			});
			return this;
		},
		_selectChangeEvent: function(event, ui) {
			$(event.target).change();
		},
		
		// 使用jqueryui中的slider控件
		initSlider: function() {
			var self = this;
			this.$(".slider").each(function() {
				var $this = $(this);
				var $sib = $this.siblings(".sliderValue");
				$this.slider({
					range: "min",
					value: $sib.text(),
					min: $sib.data("min"),
					max: $sib.data("max"),
					slide: self._slideEvent,
					stop: self._slideStopEvent,
				});
			});
			return this;
		},
		_slideEvent: function(event, ui) {
			$(event.target).siblings(".sliderValue").text(ui.value);
		},
		_slideStopEvent: function(event, ui) {
			$(event.target).siblings(".sliderValue").change();
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