var config = require('../config');
var gulp = require('gulp');
var _ = require('underscore');

gulp.task('syncExcludedFolder', function(){
    _.each(config.movedFolder, function(folder) {
        gulp.src(config.themeDistributive + '/' + folder + '/**/*').pipe(gulp.dest(config.themePath + '/' + folder));
    });
});

gulp.task('sync',['syncExcludedFolder'], function(){
    return gulp.src(config.themeDistributive + '/*')
        .pipe(gulp.dest(config.themePath));
});
