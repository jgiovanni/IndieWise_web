var gulp = require('gulp');
// var glob = require('glob');
var elixir = require('laravel-elixir');
// var templateCache = require('gulp-angular-templatecache');

// require("laravel-elixir-ng-templates");
require('laravel-elixir-ngtemplatecache');
/*elixir.extend('ngTemplates', function(source, output, options) {
    new elixir.Task('ngTemplates', function() {
        return gulp.src(source)
            .pipe(templateCache(options))
            .pipe(gulp.dest(output));
    }).watch(source).ignore(output);
});*/

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {

    mix.ngTemplateCache('/**/**/**/*.html', 'public/js', 'resources/assets/app', {
        templateCache: {
            standalone: true
        },
        htmlmin: {
            caseSensitive: true,
            // collapseInlineTagWhitespace: true,
            collapseWhitespace: true,
            removeComments: true
        }
    });
    mix.styles([
        'custom.css',
        '../../../node_modules/slippry/dist/slippry.css',
        '../../../node_modules/videojs-sublime-skin/dist/videojs-sublime-skin.css',
        '../../../node_modules/videojs-airplay/dist/videojs.airplay.css',
        '../../../node_modules/videojs-resolution-switcher/lib/videojs-resolution-switcher.css',
        '../../../node_modules/videojs-chromecast/dist/videojs-chromecast.css',
        '../../../node_modules/videojs-suggestedvideoendcap/videojs.suggestedVideoEndcap.css',
        '../../../node_modules/videojs-socialshare/videojs.socialShare.css',
    ]);
    mix.sass('app.scss');
    // complie js
    mix.combine('main.js');
    // mix.browserify('angular.js');

    mix.browserify([
        'app.js',

        //Services
        'services.js',
        '../app/services/authService.service.js',
        '../app/services/dataService.service.js',
        '../app/services/socket.service.js',
        '../app/services/userActions.service.js',

        // Old Files
        'controllers.js',
        'directives.js',
        'utils.js',

        //// Modularity
        '../app/templates/home/home.js',
        '../app/templates/browse/browse.js',
        '../app/templates/latest/latest.js',
        '../app/templates/winners/winners.js',

        //// Components
        // Common
        '../app/common/project-card.js',

        // Home
        '../app/home/home-projects-list.js',

        // Comments
        '../app/comments/comments.js',
        '../app/comments/comment.js',
        '../app/comments/replies.js',
        '../app/comments/reply.js',
        '../app/comments/quick-reply.js',

        // Critiques
        '../app/critiques/critiques.js',
        '../app/critiques/critique.js',
        // '../app/critiques/critique-view.js',
        // '../app/critiques/critiques.js',

        //Directives

    ]);

    // Versioning
    mix.version(["css/app.css", "css/all.css", "js/main.js", "js/angular.js", "js/templates.js", "js/app.js", "js/bundle.js"]);
});
