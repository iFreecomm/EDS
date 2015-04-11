define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	
	var tmpl = require("text!web/index/lxr/show/lxr_show_template.html");
	
	var LxrShowView = Mn.ItemView.extend({
		id: "lxr_show",
		template: Handlebars.compile(tmpl),
		events: {
			"click .delBtn": "delLxr"
		},
		delLxr: function(e) {
			e.preventDefault();
			var $btn = $(e.target);
			var id = $btn.data("id");
			
			$.getJSON("delAddrBook.psp", JSON.stringify({
				recordId: id
			})).done(function(res) {
				if(res.code === 0) {
					$btn.parents("li").remove();
				} else {
					alert("删除联系人失败！");	
				}
			}).fail(function() {
				alert("删除联系人失败！");
			});
			
		},
		
		onAttach: function() {
			Radio.channel("index").command("activeLink");
		}
	});
	
	return LxrShowView;
});
