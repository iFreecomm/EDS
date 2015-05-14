define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var tmpl = require("text!web/index/wjll/searchTerms_template.html");
	var Util = require("web/common/util");
	
	var SearchTermsView = Mn.ItemView.extend({
		id: "wjll_searchTerms",
		template: Handlebars.compile(tmpl),
		
		ui: {
			formBox: ".formBox",
			select: "select"
		},
		bindings: {
			"#startTime": "startTime",
			"#endTime": "endTime",
			"#diskPath": "diskPath",
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
			Util.selectmenu(this.ui.select, this.ui.formBox);
			this.ui.select.change();
			
			$("#startTime").add($("#endTime")).datetimepicker({
				timeFormat: "HH:mm:ss"
			});
		}
	});
	
	return SearchTermsView;
});
