var config = require("../config.json");

var themePath = "./wp-content/themes/bienen";
var themeDist = "./theme";
var ignoredFolder = ["js", "css"];

module.exports = {
    release: config.release,
    themeDistributive: themeDist,
    excludeFolders: config.excludeFolders,
    themePath: themePath,
    css: {
        src: "./theme/css/*.", // +  PREFIX in tasks
        destination: themePath + "/css",
        preprocessors: config.cssPreProcessors,
        AVAILABLE_PREPROCESSORS: {
            stylus: "styl",
            less: "less",
            sass: ["scss", "sass"]
        }
    },
    js: {
        src: "./theme/js/*.js", // +  PREFIX in tasks
        destination: themePath + "/js",
        concatName: 'main.js'
    }
};