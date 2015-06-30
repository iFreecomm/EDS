define(function(require) {
    var Mn = require("marionette");
    var Util = require("web/common/util");
    
    var tmpl = require("text!./template.html");

    var CzrzView = Mn.LayoutView.extend({
        id: "zd_czrz",
        template: tmpl,
        regions: {
			tableContainer: "#table_container"
		},
		bindings: {
			"#startTime": "startTime",
			"#endTime": "endTime",
			"#level": "level"
		},
		ui: {
			formBox: ".formBox",
			select: "select"
		},
		events: {
			"click .searchBtn": "search",
			"click .resetBtn": "resetSearch",
			"click .logBtn": "log"
		},
        
        onRender: function() {
        	this.stickit();
        },
        onAttach: function() {
        	Util.activeLink();
        	Util.selectmenu(this.ui.select, this.ui.formBox);
        	$.timepicker.datetimeRange(
				$("#startTime"),
				$("#endTime"),
				{
					timeFormat: "HH:mm:ss"
				}
			);
        },
        onBeforeShow: function(view, region, options) {
			this.showChildView("tableContainer", options.tableView);
        },
        
        search: function() {
        	this._search();
        },
        
        resetSearch: function() {
        	this.model.resetDefaults();
        	Util.refreshSelectmenu(this.ui.select);
        	this._search();
        },
        
        log: function() {
        	//TODO:获取日志
        },
        
        _search: function() {
        	var view = this.getRegion("tableContainer").currentView;
        	var col = view.collection;
        	
        	col.searchTerms = this.model.toJSON();
        	col.pageNum = 1;
        	col.pageFetch().done(function() {
        		view.render();
        	});
        },
    });
    
    return CzrzView;
});
