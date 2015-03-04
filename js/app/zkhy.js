(function($) {
	
	var $navLeft = $("#navLeft");
	var $nav_bg = $navLeft.find(".nav-bg");
	var $mainContent = $("#mainContent");
	
	$navLeft.on("click", ".nav-bg", function() {
		var $this = $(this);
		$nav_bg.removeClass("active");
		$this.addClass("active");
		$mainContent.handlebars($this.attr("tmpl-url"), $this.attr("data-url"));
	}).find(".active").click();
	
})(jQuery);
