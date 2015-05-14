define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var Mn = require("marionette");
	var tmpl = require("text!web/index/wjll/burnDisk_template.html");
	var Util = require("web/common/util");
	
	var BurnDiskView = Mn.ItemView.extend({
		template: tmpl,
		
		ui: {
			formBox: ".formBox",
			select: "select"
		},
		
		events: {
			"click .burnDiskBtn": "burnDisk",
			"click .cancelBtn": "cancel",
			"click .closeBtn": "cancel",
			"change #diskId": "changeAvailableSize"
		},
		preBurnDisk: function() {
			this.selectedFiles = Radio.channel("fileList").request("getSelectedFiles");
			
			if(_.isEmpty(this.selectedFiles)) {
				alert("请至少选择一个文件后刻录！");
				return;
			}
			
			this.show();
		},
		burnDisk: function() {
			var diskId = this.$("#diskId").val();
			
			$.getJSON("burnDisk.psp", JSON.stringify({
				pathInfo: this.selectedFiles,
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
			Util.selectmenu(this.ui.select, this.ui.formBox);
			this.ui.select.change();
		}
		
	});
	
	return BurnDiskView;
});
