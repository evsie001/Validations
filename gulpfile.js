var gulp = require('gulp'),
    jasmine = require('gulp-jasmine');

var paths = {
    source: './src/*.js',
    tests: './spec/*_spec.js'
};

gulp.task('tests', function () {
    return gulp.src(paths.tests)
        .pipe(jasmine());
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['tests']);
