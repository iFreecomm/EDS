define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/hykz/tjhc/tjhc_template.html");
	
	var SpjzView = Mn.LayoutView.extend({
		id: "hykz_tjhc",
		template: tmpl,
		regions: {
			tjhc: "#hykz_tjhc_container"
		},
		events: {
			"click .saveBtn": "saveTjhc"
		},
		
		onBeforeShow: function(view, region, options) {
			this.showChildView("tjhc", options.hykzHymbAddYhzView);
			this.$(".btn-del").remove();
		},
		onAttach: function() {
			Util.activeLink("hykz/tjhc");
		},
		
		saveTjhc: function(e) {
			e.preventDefault();
			var self = this;
			
			var yhzArr = Radio.channel("yhz").request("getYhzArr");
			
			this.model.set({
				"venueId": yhzArr
			})
			.save()
			.done(function() {
				self.saveSuccess();
			})
			.fail(function() {
				self.saveError();
			});
		},
		saveSuccess: function() {
			//alert("保存成功！");
		},
		saveError: function() {
			alert("保存失败！");
		}
	});
	
	return SpjzView;
});
