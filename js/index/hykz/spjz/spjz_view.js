define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/hykz/spjz/spjz_template.html");
	
	var SpjzView = Mn.LayoutView.extend({
		id: "hykz_spjz",
		template: tmpl,
		bindings: {
			"#matrixInOut": "matrixInOut",
			"#enableVM": "enableVM"
		},
		regions: {
			spjz: "#hykz_spjz_container"
		},
		events: {
			"click .saveBtn": "saveSpjz"
		},
		
		onBeforeShow: function(view, region, options) {
			this.showChildView("spjz", options.hykzHymbAddSpjzView);
		},
		onAttach: function() {
			Util.activeLink("hykz/spjz");
		},
		
		saveSpjz: function(e) {
			e.preventDefault();
			var self = this;
			
			var matrixInOut = Radio.channel("spjz").request("getMatrixInOut");
			
			this.model.set({
				"matrixInOut": matrixInOut,
				"matrixNum": matrixInOut.length
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
