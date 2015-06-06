var AVAILABLE_PREPROCESSORS = {
    stylus: "styl",
        less: "less",
        sass: ["scss", "sass"]
};
var THEME_PATH = "../wp-content/themes/bienen";
var THEME_DIST = "./theme";
var IGNORED_FOLDERS = ["js", "css"];

var config = require("../config.json");
var _ = require('underscore');

var includedCSSPreprocessors = [];
_.each(config.cssPreProcessors, function(cssPreprocessor) {
     var prefix = AVAILABLE_PREPROCESSORS[cssPreprocessor];
     if(prefix) {
         prefix = _.isArray(prefix) ? prefix : [prefix];
         includedCSSPreprocessors.push({preProcessor: cssPreprocessor, prefix: prefix});
     }
});

module.exports = {
    release: config.release,
    themeDistributive: THEME_DIST,
    excludeFolders: config.excludeFolders,
    themePath: THEME_PATH,
    css: {
        src: "./theme/css/*.", // +  PREFIX in tasks
        destination: THEME_PATH + "/css",
        preprocessors: includedCSSPreprocessors
    },
    js: {
        src: "./theme/js/*.js", // +  PREFIX in tasks
        destination: THEME_PATH + "/js",
        concatName: 'main.js'
    },
    browserSync: {
        proxy: config.siteUrl,
        files: [
            THEME_PATH + '/**'
        ]
    }
};