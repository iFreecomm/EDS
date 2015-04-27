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
  		
  		toggleSwitch: function(e) {
  			$(e.target).toggleClass("active");
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
			$(this).change();
		},
		
		// 使用jqueryui中的slider控件
		initSlider: function() {
			var self = this;
			this.$(".slider").each(function() {
				var $this = $(this);
				var options = self._getSliderOptions($this);
				$this.slider(options);
				
				if(options.orientation === "vertical") {
					// 触发change事件
					$this.slider("value", options.value);
				}
			});
			return this;
		},
		// 目前只有两种情况，以vertical字段作为判断条件
		// 如果将来增加其它情况，最好换一个字段作为判断条件
		_getSliderOptions: function($slider) {
			var $sv = $slider.siblings(".sliderValue");
			var options = {
				range: "min",
				value: +$sv.text(),
				min: $sv.data("min"),
				max: $sv.data("max")
			};
			if($sv.data("vertical")) {
				options.orientation = "vertical";
				options.slide = this._slideVerticalEvent;
				options.change = this._slideVerticalChangeEvent;
			} else {
				options.slide = this._slideHorizontalEvent;
				options.change = this._slideHorizontalChangeEvent;
			}
			return options;
		},
		_slideHorizontalEvent: function(event, ui) {
			$(this).siblings(".sliderValue").text(ui.value);
		},
		_slideHorizontalChangeEvent: function(event, ui) {
			$(this).siblings(".sliderValue").change();
		},
		_slideVerticalEvent: function(event, ui) {
			// 267是颜色条纹的高度
			// 32是slider的最大值
			$(this).siblings(".color").height(ui.value * 267 / 32);
		},
		_slideVerticalChangeEvent: function(event, ui) {
			$(this).siblings(".color").height(ui.value * 267 / 32).end().siblings(".sliderValue").text(ui.value).change();
		},
		
		//自定义checkbox
		fixCheckbox: function() {
			this.initCheckboxClass();
			this.addCheckboxEvent();
			return this;
		},
		initCheckboxClass: function() {
			this.$(".checkbox-label").each(this._initClass);
		},
		addCheckboxEvent: function() {
			this.$el.on("click", ".checkbox-label", function() {
				console.log("checkbox");
				
				var $label = $(this);
				var $checkbox = $label.prev();
				var box = $checkbox.get(0);
				box.checked = !box.checked;
				box.checked ? $label.addClass("active") : $label.removeClass("active");
				$checkbox.change();
				return false;
			});
		},
		_initClass: function() {
			var $label = $(this);
			$label.prev().is(":checked") ? $label.addClass("active") : $label.removeClass("active");
		},
		
		//自定义radio
		fixRadio: function() {
			this.initRadioClass();
			this.addRadioEvent();
			return this;
		},
		initRadioClass: function() {
			this.$(".radio-label").each(this._initClass);
		},
		addRadioEvent: function() {
			this.$el.on("click", ".radio-label", function() {
				console.log("radio");
				
				var $label = $(this);
				if($label.is(".active")) return;
				
				var $radio = $label.prev();
				
				if($radio.parent().is("td")) {
					//表格布局，比如垂直排列的编组
					var name = $radio.attr("name");
					$radio.parents("table").find('[name=' + name + ']').next().removeClass("active");
				} else {
					//多个radio水平排列，比如radio-set
					$radio.siblings(".radio-label").removeClass("active");
				}
				
				$label.addClass("active");
			});
		}
  		
	});
	
	return FormView;
});