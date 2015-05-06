define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var FormView = require("web/common/formView");
	
	var tmpl = require("text!web/index/wjll/searchTerms_template.html");
	
	var SearchTermsView = FormView.extend({
		id: "wjll_searchTerms",
		template: tmpl,
		
		bindings: {
			"#startTime": "startTime",
			"#endTime": "endTime",
			"#diskId": "diskId",
			"#fileType": "fileType",
			"#confNum": "confNum",
			"#confName": "confName",
			"#convenor": "convenor"
		},
		
		events: {
			"click .searchBtn": "searchFile"
		},
		searchFile: function() {
			Radio.channel("wjll").command("searchFile", this.model.toJSON());
		},
		
		onRender: function() {
			this.stickit();
		},
		
		onAttach: function() {
			this.selectmenu();
		}
	});
	
	return SearchTermsView;
});
