define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var FormView = require("web/common/formView");
	var Handlebars = require("handlebars");
	
	var tmpl = require("text!web/index/wjll/file_template.html");
	
	var LxrShowView = FormView.extend({
		id: "wjll_file_list",
		template: Handlebars.compile(tmpl),
		
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
		
		batchDelete: function() {
			var idArr = this.getSelectedFiles();
			var self = this;
			
			$.getJSON("deleteFile.psp", JSON.stringify({
				fileIdArr: idArr
			})).done(function(res) {
				if(res.code === 0) {
					self.$("tr").each(function() {
						var $this = $(this);
						var id = $this.data("id");
						if(_.contains(idArr, id)) { $this.remove(); }
					});
				} else {
					alert("批量删除文件失败！");	
				}
			}).fail(function() {
				alert("批量删除文件失败！");
			});
		},
		
		getSelectedFiles: function() {
			return this.$("[type=checkbox]:checked").map(function() {
				return $(this).parents("tr").data("id");
			}).get();
		},
		
		onRender: function() {
			Radio.channel("fileList").comply("batchDelete", this.batchDelete, this);
			Radio.channel("fileList").reply("getSelectedFiles", this.getSelectedFiles, this);
			this.fixCheckbox();
		},
		
		onDestroy: function() {
			Radio.channel("fileList").reset();
		}
	});
	
	return LxrShowView;
});
