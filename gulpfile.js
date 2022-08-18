const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');
const terser = require('gulp-terser');
const imagemin = require('gulp-imagemin');
const imagewebp = require('gulp-webp');
const browserSync = require('browser-sync').create();


//brwsersync

function browserSyncServe(cb) {
    browserSync.init(
        {
            server: {
                baseDir: '.'
            }

        }
    );
    cb();
}

function reloadBrowser(cb) {
    browserSync.reload();
    cb();
}

//functions

//compile scss
function compilescss() {
    //get scss file 
    return src('src/scss/*.scss')
        //run gulp sass
        .pipe(sass())
        //run prefix
        .pipe(prefix())
        //run minify
        .pipe(minify())
        //exit pipe and create new css file
        .pipe(dest('dist/css'));
}
//js

function minifyJs() {
    //get js file 
    return src('src/js/*.js')
        //run gulp terser
        .pipe(terser())
        //exit and sed to js folder
        .pipe(dest('dist/js'));
}

//
function imageOptimizer() {
    //get js file 
    return src('src/images/*.{jpg,png,jpeg}')
        //run gulp terser
        .pipe(imagemin(
            imagemin.mozjpeg({ quality: 80, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
        ))
        //exit and sed to js folder


        .pipe(dest('dist/images'));
}


//

function imageWebp() {
    return src('dist/images/*.{jpg,png,jpeg}')
        .pipe(imagewebp())
        .pipe(dest('dist/images'));
}


//watch

function watchTask() {
    watch('*.html', reloadBrowser);
    //watch scss files and call scc compiler
    watch(['src/scss/*.scss', 'src/js/*.js'], series(compilescss, minifyJs, reloadBrowser));

    watch('src/images/*.{jpg,png,jpeg}', imageOptimizer)
    watch('dist/images/*.{jpg,png,jpeg}', imageWebp)
}
//gulp default task

exports.default = series(
    compilescss,
    minifyJs,
    imageOptimizer,
    imageWebp,
    browserSyncServe,
    watchTask,

)