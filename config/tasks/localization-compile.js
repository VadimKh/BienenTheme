var gulp = require('gulp');
var config = require('../config');
var locConfig = config.localization;
var createFile = require('gulp-file');
var jeditor = require('gulp-json-editor');
var path = require('path');
var through = require('through2');
var _ = require('underscore');
var gettext = require('gulp-gettext');

var templateToString = function(templates){
    var result = "";

    _.each(templates, function(template){
        result += '#: ' + template.files.join(" ") + '\n';
        result += 'msgid "' + template.msgid + '"\n';
        result += 'msgstr "' + template.msgstr + '"\n';
        result += '\n'
    });
    return result;
};

gulp.task('localization-compile-pot', function(){
    gulp.src(locConfig.src + '/' + locConfig.mainFile)
        .pipe(jeditor(function(json){
            createFile(locConfig.mainFileName + '.pot', templateToString(json.template))
                .pipe(gulp.dest(locConfig.destination));
            return json;
        }));
});


gulp.task('localization-compile-po', function(){
   gulp.src([locConfig.src + '/*.json', '!' + locConfig.src + '/' + locConfig.mainFile])
       .pipe(through.obj(function (file, enc, cb) {
            var template = JSON.parse(file.contents.toString(enc));
            var filename = path.basename(file.path).replace('.json','.po');
            createFile(filename, templateToString(template))
                .pipe(gulp.dest(locConfig.destination))
                .pipe(gettext())
                .pipe(gulp.dest(locConfig.destination));
           cb(null, file);
       }));
});

gulp.task('localization-compile',['localization-compile-pot', 'localization-compile-po']);