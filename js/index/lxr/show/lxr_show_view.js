define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var Handlebars = require("handlebars");
	var AckId = require("web/common/ackid");
	
	var tmpl = require("text!web/index/lxr/show/lxr_show_template.html");
	
	var LxrShowView = Mn.ItemView.extend({
		id: "lxr_show",
		template: Handlebars.compile(tmpl),
		events: {
			"click .delBtn": "confirmDelLxr"
		},
		
		onAttach: function() {
			Util.activeLink();
		},
		
		confirmDelLxr: function(e) {
			e.preventDefault();
			var $btn = $(e.target);
			var id = $btn.data("id");
			
			Util.confirm("确认删除吗？").then(_.bind(this.delLxr, this, id));
		},
		
		delLxr: function(id) {
			$.getJSON("delAddrBook.psp", Util.encode({
				recordId: id
			})).done(function(res) {
				if(res.code === 0) {
					$btn.parents("li").remove();
					Util.alert("删除联系人成功！");
				} else {
					if(res.code == AckId.AckId_SysInCalling)
					{
						Util.alert("在召开的会议中，不允许删除!");
					}
					else
					{
						Util.alert("删除联系人失败！");	
					}
				}
			}).fail(function() {
				Util.alert("删除联系人失败！");
			});
		}
	});
	
	return LxrShowView;
});
