requirejs.config({
    baseUrl: "js/lib/dev",
    paths: {
    	web: "../../../js",
        mousewheel: "jquery.mousewheel",
        customIP: "jquery.customIP",
        uploadify: "uploadify/jquery.uploadify",
        jplayer: "jplayer/jquery.jplayer",
        playlist: "jplayer/jplayer.playlist",
        jqueryui: "jqueryui/jquery-ui",
        datepickerzhCN: "jqueryui/datepicker-zh-CN",
        timepicker: "jqueryui/jquery-ui-timepicker-addon",
        stickit: "backbone.stickit",
        radio: "backbone.radio",
        marionette: "backbone.marionette"
    },
    shim: {
    	mobilyblocks: ["jquery"],
    	playlist: ["jquery"],
    	uploadify: ["jquery"]
    }
});

requirejs(["web/app"], function(App) {
	new App().start();
});
