define(function(require) {
	var _ = require("underscore");
	var Backbone = require("backbone");
	var Mn = require("marionette");
	var Handlebars = require("handlebars");
	
	var Radio = require("radio");
	var SelectObj = require("web/common/select");
	
	var LoginRouter = require("web/login/login_router");
	var PortalRouter = require("web/portal/portal_router");
	var LxrRouter = require("web/index/lxr/lxr_router");
	var ZkhyRouter = require("web/index/zkhy/zkhy_router");
	var PzRouter = require("web/index/pz/pz_router");
	
	require("stickit");
	require("jqueryui");
	require("timepicker");
	require("datepickerzhCN");
	require("mousewheel");
	
	var AppView = Mn.LayoutView.extend({
		el: document,
		regions: {
			container: "body"
		}
	});
	
	var App = Mn.Application.extend({
		initialize: function() {
			this.layout = new AppView();
			
			this.initRouters(this.layout.container);
			this.initRenderer();
			this.initChannel();
			this.initHandlebarsHelpers();
			this.initStickitHandler();
		},
		
		initRouters: function(container) {
			var opt = { container: container };
			
			new LoginRouter(opt);
			new PortalRouter(opt);
			new LxrRouter(opt);
			new ZkhyRouter(opt);
			new PzRouter(opt);
		},
		
		initRenderer: function() {
			Mn.Renderer.render = function(template, data) {
				return _.isFunction(template) ? template(data) : template;
			};
		},
		
		initChannel: function() {
			Radio.DEBUG = true;
			Radio.channel("app").reply("getSelectBindings", this.getSelectBindings, this);
		},
		
		// 从公共的JSON中获取select的bindings属性
		getSelectBindings: function(selectIdArr) {
			var result = {}, i, id, temp;
			for(i = 0; id = selectIdArr[i]; i ++) {
				temp = {};
				temp.observe = id;
				temp.selectOptions = {};
				temp.selectOptions.collection = SelectObj[id];
				result["#"+id] = temp;
			}
			return result;
		},
		
		initHandlebarsHelpers: function() {
			var classes = ["sxj","zkhy","zkhy", "zk"];
			Handlebars.registerHelper("getLxrClass", function(equType) {
				return classes[equType];
			});
			Handlebars.registerHelper("getLxrInfo", function(equType) {
				var result;
				if(equType === 0) {
					result = this.camPort;
				} else if(equType === 1 || equType === 2) {
					result = "IP:"+this.ip+"<br/>号码:"+this.e164;
				} else if(equType === 3) {
					result = this.url;
				}
				return new Handlebars.SafeString(result);
			});
			Handlebars.registerHelper("getPartLxrInfo", function(equType) {
				var result;
				if(equType === 0) {
					result = this.camPort;
				} else if(equType === 1 || equType === 2) {
					result = "IP:"+this.ip;
				} else if(equType === 3) {
					result = this.url;
				}
				return new Handlebars.SafeString(result);
			});
		},
		
		initStickitHandler: function() {
			Backbone.Stickit.addHandler({
				selector: "input[type=checkbox]",
				update: function($el, val, model, options) {
				    if ($el.length > 1) {
				        val || (val = []);
				        $el.each(function(i, el) {
				            var checkbox = Backbone.$(el);
				            var checked = _.contains(val, +checkbox.val());
				            checkbox.prop('checked', checked);
				        });
				    } else {
				        var checked = val ? true : false;
				        $el.prop('checked', checked);
				    }
				},
				getVal: function($el) {
				    var val;
				    if ($el.length > 1) {
				        val = _.reduce($el, function(memo, el) {
				            var checkbox = Backbone.$(el);
				            if (checkbox.prop('checked')) memo.push(+checkbox.val());
				            return memo;
				        }, []);
				    } else {
				        val = $el.prop('checked');
				        val = val ? 1 : 0;
				    }
				    return val;
				}
			});
		},
		
		onStart: function() {
			Backbone.history.start();
		}
	});
	
	return App;
});