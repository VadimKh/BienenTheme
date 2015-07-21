var gulp = require('gulp');
var config = require('../config');
var watch = require('gulp-watch');
var configImg = config.img;
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

gulp.task('images-watch', function() {
    return gulp.src(configImg.src, {base: config.themeDistributive})
        .pipe(watch(configImg.src, {base: config.themeDistributive}))
        .pipe(imagemin({
            optimizationLevel: configImg.optimizationLevel,
            progressive: configImg.progressive,
            interlaced: configImg.interlaced
        }))
        .pipe(gulp.dest(config.themePath));
});