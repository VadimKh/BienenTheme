var THEME_FOLDER = './wp-content/themes/bienen';
var RELEASE = false;

var config = require("./config.json");

module.exports = {
    release: config.release,
    css: {
        src: "./css/*.", // +  PREFIX in tasks
        destination: config.themeFolder + "/css"
    }
};