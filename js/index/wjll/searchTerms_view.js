define(function(require) {
	var $ = require("jquery");
	var Radio = require("radio");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var tmpl = require("text!web/index/wjll/searchTerms_template.html");
	var SearchTermsModel = require("web/index/wjll/searchTerms_model");
	var Util = require("web/common/util");
	var FormUtil = require("web/common/formUtil");
	
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
		checkOptions: {
			"#confName": {
				constraint: ["trimCheck"],
				appendTo: ".formCell"
			},
			"#convenor": {
				constraint: ["trimCheck"],
				appendTo: ".formCell"
			},
    		"#confNum": {
    			constraint: ["numberCheck"],
    			appendTo: ".formCell"
    		}
		},
		ui: {
			formBox: ".formBox",
			select: "select"
		},
		events: {
			"keyup": "checkInput",
			"click .searchBtn": "searchFile",
			"click .resetBtn": "resetFile"
		},
		
		initialize: function() {
			Util.setSelectBindings(this.bindings);
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
		
		checkInput: function(e) {
			FormUtil.checkInput($(e.target), this.checkOptions);
		},
		
		searchFile: function() {
			if(FormUtil.checkForm(this.$el, this.checkOptions)) return;
			
			Radio.channel("wjll").command("searchFile", this.model.toJSON());
		},
		resetFile: function() {
			if(FormUtil.checkForm(this.$el, this.checkOptions)) return;
			
			this.model.clear().set(new SearchTermsModel().toJSON());
			Util.refreshSelectmenu(this.$el);
			Radio.channel("wjll").command("searchFile", this.model.toJSON());
		}
	});
	
	return SearchTermsView;
});
