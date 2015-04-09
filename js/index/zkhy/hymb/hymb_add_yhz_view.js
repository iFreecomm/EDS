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
			
			this.ui.box_left.find(".active").removeClass("active").each(function() {
				var $this = $(this);
				var id = $this.data("id");
				if(!_.include(idArr, id)) {
					$this.clone().appendTo($box);
				}
			});
		},
		delLxr: function() {
			this.ui.box_right.find(".active").remove();
		},
		
		initialize: function() {
			//转换服务器端提供的数据的格式，统一在这里转换
			this.setTemplateHelpers();
			Radio.channel("venueId").reset();
			Radio.channel("venueId").reply("getYhzArr", this.getYhzArr, this);
			Radio.channel("venueId").comply("loadHymb", this.loadHymb, this);
		},
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
		getYhzArr: function() {
			return this.ui.box_right.find(".lxr").map(function() {
				return $(this).data("id");
			}).get();
		},
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
			Radio.channel("venueId").reset();
		}
	});
	
	return YhzView;
});