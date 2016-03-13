
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var utilities =  require('gulp-util');
var buildProduction = utilities.env.production;
var del = require('del');
var eslint = require('gulp-eslint');

gulp.task('eslint', function() {
  return gulp.src(['js/*.js'])
  .pipe(eslint())
  .pipe(eslint.format())
  .pipe(eslint.failOnError()); 
});

gulp.task('concatInterface', function() {
  return gulp.src(['./js/*-interface.js'])
  .pipe(concat('allConcat.js'))
  .pipe(gulp.dest('./tmp'));
});

gulp.task('jsBrowserify', ['concatInterface'],  function() {
  return browserify({ entries: ['./tmp/allConcat.js']})
  .bundle()
  .pipe(source('app.js'))
  .pipe(gulp.dest('./build/js'));
});

gulp.task('minifyScripts', ['jsBrowserify'], function(){
  return gulp.src('./build/js/app.js')
  .pipe(uglify())
  .pipe(gulp.dest('./build/js'));
});

gulp.task('clean', function() {
  return del(['build', 'tmp']);
});

gulp.task('build', ['clean'], function(){
  if(buildProduction)
  {
    gulp.start('minifyScripts');
  }
  else
  {
    gulp.start('jsBrowserify');
  }
});
