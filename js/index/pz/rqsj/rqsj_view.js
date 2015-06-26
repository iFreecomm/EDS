define(function(require) {
    var Mn = require("marionette");
    var FormUtil = require("web/common/formUtil");
    var tmpl = require("text!web/index/pz/rqsj/rqsj_template.html");
    var Util = require("web/common/util");

    var RqsjView = Mn.ItemView.extend({
        id: "pz_rqsj",
        template: tmpl,
        bindings: {
            "#timezone": {
                observe:"timezone",
                selectName:"timezoneArr"
            },
            "#date": "date",
            "#dataserver": "dataserver",
            "#autosync": "autosync"
        },
        checkOptions: {
            "#dataserver": {
                constraint: ["ipCheck"],
                appendTo: ".formCell"
            }
        },
        ui: {
            formBox: ".formBox",
            select: "select"
        },
        events: {
            "keyup": "checkInput",
            "click .syncBtn" : "syncDate",
            "click .saveBtn" : "saveDate"
        },
        initialize:function(){
            Util.setSelectBindings(this.bindings);
        },
        onRender: function() {
            this.stickit();
            Util.initCheckboxClass(this.$el).addCheckboxEvent(this.$el);
            this.$(".ip").initIP();
        },
        onAttach: function() {
            Util.activeLink().selectmenu(this.ui.select, this.ui.formBox);
            this.ui.select.change();
            this.$("#timezone").selectmenu("menuWidget").css({maxHeight:240});
            
            this.$("#date").datetimepicker({
				timeFormat: "HH:mm:ss"
			});
        },

        checkInput: function(e) {
            FormUtil.checkInput($(e.target), this.checkOptions);
        },

        syncDate: function() {
            this.saveDate();
        },
        saveDate: function(){
            if(FormUtil.checkForm(this.$el, this.checkOptions)) return;

            this.model.save().done(this.saveSuccess).fail(this.saveError);
        },
        saveSuccess:function(){
            alert("成功");
        },
        saveError:function(){
            alert("失败");
        }
    });
    
    return RqsjView;
});