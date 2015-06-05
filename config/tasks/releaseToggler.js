var CONFIG_RELATIVE_PATH = './';
var CONFIG_RELATIVE_NAME = CONFIG_RELATIVE_PATH + '/config.json';
var gulp = require('gulp');
var jeditor = require("gulp-json-editor");

gulp.task('release', function () {
    return gulp.src(CONFIG_RELATIVE_NAME)
        .pipe(jeditor({ release: true}))
        .pipe(gulp.dest(CONFIG_RELATIVE_PATH));
});

gulp.task('debug', function () {
    return gulp.src(CONFIG_RELATIVE_NAME)
        .pipe(jeditor({ release: false}))
        .pipe(gulp.dest(CONFIG_RELATIVE_PATH));
});