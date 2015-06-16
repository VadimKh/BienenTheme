var gulp = require('gulp');
var config = require('../config');
var _ = require('underscore');

var buildTasks = ['scripts', 'sync', 'syncExcludedFolder', 'images', 'localization-update', 'localization-compile'];

_.each(config.css.preprocessors, function(preprocessor) {
   buildTasks.push(preprocessor.preProcessor);
});

gulp.task('build',buildTasks);