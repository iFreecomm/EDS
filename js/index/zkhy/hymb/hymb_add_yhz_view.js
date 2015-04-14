define(function(require) {
	var $ = require("jquery");
	var _ = require("underscore");
	var Radio = require("radio");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	var tmpl = require("text!web/index/zkhy/hymb/hymb_add_yhz_template.html");
	
	var YhzView = Mn.ItemView.extend({
		id: "hymb_add_yhz",
		template: Handlebars.compile(tmpl),
		
		ui: {
			box_left: ".box-left",
			box_right: ".box-right",
			lxr_box: ".box-right .lxr-box",
			labels: ".lxr-label"
		},
		events: {
			"click .nav-character i": "locateLxr",
			"click .lxr": "selectLxr",
			"click .btn-add": "addLxr",
			"click .btn-del": "delLxr"
		},
		locateLxr: function(e) {
			var txt = $(e.target).text();
			var $label = this.ui.labels.filter(":contains("+txt+")");
			if($label.length === 0) return;
			
			var $con = this.ui.box_left.find(".lxr-box-container");
			$con.scrollTop($label.position().top + $con.scrollTop());
		},
		selectLxr: function(e) {
			var $tar = $(e.target);
			var $lxr = $tar.is(".lxr") ? $tar : $tar.parents(".lxr");
			$lxr.toggleClass("active");
		},
		addLxr: function() {
			var idArr = this.getYhzArr();
			var $box = this.ui.lxr_box;
			
			var addLxrIdArr = [];
			this.ui.box_left.find(".active").removeClass("active").each(function() {
				var $this = $(this);
				var id = $this.data("id");
				if(!_.include(idArr, id)) {
					addLxrIdArr.push(id);
					$this.clone().appendTo($box);
				}
			});
			
			var addLxrArr = this.getLxrDataById(addLxrIdArr);
			Radio.channel("dhm").command("addDhmlxr", addLxrArr);
			Radio.channel("spjz").command("addMatrix", addLxrArr);
		},
		delLxr: function() {
			var subLxrIdArr = this.ui.box_right.find(".active").map(function() {
				var $this = $(this);
				var id = $this.data("id");
				$this.remove();
				return id;
			}).get();
			
			var subLxrArr = this.getLxrDataById(subLxrIdArr);
			Radio.channel("dhm").command("subDhmlxr", subLxrArr);
			Radio.channel("spjz").command("subMatrix", subLxrArr);
		},
		getLxrDataById: function(idArr) {
			var allLxr = this.options.allLxr;
			if(_.isEmpty(idArr) || _.isEmpty(allLxr)) return [];
			
			var i = 0, l = allLxr.length, curLxr;
			return _.map(idArr, function(id) {
				for(i = 0; i < l; i ++) {
					curLxr = allLxr[i];
					if(curLxr.recordId === id) {
						return curLxr;
					}
				}
			});
		},
		
		initialize: function() {
			this.setTemplateHelpers();
			Radio.channel("yhz").reset();
			Radio.channel("yhz").reply("getYhzArr", this.getYhzArr, this);
			Radio.channel("yhz").comply("loadHymb", this.loadHymb, this);
		},
		//转换服务器端提供的数据的格式，统一在这里转换
		setTemplateHelpers: function() {
			var result = {}, name;
			
			function transName(name) {
				name = name.toUpperCase();
				if(name < "A" || name > "Z") {
					name = "#";
				}
				return name;
			}
			
			_.each(this.options.allLxr, function(val) {
			    name = transName(val.initial); 
			    if(!result[name]) {
			    	result[name] = {};
			    	result[name].name = name;
			    	result[name].contents = [];
			    }
			    result[name].contents.push(val);
			 }); 
			 
			 this.options.templateHelpers = this.options.templateHelpers || {};
			 this.options.templateHelpers.allLxr = _.chain(result).values(result).sortBy(function(obj) {
			 	if(obj.name === "#") return "z"; //保证#的排序在最后面
			 	return obj.name; //按照A-Z的顺序排序
			 }).value();
		},
		//对外提供可以获取与会者ID数组的接口
		getYhzArr: function() {
			return this.ui.box_right.find(".lxr").map(function() {
				return $(this).data("id");
			}).get();
		},
		//对外提供加载会议模版的接口
		loadHymb: function(idArr) {
			idArr = idArr || [];
			var $box = this.ui.lxr_box.empty();
			if(idArr.length === 0) return;
			this.ui.box_left.find(".lxr").each(function() {
				var $this = $(this);
				var id = $this.data("id");
				if(_.include(idArr, id)) {
					$this.clone().appendTo($box);
				}
			});
		},
		
		onDestroy: function() {
			Radio.channel("yhz").reset();
		}
	});
	
	return YhzView;
});