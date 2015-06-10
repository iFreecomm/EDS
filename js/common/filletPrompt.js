/**
 * author:huangjun
 */
define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
    
    //创建一个新提示
    function newPrompt(text, id) {
    	var $formError = $('<div class="formError"></div>');
    	var $content = $('<div class="formErrorContent"></div>').text(text);
    	var $arrow = $('<div class="formErrorArrow"><div class="line8"></div><div class="line7"></div><div class="line6"></div><div class="line5"></div><div class="line2"></div><div class="line1"></div></div>');
    	
		return $formError.append($content).append($arrow).attr("id", id);
    }
    
    //定位提示框
    function positionPrompt($prompt, $input, option) {
    	var pos = $input.position();
    	var inputWidth = $input.outerWidth();
    	var inputHeight = $input.outerHeight();
    	var promptWidth = $prompt.outerWidth();
    	var promptHeight = $prompt.outerHeight();
    	var offsetTop = option.offsetTop || 0;
    	var offsetLeft = option.offsetLeft || 0;
    	
    	$prompt.css({
    		top: pos.top - promptHeight + offsetTop,
    		left: pos.left + inputWidth - promptWidth + offsetLeft
    	});
    }
    
    //创建或者更新一个提示
    function buildPrompt(promptText, $input, $appendTo, option) {
		var id = $input.data("formErrorId"), $prompt;
		if(id) {
			$prompt = $appendTo.find("#"+id);
			$prompt.find(".formErrorContent").text(promptText);
			positionPrompt($prompt, $input, option);
		} else {
			id = _.uniqueId("formError");
			$input.data("formErrorId", id);
			$prompt = newPrompt(promptText, id).one("click", function() {
				closePrompt($input, $appendTo);
			});
			$appendTo.append($prompt);
			positionPrompt($prompt, $input, option);
			$prompt.animate({"opacity":1});
		}
    }
    
    //删除提示
    function closePrompt($input, $appendTo) {
    	var id = $input.data("formErrorId");
    	if(id) {
    		$appendTo.find("#"+id).animate({"opacity":0}, function() {
    			$(this).remove();
    			$input.removeData("formErrorId");
    		});
    	}
    }

    return {
        buildPrompt: buildPrompt,
        closePrompt: closePrompt
	};
});