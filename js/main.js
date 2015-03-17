requirejs.config({
    baseUrl: "js/lib",
    paths: {
        model: "../model",
        collection: "../collection",
        view: "../view",
        router: "../router",
        tmpl: "../../tmpl",
        style: "../../css",
        jquery: "jquery-1.11.2",
        customSelect: "jquery.select",
        underscore: "underscore-min",
        backbone: "backbone",
        stickit: "backbone.stickit",
        handlebars: "handlebars-v2.0.0"
    }
});

requirejs(["router"]);
