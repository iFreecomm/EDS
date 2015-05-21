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
			"click .playBtn": "playFile",
			"click .deleteBtn": "deleteFile",
			"click .downloadBtn": "downloadFile"
		},
		downloadFile:function(e){
			//e.preventDefault();
			var $tr = $(e.target).parents("tr");
			var path = $tr.data("path");
			//var fileName = "Alias0"+path.substr(path.lastIndexOf("\/"));
			var fileName = "Alias0"+path;
			var href = "downloadFile.psp?" + JSON.stringify({
				filePath: fileName
			});
			
			$(e.target).attr("href", href);
			
//			$.getJSON("downloadFile.psp", JSON.stringify({
//				filePath: fileName
//			}));
		},
		playFile: function(e) {
			e.preventDefault();
			var index = $(e.target).parents("tr").index() - 1;
			var model = this.collection.at(index);
			
			Radio.channel("wjll").command("playFile", {
				title: model.get("fileName"),
				path: model.get("filePath")
			});
		},
		deleteFile: function(e) {
			e.preventDefault();
			var $tr = $(e.target).parents("tr");
			var path = $tr.data("path");
			
			var self = this;
			$.getJSON("deleteFile.psp", JSON.stringify({
				filePath: path
			})).done(function(res) {
				if(res.code === 0) {
					$tr.remove();
					self.fixTable();
				} else {
					alert("删除文件失败！");	
				}
			}).fail(function() {
				alert("删除文件失败！");
			});
			
		},
		
		batchDelete: function() {
			var pathArr = this.getSelectedFiles();
			var self = this;
			
			$.getJSON("deleteFile.psp", JSON.stringify({
				filePathArr: pathArr
			})).done(function(res) {
				if(res.code === 0) {
					self.$("tr").each(function() {
						var $this = $(this);
						var path = $this.data("path");
						if(_.contains(pathArr, path)) { $this.remove(); }
					});
					self.fixTable();
				} else {
					alert("批量删除文件失败！");	
				}
			}).fail(function() {
				alert("批量删除文件失败！");
			});
		},
		
		getSelectedFiles: function() {
			return this.$("[type=checkbox]:checked").map(function() {
				return $(this).parents("tr").data("path");
			}).get();
		},
		
		fixTable: function() {
			var $table = this.$("table");
			var $trs = $table.find("tr");
			var length = $trs.length - 1;
			var $tr = $("<tr><td colspan='10'></td></tr>").css({height:50});
			while(length++ < 10) {
				$table.append($tr.clone());
			}
			$table.find("tr").slice(1).each(function(index, obj) {
				index % 2 === 0 ? obj.className="even" : obj.className="odd";
			});
		},
		
		onRender: function() {
			Radio.channel("fileList").comply("batchDelete", this.batchDelete, this);
			Radio.channel("fileList").reply("getSelectedFiles", this.getSelectedFiles, this);
			this.fixCheckbox().fixTable();
		},
		
		onDestroy: function() {
			Radio.channel("fileList").reset();
		}
	});
	
	return LxrShowView;
});
