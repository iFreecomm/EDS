define(function(require) {
	var Radio = require("radio");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	
	var tmpl = require("text!web/index/zkhy/ydyhy/ydyhy_show_template.html");
	
	var YdyhyShowView = Mn.ItemView.extend({
		id: "zkhy_ydyhy_show",
		template: Handlebars.compile(tmpl),
		events: {
			"click .delBtn": "delMeeting"
		},
		delMeeting: function(e) {
			e.preventDefault();
			var $btn = $(e.target);
			var id = $btn.data("id");
			
			$.getJSON("delMeeting.psp", JSON.stringify({
				recordId: id
			})).done(function(res) {
				if(res.code === 0) {
					$btn.parents("li").remove();
				} else {
					alert("¨¦?3y?¨¢¨°¨¦¨º¡ì¡ã¨¹¡ê?");	
				}
			}).fail(function() {
				alert("¨¦?3y?¨¢¨°¨¦¨º¡ì¡ã¨¹¡ê?");
			});
		},
		
		onAttach: function() {
			Radio.channel("index").command("activeLink");
		}
	});
	
	return YdyhyShowView;
});
