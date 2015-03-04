(function($) {

	var $wrapperTable = $("#wrapper-table");
	var $wrapper = $("#wrapper");
	var $back = $("#back");
	var speed = 200;
	
	$wrapperTable.on("click", "a", function() {
		$wrapper.fadeIn(speed).find("a[href='" + $(this).attr("href") + "']").addClass("active");
		$wrapperTable.fadeOut(speed);
	});
	
	$wrapper.on("click", "a", function() {
		$wrapper.find("a").removeClass("active");
		$(this).addClass("active");
	});
	
	$back.click(function(e) {
		e.preventDefault();
		$wrapperTable.fadeIn(speed);
		$wrapper.fadeOut(speed, function() {
			$wrapper.find("a").removeClass("active")
		});
	});

})(jQuery);