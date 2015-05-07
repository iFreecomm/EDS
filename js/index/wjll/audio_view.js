define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var FormView = require("web/common/formView");
	
	var tmpl = require("text!web/index/wjll/burnDisk_template.html");
	
	var BurnDiskView = FormView.extend({
		template: tmpl,
		
		events: {
			"click .burnDiskBtn": "burnDisk",
			"click .cancelBtn": "cancel",
			"click .closeBtn": "cancel",
			"change #diskId": "changeAvailableSize"
		},
		burnDisk: function() {
			var selectedFiles = Radio.channel("fileList").request("getSelectedFiles");
			var diskId = this.$("#diskId").val();
			
			$.getJSON("burnDisk.psp", JSON.stringify({
				pathInfo: selectedFiles,
				diskId: diskId
			})).done(function() {
				
			}).fail(function() {
				
			});
		},
		cancel: function() {
			this.$(".mask").hide();
			this.$(".popup").hide();
		},
		changeAvailableSize: function() {
			var size = this.$("#diskId").find("option:selected").data("availablesize");
			this.$(".diskInfo").children("strong").text(size);
		},
		
		show: function() {
			this.$(".mask").show();
			this.$(".popup").show();
		},
		
		onAttach: function() {
			this.selectmenu();
		}
		
	});
	
	return BurnDiskView;
});
