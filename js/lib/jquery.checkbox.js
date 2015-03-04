$(".label-checkbox").each(function() {
	var $this = $(this);
	if($this.prev().is(":checked")) {
		$this.addClass("active");
	}
});

$(document).on("click", ".label-checkbox", function() {
	$(this).toggleClass("active");
});
