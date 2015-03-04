(function($) {
	function CustomSelect(select, opt) {
		var $select = $(select);
		var $select_hgmwyp = $("<div class='select-hgmwyp'></div>");
		var $select_text_bg = $("<div class='select-text-bg'></div>");
		var $select_text = $("<div class='select-text'></div>");
		var $select_list = $("<div class='select-list'></div>");
		var $ul = $("<ul></ul>");
		var $li = $("<li></li>");
		$select.children().each(function() {
			$li.clone().text($(this).text()).appendTo($ul);
		});
		$select_text.text($select.find("option:selected").text()).appendTo($select_text_bg);
		$select_list.append($ul);
		
		$select_hgmwyp.append($select_text_bg).append($select_list).addClass(select.className);
		$select.hide().after($select_hgmwyp);
		
		$select.attr("direction") === "top" && $select_list.css({"top":11 - $select_list.height()});
	}
	
	$(document).click(function(e) {
		var $tar = $(e.target);
		var $select_hgmwyp = $tar.parents(".select-hgmwyp");
		if($select_hgmwyp.length) {
			$(".select-hgmwyp").not($select_hgmwyp).removeClass("active");
			$select_hgmwyp.toggleClass("active");
			var $select = $select_hgmwyp.prev();
			if($tar.is("li")) {
				var curIndex = $select.get(0).selectedIndex;
				var seclectIndex = $tar.index();
				if(curIndex !== seclectIndex) {
					$select_hgmwyp.find(".select-text").text($tar.text());
					$select.get(0).selectedIndex = seclectIndex;
					$select.change();
				}
			}
		} else {
			$(".select-hgmwyp").removeClass("active");
		}
	});
	
	$.fn.customSelect = function(opts) {
		return this.each(function() {
			new CustomSelect(this, opts);
		});
	};
	
})(jQuery);
