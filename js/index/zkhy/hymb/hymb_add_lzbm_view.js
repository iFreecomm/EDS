define(function(require) {
	var _ = require("underscore");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_lzbm_template.html");
	
	var LylxView = require("web/index/zkhy/hymb/hymb_add_lylx_view");
	var LylxModel = require("web/index/zkhy/hymb/hymb_add_lylx_model");
	
	var Util = require("web/common/util");
	
	var LzbmView = Mn.LayoutView.extend({
		id: "hymb_add_lzbm",
		template: Handlebars.compile(tmpl),
		
		regions: {
			container: "#lzbm_formBox_container"
		},
		
		events: {
			"click .lzbm-box .btn": "selectLylx"
		},
		selectLylx: function(e) {
			var index = $(e.target).index();
			var data = this.flatRecList[index];
			if(_.isEmpty(data)) return;
			
			this.showFormBoxView(new LylxModel(data));
		},
		
		initialize: function() {
			var recorder = this.model.get("recorder");
			if(_.isEmpty(recorder) || _.isEmpty(recorder.recList)) return;
			
			this.flatRecList = _.map(recorder.recList, function(obj) {
				return Util.flat(obj);
			});
			
			this.lylxModel = new LylxModel(this.flatRecList[0]);
		},
		
		showFormBoxView: function(model) {
			this.showChildView("container", new LylxView({
				model: model
			}));
		},
		
		onBeforeShow: function() {
			this.showFormBoxView(this.lylxModel);
		}
	});
	
	return LzbmView;
});