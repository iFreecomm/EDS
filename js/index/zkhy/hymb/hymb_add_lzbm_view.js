define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Mn = require("marionette");
	var Radio = require("radio");
	var Handlebars = require("handlebars");
	var Util = require("web/common/util");
	var Const = require("web/common/const");
	
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_lzbm_template.html");
	
	var LylxView = require("web/index/zkhy/hymb/hymb_add_lylx_view");
	var LylxModel = require("web/index/zkhy/hymb/hymb_add_lylx_model");
	
	
	var LzbmView = Mn.LayoutView.extend({
		id: "hymb_add_lzbm",
		template: Handlebars.compile(tmpl),
		regions: {
			container: "#lzbm_formBox_container"
		},
		events: {
			"click .lzbm-box .btn": "clickLylx"
		},
		initialize: function() {
			// 初始化录制视频源数组
			this.vidSrcArr = this.getLzbmLxr();
			
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
			
			recorder.recNum = this.flatModelList.length;
		},
		onRender: function() {
			Radio.channel("lzbm").reply("getRecList", this.getRecList, this);
			
			Radio.channel("yhz").on("addLxr", this.addVidSrc, this);
			Radio.channel("yhz").on("subLxr", this.subVidSrc, this);
		},
		onBeforeShow: function() {
			this.selectLylx(0);
		},
		onDestroy: function() {
			Radio.channel("lzbm").reset();
		},
		
		/**
		 * @onRender
		 * 获取录制视频源的联系人
		 */
		getLzbmLxr: function() {
			return Util.getLxrDataById(this.model.get("venueId"), this.options.allLxr);
		},
		
		/************************************/
		/*************页面交互事件**************/
		/************************************/
		
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
				model: model,
				vidSrcArr: this.vidSrcArr
			}));
		},
		
		/************************************/
		/*************对外接口事件**************/
		/************************************/
		
		getRecList: function() {
			return _.map(this.flatModelList, function(model,index) {
				var attr = model.toJSON();
				attr.recIdx = index;
				return Util.fat(attr);
			});
		},
		
		addVidSrc: function(addLxrArr) {
			var vidSrcArr = this.vidSrcArr || [];
			this.vidSrcArr = vidSrcArr.concat(addLxrArr);
		},
		
		subVidSrc: function(subLxrArr) {
			var vidSrcArr = this.vidSrcArr || [];
			this.vidSrcArr = _.reject(vidSrcArr, function(lxr) {
				return Util.isLxrInArr(lxr, subLxrArr);
			});
		}
	});
	
	return LzbmView;
});