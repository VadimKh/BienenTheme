var PREFIX = "styl";
var gulp = require('gulp');
var gulpif = require('gulp-if')
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var handleErrors = require('../utils/handleErrors');
var config = require('../config');
var cssConfig = config.css;

gulp.task('stylus', function () {
	return gulp.src(cssConfig.src + PREFIX)
		.pipe(sourcemaps.init())
		.pipe(stylus())
		.on('error', handleErrors)
		.pipe(autoprefixer({cascade: false, browsers: ['last 2 versions']}))
		.pipe(gulpif(config.release,minifyCSS({keepBreaks: true})))
		.pipe(gulpif(config.release,sourcemaps.write()))
		.pipe(gulp.dest(cssConfig.destination));
});
