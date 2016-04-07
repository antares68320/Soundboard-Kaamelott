var gulp = require('gulp'),
    webserver = require('gulp-server-livereload'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    gulpif = require('gulp-if'),
    minifyCss = require('gulp-minify-css'),
    imagemin = require('gulp-imagemin');

gulp.task('img', function() {
	return gulp.src('src/img/**/*')
	  .pipe(imagemin({
	  	progressive: true
	  }))
	  .pipe(gulp.dest('dist/img'));
});

gulp.task('clean', function () {
	return gulp.src('dist', { read: false }).pipe(clean())
});

gulp.task('default', ['img', 'clean'], function() {
	return gulp.src('src/*.html')
	  .pipe(useref())
	  .pipe(gulpif('*.js', uglify()))
	  .pipe(gulpif('*.css', minifyCss()))
	  .pipe(gulp.dest('dist'));
});

gulp.task('serve', function() {
	return gulp.src('./src')
	  .pipe(webserver({
		livereload: true,
		directoryListing: false,
		open: true
	  }));
});