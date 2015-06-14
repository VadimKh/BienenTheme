var gulp = require('gulp-param')(require('gulp'), process.argv);
var config = require('../config');
var locConfig = config.localization;
var fs = require('fs');
var createFile = require('gulp-file');
var jeditor = require('gulp-json-editor');
var gcallback = require('gulp-callback');

var _ = require('underscore');
_.mixin( require('underscore.deferred') );

gulp.task('loc-update', function(name) {
    var fileName = locConfig.src + '/' + name + '.json';
    var deferred = _.Deferred();

    if(fs.existsSync(fileName)) {
        console.log('File ' + name + '.json already exist');
        deferred.resolve();
    } else {
        createFile(name + '.json','[]')
            .pipe(gulp.dest(locConfig.src))
            .pipe(gcallback(function(){
                console.log('File ' + name + '.json created');
                deferred.resolve();
            }));
    }
    var template;
    var templateReaded = _.Deferred();
    deferred.done(function(){
        gulp.src(locConfig.src + '/' + locConfig.mainFile)
            .pipe(jeditor(function(json){
                template = json.template;
                templateReaded.resolve();
                return json;
            }));
    });

    templateReaded.done(function(){
        gulp.src(fileName)
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
});