const gulp = require('gulp');
const {browserSync} = require('./gulp-tasks/common');
const requireDir = require('require-dir');

requireDir('./gulp-tasks');


// Production build
// gulp.task('default', ['clean', 'apply-prod-environment', 'vendor', 'javascript', 'sass']);


// Production build
gulp.task('default', ['clean', 'apply-prod-environment', 'vendor', 'javascript', 'sass', 'images', 'fonts', 'icons']);


// Development build
gulp.task('dev', ['clean', 'vendor', 'javascript', 'sass', 'images', 'fonts', 'icons']);


// Development server
gulp.task('live', ['clean', 'vendor', 'javascript', 'sass'], () => {
    gulp.start('watch');
});


// Server for templates
gulp.task('html', ['html-server']);


/*
** Auxiliary tasks
*/
gulp.task('watch', ['browser-sync'], () => {
    gulp.watch('source/styles/**/*.scss', ['sass']);
    gulp.watch('source/js/**/*.js', ['browser-reload']);
    gulp.watch('source/local/static/*.html', browserSync.reload);
});


gulp.task('browser-reload', ['javascript'], browserSync.reload);