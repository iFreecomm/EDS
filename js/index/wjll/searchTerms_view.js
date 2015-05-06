define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var FormView = require("web/common/formView");
	
	var tmpl = require("text!web/index/wjll/SearchTerms_template.html");
	
	var SearchTermsView = FormView.extend({
		id: "wjll_searchTerms",
		template: tmpl,
		
		bindings: {
			"#startTime": "startTime",
			"#endTime": "endTime",
			"#diskId": "diskId",
			"#fileType": "fileType",
			"#confNum": "confNum",
			"#confName": "confName",
			"#convenor": "convenor"
		},
		
		events: {
			"click .deleteBtn": "deleteFile"
		},
		deleteFile: function(e) {
			e.preventDefault();
			var $tr = $(e.target).parents("tr");
			var id = $tr.data("id");
			
			$.getJSON("deleteFile.psp", JSON.stringify({
				fileId: id
			})).done(function(res) {
				if(res.code === 0) {
					$tr.remove();
				} else {
					alert("删除文件失败！");	
				}
			}).fail(function() {
				alert("删除文件失败！");
			});
			
		},
		
		initialize: function() {
			Radio.channel("fileList").comply("batchDelete", this.batchDelete, this);
			Radio.channel("fileList").reply("getSelectedFiles", this.getSelectedFiles, this);
		},
		
		onRender: function() {
			this.stickit().fixCheckbox();
		},
		
		onAttach: function() {
			this.selectmenu();
		},
		
		onDestroy: function() {
			Radio.channel("fileList").reset();
		}
	});
	
	return SearchTermsView;
});
