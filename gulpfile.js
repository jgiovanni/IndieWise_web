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
    mix.combine('resources/assets/js/main.js');
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

        //// Components
        // Common
        '../app/common/project-card.js',
        '../app/common/help-info.js',
        '../app/common/broadstreet-zone.js',
        '../app/common/static-sidebar.js',

        // Home
        '../app/home/home.js',
        '../app/home/home-projects-list.js',
        '../app/home/layer-slider.js',
        '../app/home/premium-carousel.js',

        // Browse
        '../app/browse/browse.js',
        '../app/browse/watching-carousel.js',

        // Latest
        '../app/latest/latest.js',

        // Winners
        '../app/winners/winners.js',

        // Profile
        '../app/profile/profile.js',
        '../app/profile/profile-about.js',
        // '../app/profile/profile-admin.js',
        '../app/profile/profile-awards.js',
        '../app/profile/profile-critiques.js',
        '../app/profile/profile-playlists.js',
        '../app/profile/profile-reactions.js',
        '../app/profile/profile-settings.js',
        '../app/profile/profile-upload.js',
        '../app/profile/profile-videos.js',
        '../app/profile/profile-videos-edit.js',

        // User
        '../app/user/user.js',
        '../app/user/user-about.js',
        '../app/user/user-awards.js',
        '../app/user/user-critiques.js',
        '../app/user/user-reactions.js',
        '../app/user/user-videos.js',

        // Comments
        '../app/comments/comments.js',
        '../app/comments/comment.js',
        '../app/comments/replies.js',
        '../app/comments/reply.js',
        '../app/comments/quick-reply.js',

        // Critiques
        '../app/critiques/critiques.js',
        '../app/critiques/critique-item.js',
        // '../app/critiques/critique-view.js',
        // '../app/critiques/critiques.js',

        // Projects
        '../app/projects/project.js',
        '../app/projects/project-awards.js',
        '../app/projects/project-playlists.js',
        '../app/projects/project-reactions.js',
        '../app/projects/project-stats-actions.js',
        '../app/projects/script-viewer.js',
        '../app/projects/video-player.js',

        //Directives

    ]);

    // Versioning
    mix.version(["css/app.css", "css/all.css", "js/main.js", "js/angular.js", "js/templates.js", "js/bundle.js"]);
});
