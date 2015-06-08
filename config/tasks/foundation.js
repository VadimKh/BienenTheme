var config = require('../config');
var BOWER_DIRECTORY = './bower_components';
var gulp = require('gulp');
var bowerFiles = require('main-bower-files');
var inject = require('gulp-inject');
var bower = require('gulp-bower');

gulp.task('foundation-install', function(){
   return  bower();
});

gulp.task('foundation-scripts', ['foundation-install'], function(){
    var vendorsSrc = config.foundation.src;
    var themeDist = config.themeDistributive;

    var result = bowerFiles();
    result.push('!**/*.css');
    result.push('!**/*.map');
    gulp.src(result)
        .pipe(gulp.dest(themeDist + '/' + vendorsSrc));

    gulp.src(config.functionPath)
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
        .pipe(gulp.dest(themeDist));
});

gulp.task('foundation-scss', ['foundation-scripts'], function(){
    gulp.src(BOWER_DIRECTORY + config.foundation.scssSrc)
        .pipe(gulp.dest(config.css.distPath + '/foundation'));
});

gulp.task('foundation', ['foundation-scss']);