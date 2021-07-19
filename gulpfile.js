const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const urlprefixer = require('gulp-url-prefixer');
const cssnano = require('gulp-cssnano');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const image = require('gulp-image');
const del = require('del');
const sync = require('browser-sync').create();
const deployGh = require('gulp-gh-pages');
const util = require('gulp-util');
const path = require('path');
const sass = require('gulp-dart-sass');

sass.compiler = require('sass');

const rootPath = path.basename(__dirname);

function html() {
    return gulp.src('src/*.html')
        .pipe(util.env.prod ? urlprefixer.html({
            prefix: `/${rootPath}`,
            tags: ['script', 'link', 'img', 'a']
        }) : util.noop())
        .pipe(gulp.dest('build'))
}

function fonts() {
    return gulp.src('src/fonts/**/*.ttf')
        .pipe(gulp.dest('build/fonts'))
}

function images() {
    return gulp.src('src/images/**/*')
        .pipe(util.env.prod ? image() : util.noop())
        .pipe(gulp.dest('build/images'))
}

function styles() {
    return gulp.src('src/styles/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(util.env.prod ? autoprefixer() : util.noop())
        .pipe(util.env.prod ? cssnano() : util.noop())
        .pipe(util.env.prod ? urlprefixer.css({
            prefix: `/${rootPath}`
        }) : util.noop())
        .pipe(gulp.dest('build/styles'))
}

function scripts() {
    return gulp.src('src/scripts/*.js')
        .pipe(babel({
            plugins: ['@babel/transform-runtime']
        }))
        .pipe(util.env.prod ? uglify() : util.noop())
        .pipe(concat('main.js'))
        .pipe(gulp.dest('build/scripts'))
}

function serve() {
    sync.init({
        server: {
            baseDir: "build"
        },
        notify: false
    });

    sync.watch('build', sync.reload);
}

function clean() {
    return del('build');
}

function deploy() {
    return gulp.src("build/**/*")
        .pipe(deployGh())
}

function watch() {
    gulp.watch('src/*.html', html);
    gulp.watch('src/fonts/*.ttf', fonts);
    gulp.watch('src/images/**/*.*', images);
    gulp.watch('src/styles/**/*.scss', styles);
    gulp.watch('src/scripts/*.js', scripts);
}

exports.default = gulp.series(
    clean,
    gulp.parallel(html, fonts, images, styles, scripts),
    gulp.parallel(watch, serve)
)

exports.build = gulp.series(
    clean,
    gulp.parallel(html, fonts, images, styles, scripts),
    deploy
)