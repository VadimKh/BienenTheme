var config = require('../config');
var BOWER_DIRECTORY = './bower_components';
var gulp = require('gulp');
var bowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var bower = require('gulp-bower');

gulp.task('bower-install', function(){
   return  bower();
});

gulp.task('bower-scripts', ['bower-install'], function(){
    var vendorsSrc = config.bower.src;
    var themeDist = config.themeDistributive;

    var result = bowerFiles();
    result.push('!**/*.css');
    result.push('!**/*.map');
    gulp.src(result)
        .pipe(gulp.dest(themeDist + '/' + vendorsSrc));

    gulp.src(config.bower.functionScriptsPath)
        .pipe(inject(
            gulp.src(result, {read: false}), {
                starttag: '/*inject:js*/',
                endtag: '/*endinject*/',
                transform: function(filepath) {
                    var fileName = filepath.match(/([^/]*)$/)[0];
                    var fileWithoutExt =  fileName.replace(/(\.[^.]*)$/,"");

                    var result = "wp_deregister_script('" + fileWithoutExt + "'); \n";
                        result += "wp_register_script('" + fileWithoutExt + "', get_template_directory_uri() . '/" + vendorsSrc + '/' + fileName + "', $dependencing); \n";
                        result += "array_push($dependencing, '" + fileWithoutExt + "'); \n";
                    return result;
                }
            }
        ))
        .pipe(gulp.dest(config.bower.functionPath));
});

gulp.task('bootstrap-sass', ['bower-scripts'], function(){
    gulp.src(BOWER_DIRECTORY + config.bower.scssSrc)
        .pipe(gulp.dest(config.css.distPath + '/vendors'));
});

gulp.task('bower', ['bootstrap-sass']);