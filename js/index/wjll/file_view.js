define(function(require) {
	var $ = require("jquery");
	var FormView = require("web/common/formView");
	var Handlebars = require("handlebars");
	
	var tmpl = require("text!web/index/wjll/file_template.html");
	
	var LxrShowView = FormView.extend({
		id: "wjll_file_list",
		template: Handlebars.compile(tmpl),
		
		events: {
			"click .delBtn": "delFile"
		},
		delFile: function(e) {
			e.preventDefault();
			var $btn = $(e.target);
			var id = $btn.data("id");
			
			$.getJSON("delAddrBook.psp", JSON.stringify({
				recordId: id
			})).done(function(res) {
				if(res.code === 0) {
					$btn.parents("tr").remove();
				} else {
					alert("删除文件失败！");	
				}
			}).fail(function() {
				alert("删除文件失败！");
			});
			
		},
		
		onRender: function() {
			this.fixCheckbox();
		}
	});
	
	return LxrShowView;
});
