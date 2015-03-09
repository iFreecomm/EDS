define(function(require) {
	var $ = require("jquery");
	var Handlebars = require("handlebars");
	var tmpls = {};
	
	$.fn.handlebars = function(tmpl, dataUrl, postData) {
		var self = this, curTmpl;
		if(tmpl.jquery) {
			var keyId = tmpl.attr("id");
			curTmpl = tmpls[keyId];
			curTmpl || (curTmpl = tmpls[keyId] = Handlebars.compile(tmpl.html()));
		}
		if(curTmpl) {
			$.ajax({
				url: dataUrl,
				dataType: "json",
				type: postData ? "POST" : "GET",
				data: postData,
				crossDomain: true
			}).then(function(data) {
				self.html(curTmpl(data));
			});
		} else {
			$.when(
				$.get(tmpl),
				$.ajax({
					url: dataUrl,
					dataType: "json",
					type: postData ? "POST" : "GET",
					data: postData,
					crossDomain: true
				}))
			.then(function(source, data) {
				tmpls[tmpl] = Handlebars.compile(source[0]);
				self.html(tmpls[tmpl](data[0]));
			});
		}
	};
});
