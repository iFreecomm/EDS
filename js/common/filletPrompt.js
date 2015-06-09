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
    	var $arrow = $('<div class="formErrorArror"><div class="line10"></div><div class="line9"></div><div class="line8"></div><div class="line7"></div><div class="line6"></div><div class="line5"></div><div class="line4"></div><div class="line3"></div><div class="line2"></div><div class="line1"></div></div>');
    	
		return $formError.append($content).append($arrow).attr("id", id);
    }
    
    //定位提示框
    function positionPrompt($prompt, $input, option) {
    	var pos = $input.position();
    	var width = $prompt.width();
    	var height = $prompt.height();
    	var offsetTop = option.offsetTop || 0;
    	var offsetLeft = option.offsetLeft || 0;
    	
    	$prompt.css({
    		top: pos.top - height + offsetTop,
    		left: pos.left + offsetLeft
    	});
    }
    
    //创建一个新提示
    function buildPrompt(promptText, $input, option) {
		var id = $input.data("formErrorId");
		if(id) {
			option.appendTo.find("#"+id).find(".formErrorContent").text(promptText);
		} else {
			id = _.uniqueId("formError");
			$input.data("formErrorId", id);
			var $prompt = newPrompt(promptText, id);
			option.appendTo.append($prompt);
			positionPrompt($prompt, $input, option);
			$prompt.animate({"opacity":1});
		}
    }
    
    //删除提示
    function closePrompt($input, option) {
    	var id = $input.data("formErrorId");
    	if(id) {
    		option.appendTo.find("#"+id).animate({"opacity":0}, function() {
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