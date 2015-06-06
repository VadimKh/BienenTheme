var gulp = require('gulp');
var config = require('../config');
var configImg = config.img
var imagemin = require('gulp-imagemin');

gulp.task('images', function() {
    return gulp.src(configImg.src)
        .pipe(imagemin({
            optimizationLevel: configImg.optimizationLevel,
            progressive: configImg.progressive,
            interlaced: configImg.interlaced
        }))
        .pipe(gulp.dest(config.themePath));
});