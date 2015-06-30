var gulp = require('gulp');
var _ = require('underscore');
var watch = require('gulp-watch');
var config = require('../config');

var excludedFolderSync = [];

_.each(config.excludeFolders, function(folder) {
    excludedFolderSync.push(config.themeDistributive + '/' + folder + '/*');
});

gulp.task('syncExcludedFolder', function(){
    _.each(config.excludeFolders, function(folder) {
        gulp.src(config.themeDistributive + '/' + folder + '/*').pipe(gulp.dest(config.themePath + '/' + folder));
    });
});

gulp.task('sync', function(){
    return gulp.src(config.themeDistributive + '/*')
        .pipe(gulp.dest(config.themePath));
});


gulp.task('watch', ['browserSync'], function () {
    _.each(config.css.preprocessors, function(preprocessor) {
        var path = [];
        _.each(preprocessor.prefix, function (pref) {
            path.push(config.css.distPath + '/**/*.' + pref);
        });

        watch(path, function(){
            gulp.start([preprocessor.preProcessor]);
        });
    });

    watch(config.js.src, function(){ gulp.start(['scripts']) });
    watch(config.img.src, function(){ gulp.start(['images']) });

    watch(config.themeDistributive + '/*', function(){ gulp.start(['sync']) });

    watch(excludedFolderSync, function(){ gulp.start(['syncExcludedFolder']) });
    //watch([config.localization.localizationFiles], function(){ gulp.start(['localization-update'])});
    watch([config.localization.src + '/*.json'], function(){ gulp.start(['localization-compile'])});
});
