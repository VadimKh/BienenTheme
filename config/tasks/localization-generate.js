var gulp = require('gulp');
var config = require('../config');
var path = require('path');
var _ = require('underscore');
var through = require('through2');
var jeditor = require("gulp-json-editor");

var localizationsInStroke = function(stroke, spliter) {
    var regExprLocalization = new RegExp("[\\s(](__|_e|_x|_ex|_n|_en)\\s*\\(\\s*" + spliter + "([^" + spliter + "]*)" + spliter, "g");
    var regExpLocal = new RegExp(spliter + "([^" + spliter + "]*)" + spliter, "");

    var matchesResult = stroke.match(regExprLocalization);
    var localText = [];
    _.each(matchesResult, function(result){
        if(!result)
            return;
        var localizationString = regExpLocal.exec(result)[1];
        localText.push(localizationString);
    });
    return localText;
};

var localizations = [];

gulp.task('generate-pot', function(){
    localizations = [];
    return gulp.src(config.localization.localizationFiles)
        .pipe(through.obj(function (file, enc, cb) {
            var fileContent = file.contents.toString(enc);
            var fileStrokes = fileContent.split('\n');

            var relativePath = path.relative(config.localization.src,file.path).replace(/\\\\/g,"\\");

            _.each(fileStrokes, function(stroke, index) {
                var findedStrokes = localizationsInStroke(stroke, "'")
                    .concat(localizationsInStroke(stroke, '"'));
                _.each(findedStrokes, function(findedStroke) {
                    var fileWithIndex = relativePath + ":" + index;
                    var localization = _.find(localizations, function(localization){
                       return localization.msgid === findedStroke
                    });

                    if(localization) {
                        localization.files.push(fileWithIndex)
                    } else {
                        localization = {
                            files: [fileWithIndex],
                            msgid: findedStroke,
                            msgstr: ""
                        };
                        localizations.push(localization);
                    }
                });
            });

            cb(null, file);
        }));
});

gulp.task('create-localization-template', ['generate-pot'], function() {
    return gulp.src(config.localization.src + '/' + config.localization.mainFile)
        .pipe(jeditor({ template: localizations}))
        .pipe(gulp.dest(config.localization.src));
});

