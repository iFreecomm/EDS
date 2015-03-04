(function($) {
	
	$("select").customSelect();
	
	var $ydyhy = $("#ydyhy");
	var $hcdzb = $(".hcdzb");
	var $ydyhhc = $(".ydyhhc");
	
	var $hcdzb_scroll = $hcdzb.children(".hcdzb-scroll");
	var $labels = $hcdzb_scroll.find(".lxr-label");
	
	var $lxr_container = $ydyhhc.children(".lxr-container");
	
	$ydyhy.on("click", "i", function() {
		var txt = $(this).text();
		$labels.each(function() {
			var $this = $(this);
			if($this.text() === txt) {
				var sTop = $hcdzb_scroll.scrollTop();
				//$hcdzb_scroll.scrollTop($this.position().top + sTop);
				$hcdzb_scroll.stop().animate({ "scrollTop" : $this.position().top + sTop });
			}
		});
	}).on("click", ".lxr", function() {
		$(this).toggleClass("active");
	}).on("click", ".btn-add", function() {
		$hcdzb.find(".lxr.active").removeClass("active").clone().prependTo($lxr_container);
	}).on("click", ".btn-del", function() {
		$ydyhhc.find(".lxr.active").remove();
	});
	
})(jQuery);
