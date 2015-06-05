var config = require("../config.json");

module.exports = {
    release: config.release,
    css: {
        src: "./css/*.", // +  PREFIX in tasks
        destination: config.themeFolder + "/css",
        preprocessors: config.cssPreProcessors,
        AVAILABLE_PREPROCESSORS: {
            stylus: "styl",
            less: "less",
            sass: ["scss", "sass"]
        }
    }
};