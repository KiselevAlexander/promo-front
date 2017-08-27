const gulp = require('gulp');
const modRewrite = require('connect-modrewrite');
const {browserSync} = require('./common');


// Local Server
gulp.task('browser-sync', () => {
    browserSync({
        server: {
            baseDir: './public',

            middleware: [
                modRewrite([
                    '!^/js|css|img|icons|static|locales/ /index.html [L]'
                ])
            ]
        },
        notify: false
    });
});


// Local server for templates
gulp.task('html-server', ['sass'], () => {
    browserSync.init({
        server: {
            baseDir: './'
        },
        notify: false
    });

    gulp.watch('source/styles/**/*.scss', ['sass']);
    gulp.watch('source/templates/*.html').on('change', browserSync.reload);
});
