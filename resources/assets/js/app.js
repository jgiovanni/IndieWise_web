function loadScript(url, callback) {

    var script = document.createElement('script');
    script.type = 'text/javascript';

    script.onload = function () {
        callback();
    };
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

/*if (window.chrome && window.chrome.cookies) {
    loadScript('/pushwoosh-web-pushes-http-sdk.js?pw_application_code=73409-786EB', function () {
    })
} else {
    loadScript('/pushwoosh-web-notifications.js', function () {
    })
}*/


// jQuery.noConflict();
jQuery(document).foundation();
jQuery(document).ready(function (jQuery) {
    'use strict';
    //back to top
    var backtotop = '#back-to-top';
    if (jQuery(backtotop).length) {
        var scrollTrigger = 100, // px
            backToTop = function () {
                var scrollTop = jQuery(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    jQuery(backtotop).addClass('show');
                } else {
                    jQuery(backtotop).removeClass('show');
                }
            };
        backToTop();
        jQuery(window).on('scroll', function () {
            backToTop();
        });
        jQuery('#back-to-top').on('click', function (e) {
            e.preventDefault();
            jQuery('html,body').animate({
                scrollTop: 0
            }, 700);
        });
    }
    
    //register form
    jQuery('div.social-login').mouseenter(function () {
        jQuery('i.arrow-left').addClass('active');
    }).mouseleave(function () {
        jQuery('i.arrow-left').removeClass('active');
    });
    jQuery('div.register-form').mouseenter(function () {
        jQuery('i.arrow-right').addClass('active');
    }).mouseleave(function () {
        jQuery('i.arrow-right').removeClass('active');
    });

    //vertical thumb slider
    var thumb = jQuery('.thumb-slider .thumbs').find('.ver-thumbnail');
    jQuery(thumb).on('click', function () {
        var id = jQuery(this).attr('id');
        //alert(id);
        jQuery('.image').eq(0).show();
        jQuery('.image').hide();
        jQuery('.image').hide();
        jQuery('.' + id).fadeIn();
    });
    var $par = jQuery('.thumb-slider .thumbs .thumbnails').scrollTop(0);
    jQuery('.thumb-slider .thumbs a').click(function (e) {
        e.preventDefault();                      // Prevent defautl Anchors behavior
        var n = jQuery(this).hasClass('down') ? '+=200' : '-=200'; // Direction
        $par.animate({scrollTop: n});
    });
});
(function () {
    'use strict';
    angular.module('underscore', [])
        .factory('_', function () {
            return window.___; // assumes underscore has already been loaded on the page
        });

    angular
        .module('IndieWise', [
            'templates',
            'ngIntercom',
            'ngMaterial',
            'ngSanitize',
            'ngCookies',
            'mm.foundation',
            'angucomplete-alt',
            'ngMessages',
            'ngResource',
            'ngWebSocket',
            'angular-cloudinary',
            'underscore',
            'angularMoment',
            'videosharing-embed',
            'angular-loading-bar',
            'LocalForageModule',
            'ui.router',
            'angular-google-analytics',
            'angular-iscroll',
            'ui.scroll',
            'ui.scroll.jqlite',
            'ngFileUpload',
            'satellizer',
            'angular-filepicker',
            'pascalprecht.translate',
            '720kb.socialshare',
            'ngAnimate-animate.css',
            'vjs.video',

            // Videogular
            // 'com.2fdevs.videogular',
            // 'com.2fdevs.videogular.plugins.controls',
            // 'com.2fdevs.videogular.plugins.overlayplay',
            // 'com.2fdevs.videogular.plugins.poster',
            // 'com.2fdevs.videogular.plugins.buffering',
            // 'info.vietnamcode.nampnq.videogular.plugins.youtube',
            // 'videogular.plugins.texttrack',
            // 'videogular.plugins.vimeo',
            // 'th.co.softever.videogular.plugins.quality',


            'IndieWise.controllers',
            'IndieWise.services',
            'IndieWise.directives',
            'IndieWise.filters',
            'IndieWise.utilities',

            // Modularity
            'IndieWise.winners'
        ])
        .constant('moment', window.momentTimeZone)
        .constant('angularMomentConfig', { timezone: 'UTC' })
        .constant('API', window.API || '/api/')
        .constant('BASE', window.BASE || BASE + 'public/')
        .constant('INTERCOM_APPID', 'ppp65byn')
        .config(['$authProvider', function ($authProvider) {
            $authProvider.loginUrl = '/api/login';
            $authProvider.signupUrl = '/api/register';

            $authProvider.facebook({
                clientId: '150687055270744',
                url: '/auth/facebook',
                redirectUri: window.location.origin + '/auth/facebook'
            });

            $authProvider.google({
                clientId: '322274582930-4m1dueb708gvdic28n12e5dhqq121a6b.apps.googleusercontent.com',
                url: '/auth/google'
            });

            $authProvider.twitter({
                clientId: 'nnSvvHd86gBpxPwJaLGvzM2Mm',
                url: '/auth/twitter'
            });
        }])
        .config(['$intercomProvider', 'INTERCOM_APPID', function($intercomProvider, INTERCOM_APPID) {
            // Either include your app_id here or later on boot
            $intercomProvider
                .appID(INTERCOM_APPID);

            // you can include the Intercom's script yourself or use the built in async loading feature
            $intercomProvider
                .asyncLoading(true)
        }])
        /*.config(['flowFactoryProvider', function (flowFactoryProvider) {
            flowFactoryProvider.defaults = {
                //target: 'utils/upload.php',
                query: {
                    upload_preset: 'r0kuyqef'
                },
                target: 'https://api.cloudinary.com/v1_1/indiewise/upload',
                permanentErrors: [404, 500, 501],
                maxChunkRetries: 1,
                chunkRetryInterval: 5000,
                simultaneousUploads: 1,
                singleFile: true
            };
            /!*flowFactoryProvider.on('catchAll', function (event) {
             console.log('catchAll', arguments);
             })*!/
        }])*/
        .config(['filepickerProvider', function (filepickerProvider) {
            filepickerProvider.setKey('APbjTx44SlSuCI6P58jwvz');
        }])
        .config(['cloudinaryProvider', function (cloudinaryProvider) {
            cloudinaryProvider.config({
                upload_endpoint: 'https://api.cloudinary.com/v1_1/', // default
                cloud_name: 'indiewise', // required
                upload_preset: 'r0kuyqef', // optional
            });

            /*cloudinaryProvider
                .set('cloud_name', 'indiewise')
                .set('upload_preset', 'r0kuyqef');*/
        }])
        .config(['$compileProvider', function ($compileProvider) {
            // significant performance boost
            $compileProvider.debugInfoEnabled(false);
        }])
        .config(['AnalyticsProvider', function (AnalyticsProvider) {
            // Add configuration code as desired - see below
            AnalyticsProvider
                .setAccount('UA-27155404-17')
                // Remove prefix on launch
                // .trackPrefix('alpha')
                ;
        }])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
        }])
        .factory('authInterceptor', ['$q', '$injector', '$location', 'API', function ($q, $injector, $location, API) {
            function retryHttpRequest(config, deferred){
                function successCallback(response){
                    deferred.resolve(response);
                }
                function errorCallback(response){
                    deferred.reject(response);
                }
                var $http = $injector.get('$http');
                $http(config).then(successCallback, errorCallback);
            }

            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    return config;
                },
                'response': function (response) {
                    // only contains 'content-type' and 'cache-control'
                    // console.log(response.headers());
                    return response;
                },
                'responseError': function (response) {

                    if (response.status === 401 || response.status === 403) {
                        //$location.path('/sign-in');
                    } else if (response.status == 500 && response.config.url.indexOf('http') === -1 && response.config.url.indexOf('/api') > -1) {
                        var deferred = $q.defer();
                        //retryHttpRequest(response.config, deferred);
                        return deferred.promise;
                    }

                    return response;
                }
            };
        }])

        .config(['$mdThemingProvider', '$mdIconProvider', 'BASE', function ($mdThemingProvider, $mdIconProvider, BASE) {
            $mdThemingProvider.theme('default')
                .primaryPalette('grey')
                .accentPalette('indigo');

            // Emoticons
            $mdIconProvider
                .icon('emotion', BASE + 'assets/svg/emotion.svg', 120)
                .icon('angry', BASE + 'assets/svg/emoticons/angry.svg', 120)
                .icon('annoyed', BASE + 'assets/svg/emoticons/annoyed.svg', 120)
                .icon('big-smile', BASE + 'assets/svg/emoticons/big-smile.svg', 120)
                .icon('bored', BASE + 'assets/svg/emoticons/bored.svg', 120)
                .icon('confused', BASE + 'assets/svg/emoticons/confused.svg', 120)
                .icon('crying', BASE + 'assets/svg/emoticons/crying.svg', 120)
                .icon('disappointed', BASE + 'assets/svg/emoticons/disappointed.svg', 120)
                .icon('emotional', BASE + 'assets/svg/emoticons/emotional.svg', 120)
                .icon('grinning', BASE + 'assets/svg/emoticons/grinning.svg', 120)
                .icon('happy', BASE + 'assets/svg/emoticons/happy.svg', 120)
                .icon('hehe', BASE + 'assets/svg/emoticons/hehe.svg', 120)
                .icon('hopeful', BASE + 'assets/svg/emoticons/hopeful.svg', 120)
                .icon('interested', BASE + 'assets/svg/emoticons/interested.svg', 120)
                .icon('joking', BASE + 'assets/svg/emoticons/joking.svg', 120)
                .icon('kiss', BASE + 'assets/svg/emoticons/kiss.svg', 120)
                .icon('love', BASE + 'assets/svg/emoticons/love.svg', 120)
                .icon('mad', BASE + 'assets/svg/emoticons/mad.svg', 120)
                .icon('meh', BASE + 'assets/svg/emoticons/meh.svg', 120)
                .icon('mute', BASE + 'assets/svg/emoticons/mute.svg', 120)
                .icon('nerdy', BASE + 'assets/svg/emoticons/nerdy.svg', 120)
                .icon('neutral', BASE + 'assets/svg/emoticons/neutral.svg', 120)
                .icon('ninja', BASE + 'assets/svg/emoticons/ninja.svg', 120)
                .icon('nostalgic', BASE + 'assets/svg/emoticons/nostalgic.svg', 120)
                .icon('oh-really', BASE + 'assets/svg/emoticons/oh-really.svg', 120)
                .icon('sad', BASE + 'assets/svg/emoticons/sad.svg', 120)
                .icon('sad-tear', BASE + 'assets/svg/emoticons/sad-tear.svg', 120)
                .icon('sarcastic', BASE + 'assets/svg/emoticons/sarcastic.svg', 120)
                .icon('sexy', BASE + 'assets/svg/emoticons/sexy.svg', 120)
                .icon('shocked', BASE + 'assets/svg/emoticons/shocked.svg', 120)
                .icon('silent', BASE + 'assets/svg/emoticons/silent.svg', 120)
                .icon('silly', BASE + 'assets/svg/emoticons/silly.svg', 120)
                .icon('smile', BASE + 'assets/svg/emoticons/smile.svg', 120)
                .icon('sympathetic', BASE + 'assets/svg/emoticons/sympathetic.svg', 120)
                .icon('wink', BASE + 'assets/svg/emoticons/wink.svg', 120)
                .icon('woah', BASE + 'assets/svg/emoticons/woah.svg', 120)

                // Other
                .icon('matureSmall', BASE + 'assets/svg/OFLC_small_M.svg', 120)
                .icon('matureSmall', BASE + 'assets/svg/OFLC_small_M.svg', 120)
                .icon('trophy', BASE + 'assets/svg/trophy.svg', 120)
                .icon('matureLarge', BASE + 'assets/svg/OFLC_large_M.svg', 120);
        }])
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', 'BASE', function ($stateProvider, $urlRouterProvider, $locationProvider, BASE) {

            $urlRouterProvider.when('', '/home');
            $urlRouterProvider.when('/', '/home');
            $stateProvider
                .state('home', {
                    url: '/home',
                    authenticate: false,
                    templateUrl: 'home/view/index.html',
                    controller: 'HomeCtrl as Home'
                })
                .state('browse', {
                    url: '/browse?q&sort&types&genres',
                    authenticate: false,
                    templateUrl: 'browse/view/index.html',
                    controller: 'BrowseCtrl as Browse'
                })
                .state('latest', {
                    url: '/latest',
                    authenticate: false,
                    templateUrl: 'latest/view/index.html',
                    controller: 'LatestCtrl as LC'
                })
                .state('winners', {
                    url: '/winners',
                    authenticate: false,
                    templateUrl: 'winners/index.html',
                    controller: 'WinnersCtrl as WC'
                })
                .state('video_critique', {
                    url: '/{video_url_id}/critique/{url_id}',
                    authenticate: false,
                    templateUrl: 'common/critique.html',
                    controller: 'VideoCritiqueCtrl as VCC',
                    resolve: {
                        Critique: ['$stateParams', 'DataService', function ($stateParams, DataService) {
                            return DataService.item('critiques', $stateParams.url_id, 'project.owner').then(function (result) {
                                return result;
                            });
                        }]
                    }
                })
                .state('video_critique-edit', {
                    url: '/{video_url_id}/critique/{url_id}/edit',
                    authenticate: true,
                    templateUrl: 'common/critique-edit.html',
                    controller: 'VideoCritiqueEditCtrl',
                    resolve: {
                        Critique: ['AuthService', '$stateParams', 'DataService', function (AuthService, $stateParams, DataService) {
                            return DataService.item('critiques', $stateParams.url_id, 'project.owner').then(function (result) {
                                return (AuthService.isAuthenticated() && result.data.data.user_id === AuthService.currentUser.id) ? result : 'Not Owner';
                            });
                        }]
                    }
                })
                // Authenticated Pages
                .state('user', {
                    url: '/user/{url_id}',
                    authenticate: true,
                    abstract: true,
                    templateUrl: 'auth/user.html',
                    controller: 'UserCtrl as UserC',
                    resolve: {
                        User: ['$stateParams', 'DataService', function ($stateParams, DataService) {
                            return DataService.item('users', $stateParams.url_id).then(function (result) {
                                return result.data.data;
                            });
                        }],
                        UserStats: ['User', 'DataService', function (User, DataService) {
                            return DataService.item('users/countUserStats', User.id).then(function (response) {
                                return response.data;
                            });
                        }]
                    }
                })
                .state('user.about', {
                    url: '/about',
                    templateUrl: 'auth/user-about.html',
                    controller: 'UserAboutController as UserAboutCtrl'
                })
                .state('user.videos', {
                    url: '/videos',
                    templateUrl: 'auth/user-videos.html',
                    controller: 'UserVideosController as UserVideosCtrl',
                    resolve: {
                        Videos: ['User', 'DataService', '$q', function (User, DataService, $q) {
                            return DataService.collection('projects', {
                                owner: User.id,
                                sort: 'created_at',
                                per_page: 50
                            })
                                .then(function (result) {
                                    return result;
                                });
                        }]
                    }
                })
                .state('user.critiques', {
                    url: '/critiques',
                    templateUrl: 'auth/user-critiques.html',
                    controller: 'UserCritiquesController as UserCritiquesCtrl',
                    resolve: {
                        Critiques: ['User', 'DataService', function (User, DataService) {
                            return DataService.collection('critiques', {user: User.id, include: 'project'})
                                .then(function (result) {
                                    return result;
                                });
                        }],
                        Critiqued: ['User', 'DataService', function (User, DataService) {
                            return DataService.collection('critiques', {notUser: User.id, include: 'project'})
                                .then(function (result) {
                                    return result;
                                });
                        }]
                    }
                })
                .state('user.reactions', {
                    url: '/reactions',
                    templateUrl: 'auth/user-reactions.html',
                    controller: 'UserReactionsController as UserReactionsCtrl',
                    resolve: {
                        Reactions: ['User', 'DataService', function (User, DataService) {
                            return DataService.collection('reactions', {user: User.id, include: 'user,project'})
                                .then(function (result) {
                                    return result;
                                });
                        }],
                        Reacted: ['User', 'DataService', function (User, DataService) {
                            return DataService.collection('reactions', {notUser: User.id, include: 'user,project'})
                                .then(function (result) {
                                    return result;
                                });
                        }]
                    }
                })
                .state('user.awards', {
                    url: '/awards',
                    templateUrl: 'auth/user-awards.html',
                    controller: 'UserAwardsController as UserAwardsCtrl',
                    resolve: {
                        Awards: ['User', 'DataService', function (User, DataService) {
                            return DataService.collection('wins', {user: User.id}).then(function (result) {
                                return result;
                            });
                        }],
                        Nominations: ['User', 'DataService', function (User, DataService) {
                            return DataService.collection('nominations', {
                                user: User.id,
                                include: 'user,project,award'
                            })
                                .then(function (result) {
                                    return result;
                                });
                        }],
                        Nominated: ['User', 'DataService', function (User, DataService) {
                            return DataService.collection('nominations', {
                                notUser: User.id,
                                include: 'user,project,award'
                            })
                                .then(function (result) {
                                    return result;
                                });
                        }]
                    }
                })
                .state('profile', {
                    url: '/profile',
                    authenticate: true,
                    abstract: true,
                    templateUrl: 'auth/profile.html',
                    controller: 'ProfileCtrl as Profile',
                    resolve: {
                        User: ['AuthService', 'DataService', function (AuthService, DataService) {
                            return DataService.item('users', AuthService.currentUser.id, { include: 'genres' }).then(function (response) {
                                return response.data.data;
                            });
                            /*return AuthService.getCurrentUser().then(function (response) {
                                return response;
                            });*/
                        }],
                        UserStats: ['AuthService', 'DataService', function (AuthService, DataService) {
                            return DataService.collection('users/countUserStats').then(function (response) {
                                return response.data;
                            });
                        }]
                    }
                })
                .state('profile.about', {
                    url: '/about',
                    authenticate: true,
                    templateUrl: 'auth/profile-about.html',
                    controller: 'ProfileAboutController as ProfileAboutCtrl'
                })
                .state('profile.upload', {
                    url: '/upload',
                    authenticate: true,
                    templateUrl: 'auth/profile-upload.html',
                    controller: 'ProfileUploadController as UC',
                    resolve: {
                        Access: ['$rootScope', 'DataService', 'AuthService', '$q', function ($rootScope, DataService, AuthService, $q) {
                            var deferred = $q.defer();
                            if ($rootScope.isNotVerified()) {
                                $rootScope.toastAction('Please verify your account so you can upload videos! Check your spam folder too.', 'Verify Now', $rootScope.requestVerificationEmail);
                                deferred.reject(false);
                            } else {
                                DataService.collection('projects/limit').then(function (response) {
                                    if (response.data.status) {
                                        deferred.resolve(true);
                                    } else {
                                        $rootScope.toastMessage('Your upload limit of 3 has been reached');
                                        deferred.reject(false);
                                    }
                                });
                            }
                            return deferred.promise;
                        }]
                    }
                })
                .state('profile.videos', {
                    url: '/videos',
                    authenticate: true,
                    templateUrl: 'auth/profile-videos.html',
                    controller: 'ProfileVideosController as ProfileVideosCtrl',
                    resolve: {
                        Videos: ['AuthService', 'DataService', function (AuthService, DataService) {
                            return DataService.collection('projects', {
                                owner: AuthService.currentUser.id,
                                sort: 'created_at',
                                per_page: 50
                            })
                                .then(function (result) {
                                    return result;
                                });
                        }]
                    }
                })
                .state('profile.videos-edit', {
                    url: '/videos/{url_id}/edit',
                    authenticate: true,
                    templateUrl: 'auth/profile-videos-edit.html',
                    controller: 'ProfileVideoEditCtrl as VEC',
                    resolve: {
                        Project: ['AuthService', '$stateParams', 'DataService', function (AuthService, $stateParams, DataService) {
                            return DataService.item('projects', $stateParams.url_id).then(function (result) {
                                return result;
                            });
                        }]
                    }
                })
                .state('profile.critiques', {
                    url: '/critiques',
                    authenticate: true,
                    templateUrl: 'auth/profile-critiques.html',
                    controller: 'ProfileCritiquesController as ProfileCritiquesCtrl',
                    resolve: {
                        Critiques: ['AuthService', 'DataService', function (AuthService, DataService) {
                            return DataService.collection('critiques', {user: AuthService.currentUser.id})
                                .then(function (result) {
                                    return result;
                                });
                        }],
                        Critiqued: ['AuthService', 'DataService', function (AuthService, DataService) {
                            return DataService.collection('critiques', {notUser: AuthService.currentUser.id})
                                .then(function (result) {
                                    return result;
                                });
                        }]
                    }
                })
                .state('profile.reactions', {
                    url: '/reactions',
                    authenticate: true,
                    templateUrl: 'auth/profile-reactions.html',
                    controller: 'ProfileReactionsController as ProfileReactionsCtrl',
                    resolve: {
                        Reactions: ['AuthService', 'DataService', function (AuthService, DataService) {
                            return DataService.collection('reactions', {
                                user: AuthService.currentUser.id,
                                include: 'user,project'
                            })
                                .then(function (result) {
                                    return result;
                                });
                        }],
                        Reacted: ['AuthService', 'DataService', function (AuthService, DataService) {
                            return DataService.collection('reactions', {
                                notUser: AuthService.currentUser.id,
                                include: 'user,project'
                            })
                                .then(function (result) {
                                    return result;
                                });
                        }]
                    }
                })
                .state('profile.awards', {
                    url: '/awards',
                    authenticate: true,
                    templateUrl: 'auth/profile-awards.html',
                    controller: 'ProfileAwardsController as ProfileAwardsCtrl',
                    resolve: {
                        Awards: ['AuthService', 'DataService', function (AuthService, DataService) {
                            return DataService.collection('wins', {user: AuthService.currentUser.id}).then(function (result) {
                                return result;
                            });
                        }],
                        Nominations: ['AuthService', 'DataService', function (AuthService, DataService) {
                            return DataService.collection('nominations', {
                                user: AuthService.currentUser.id,
                                include: 'user,project,award'
                            })
                                .then(function (result) {
                                    return result;
                                });
                        }],
                        Nominated: ['AuthService', 'DataService', function (AuthService, DataService) {
                            return DataService.collection('nominations', {
                                notUser: AuthService.currentUser.id,
                                include: 'user,project,award'
                            })
                                .then(function (result) {
                                    return result;
                                });
                        }]
                    }
                })
                .state('profile.playlists', {
                    url: '/playlists',
                    authenticate: true,
                    templateUrl: 'auth/profile-playlists.html',
                    controller: 'ProfilePlaylistsController as ProfilePlaylistsCtrl',
                    resolve: {
                        Playlists: ['AuthService', 'DataService', function (AuthService, DataService) {
                            return DataService.collection('playlists').then(function (result) {
                                return result;
                            });
                        }]
                    }
                })
                .state('profile.settings', {
                    url: '/settings',
                    authenticate: true,
                    templateUrl: 'auth/profile-settings.html',
                    controller: 'ProfileSettingsController as PSC',
                    resolve: {
                        Genres: ['AuthService', 'DataService', '$q', function (AuthService, DataService, $q) {
                            return DataService.collection('genres', [],
                                [{fieldName: 'user', operator: 'in', value: AuthService.currentUser.id}],
                                20, false, false, 1).then(function (result) {
                                return result;
                            });
                        }],
                        UserTypes: ['AuthService', 'DataService', '$q', function (AuthService, DataService, $q) {
                            return DataService.collection('types', [],
                                [{fieldName: 'user', operator: 'in', value: AuthService.currentUser.id}],
                                20, false, false, 1).then(function (result) {
                                return result;
                            });
                        }]
                    }
                })
                .state('messages', {
                    url: '/messages',
                    authenticate: true,
                    templateUrl: 'auth/messages.html',
                    controller: 'MessagesCtrl as Msgs',
                    resolve: {
                        Conversations: ['AuthService', 'DataService', '$q', function (AuthService, DataService, $q) {
                            return DataService.collection('messages').then(function (result) {
                                return result;
                            });
                        }]
                    }
                })
                .state('messages.message', {
                    authenticate: true,
                    templateUrl: 'auth/messages.html',
                    controller: 'MessagesCtrl as Msgs'
                })
                /*.state('notifications', {
                 url: '/notifications',
                 authenticate: true,
                 templateUrl: 'auth/notifications.html',
                 controller: 'NotificationsCtrl as NC'
                 })*/

                // Auth Pages
                .state('register', {
                    url: '/register',
                    authenticate: false,
                    templateUrl: 'auth/register.html',
                    controller: 'RegisterCtrl as RC'
                })
                .state('forum_register', {
                    url: '/community/register?redirect',
                    authenticate: false,
                    templateUrl: 'auth/register.html',
                    controller: 'RegisterCtrl as RC'
                })
                .state('sign_in', {
                    url: '/sign-in?redirect',
                    authenticate: false,
                    templateUrl: 'auth/sign-in.html',
                    controller: 'SignInCtrl as SIC'
                })
                .state('forum_sign_in', {
                    url: '/community/sign-in?redirect',
                    authenticate: false,
                    templateUrl: 'auth/sign-in.html',
                    controller: 'SignInCtrl as SIC'
                })
                .state('reset_password', {
                    url: '/reset-password?email&token',
                    authenticate: false,
                    templateUrl: 'auth/reset-password.html',
                    controller: 'ForgotPasswordCtrl as FPC'
                })

                // Static Pages
                .state('about', {
                    url: '/about',
                    authenticate: false,
                    templateUrl: 'static/about.html'
                })
                .state('faq', {
                    url: '/faq',
                    authenticate: false,
                    templateUrl: 'static/faq.html'
                })
                .state('contact', {
                    url: '/contact?email',
                    authenticate: false,
                    templateUrl: 'static/contact.html',
                    controller: 'ContactPageCtrl as CC'
                })
                .state('tos', {
                    url: '/terms-of-service',
                    authenticate: false,
                    templateUrl: 'static/tos.html'
                })
                .state('advertise', {
                    url: '/advertise',
                    authenticate: false,
                    templateUrl: 'static/advertise.html'
                })
                .state('privacy', {
                    url: '/privacy-policy',
                    authenticate: false,
                    templateUrl: 'static/privacy.html'
                })
                .state('404', {
                    url: '/404',
                    authenticate: false,
                    templateUrl: 'static/404.html'
                })

                // Video Pages
                .state('video', {
                    url: '/{url_id:[0-9a-zA-Z]{10,13}}',
                    authenticate: false,
                    templateUrl: 'common/video.html',
                    controller: 'VideoCtrl as VC',
                    resolve: {
                        Project: ['$stateParams', 'DataService', '$q', function ($stateParams, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.item('projects', $stateParams.url_id, '')
                                .then(function (result) {
                                    deferred.resolve(result.data.data);
                                })
                                .catch(function (response) {
                                    deferred.reject(response);
                                });

                            return deferred.promise;
                        }]
                    }
                })
            ;

            // $urlRouterProvider.otherwise('/404');
            $locationProvider.html5Mode({
                enabled: true,
                requireBase: false,
                rewriteLinks: false
            });

        }])
        .config(['$transitionsProvider', function($transitionsProvider) {
            $transitionsProvider.onError({}, function(transition) {
                // debugger;
                transition.promise.catch(function(error) {
                    // debugger;
                    console.error(error);
                });
            });
        }])
        .constant('StreamConfig', {
            streamApiKey: '97wfnrargt9f',
            streamApiSecret: '4t8dpp9bsap2svjhvu2n4x3h3bvwyyb3kgvg7san3bab2esu6vmnquffq2u95z82',
            streamApp: '6408'
        })
        .run(['$rootScope', '$state', '$stateParams', 'AuthService', 'UtilsService', 'DataService', '$http', '$timeout', '$transitions', 'StreamConfig', 'anchorSmoothScroll', 'amMoment', '$intercom', 'FacebookAngularPatch', 'socket',
            function ($rootScope, $state, $stateParams, AuthService, UtilsService, DataService, $http, $timeout, $transitions, StreamConfig, anchorSmoothScroll, amMoment, $intercom, FacebookAngularPatch, socket) {
                attachFastClick(document.body);
                $rootScope.AppData = {
                    User: AuthService.currentUser,
                    Notifications: {
                        loaded: 'indeterminate'
                    },
                    NotificationsFeed: {
                        loaded: 'indeterminate'
                    },
                    MessageNotifications: {
                        loaded: 'indeterminate'
                    },
                    searchText: ''
                };
                $rootScope.$state = window.thisState = $state;
                $rootScope.metadata = {
                    title: '',
                    description: '',
                    image: '',
                    url: ''
                };
                $rootScope.$stateParams = $stateParams;
                $rootScope.isViewLoading = false;
                $rootScope.today = moment().toDate();

                $rootScope.isAuthenticated = function () {
                    return AuthService.isAuthenticated();
                };

                $rootScope.isVerified = function () {
                    return AuthService.isVerified();
                };

                $rootScope.isNotVerified = function () {
                    var test = $rootScope.isVerified();
                    return !test;
                    // return AuthService.isNotVerified();
                };

                $rootScope.justVerified = function () {
                    var test = window.location.search.indexOf('verification_successful') !== -1;
                    if(test) {
                        $rootScope.toastMessage('Account Verification Successful!');
                    }
                    return test;
                };

                $rootScope.listenNotifications = function (username) {
                    $rootScope.refreshNotifications(username);
                };

                $rootScope.refreshNotifications = function (id) {
                    $rootScope.AppData.Notifications.loaded = 'indeterminate';
                    DataService.collection('getUserNotifications', {
                        username: id
                    }).then(function (res) {
                        console.log(res.data);
                        $rootScope.AppData.Notifications = {
                            loaded: '',
                            list: res.data,
                            unseen: _.where(res.data, { seen: false }).length,
                            unread: 0
                        };
                        console.log($rootScope.AppData.Notifications);
                    });
                };

                $rootScope.StreamClient = stream.connect(StreamConfig.streamApiKey, null, StreamConfig.streamApp, {location: 'us-east'});
                $rootScope.getNewToken = function (type, id) {
                    return $http.get('/api/notifications/token?type=' + type).then(function (res) {
                        return res.data.token;
                    });
                };

                $rootScope.getMessagesFeed = function (feed) {
                    feed.get({limit: 10}, function (error, response, body) {
                        console.log('Messages Notifications: ', body);
                        try {
                            //var data = UtilsService.enrichRawNotifications(body.results);
                            //console.log(data);
                            $rootScope.AppData.MessageNotifications = {
                                loaded: '',
                                list: body.results,
                                unseen: body.unseen,
                                unread: body.unread
                            };
                            console.log($rootScope.AppData.MessageNotifications);
                        } catch (e) {
                            console.log(e);
                        }
                    });
                };

                $rootScope.subscribeUserFeeds = function () {
                    $rootScope.getNewToken('notification', $rootScope.AppData.User.id).then(function (token) {
                        var feed = $rootScope.StreamClient.feed('notification', $rootScope.AppData.User.id, token);
                        feed.subscribe(function (obj) {
                            console.log('Notification: ', obj);
                            $rootScope.getNotificationsFeed(feed);
                        }).then(function () {
                            $rootScope.getNotificationsFeed(feed);
                        });
                    });
                    $rootScope.getNewToken('message', $rootScope.AppData.User.id).then(function (token) {
                        var feed = $rootScope.StreamClient.feed('message', $rootScope.AppData.User.id, token);
                        feed.subscribe(function (obj) {
                            console.log('Messages: ', obj);
                            $rootScope.getMessagesFeed(feed);
                        }).then(function () {
                            $rootScope.getMessagesFeed(feed);
                        });
                    });
                };

                $rootScope.getNotificationsFeed = function (feed) {
                    $http.get('/api/notifications/feed').then(function (res) {
                        console.log('Notification: ', res.data.activities);
                        $rootScope.AppData.Notifications = {
                            loaded: '',
                            list: res.data.activities,
                            unseen: res.data.unseen,
                            unread: res.data.unread
                        };
                    });
                    /*feed.get({limit: 10}, function (error, response, body) {
                        console.log('Notifications: ', body);
                        try {
                            var data = UtilsService.enrichRawNotifications(body.results);
                            console.log(data);
                            $rootScope.AppData.RawNotifications = {
                                loaded: '',
                                list: data.data,
                                unseen: body.unseen,
                                unread: body.unread
                            };
                        } catch (e) {
                            console.log(e);
                        }
                    });*/
                };

                $rootScope.getNewMessages = function () {
                    /*DataService.collection('messages/new').then(function (response) {
                        $rootScope.AppData.MessageNotifications.loaded = true;
                        $rootScope.AppData.MessageNotifications.unread = response.data.length;
                    });*/
                };

                // Register listeners to $intercom using '.$on()' rather than '.on()' to trigger a safe $apply on $rootScope
                $intercom.$on('show', function() {
                    $rootScope.intercomShowing = true; // currently Intercom onShow callback isn't working
                });
                $intercom.$on('hide', function() {
                    $rootScope.intercomShowing = false;
                });

                var endWatch = $rootScope.$watch('AppData.User', function (newValue, oldValue) {
                    if (newValue && angular.isString(newValue.id)) {
                        console.log('User Logged In');

                        // Intercom
                        newValue.name = newValue.fullName;
                        $intercom.boot(newValue);
                        // $intercom.show();

                        // Push Notifications
                        var OneSignal = window.OneSignal || [];
                        OneSignal.push(["init", {
                            appId: "9972c4b2-7bd1-47c0-a2f8-213b8c767cd8",
                            safari_web_id: 'web.onesignal.auto.3f58661c-f8ad-4946-a9b6-84125eec4421',
                            autoRegister: true,
                            notifyButton: {
                                enable: false /* Set to false to hide */
                            }
                        }]);

                        if (!newValue.push_id) {
                            OneSignal.getUserId().then(function(userId) {
                                // console.log("OneSignal User ID:", userId);
                                AuthService.updateUser({id: newValue.id, push_id: userId});
                                // DataService.update('users', newValue.id, { push_id: userId});
                                // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316
                            });
                        }

                        // initialize stream
                        $rootScope.subscribeUserFeeds();
                        //$rootScope.listenNotifications(newValue.username);

                        $rootScope.getNewMessages();
                        endWatch();
                    }
                });

                // loading animation
                $rootScope.setLoading = function () {
                    $rootScope.isViewLoading = true;
                };
                $rootScope.unsetLoading = function () {
                    $rootScope.isViewLoading = false;
                };

                // State transition hooks
                $transitions.onBefore({}, function ($transition$) {
                    $rootScope.setLoading();
                });

                $transitions.onStart({to: 'register', from: '*'}, function ($transition$) {
                    return AuthService.isAuthenticated() ? $state.target('home') : true;
                });
                $transitions.onStart({to: 'sign_in', from: '*'}, function ($transition$) {
                    return AuthService.isAuthenticated() ? $state.target('home') : true;
                });
                $transitions.onStart({to: 'reset_password', from: '*'}, function ($transition$) {
                    return AuthService.isAuthenticated() ? $state.target('home') : true;
                });
                $transitions.onStart({
                    to: function (state) {
                        return !!state.authenticate;
                    }
                }, function ($transition$) {
                    return AuthService.currentUser ? true : AuthService.getCurrentUser().then(function () {
                        return true;
                    }, function () {
                        return $state.target('sign_in');
                    });

                });

                $transitions.onSuccess({}, function () {
                    $rootScope.unsetLoading();
                    $timeout(function () {
                        jQuery(document).foundation();
                        // angular.element('body').scrollTop(0);
                        anchorSmoothScroll.scrollTo('body');
                    }, 100);
                    // Analytics.trackPage($location.path());
                });

                $transitions.onError({}, function ($transition$) {
                    // debugger;
                    console.log($state);
                });

                $state.defaultErrorHandler(function(err) {
                    // debugger;
                    // handle err
                });

                //search bar
                jQuery('.search.end').on('click', function () {
                    if (jQuery(this).children().hasClass('fa-search')) {
                        jQuery(this).children().removeClass('fa-search');
                        jQuery(this).children().addClass('fa-times');
                        $rootScope.$broadcast('overVideoPlayer', false);

                    } else {
                        jQuery(this).children().removeClass('fa-times');
                        jQuery(this).children().addClass('fa-search');
                        $rootScope.$broadcast('overVideoPlayer', true);
                    }
                    jQuery(this).toggleClass('search-active');
                    jQuery('#search-bar').slideToggle();

                });

            }
        ])
        .config(['$localForageProvider', function ($localForageProvider) {
            $localForageProvider.config({
                //driver: 'localStorageWrapper', // if you want to force a driver
                name: 'iw', // name of the database and prefix for your data, it is 'lf' by default
                version: 1.0, // version of the database, you shouldn't have to use this
                storeName: 'keyvaluepairs', // name of the table
                description: 'some description'
            });
        }])
        .config(['$sceDelegateProvider', function ($sceDelegateProvider) {
            $sceDelegateProvider.resourceUrlWhitelist([
                'self',
                'https://getindiewise.com/**',
                'https://www.getindiewise.com/**',
                new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')
            ]);
        }]);
})();
