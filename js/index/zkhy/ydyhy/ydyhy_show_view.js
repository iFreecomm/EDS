define(function(require) {
	var $ = require("jquery");
	var Mn = require("marionette");
	var Backbone = require("backbone");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	
	var tmpl = require("text!web/index/zkhy/ydyhy/ydyhy_show_template.html");
	var AckId = require("web/common/ackid");
	
	var YdyhyShowView = Mn.ItemView.extend({
		id: "zkhy_ydyhy_show",
		template: Handlebars.compile(tmpl),
		events: {
			"click .delBtn": "delMeeting",
			"click .beginBtn": "beginMeeting"
		},
		
		onAttach: function() {
			Util.activeLink();
		},
		
		delMeeting: function(e) {
			e.preventDefault();
			var $btn = $(e.target);
			var id = $btn.data("id");
			
			$.getJSON("delMeeting.psp", Util.encode({
				recordId: id
			})).done(function(res) {
				if(res.code === 0) {
					$btn.parents("li").remove();
				} else {
					//alert("");	
				}
			}).fail(function() {
				Util.alert("删除会议失败");
			});
		},
		beginMeeting: function(e) {
			e.preventDefault();
			var $btn = $(e.target);
			var id = $btn.data("id");
			
			var state = $btn.data("state");
			var url = "beginMeeting.psp";
			var tip = "召开会议";
			if(state == 1)
			{
				url = "endMeeting.psp";
				tip = "结束会议";
			}
			$.getJSON(url, Util.encode({
				recordId: id
			})).done(function(res) {
				if(res.code === 0) {
					//alert(tip+"成功");
				} else {
					switch (res.code){
						case AckId.AckId_OverMaxConfNum:
							Util.alert("当前只允许召开一个会议！");
							break;
						default:
							Util.alert(tip+"失败");
							break;
					}		
				}
				Backbone.history.loadUrl();
			}).fail(function() {
				
			});
		}
	});
	
	return YdyhyShowView;
});
