define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Radio = require("radio");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	var tmpl = require("text!./template.html");
	
	var DbcxView = Mn.ItemView.extend({
		id: "zd_dbcx",
		template: Handlebars.compile(tmpl),
		ui: {
			"prevPageBtn": ".prevPage",
			"nextPageBtn": ".nextPage",
			"curPage": ".curPage"
		},
		events: {
			"click .prevPage": "prevPage",
			"click .nextPage": "nextPage",
			"click .stopBtn": "stop"
		},
		
		onRender: function() {
			this.fixTable();
			this.showPageBtns();
		},
		onAttach: function() {
			Util.activeLink();
		},
		
		stop: function(e) {
            //强制结束
			e.preventDefault();
			var self = this;
			var id = $(e.currentTarget).data("id");
			$.getJSON("temp.psp", Util.encode({
				id: id
			})).done(function() {
				self.curPage();
			});
		},
		
		fixTable: function() {
			var $table = this.$("table");
			var $trs = $table.find("tr");
			var length = $trs.length - 1;
			var $tr = $("<tr><td colspan='6'></td></tr>").css({height:44});
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
		
		curPage: function() {
			if(this.collection.endFlag === 1 && this.curSize === 1) {
				this.prevPage();
			} else {
				this._refreshTable();
			}
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
	
	return DbcxView;
});
