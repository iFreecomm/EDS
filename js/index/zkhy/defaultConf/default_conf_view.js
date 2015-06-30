define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var Handlebars = require("handlebars");
	var AckId = require("web/common/ackid");
	
	var tmpl = require("text!web/index/zkhy/defaultConf/default_conf_template.html");
	
	var DefaultConfView = Mn.ItemView.extend({
		id: "default_conf",
		template: Handlebars.compile(tmpl),
		events: {
			"click a" : "selectDefault"
		},
		
		onRender: function() {
			var meetingId = this.options.meetingId;
			this.$("a").each(function() {
				var $a = $(this);
				if($a.data("id") == meetingId) {
					$a.addClass("active");
					return false;
				}
			});
		},
		onAttach: function() {
			Util.activeLink();
		},
		
		selectDefault: function(e) {
			e.preventDefault();
			
			var self = this;
			var $tar = $(e.target);
			var $a = $tar.is("a") ? $tar : $tar.parents("a");
			
			$.getJSON("setDefBeginMeetingCfg.psp", Util.encode({
				"meetingId": $a.data("id")
			})).done(function(res) {
				if(res.code === 0) {
					self.$("a").removeClass("active");
					$a.addClass("active");
				} else {
					Util.alert("设置默认会议失败");
				}
			}).fail(function() {
				Util.alert("设置默认会议失败");
			});
		}
	});
	
	return DefaultConfView;
});