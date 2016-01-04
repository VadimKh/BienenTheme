var gulp = require('gulp');
var config = require('../config');
var locConfig = config.localization;
var path = require('path');
var _ = require('underscore');
var through = require('through2');
var jeditor = require("gulp-json-editor");

var localizationsInStroke = function(stroke, spliter) {
    var regExprLocalization = new RegExp("[\\s(.](__|_e|_x|_ex|_n|_en)\\s*\\(\\s*" + spliter + "([^" + spliter + "]*)" + spliter + "\\s*,\\s*" + spliter + "bienen" + spliter, "g");
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
                            msgstr: findedStroke
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
        .pipe(jeditor(function(json){
            json.template = localizations;
            return json;
        }))
        .pipe(gulp.dest(config.localization.src));
});



var template;
gulp.task('localization-read-template', ['create-localization-template'], function(){
    template = null;
    return  gulp.src(locConfig.src + '/' + locConfig.mainFile)
        .pipe(jeditor(function(json){
            template = json.template;
            return json;
        }));
});

gulp.task('localization-update', ['localization-read-template'], function(){
    return gulp.src([locConfig.src + '/*.json', '!' + locConfig.src + '/' + locConfig.mainFile])
        .pipe(jeditor(function(json){
            return _.map(template, function(localization) {
                var oldLocalization = _.find(json, function(oldLocalization){ return localization.msgid == oldLocalization.msgid});
                if(oldLocalization) {
                    localization.msgstr = oldLocalization.msgstr;
                }
                return localization;
            });
        }))
        .pipe(gulp.dest(locConfig.src));
});

gulp.task('lu', ['localization-update']);