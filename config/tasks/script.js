var config = require('../config');
var configJs = config.js;

var gulp = require('gulp');
var gulpif = require('gulp-if');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts-vendor', function(){
    return gulp.dest(configJs.destination)
        .pipe(gulp.src(configJs.src + '/*/**/*.js'))
        .pipe(gulpif(config.release, uglify()))
        .pipe(gulp.dest(configJs.destination));
});

gulp.task('scripts', ['scripts-vendor'], function() {
    return gulp.src(configJs.src + '/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat(configJs.concatName))
        .pipe(gulpif(config.release, uglify()))
        .pipe(gulp.dest(configJs.destination));
});