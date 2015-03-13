//The build will inline common dependencies into this file.

//For any third party dependencies, like jQuery, place them in the lib folder.

//Configure loading modules from the lib directory,
//except for 'app' ones, which are in a sibling
//directory.
requirejs.config({
    baseUrl: "js/lib",
    paths: {
        app: "../app",
        models: "../models",
        collections: "../collections",
        views: "../views",
        tmpl: "../../tmpl",
        style: "../../css",
        jquery: "jquery-1.11.2",
        customSelect: "jquery.select",
        underscore: "underscore-min",
        backbone: "backbone",
        backboneSync: "backbone.sync",
        stickit: "backbone.stickit",
        handlebars: "handlebars-v2.0.0"
    }
});
