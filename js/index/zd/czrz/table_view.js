define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Radio = require("radio");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	var tmpl = require("text!./table_template.html");
	
	var TableView = Mn.ItemView.extend({
		template: Handlebars.compile(tmpl),
		ui: {
			"prevPageBtn": ".prevPage",
			"nextPageBtn": ".nextPage",
			"curPage": ".curPage"
		},
		events: {
			"click .prevPage": "prevPage",
			"click .nextPage": "nextPage"
		},
		
		onRender: function() {
			this.fixTable();
			this.showPageBtns();
		},
		
		fixTable: function() {
			var $table = this.$("table");
			var $trs = $table.find("tr");
			var length = $trs.length - 1;
			var $tr = $("<tr><td colspan='4'></td></tr>").css({height:44});
			while(length++ < 10) {
				$table.append($tr.clone());
			}
			$table.find("tr").slice(1).each(function(index, obj) {
				index % 2 === 0 ? obj.className="even" : obj.className="odd";
			});
		},
		
		showPageBtns: function() {
			if(this.collection.pageNum === 1) {
				this.ui.prevPageBtn.hide();
			} else {
				this.ui.prevPageBtn.show();
			}
			
			if(this.collection.endFlag === 1) {
				this.ui.nextPageBtn.hide();
			} else {
				this.ui.nextPageBtn.show();
			}
			
			this.ui.curPage.text(this.collection.pageNum);
		},
		
		prevPage: function() {
			if(this.collection.prevPage()) {
				this._refreshTable();
			}
		},
		
		nextPage: function() {
			if(this.collection.nextPage()) {
				this._refreshTable();
			}
		},
		
		_refreshTable: function() {
			var self = this;
			this.collection.pageFetch().done(function() {
				self.render();
			});
		}
	});
	
	return TableView;
});
