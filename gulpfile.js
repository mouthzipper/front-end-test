// including plugins
var gulp = require('gulp')
, minifyHtml = require("gulp-minify-html")
, uglify = require("gulp-uglify")
, sass = require("gulp-sass")
, concat = require('gulp-concat')
,  rename = require('gulp-rename')
,  notify = require('gulp-notify'),
ngAnnotate = require('gulp-ng-annotate');

gulp.task('copy-files', function(){
    return gulp.src([ './public/**/*.html','./public/bower_components/**/*.js'], { base: './public' })
        .pipe(gulp.dest('dist'));
});


gulp.task('scripts', function() {
  return gulp.src(['public/QueueApp.js', 'public/customer/Customer.js', 'public/add-customer/AddCustomer.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(ngAnnotate())
    .pipe(gulp.dest('dist/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});
//
gulp.task('compile-sass', function () {
    return gulp.src('./public/style/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/style'));
});


// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'copy-files', 'compile-sass']);