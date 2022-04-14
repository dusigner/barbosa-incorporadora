const gulp = require('gulp');
const fileinclude = require('gulp-file-include');
const server = require('browser-sync').create();
const { watch, series } = require('gulp');
const sass = require('gulp-sass');
const webp = require('gulp-webp');
sass.compiler = require('node-sass');
const htmlmin = require('gulp-htmlmin');
const autoprefixer = require('gulp-autoprefixer');

const paths = {
  scripts: {
    src: './src/',
    dest: './build/'
  }
};

async function reload() {
  server.reload();
}

async function compileSass() {
  gulp.src('./src/sass/**/*.scss')
  .pipe(sass(
    {outputStyle: 'compressed'}
    ).on('error', sass.logError))
    .pipe(gulp.dest('./src/assets/css'));
}

async function webpImage() {
  gulp.src(['./src/assets/**/*.jpg','./src/assets/**/*.png'])
    .pipe(webp())
    .pipe(gulp.dest('./build/webp'));
}
exports.webp = webpImage;

async function copyAssets() {
  gulp.src(['src/assets/**/*'])
    .pipe(gulp.dest(paths.scripts.dest));
}


async function buildAndReload() {
  await includeHTML();
  await copyAssets();
  await webpImage();
  reload();
}

async function includeHTML(){
  return gulp.src([
    './src/*.html',
    '!./src/_formulario.html',
    '!./src/_header_secundary.html',
    '!./src/_header.html',
    '!./src/_menu-links.html',
    '!./src/_menu-social.html',
    '!./src/_scripts-jquery.html',
    '!./src/_scripts-menu.html',
    '!./src/_scripts-slick.html',
    '!./src/_slider.html',
    ])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.scripts.dest));
}
exports.includeHTML = includeHTML;

exports.default = async function() {
  server.init({
    server: {
      baseDir: paths.scripts.dest,
      directory: true,
      index: "index.html"
    }
  });
  buildAndReload();
  watch('./src/sass/**/*.scss',  series(compileSass));
  watch(["src/*.html","src/assets/**/*"], series(buildAndReload));
};