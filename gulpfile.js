var gulp    = require('gulp'),
    gutil    = require('gulp-util'),
    uglify  = require('gulp-uglify'),
    concat  = require('gulp-concat');

var templateCache = require('gulp-angular-templatecache');
var minifyHtml = require("gulp-minify-html");
var gettext = require('gulp-angular-gettext');
var ngmin = require('gulp-ngmin');

gulp.task('default', function(){
    gulp.run('cache'); 
});

// gulp.watch('./public/app/**/*.html', function () {
//      gulp.run('cache');
// });

gulp.task('watch', function () {
  gulp.watch('./public/app/**/*.html', function(){
  	gulp.run('cache');
  });
});
//  ============ template cache =====
gulp.task('cache', function () {
    gulp.src('./public/app/**/*.html')
	    .pipe(minifyHtml({
	        empty: true,
	        spare: true,
	        quotes: true
	    }))
        .pipe(templateCache() )
        .pipe(gulp.dest('./public/js'));
});
// ---------------- template cache ----
/*options
root (String)
	Prefix for template URLs. Default: ''

module (String)
	Name of AngularJS module.	Default: templates

standalone (Boolean)
	Create a new AngularJS module, instead of using an existing.
	Default: false
*/

// preminifu
gulp.task('preminify', function () {
    gulp.src('src/app.js')
        .pipe(ngmin())
        .pipe(gulp.dest('./public/js'));
});


gulp.task('concat-js', function () {
    gulp.src('./public/app/**/*.js')
    	// .pipe(ngmin())
     //    .pipe(uglify())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('./public/js'));
});

// ============ localization ======
gulp.task('pot', function () {
    return gulp.src(['src/partials/**/*.html', 'src/scripts/**/*.js'])
        .pipe(gettext.extract())
        .pipe(gulp.dest('po/'));
});

gulp.task('translations', function () {
    return gulp.src('po/**/*.po')
        .pipe(gettext.compile({
            format: 'json'
        }))
        .pipe(gulp.dest('dist/translations/'));
});