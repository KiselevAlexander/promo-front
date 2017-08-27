const gulp = require('gulp');
const clean = require('gulp-clean');
const browserSync = require('browser-sync');
const eslint = require('gulp-eslint');

// Static paths
const publicDir = 'public/static/';
const distJS = publicDir + 'js/';
const distCSS = publicDir + 'css/';
const distImgs = publicDir + 'img/';
const distFonts = publicDir + 'fonts/';
const distIcons = publicDir + 'icons/';


// Clean JS and CSS Directories
gulp.task('clean', () => gulp
    .src([distJS, distCSS], {read: false})
    .pipe(clean()).on('error', (e) => console.error(e)));


// Set NODE_ENV to production
gulp.task('apply-prod-environment', () => {
    process.stdout.write('Setting NODE_ENV to \'production\'\n');
    process.env.NODE_ENV = 'production';

    if (process.env.NODE_ENV !== 'production') {
        throw new Error('Failed to set NODE_ENV to production');
    } else {
        process.stdout.write('Successfully set NODE_ENV to production\n');
    }
});


// ESLint task
gulp.task('lint', () => gulp
    .src(['source/js/**/*.js', '!node_modules/**'])
    .pipe(eslint())
    .pipe(eslint.formatEach('compact', process.stderr)));


module.exports = {distJS, distCSS, distImgs, distFonts, distIcons, browserSync};
