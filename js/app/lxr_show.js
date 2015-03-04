(function($) {
	
	Handlebars.registerHelper("typeToClass", function(type) {
		if(type === 1) {
			return "sxj";
		} else if(type === 2) {
			return "zk";
		} else if(type === 3) {
			return "zkhy";
		}
	});
	
	$("#mainContent").handlebars($("#template"), "json/lxr_show.json");

})(jQuery);