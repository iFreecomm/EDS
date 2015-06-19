/*
 * jQuery custom IP 1.0.0
 *
 * Released under the MIT license.
 */

(function (factory) {
    if ( typeof define === 'function' && define.amd ) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory;
    } else {
        factory(jQuery);
    }
}(function ($) {

	$.fn.initIP = function() {
		return this.each(function() {
			var $input = $(this);
			var ipStr = $input.val();
			var ipArr = ipStr.split(".");
			
			var $ipContainer = $('<div class="ip-container"></div>');
			var $ipPart = $('<input type="text" class="ip-part" maxlength="3" autocomplete="off"/>');
			
			for(var i = 0; i < 4; i ++) {
				var tmp = parseInt(ipArr[i], 10) || 0;
				$ipPart.clone().val(tmp).appendTo($ipContainer);
			}
			
			$input.after($ipContainer);
			
			$ipContainer.on("input change", ".ip-part", function(e) {
				var $part = $(this);
				var ipStr = $part.val();
				if(!ipStr) return;
				var ipNumMatch = ipStr.match(/[0-9]/g) || [0];
				var ipStrNum = ipNumMatch.join("");
				var ipNum = parseInt(ipStrNum, 10);
				while(ipNum > 255) {
					ipStrNum = ipStrNum.slice(0, ipStrNum.length - 1);
					ipNum = parseInt(ipStrNum, 10);
				}
				if(ipStr !== ipNum.toString()) {
					$part.val(ipNum)
				};
				
				var ipVal = $input.val();
				var ipValArr = ipVal.split(".");
				while(ipValArr.length < 4) {
					ipValArr.push(0);
				}
				ipValArr[$part.index()] = ipNum;
				$input.val(ipValArr.join(".")).change();
			}).on("blur", ".ip-part", function(e) {
				var $part = $(this);
				var ipStr = $part.val();
				if(!ipStr) {
					$part.val(0);
				}
				$ipContainer.removeClass("active");
			}).on("focus", ".ip-part", function(e) {
				$ipContainer.addClass("active");
			}).on("keydown", ".ip-part", function(e) {
				var code = e.keyCode;
				
				if( (code > 32 && code < 41) ||
					(code > 44 && code < 58) ||
					(code > 95 && code < 106) ||
					(code === 8) || (code === 9) ||
					(code === 86 && e.ctrlKey) ) {
					return;
				}
				
				if(code === 13 || code === 110 || code === 190) {
					$(this).next().focus().select();
				}
				
				e.preventDefault();
			});
		});
	};
	
	$.fn.updateIP = function() {
		return this.each(function() {
			var $input = $(this);
			var ipStr = $input.val();
			var ipArr = ipStr.split(".");
			
			var $ipParts = $input.next(".ip-container").children();
			
			for(var i = 0; i < 4; i ++) {
				var tmp = parseInt(ipArr[i], 10) || 0;
				$ipParts.eq(i).val(tmp);
			}
		});
	};

}));
