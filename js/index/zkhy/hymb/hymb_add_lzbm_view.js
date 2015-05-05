define(function(require) {
	var _ = require("underscore");
	var Mn = require("marionette");
	var Radio = require("radio");
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
			"click .lzbm-box .btn": "clickLylx"
		},
		clickLylx: function(e) {
			var index = $(e.target).index();
			
			this.selectLylx(index);
		},
		selectLylx: function(index) {
			var model = this.flatModelList[index];
			if(_.isEmpty(model)) return;
			
			this.showFormBoxView(model);
		},
		showFormBoxView: function(model) {
			this.showChildView("container", new LylxView({
				model: model
			}));
		},
		
		initialize: function() {
			Radio.channel("lzbm").reset();
			Radio.channel("lzbm").reply("getRecList", this.getRecList, this);
			
			this.flatModelList = [];
			
			var recorder = this.model.get("recorder");
			if(!(_.isEmpty(recorder) || _.isEmpty(recorder.recList))) {
				this.flatModelList = _.map(recorder.recList, function(obj) {
					return new LylxModel(Util.flat(obj));
				});
			}
			
			var recNum = this.options.recNum;
			var l = this.flatModelList.length;
			while(l++ < recNum) {
				this.flatModelList.push(new LylxModel());
			}
			
			recorder.recNum = l;
		},
		
		getRecList: function() {
			return _.map(this.flatModelList, function(model) {
				var attr = model.toJSON();
				return Util.fat(attr);
			});
		},
		
		onBeforeShow: function() {
			this.selectLylx(0);
		}
	});
	
	return LzbmView;
});