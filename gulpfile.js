const gulp = require('gulp');

const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const nodemon = require('gulp-nodemon');

const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('gulp-autoprefixer');

const imagemin = require('gulp-imagemin');

function js(cb) {
  gulp.src('public/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(gulp.dest('dist/js'));
  cb();
}

function css(cb) {
    gulp.src('public/css/*.css')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
  cb()
}

function img(cb) {
    gulp.src('public/assets/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/assets'))
    cb()
}

function serve(done) {
    nodemon({
      script: 'server.js',
      ignore: "dist/**/*",
      ext: 'js html css',
      env: { 'NODE_ENV': 'development' },
      tasks: ['pack'],
      done: done
    })
}

exports.pack = gulp.parallel(js, css)
exports.build = gulp.parallel(js, css, img)
exports.serve = serve