var gulp = require('gulp');
var _ = require('underscore');
var watch = require('gulp-watch');
var config = require('../config');

gulp.task('syncExcludedFolder', function(){
    _.each(config.excludeFolders, function(folder) {
        gulp.src(config.themeDistributive + '/' + folder + '/**/*').pipe(gulp.dest(config.themePath + '/' + folder));
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
            path.push(config.css.src + pref);
        });
        gulp.watch(path, [preprocessor.preProcessor]);
    });

    gulp.watch(config.js.src, ['scripts']);
    gulp.watch(config.img.src, ['images']);

    gulp.watch(config.themeDistributive + '/*', ['sync']);
    _.each(config.excludeFolders, function(folder) {
        gulp.watch(config.themeDistributive + '/' + folder + '/**/*', ['syncExcludedFolder']);
    });
});
