const gulp = require('gulp');
const image = require('gulp-image');
const {distImgs, distFonts, distIcons} = require('./common');


// Production Copy and Optimize Images
gulp.task('images', () => gulp
    .src('source/images/**/*')
    .pipe(image({
        pngquant: true,
        optipng: false,
        zopflipng: false, // true,
        jpegRecompress: false,
        jpegoptim: true,
        mozjpeg: true,
        gifsicle: true,
        svgo: true,
        concurrent: 5
    }))
    .on('error', (e) => console.error('optimizeImages', e))
    .pipe(gulp.dest(distImgs))
    .on('error', (e) => console.error('copyImages', e)));


// Copy fonts
gulp.task('fonts', () => gulp
    .src('source/fonts/*')
    .pipe(gulp.dest(distFonts))
    .on('error', (e) => console.error('copyFonts', e)));


// Copy Icons
gulp.task('icons', () => gulp
    .src('source/icons/*')
    .pipe(gulp.dest(distIcons))
    .on('error', (e) => console.error('copyIcons', e)));
