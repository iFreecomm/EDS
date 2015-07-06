define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/hykz/dhm/dhm_template.html");
	
	var SpjzView = Mn.LayoutView.extend({
		id: "hykz_dhm",
		template: tmpl,
		bindings: {
			"#subPicInfo": "subPicInfo",
			"#showMpMode": "showMpMode"
		},
		regions: {
			dhm: "#hykz_dhm_container"
		},
		events: {
			"click .saveBtn": "saveDhm"
		},
		
		onBeforeShow: function(view, region, options) {
			this.showChildView("dhm", options.hykzHymbAddDhmView);
		},
		onAttach: function() {
			Util.activeLink("hykz/dhm");
		},
		
		saveDhm: function(e) {
			e.preventDefault();
			var self = this;
			
			var showMpMode = Radio.channel("dhm").request("getShowMpMode");
			var mpMode = Radio.channel("dhm").request("getMpMode");
			
			this.model.set({
				"showMpMode": showMpMode,
				"mpMode": mpMode
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
			Util.alert("保存失败！");
		}
	});
	
	return SpjzView;
});
