(function($) {
	
	$("select").customSelect();
	var $formrow = $(".form-cell[hclx]");
	
	$(document).on("change", "#hclx", function() {
		var selectedType = $(this).find("option:selected").attr("hclx");
		$formrow.each(function() {
			var $this = $(this);
			($this.attr("hclx").indexOf(selectedType) === -1) ? $this.hide() : $this.show();
		});
	});
	
	$("#hclx").change();

})(jQuery);