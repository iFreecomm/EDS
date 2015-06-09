define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Prompt = require("web/common/filletPrompt");
	
	var CheckUtil = {
		//非空
	    notNull: function(val) {
	        if(val === "") {
	            return "不能为空";
	        }
	    },
	    
		//trim校验
		trimCheck: function(val) {
			var reg = /^\s+|\s+$/;
			if(reg.test(val)) {
				return "首尾不能为空白字符";
			}
		},
	    
	    //密码校验
	    passCheck: function(val) {
	        //var regPass = new RegExp('(?=.*[0-9])(?=.*[a-zA-Z]).{1,31}');
	        var regPass = new RegExp('(^[0-9a-z_]*$)');
			var retPass = regPass.test(val);
	        if(!retPass) {
	        	return "密码只能包含字母 数字 _";
			}
	    },
	    
	    //数字 * #
	    e164Check: function(val) {
	        var reg = new RegExp('^[0-9\*#]*$');
	        var ret = reg.test(val);
	        if(!ret) {
	        	return "只能输入数字*#";
			}
	    },
	    
	    //纯数字
	    numberCheck: function(val) {
	        var reg = new RegExp('^[0-9]*$');
	        var ret = reg.test(val);
	        if(!ret) {
	        	return "只能输入数字";
			}
	    },
	    
	    //ip地址校验
	    ipCheck: function(val) {
	        //var reg = new RegExp('((?:(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(?:25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d))))');
	        //var reg=/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/
	        var reg=/^((\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.){3}(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
	        var ret = reg.test(val);
	        if(!ret) {
	        	return "请输入合法的IP地址";
			}
	    },
	    
	    //URL校验
	    urlCheck: function(val) {
	        var reg = new RegExp('^(http://|https://)?((?:[A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/\?\:]?.*$');
	        var ret = reg.test(val);
	        if(!ret) {
	        	return "请输入合法的url";
			}
	    }
		
	};
	
	// 找到匹配input的option
	function checkInput($input, options) {
		for(var key in options) {
			if($input.is(key)) {
				return _checkInput($input, options[key]);
			}
		}
	}
	function _checkInput($input, option) {
		var val = $input.val();
		var constraint = option.constraint;
		var promptText = "";
		
		_setAppendTo($input, option);
		
		_.some(constraint, function(fnName) {
			promptText = CheckUtil[fnName](val);
			return promptText;
		});
		
		if(promptText) {
			Prompt.buildPrompt(promptText, $input, option);
		} else {
			Prompt.closePrompt($input, option);
		}
		
		return promptText;
	}
	function _setAppendTo($input, option) {
		var appendTo = option.appendTo;
		if(typeof appendTo === "string") {
			option.appendTo = $input.parents(appendTo).eq(0);
		}
	}
	
	function checkForm($el, options) {
		var isValid = true;
		for(var key in options) {
			_checkInput($el.find(key), options[key]) && (isValid = false);
		}
		return isValid;
	}
	
	return {
		checkInput: checkInput,
		checkForm: checkForm
	};
});
