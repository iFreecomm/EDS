requirejs.config({
    baseUrl: "js/lib/dev",
    paths: {
    	web: "../../../js",
        mousewheel: "jquery.mousewheel",
        jplayer: "jplayer/jquery.jplayer",
        jqueryui: "jqueryui/jquery-ui",
        datepickerzhCN: "jqueryui/datepicker-zh-CN",
        timepicker: "jqueryui/jquery-ui-timepicker-addon",
        stickit: "backbone.stickit",
        radio: "backbone.radio",
        marionette: "backbone.marionette"
    },
    shim: {
    	mobilyblocks: ["jquery"]
    }
});

requirejs(["web/app"], function(App) {
	new App().start();
});
