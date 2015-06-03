define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var FormView = require("web/common/formView");
	var Handlebars = require("handlebars");
	var tmpl = require("text!web/index/wjll/searchTerms_template.html");
	var SearchTermsModel = require("web/index/wjll/searchTerms_model");
	
	var SearchTermsView = FormView.extend({
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
		initialize: function(opt) {
			this.setSelectBindings(this.bindings);
		},
		events: {
			"click .searchBtn": "searchFile",
			"click .resetBtn": "resetFile"
		},
		searchFile: function() {
			Radio.channel("wjll").command("searchFile", this.model.toJSON());
		},
		resetFile: function() {
			this.model.clear().set(new SearchTermsModel().toJSON());
			this.refreshSelectmenu();
			Radio.channel("wjll").command("searchFile", this.model.toJSON());
		},
		
		onRender: function() {
			this.stickit();
		},
		
		onAttach: function() {
			this.selectmenu();
			
			$.timepicker.datetimeRange(
				$("#startTime"),
				$("#endTime"),
				{
					timeFormat: "HH:mm:ss"
				}
			);
		}
	});
	
	return SearchTermsView;
});
