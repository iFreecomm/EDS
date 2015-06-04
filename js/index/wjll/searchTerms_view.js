define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var tmpl = require("text!web/index/wjll/searchTerms_template.html");
	var SearchTermsModel = require("web/index/wjll/searchTerms_model");
	var Util = require("web/common/util");
	
	var SearchTermsView = Mn.ItemView.extend({
		id: "wjll_searchTerms",
		template: Handlebars.compile(tmpl),
		bindings: {
			"#startTime": "startTime",
			"#endTime": "endTime",
			"#diskPath": "diskPath",
			"#fileType": {
				observe: "fileType",
				selectName: "fileType"
			},
			"#confNum": "confNum",
			"#confName": "confName",
			"#convenor": "convenor"
		},
		ui: {
			formBox: ".formBox",
			select: "select"
		},
		events: {
			"click .searchBtn": "searchFile",
			"click .resetBtn": "resetFile"
		},
		initialize: function() {
			this.setSelectBindings(this.bindings);
		},
		
		onRender: function() {
			this.stickit();
		},
		onAttach: function() {
			Util.selectmenu(this.ui.select, this.ui.formBox);
			this.ui.select.change();
			
			$.timepicker.datetimeRange(
				$("#startTime"),
				$("#endTime"),
				{
					timeFormat: "HH:mm:ss"
				}
			);
		},
		
		searchFile: function() {
			Radio.channel("wjll").command("searchFile", this.model.toJSON());
		},
		resetFile: function() {
			this.model.clear().set(new SearchTermsModel().toJSON());
			this.refreshSelectmenu();
			Radio.channel("wjll").command("searchFile", this.model.toJSON());
		}
	});
	
	return SearchTermsView;
});
