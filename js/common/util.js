define(function() {
	var $ = require("jquery");
	var _ = require("underscore");
	var Radio = require("radio");
	var Backbone = require("backbone");
	
	var Util = {};
	
	/**
	 * 设置链接被选中
	 * @param {Object} path
	 */
	Util.activeLink = function(path) {
  		Radio.channel("index").command("activeLink", path);
  		return this;
	}
	/**
	 * 跳转URL的快捷方式
	 * @param {Object} url
	 * @param {Object} options
	 */
	Util.navigate = function(url, options) {
	    Backbone.history.navigate(url, options);
	}
	/**
	 * 重新加载URL
	 * @param {Object} url
	 */
	Util.loadURL = function(url) {
	    Backbone.history.loadURL(url);
	}
	
	/*************下面基本都是和表单相关的工具方法***********/
	
	/**
	 * 对象扁平化
	 * @param {Object} obj 嵌套结构的对象
	 * @param {Array} keyArr 属性名数组
	 * @param {Object} resultObj 扁平化对象
	 */
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

	/**
	 * 还原扁平化对象
	 * @param {Object} obj 扁平化对象
	 */
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
	
	/**
	 * 序列化对象并编码
	 * @param {Object} obj 准备发送到服务器端的数据
	 */
	Util.encode = function(obj) {
		return encodeURIComponent(JSON.stringify(obj));
	}
	/**
	 * 设置bindings中的selectOption属性
	 * @param {Object} bindings
	 */
	Util.setSelectBindings = function(bindings) {
		Radio.channel("app").request("setSelectBindings", bindings);
	}
	
	/**
	 * 刷新jqueryui中的selectmenu
	 * @param {Object} $select
	 */
	Util.refreshSelectmenu = function($select) {
		this._getReal($select, "select").selectmenu("refresh");
	}
	/**
	 * 刷新jqueryui中的slider
	 * @param {Object} $slider
	 */
	Util.refreshSlider = function($slider) {
		this._getReal($slider, ".slider").each(function() {
			var $this = $(this);
			$this.slider("value", $this.siblings(".sliderValue").text());
		});
	}
	
	/**
	 * 使用jqueryui中的selectmeu控件
	 * @param {Object} $select
	 * @param {Object} $appendTo
	 */
	Util.selectmenu = function($select, $appendTo) {
		this._getReal($select, "select").selectmenu({
			change: this._selectChangeEvent,
			appendTo: $appendTo
		});
		return this;
	}
	Util._selectChangeEvent = function(event, ui) {
		$(this).change();
	}
	
	/**
	 * 使用jqueryui中的slider控件
	 * 比较特殊，因为每一个slider的配置信息可能不一样
	 * 配置信息分布于html元素上的各个data属性值
	 * @param {Object} $slider
	 */
	Util.initSlider = function($slider) {
		var self = this;
		this._getReal($slider, ".slider").each(function() {
			var $this = $(this);
			var options = self._getSliderOptions($this);
			$this.slider(options);
		});
		return this;
	}
	/**
	 * 目前只有两种情况，以vertical字段作为判断条件
	 * 如果将来增加其它情况，最好换一个字段作为判断条件
	 * @param {Object} $slider
	 */
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
	
	/**
	 * 自定义checkbox
	 * 初始化checkbox-label的样式
	 * @param {Object} $label
	 */
	Util.initCheckboxClass = function($label) {
		this._getReal($label, ".checkbox-label").each(this._initClass);
		return this;
	}
	/**
	 * 给label添加点击事件
	 * @param {Object} $el
	 */
	Util.addCheckboxEvent = function($el) {
		$el.on("click", ".checkbox-label", function() {
			var $label = $(this);
			var $checkbox = $label.prev();
			var box = $checkbox.get(0);
			box.checked = !box.checked;
			box.checked ? $label.addClass("active") : $label.removeClass("active");
			$checkbox.change();
			return false;
		});
		return this;
	}
	
	/**
	 * 自定义radio
	 * 初始化radio-label的样式
	 * @param {Object} $label
	 */
	Util.initRadioClass = function($label) {
		this._getReal($label, ".radio-label").each(this._initClass);
		return this;
	}
	/**
	 * 给label添加点击事件
	 * @param {Object} $el
	 */
	Util.addRadioEvent = function($el) {
		$el.on("click", ".radio-label", function() {
			var $label = $(this);
			if($label.is(".active")) return;
			
			var $radio = $label.prev();
			
			if($radio.parent().is("td")) {
				//表格布局，比如垂直排列的编组
				var name = $radio.attr("name");
				$radio.parents("table").find('[name="' + name + '"]').next().removeClass("active");
			} else {
				//多个radio水平排列，比如radio-set
				$radio.siblings(".radio-label").removeClass("active");
			}
			
			$label.addClass("active");
			$radio.prop("checked", true).change();
			return false;
		});
		return this;
	}
	
	/**
	 * 初始化label元素的class属性，是否active
	 * 由checkbox和radio公用
	 */
	Util._initClass = function() {
		var $label = $(this);
		$label.prev().is(":checked") ? $label.addClass("active") : $label.removeClass("active");
	}
	
	/**
	 * 如果$el是selector元素，则返回$el，否则返回$el的后代元素
	 * @param {Object} $el
	 * @param {Object} selector
	 */
	Util._getReal = function($el, selector) {
		if($el.is(selector)) {
			return $el;
		} else {
			return $el.find(selector);
		}
	}
	
	return Util;
});
