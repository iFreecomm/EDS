define(function(require) {
	var Radio = require("radio");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var tmpl = require("text!web/index/wjll/wjll_template.html");
	
	var FileView = require("web/index/wjll/file_view");
	var FileCollection = require("web/index/wjll/file_collection");
	
	var BurnDiskView = require("web/index/wjll/burnDisk_view");
	
	var WjllView = Mn.LayoutView.extend({
		id: "wjll_show",
		template: Handlebars.compile(tmpl),
		regions: {
			fileContainer: "#fileContainer",
			searchTermsContainer: "#searchTermsContainer",
			burnDiskContainer: "#burnDiskContainer"
		},
		
		events: {
			"click .burnDisk": "burnDisk",
			"click .batchDelete": "batchDelete",
			
			"click .prevPage": "prevPage",
			"click .nextPage": "nextPage"
		},
		
		burnDisk: function() {
			var idArr = Radio.channel("fileList").request("getSelectedFiles");
			if(_.isEmpty(idArr)) {
				alert("请至少选择一个文件后刻录！");
				return;
			}
			if(!this.burnDiskView) {
				this.burnDiskView = new BurnDiskView();
				this.showChildView("burnDiskContainer", this.burnDiskView);
			}
			this.burnDiskView.show();
		},
		
		batchDelete: function() {
			Radio.channel("fileList").command("batchDelete");
		},
		
		prevPage: function() {
			this.searchTerms = this.searchTerms || this.options.searchTerms;
			this.pageNum--;
			this._search();
		},
		
		nextPage: function() {
			this.searchTerms = this.searchTerms || this.options.searchTerms;
			this.pageNum++;
			this._search();
		},
		
		initialize: function() {
			Radio.channel("wjll").comply("searchFile", this.searchFile, this);
		},
		
		searchFile: function(searchTerms) {
			this.searchTerms = searchTerms;
			this.pageNum = 0;
			this._search();
		},
		
		_search: function() {
			var self = this;
			var collection = new FileCollection();
			collection.fetch({
				reset: true,
				data: JSON.stringify({
					searchTerms: this.searchTerms,
					pageNum: this.pageNum
				})
			}).done(function() {
				self.showChildView("fileContainer", new FileView({
					collection: collection
				}));
			});
		},
		
		onBeforeShow: function(view, region, options) {
			this.showChildView("searchTermsContainer", options.searchTermsView);
			this.showChildView("fileContainer", options.fileView);
		},
		
		onAttach: function() {
			Radio.channel("index").command("activeLink");
		},
		
		onDestroy: function() {
			Radio.channel("wjll").reset();
		}
	});
	
	return WjllView;
});