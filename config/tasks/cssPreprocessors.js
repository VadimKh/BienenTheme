var config = require('../config');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var handleErrors = require('../utils/handleErrors');
var cssConfig = config.css;
var _ = require('underscore');
var preprocessors = cssConfig.preprocessors;

_.each(preprocessors, function(preprocessor) {
    var compilerName = preprocessor.preProcessor;
    var prefix = preprocessor.prefix;
    var compiler = require('gulp-' + compilerName);
    var path = [];

    _.each(prefix, function(pref){
       path.push(cssConfig.src + pref);
    });

    gulp.task(compilerName, function () {
        return gulp.src(path)
            .pipe(sourcemaps.init())
            .pipe(compiler())
            .on('error', handleErrors)
            .pipe(autoprefixer({cascade: false, browsers: ['last 2 versions']}))
            .pipe(gulpif(config.release,minifyCSS({keepBreaks: true})))
            .pipe(gulpif(config.release,sourcemaps.write()))
            .pipe(gulp.dest(cssConfig.destination));
    });
});


