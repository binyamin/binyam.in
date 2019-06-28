const gulp = require("gulp");

const rename = require("gulp-rename");
const sourcemaps = require("gulp-sourcemaps");
const nodemon = require("gulp-nodemon");

const uglify = require("gulp-uglify");
const babel = require("gulp-babel");

const cleanCSS = require("gulp-clean-css");
const autoprefixer = require("gulp-autoprefixer");

const imagemin = require("gulp-imagemin");

function js(cb) {
  gulp
    .src("js/main.js")
    .pipe(sourcemaps.init())
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename({ extname: ".min.js" }))
    .pipe(gulp.dest("js"));
  cb();
}

function css(cb) {
  gulp
    .src("css/style.css")
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(rename({ extname: ".min.css" }))
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest("css"));
  cb();
}

function img(cb) {
  gulp
    .src("assets/**/*")
    .pipe(imagemin())
    .pipe(gulp.dest("assets"));
  cb();
}

function watch() {
  gulp.watch("css/style.css", css);
  gulp.watch("js/main.js", js);
  gulp.watch('*.html');
}

exports.pack = gulp.parallel(js, css);
exports.build = gulp.parallel(js, css, img);
exports.watch = watch;