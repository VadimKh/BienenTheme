var config = require("../config.json");

module.exports = {
    release: config.release,
    themeDistributive: config.themeDistributive,
    movedFolder: config.movedFolder,
    themePath: config.themePath,
    css: {
        src: "./theme/css/*.", // +  PREFIX in tasks
        destination: config.themePath + "/css",
        preprocessors: config.cssPreProcessors,
        AVAILABLE_PREPROCESSORS: {
            stylus: "styl",
            less: "less",
            sass: ["scss", "sass"]
        }
    },
    js: {
        src: "./theme/js/*.js", // +  PREFIX in tasks
        destination: config.themePath + "/js",
        concatName: 'main.js'
    }
};