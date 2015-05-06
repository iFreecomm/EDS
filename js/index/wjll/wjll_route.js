define(function(require) {
	var Route = require("web/common/route");
	
	var WjllView = require("web/index/wjll/wjll_view");
	var SearchTermsModel = require("web/index/wjll/searchTerms_model");
	var FileView = require("web/index/wjll/file_view");
	var FileCollection = require("web/index/wjll/file_collection");

	var WjllRoute = Route.extend({
		
		initialize: function(options) {
			var self = this;
			this.container = options.container;
			this.fileCollection = new FileCollection();

			$.when(
				$.getJSON("getDiskList.psp"),
				this.fileCollection.fetch({
					reset: true,
					data: JSON.stringify({
						searchTerms: new SearchTermsModel().toJSON(),
						pageNum: 1
					})
				})
			).done(function(diskList) {
				self.diskList = diskList[0].data.diskList;
				self.showView();
			});
		},
		
		showView: function() {
			this.show({
				contentRightView: new WjllView({
					templateHelpers: {
						diskList: this.diskList
					}
				}),
				fileView: new FileView({
					collection: this.fileCollection
				})
			});
		}
	});
	
	return WjllRoute;
});