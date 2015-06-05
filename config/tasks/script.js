var config = require('../config');
var configJs = config.js;

var gulp = require('gulp');
var gulpif = require('gulp-if');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function() {
    return gulp.src(configJs.src)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(concat(configJs.concatName))
        .pipe(gulpif(config.release, uglify()))
        .pipe(gulp.dest(configJs.destination));
});