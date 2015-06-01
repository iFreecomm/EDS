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
            //单个文件删除
			e.preventDefault();
			var path = $(e.target).parents("tr").data("path");
			this._delete([path]);
		},
		batchDelete: function() {
            //多文件删除
			var pathArr = this.getSelectedFiles();
			this._delete(path);
		},
		_delete: function(pathInfo) {
			$.getJSON("fileOperate.psp", JSON.stringify({
                fileNum: pathInfo.length,
                opCmd: 2,
                pathInfo: pathInfo
			})).done(function(res) {
				if(res.code === 0) {
					Radio.channel("wjll").command("deleteSearchFile");
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
