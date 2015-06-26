define(function(require) {
    var Mn = require("marionette");
    var FormUtil = require("web/common/formUtil");
    var tmpl = require("text!web/index/pz/dyxx/dyxx_template.html");
    var Util = require("web/common/util");

    var DyxxView = Mn.ItemView.extend({
        id: "pz_dyxx",
        template: tmpl,
        bindings: {
            "#powersaving": "powersaving",
            "#closedisplay": "closedisplay",
            "#dormant": "dormant",
            "#shutdown": "shutdown"
        },
        ui: {
            formBox: ".formBox",
            select: "select"
        },
        events: {
            "click .saveBtn" : "saveBtn"
        },
        initialize:function(){
            Util.setSelectBindings(this.bindings);
        },
        onRender: function() {
            this.stickit();
            Util.initCheckboxClass(this.$el).addCheckboxEvent(this.$el);
        },
        onAttach:function(){
            Util.activeLink().selectmenu(this.ui.select, this.ui.formBox);
        },
        saveBtn: function(){
            this.model.save().done(this.saveSuccess).fail(this.saveError);
        },

        saveSuccess:function(){
            alert("成功");
        },

        saveError:function(){
            alert("失败");
        }

    });
    return DyxxView;
});
