define(function(require) {
	var Mn = require("marionette");
	var Util = require("web/common/util");
	var tmpl = require("text!web/index/pz/yppz/zdjz/zdjz_template.html");
	var ZdjzModel = require("web/index/pz/yppz/zdjz/zdjz_model");
	
	var ZdjzView = Mn.ItemView.extend({
		id: "pz_yppz_zdjz",
		template: tmpl,
		events: {
			"click #ansEn": "changeEn",
			"change [name=ansMode]" : "changeMode"
		},
		onRender: function() {
			var view =this;
			this.model = new ZdjzModel();
			this.model.fetch().done(function() {
				view.renderData();
				Util.initRadioClass(view.$el).addRadioEvent(view.$el);
			});
		},
		
		/**
		 * 保存噪声消除字段
		 * @param {Object} e
		 */
		changeEn: function(e) {
			$(e.target).toggleClass("active");
			
			this.model
			.save(this._getEn())
			.done(function() {
				//success
			})
			.fail(function() {
				//error
			});
		},
		_getEn: function() {
			return {
				ansEn: this.$el.find("#ansEn").is(".active") ? 1 : 0
			}
		},
		
		/**
		 * 保存强度选择字段
		 */
		changeMode: function() {
			this.model
			.save(this._getMode())
			.done(function() {
				//success
			})
			.fail(function() {
				//error
			});
		},
		_getMode: function() {
			return {
				ansMode: +this.$el.find("[name=ansMode]:checked").val()
			}
		},
		
		renderData: function() {
			var $el = this.$el;
			var model = this.model;
			//噪声消除
			model.get("ansEn") && $el.find("#ansEn").addClass("active");
			//强度选择
			var ansMode = model.get("ansMode");
			$el.find("[name=ansMode][value=" + ansMode + "]").prop("checked", true);
		}
	});
	
	return ZdjzView;
});
