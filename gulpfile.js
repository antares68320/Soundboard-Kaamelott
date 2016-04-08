var gulp = require('gulp'),
    webserver = require('gulp-server-livereload'),
    useref = require('gulp-useref'),
    jade = require('gulp-jade'),
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

gulp.task('jade', function () {
	return gulp.src('src/*.jade')
	  .pipe(jade({
		locals: {},
		pretty: true,
		debug: true
	  }))
	  .pipe(gulp.dest('./src'));
});

gulp.task('clean', function () {
	return gulp.src('dist', { read: false }).pipe(clean())
});

gulp.task('default', ['jade', 'img', 'clean'], function() {
	return gulp.src('src/*.html')
	  .pipe(useref())
	  .pipe(gulpif('*.js', uglify()))
	  .pipe(gulpif('*.css', minifyCss()))
	  .pipe(gulp.dest('dist'));
});

gulp.task('serve', ['jade'], function() {
	gulp.watch('src/*.jade', ['jade']);
	
	gulp.src('./src')
	  .pipe(webserver({
		livereload: true,
		directoryListing: false,
		open: true
	  }));
});