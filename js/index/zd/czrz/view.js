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
		ui: {
			formBox: ".formBox",
			select: "select"
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
        }
    });
    
    return CzrzView;
});
