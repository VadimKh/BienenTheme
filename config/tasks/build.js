var gulp = require('gulp');
var config = require('../config');
var _ = require('underscore');

var buildTasks = ['scripts', 'sync'];

_.each(config.css.preprocessors, function(preprocessor) {
   buildTasks.push(preprocessor);
});

gulp.task('build',buildTasks);