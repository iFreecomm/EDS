define(function(require) {
	var Backbone = require("backbone");
	var Util = require("web/common/util");
	var FileModel = require("./model");
	
	var FileCollection = Backbone.Collection.extend({
		model: FileModel,
		urls: {
			"read": "getFileList.psp"
		},
		pageNum: 1,
		endFlag: 1,
		parse: function(res) {
			if(res && res.data && res.data.fileList) {
				this.pageNum = res.data.pageNum;
				this.endFlag = res.data.endFlag;
				return res.data.fileList;
			}
			return [];
		},
		
		pageFetch: function() {
			return this.fetch({
				data: Util.encode({
					pageNum: this.pageNum
				})
			});
		},
		
		prevPage: function() {
			if(this.pageNum == 1) {
				return false;
			} else {
				this.pageNum --;
				return true;
			}
		},
		
		nextPage: function() {
			if(this.endFlag == 1) {
				return false;
			} else {
				this.pageNum ++;
				return true;
			}
		}
	});
	
	return FileCollection;
});