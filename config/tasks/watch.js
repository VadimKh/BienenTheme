var gulp = require('gulp');
var _ = require('underscore');
var watch = require('gulp-watch');
var config = require('../config');

gulp.task('syncExcludedFolder', function(){
    _.each(config.excludeFolders, function(folder) {
        gulp.src(config.themeDistributive + '/' + folder + '/**/*').pipe(gulp.dest(config.themePath + '/' + folder));
    });
});

gulp.task('sync-excluded-folder-watch', function(){
    _.each(config.excludeFolders, function(folder) {
        var folderPath = config.themeDistributive + '/' + folder;

        gulp.src(folderPath + '/**/*',{ base: folderPath })
            .pipe(watch(folderPath + '/**/*', { base: folderPath }))
            .pipe(gulp.dest(config.themePath + '/' + folder));
    });
});

gulp.task('sync', function(){
    return gulp.src(config.themeDistributive + '/*')
        .pipe(gulp.dest(config.themePath));
});

gulp.task('sync-watch', function(){
    gulp.src(config.themeDistributive + '/*',{base: config.themeDistributive})
        .pipe(watch(config.themeDistributive + '/*', {base: config.themeDistributive}))
        .pipe(gulp.dest(config.themePath));
});

gulp.task('css-watch', function(){
    _.each(config.css.preprocessors, function(preprocessor) {
        var path = [];
        _.each(preprocessor.prefix, function (pref) {
            path.push(config.css.distPath + '/**/*.' + pref);
        });

        watch(path, function(){
            gulp.start([preprocessor.preProcessor]);
        });
    });
});

gulp.task('js-watch', function(){
    watch(config.js.src, function(){ gulp.start(['scripts']) });
});

gulp.task('localization-watch', function(){
    watch([config.localization.src + '/*.json'], function(){ gulp.start(['localization-compile'])});
});

gulp.task('watch', ['browserSync', 'images-watch', 'sync-excluded-folder-watch', 'sync-watch', 'css-watch', 'js-watch', 'localization-watch']);
