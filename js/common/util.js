define(function() {
	var $ = require("jquery");
	var _ = require("underscore");
	var Radio = require("radio");
	var Backbone = require("backbone");
	
	var Util = {};
	
	Util.flat = function(obj, keyArr, resultObj) {
		keyArr = keyArr || [];
		resultObj = resultObj || {};
		var key, value;
		for(key in obj) {
			if(obj.hasOwnProperty(key)) {
				keyArr.push(key);
				value = obj[key];
				if(value instanceof Object) {
					flat(value, keyArr, resultObj);
				} else {
					resultObj[keyArr.join(".")] = value;
				}
				keyArr.pop();
			}
		}
		return resultObj;
	}

	Util.fat = function(obj) {
		var keyArr = [], curObj, curKey, key, result = {};
		
		for(key in obj) {
			if(obj.hasOwnProperty(key)) {
				keyArr = key.split(".");
				curObj = result;
				for(var i = 0, l = keyArr.length - 1; i < l; i ++) {
					curKey = keyArr[i];
					curObj[curKey] || (curObj[curKey] = {});
					curObj = curObj[curKey];
				}
				curObj[keyArr[i]] = obj[key];
			}
		}
		
		return result;
	}
	
	Util.navigate = function(url, options) {
	    Backbone.history.navigate(url, options);
	}
	
	Util.setSelectBindings = function(bindings) {
		Radio.channel("app").request("setSelectBindings", bindings);
	}
	
	Util.activeLink = function() {
  		Radio.channel("index").command("activeLink");
	}
	
	Util.toggleSwitch = function(e) {
		$(e.target).toggleClass("active");
	}
	
	// 刷新表单，主要是为了同步数据
	Util.refreshForm = function() {
		this.refreshSelectmenu();
		this.refreshSlider();
	}
	// 刷新jqueryui中的selectmenu
	Util.refreshSelectmenu = function() {
		this.$("select").selectmenu("refresh");
	}
	// 刷新jqueryui中的slider
	Util.refreshSlider = function() {
		this.$(".slider").each(function() {
			var $this = $(this);
			$this.slider("value", $this.siblings(".sliderValue").text());
		});
	}
	
	// 使用jqueryui中的selectmeu控件
	Util.selectmenu = function() {
		this.$("select").selectmenu({
			change: this._selectChangeEvent,
			appendTo: this.$(".formBox")
		}).change();
		return this;
	}
	Util._selectChangeEvent = function(event, ui) {
		$(this).change();
	}
	
	// 使用jqueryui中的slider控件
	Util.initSlider = function() {
		var self = this;
		this.$(".slider").each(function() {
			var $this = $(this);
			var options = self._getSliderOptions($this);
			$this.slider(options);
		});
		return this;
	}
	// 目前只有两种情况，以vertical字段作为判断条件
	// 如果将来增加其它情况，最好换一个字段作为判断条件
	Util._getSliderOptions = function($slider) {
		var $sliderValue = $slider.siblings(".sliderValue");
		var options = {
			range: "min",
			value: +$sliderValue.text(),
			min: $slider.data("min"),
			max: $slider.data("max")
		};
		if($slider.data("vertical")) {
			options.orientation = "vertical";
			options.slide = this._slideVerticalEvent;
			options.create = this._slideVerticalEvent;
		} else {
			options.slide = this._slideHorizontalEvent;
			options.change = this._slideHorizontalChangeEvent;
		}
		return options;
	}
	Util._slideHorizontalEvent = function(event, ui) {
		$(this).siblings(".sliderValue").text(ui.value);
	}
	Util._slideHorizontalChangeEvent = function(event, ui) {
		$(this).siblings(".sliderValue").change();
	}
	Util._slideVerticalEvent = function(event, ui) {
		//不同slider的高度以及取值范围不一样
		//由于现在大多数的高度都是261所以当作默认值
		var $this = $(this);
		
		var value = _.isNumber(ui.value) ? ui.value : $this.slider("value");
		var height = $this.data("height") || 261;
		var max = $this.data("max");
		
		$this.siblings(".color").height(value * height / max);
	}
	
	//自定义checkbox
	Util.fixCheckbox = function() {
		this.initCheckboxClass().addCheckboxEvent();
		return this;
	}
	Util.initCheckboxClass = function() {
		this.$(".checkbox-label").each(this._initClass);
		return this;
	}
	Util.addCheckboxEvent = function() {
		this.$el.on("click", ".checkbox-label", function() {
			var $label = $(this);
			var $checkbox = $label.prev();
			var box = $checkbox.get(0);
			box.checked = !box.checked;
			box.checked ? $label.addClass("active") : $label.removeClass("active");
			$checkbox.change();
			return false;
		});
	}
	Util._initClass = function() {
		var $label = $(this);
		$label.prev().is(":checked") ? $label.addClass("active") : $label.removeClass("active");
	}
	
	//自定义radio
	Util.fixRadio = function() {
		this.initRadioClass().addRadioEvent();
		return this;
	}
	Util.initRadioClass = function() {
		this.$(".radio-label").each(this._initClass);
		return this;
	}
	Util.addRadioEvent = function() {
		this.$el.on("click", ".radio-label", function() {
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
			
			$radio.prop("checked", true);
			$label.addClass("active");
			$radio.change();
			return false;
		});
	}
	
	return Util;
});
