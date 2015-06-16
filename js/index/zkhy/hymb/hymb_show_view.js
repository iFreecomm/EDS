define(function(require) {
	var $ = require("jquery");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	var AckId = require("web/common/ackid");
	
	var tmpl = require("text!web/index/zkhy/hymb/hymb_show_template.html");
	
	var HymbShowView = Mn.ItemView.extend({
		id: "zkhy_hymb_show",
		template: Handlebars.compile(tmpl),
		events: {
			"click .delBtn": "delHymb"
		},
		
		onAttach: function() {
			Util.activeLink();
		},
		
		delHymb: function(e) {
			e.preventDefault();
			var $btn = $(e.target);
			var id = $btn.data("id");
			
			$.getJSON("delMeetingTemp.psp", Util.encode({
				recordId: id
			})).done(function(res) {
				if(res.code === 0) {
					$btn.parents("li").remove();
				} else {
					if(res.code == AckId.AckId_SysInCalling)
					{
						Util.alert("模板在使用，不允许删除!");
					}
					else
					{
						Util.alert("删除会议模板失败！");	
					}
				}
			}).fail(function() {
				Util.alert("删除会议模板失败！");
			});
			
		}
	});
	
	return HymbShowView;
});
