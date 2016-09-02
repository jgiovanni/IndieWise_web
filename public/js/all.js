function loadScript(url, callback) {

    var script = document.createElement('script');
    script.type = 'text/javascript';

    script.onload = function () {
        callback();
    };
    script.src = url;
    document.getElementsByTagName('head')[0].appendChild(script);
}

if (window.chrome && window.chrome.cookies) {
    loadScript('/pushwoosh-web-pushes-http-sdk.js?pw_application_code=73409-786EB', function () {
    })
} else {
    loadScript('/pushwoosh-web-notifications.js', function () {
    })
}


jQuery.noConflict();
jQuery(document).foundation();
jQuery(document).ready(function (jQuery) {
    'use strict';
    //login register click
    jQuery('.loginReg').on('click', function (e) {
        e.preventDefault();
        jQuery(this).next().slideToggle();
        jQuery(this).toggleClass('active');
    });

    //search bar
    jQuery('.search.end').on('click', function () {
        if (jQuery(this).children().hasClass('fa-search')) {
            jQuery(this).children().removeClass('fa-search');
            jQuery(this).children().addClass('fa-times');
        } else {
            jQuery(this).children().removeClass('fa-times');
            jQuery(this).children().addClass('fa-search');
        }
        jQuery(this).toggleClass('search-active');
        jQuery('#search-bar').slideToggle();

    });

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
    })
        .mouseleave(function () {
            jQuery('i.arrow-left').removeClass('active');
        });
    jQuery('div.register-form').mouseenter(function () {
        jQuery('i.arrow-right').addClass('active');
    })
        .mouseleave(function () {
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
            'mm.foundation',
            'angucomplete-alt',
            'ngMessages',
            'ngResource',
            'angular-cloudinary',
            'underscore',
            'angularMoment',
            'videosharing-embed',
            'angular-loading-bar',
            'LocalForageModule',
            'ui.router',
            'angular-google-analytics',
            // 'flow',
            'ui.scroll',
            'ui.scroll.jqlite',
            'ngFileUpload',
            'satellizer',
            'angular-filepicker',
            'pascalprecht.translate',
            '720kb.socialshare',
            'ngAnimate-animate.css',
            'IndieWise.controllers',
            'IndieWise.services',
            'IndieWise.directives',
            'IndieWise.filters',
            'IndieWise.utilities'
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
                clientId: '150687055270744'
            });

            $authProvider.google({
                clientId: '322274582930-4m1dueb708gvdic28n12e5dhqq121a6b.apps.googleusercontent.com'
            });

            $authProvider.twitter({
                clientId: 'nnSvvHd86gBpxPwJaLGvzM2Mm'
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
                .icon('matureSmall', BASE + 'assets/svg/OFLC_small_M.svg', 120)
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
                        Verified: ['$rootScope', '$q', function ($rootScope, $q) {
                            var deferred = $q.defer();
                            if ($rootScope.isNotVerified()) {
                                $rootScope.toastAction('Please verify your account so you can upload videos! Check your spam folder too.', 'Verify Now', $rootScope.requestVerificationEmail());
                                deferred.reject(false);
                            } else {
                                deferred.resolve(true);
                            }
                            return deferred.promise;
                        }],
                        Max: ['$rootScope', 'DataService', 'AuthService', '$q', function ($rootScope, DataService, AuthService, $q) {
                            var deferred = $q.defer();
                            DataService.collection('projects/limit').then(function (response) {
                                if (response.data.status) {

                                    deferred.resolve(true);
                                } else {
                                    $rootScope.toastMessage('The upload limit of 3 has been reached');
                                    deferred.reject(false);
                                }
                            });
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
                .state('sign_in', {
                    url: '/sign-in',
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
                    url: '/{url_id:[0-9a-zA-Z]{1,13}}',
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

            $urlRouterProvider.otherwise('/404');
            $locationProvider.html5Mode(true);

        }])
        .config(['$transitionsProvider', function($transitionsProvider) {
            $transitionsProvider.onError({}, function(transition) {
                debugger;
                transition.promise.catch(function(error) {
                    debugger;
                    console.error(error);
                });
            });
        }])
        .constant('StreamConfig', {
            streamApiKey: '97wfnrargt9f',
            streamApiSecret: '4t8dpp9bsap2svjhvu2n4x3h3bvwyyb3kgvg7san3bab2esu6vmnquffq2u95z82',
            streamApp: '6408'
        })
        .run(['$rootScope', '$state', '$stateParams', 'AuthService', 'UtilsService', 'DataService', '$http', '$timeout', '$transitions', 'StreamConfig', 'anchorSmoothScroll', 'amMoment', '$intercom', 'socket',
            function ($rootScope, $state, $stateParams, AuthService, UtilsService, DataService, $http, $timeout, $transitions, StreamConfig, anchorSmoothScroll, amMoment, $intercom, socket) {
                attachFastClick(document.body);
                // set server timezone to UTC
                // moment.tz.setDefault("utc");
                // amMoment.changeTimezone('UTC');

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
                    return AuthService.isAuthenticated() && angular.isObject($rootScope.AppData.User) && $rootScope.AppData.User.verified === 1;
                };

                $rootScope.isNotVerified = function () {
                    return AuthService.isAuthenticated() && angular.isObject($rootScope.AppData.User) && $rootScope.AppData.User.verified === 0;
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

                        $intercom.boot(newValue);
                        // $intercom.show();
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
                    debugger;
                    console.log($state);
                });

                $state.defaultErrorHandler(function(err) {
                    debugger;
                    // handle err
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
                'http://getindiewise.com/**',
                'http://www.getindiewise.com/**',
                new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')
            ]);
        }]);
})();

(function () {
    'use strict';

    function mysql_real_escape_string(str) {
        return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
            switch (char) {
                case "\0":
                    return "\\0";
                case "\x08":
                    return "\\b";
                case "\x09":
                    return "\\t";
                case "\x1a":
                    return "\\z";
                case "\n":
                    return "\\n";
                case "\r":
                    return "\\r";
                case "\"":
                case "'":
                case "\\":
                case "%":
                    return "\\" + char; // prepends a backslash to backslash, percent,
                                        // and double/single quotes
            }
        });
    }

    angular.module('IndieWise.controllers', [])
    // Auth Controllers
        .controller('SignInCtrl', SignInCtrl)
        .controller('ForgotPasswordCtrl', ForgotPasswordCtrl)
        .controller('RegisterCtrl', RegisterCtrl)

        // Profile Controllers
        .controller('ProfileCtrl', ProfileCtrl)
        .controller('ProfileAboutController', UserAboutController)
        .controller('ProfilePlaylistsController', ProfilePlaylistsController)
        .controller('ProfileVideosController', UserVideosController)
        .controller('ProfileVideoEditCtrl', ProfileVideoEditCtrl)
        .controller('ProfileCritiquesController', UserCritiquesController)
        .controller('ProfileReactionsController', UserReactionsController)
        .controller('ProfileAwardsController', UserAwardsController)
        .controller('ProfileSettingsController', ProfileSettingsController)
        .controller('ProfileUploadController', ProfileUploadController)

        // User Controllers
        .controller('UserCtrl', UserCtrl)
        .controller('UserAboutController', UserAboutController)
        .controller('UserVideosController', UserVideosController)
        .controller('UserCritiquesController', UserCritiquesController)
        .controller('UserReactionsController', UserReactionsController)
        .controller('UserAwardsController', UserAwardsController)
        // .controller('EditProfileCtrl', EditProfileCtrl)
        .controller('MessagesCtrl', MessagesCtrl)
        .controller('NotificationsCtrl', NotificationsCtrl)

        // Other App Controllers
        .controller('BodyCtrl', BodyCtrl)
        .controller('HomeCtrl', HomeCtrl)
        .controller('BrowseCtrl', BrowseCtrl)
        .controller('LatestCtrl', LatestCtrl)
        // .controller('AdvancedResultsCtrl', AdvancedResultsCtrl)
        // .controller('ResultsCtrl', ResultsCtrl)
        .controller('VideoCtrl', VideoCtrl)
        .controller('VideoCritiqueCtrl', VideoCritiqueCtrl)
        .controller('VideoCritiqueEditCtrl', VideoCritiqueEditCtrl)
        .controller('ContactPageCtrl', ContactPageCtrl)

    ;

    RegisterCtrl.$inject = ['$rootScope', '$timeout', '$q', '$state', 'AuthService', 'DataService', 'anchorSmoothScroll', '_'];
    function RegisterCtrl($rootScope, $timeout, $q, $state, AuthService, DataService, anchorSmoothScroll, _) {
        $rootScope.metadata.title = 'Register';
        var self = this;
        self.creating = false;
        self.accountCreated = false;
        self.genresArr = [];
        self.typesArr = [];
        self.user = {
            email: '',
            password: '',
            passwordCheck: '',
            firstName: '',
            lastName: '',
            gender: '',
            // genres: [],
            // types: []
            //selected_genres: ''
        };

        self.dobDay = '';
        self.dobMonth = '';
        self.dobYear = '';
        self.authErrors = null;
        self.errors = {
            email: false,
            gender: false,
            genres: false,
            types: false
        };

        self.thisYear = moment().year();
        self.yearsList = [];
        for (var i = self.thisYear; i > (self.thisYear - 100); i--) {
            self.yearsList.push(i);
        }

        /*$rootScope.generateGenres().then(function (res) {
         $rootScope.genresList = self.genresList = res;
         });
         $rootScope.generateTypes().then(function (res) {
         $rootScope.typesList = self.typesList = res;
         });*/
        $rootScope.generateCountries().then(function (res) {
            $rootScope.countryList = self.countryList = res;
        });

        self.checkEmailUse = function () {
            if (angular.isString(self.user.email) && self.user.email.length) {
                DataService.collection('emailCheck', {email: mysql_real_escape_string(self.user.email)}).then(function (res) {
                    self.errors.email = res.data && res.data.verify === true ? 1 : 0;
                });
            } else self.errors.email = false;
        };

        self.doRegister = function () {
            if (!self.creating) {
                self.creating = true;
                self.errors.gender = !self.user.gender.length;

                if (self.errors.gender) {
                    anchorSmoothScroll.scrollTo('errors');
                    return false;
                }

                self.user.dob = moment().set({
                    'year': self.dobYear,
                    'month': parseInt(self.dobMonth) - 1,
                    'date': self.dobDay
                }).startOf('day').format('YYYY-MM-DD HH:mm:ss');
                AuthService.createUser(self.user).then(function (res) {
                    if (!res.status) {
                        self.authErrors = res.errors;
                        $rootScope.toastMessage('There is an error, please check your form');
                        // console.log('Failed', res);
                    } else {
                        // console.log('Success', res);
                        //window.location.reload();
                        $rootScope.toastMessage('Account created!');
                    }
                    // window.location.reload();
                    self.creating = false;
                });
            } else {
                $rootScope.toastMessage('Please wait...');
            }
        };

        self.authenticate = function (provider) {
            self.error = null;
            AuthService.socialLogin(provider, true).then(function (a) {
                if (a) {
                    $state.go('profile.about', {reload: true});
                    // console.log(a);
                }
            });
        };

        $timeout(function () {
            jQuery(document).foundation();
            $timeout(function () {
                jQuery(document).foundation();
            }, 500);
        }, 500);
    }

    SignInCtrl.$inject = ['$rootScope', '$timeout', '$q', '$state', 'AuthService', '$modal', 'cfpLoadingBar'];
    function SignInCtrl($rootScope, $timeout, $q, $state, AuthService, $modal, cfpLoadingBar) {
        $rootScope.metadata.title = 'Sign In';
        var self = this;
        self.authErrors = null;
        self.user = {
            email: '',
            password: ''
        };

        self.doLogin = function (redirect) {
            redirect = redirect || true;
            self.error = false;
            AuthService.login(self.user.email, self.user.password).then(function (res) {
                if (res.status === false) {
                    self.authErrors = res.errors;
                    return false;
                } else {
                    if (redirect && angular.isDefined(res)) {
                        $state.go('home');
                    }
                }
                cfpLoadingBar.complete();
            }, function (res) {
                self.error = res;
                // console.log('Failed', res);
            });
        };

        self.authenticate = function (provider) {
            self.error = null;
            AuthService.socialLogin(provider, false).then(function (res) {
                if (!res.status) {
                    self.authErrors = res.errors;
                    $rootScope.toastMessage('There is an error, please check your form');
                    // console.log('Failed', res);
                }            });
        };

        $timeout(function () {
            jQuery(document).foundation();
            $timeout(function () {
                jQuery(document).foundation();
            }, 500);
        }, 500);
    }

    ForgotPasswordCtrl.$inject = ['$rootScope', '$state', 'AuthService'];
    function ForgotPasswordCtrl($rootScope, $state, AuthService) {
        $rootScope.metadata.title = 'Password Recovery';

        var self = this;
        self.email = '';
        self.reseting = {
            newPassword: null,
            newPasswordCheck: null
        };
        self.hasToken = $rootScope.$stateParams.token || false;

        self.doPasswordResetRequest = function () {
            AuthService.requestPasswordReset(self.email).then(function (res) {
                // console.log(res);
                $rootScope.toastMessage('Check your inbox for our email! Should be there soon.');
                $state.go('sign_in');
            }, function (error) {
                $rootScope.toastMessage('Error: ' + error.message);
            });
        };

        self.confirmReset = function () {
            if (self.reseting.newPassword === self.reseting.newPasswordCheck && angular.isString(self.hasToken)) {
                AuthService.passwordReset($rootScope.$stateParams.email, self.reseting.newPassword, self.reseting.newPasswordCheck, self.hasToken)
                    .then(function (res) {

                    })
            } else return false;
        };

        if (self.hasToken) {

        }
    }

    BodyCtrl.$inject = ['$rootScope', '$localForage', '$q', '$state', 'AuthService', '$mdToast', 'UserActions', '$sce', 'DataService', '_', '$interval', '$filter'];
    function BodyCtrl($rootScope, $localForage, $q, $state, AuthService, $mdToast, UserActions, $sce, DataService, _, $interval, $filter) {
        var self = this;

        self.selected = null;
        $rootScope.AppData.searchText = decodeURIComponent($rootScope.$stateParams.q || '');
        self.selectedItem = '';

        self.notificationsTemplate = $sce.trustAsResourceUrl('src/directives/notification.html');
        self.newsletterRegister = newsletterRegister;


        // Recent Videos Footer Section
        DataService.collection('projects', {per_page: 3, sort: 'created_at'}).then(function (result) {
            _.each(result.data.data, function (i) {
                // i.created_at = $filter('amUTC')(i.created_at);
            });
            self.footerRecentVideos = result.data;
        });

        self.startSearch = function (text) {
            if (text) {
                self.toPage('browse', {q: text});
            }
        };

        var isIOS = function() {
            return !!(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i));
        };
        var isAndroid = function() {
            return !!navigator.userAgent.match(/Android/i);
        };

        $rootScope.isMobile = self.isMobile = function () {
            return isIOS() || isAndroid() || Foundation.MediaQuery.current === 'small';
        };

        $rootScope.requestVerificationEmail = function () {
            AuthService.requestVerification().then(function () {
                self.verificationEmailSentMessage = true;
            });
        };

        $rootScope.generateGenres = function () {
            var deferred = $q.defer();
            // $localForage.removeItem('genres');
            $localForage.getItem('genres', true).then(function (data) {
                $rootScope.genresList = data;
                deferred.resolve(data);
            }, function (error) {
                DataService.collection('genres').then(function (result) {
                    $rootScope.genresList = result.data.Genres;
                    $localForage.setItem('genres', result.data.Genres);
                    deferred.resolve(result.data.Genres);
                });
            });

            return deferred.promise;
        };

        $rootScope.generateTypes = function () {
            var deferred = $q.defer();
            // $localForage.removeItem('types');
            $localForage.getItem('types', true).then(function (data) {
                $rootScope.typesList = data;
                deferred.resolve(data);
            }, function (error) {
                DataService.collection('types').then(function (result) {
                    $rootScope.typesList = result.data.Types;
                    $localForage.setItem('types', result.data.Types);
                    deferred.resolve(result.data.Types);
                });
            });

            return deferred.promise;
        };

        $rootScope.generateCountries = function () {
            var deferred = $q.defer();
            // $localForage.removeItem('countries');
            $localForage.getItem('countries', true).then(function (data) {
                $rootScope.countryList = data;
                deferred.resolve(data);
            }, function (error) {
                DataService.collection('countries').then(function (result) {
                    $rootScope.countryList = result.data.Countries;
                    $localForage.setItem('countries', result.data.Countries);
                    deferred.resolve(result.data.Countries);
                });
            });

            return deferred.promise;
        };

        $rootScope.generateLanguages = function () {
            var deferred = $q.defer();
            // $localForage.removeItem('languages');
            $localForage.getItem('languages', true).then(function (data) {
                $rootScope.languageList = data;
                deferred.resolve(data);
            }, function (error) {
                DataService.collection('languages').then(function (result) {
                    $rootScope.languageList = result.data.Languages;
                    $localForage.setItem('languages', result.data.Languages);
                    deferred.resolve(result.data.Languages);
                });
            });

            return deferred.promise;
        };

        $rootScope.generateReactions = function () {
            return [
                {name: 'Happy', emotion: 'happy', icon: 'happy'},
                {name: 'Sad', emotion: 'sad', icon: 'sad'},
                {name: 'Offended', emotion: 'offended', icon: 'annoyed'},
                {name: 'Amused', emotion: 'amused', icon: 'grinning'},
                {name: 'Mad', emotion: 'mad', icon: 'mad'},
                {name: 'Furious', emotion: 'furious', icon: 'angry'},
                {name: 'Awesome', emotion: 'awesome', icon: 'woah'},
                {name: 'Terrified', emotion: 'terrified', icon: 'shocked'},
                {name: 'Confused', emotion: 'confused', icon: 'confused'},
                {name: 'In-Love', emotion: 'in-love', icon: 'love'},
                {name: 'Amazed', emotion: 'amazed', icon: 'woah'},
                {name: 'Motivated', emotion: 'motivated', icon: 'interested'},
                {name: 'Inspired', emotion: 'inspired', icon: 'interested'},
                {name: 'Bored', emotion: 'bored', icon: 'bored'},
                {name: 'Sleepy', emotion: 'sleepy', icon: 'bored'},
                //  {name: 'Determined', emotion: 'determined', icon: 'interested'},
                {name: 'Emotional', emotion: 'emotional', icon: 'emotional'},
                {name: 'Excited', emotion: 'excited', icon: 'big-smile'},
                {name: 'Nostalgic', emotion: 'nostalgic', icon: 'nostalgic'},
                {name: 'Annoyed', emotion: 'annoyed', icon: 'annoyed'},
                {name: 'Sorry', emotion: 'sorry', icon: 'sad-tear'},
                {name: 'Ashamed', emotion: 'ashamed', icon: 'sad-tear'},
                {name: 'Meh', emotion: 'meh', icon: 'meh'},
                {name: 'Special', emotion: 'special', icon: 'wink'},
                {name: 'Sick', emotion: 'sick', icon: 'mute'},
                {name: 'Great', emotion: 'great', icon: 'grinning'},
                // {name: 'Down', emotion: 'down', icon: 'sad'},
                // {name: 'Better', emotion: 'better', icon: 'interested'},
                {name: 'Guilty', emotion: 'guilty', icon: 'sympathetic'},
                {name: 'Hopeful', emotion: 'hopeful', icon: 'hopeful'},
                {name: 'Hopeless', emotion: 'hopeless', icon: 'sad'},
                {name: 'Secure', emotion: 'secure', icon: 'nerdy'},
                {name: 'Blessed', emotion: 'blessed', icon: 'grinning'},
                {name: 'Interested', emotion: 'interested', icon: 'interested'},
                {name: 'Comfortable', emotion: 'comfortable', icon: 'hehe'},
                {name: 'Disturbed', emotion: 'disturbed', icon: 'confused'},
                {name: 'Stupid', emotion: 'stupid', icon: 'confused'},
                {name: 'Sexy', emotion: 'sexy', icon: 'sexy'},
                {name: 'Relaxed', emotion: 'relaxed', icon: 'happy'},

                {name: 'Empowered', emotion: 'empowered', icon: 'happy'},
                {name: 'Cool', emotion: 'cool', icon: 'happy'},
                {name: 'Pumped', emotion: 'pumped', icon: 'happy'},
                {name: 'Turned On', emotion: 'turned on', icon: 'happy'},
                {name: 'Proud', emotion: 'Proud', icon: 'happy'},
                {name: 'Disgusted', emotion: 'disgusted', icon: 'annoyed'},
                {name: 'Sympathetic', emotion: 'sympathetic', icon: 'happy'},
                {name: 'Overwhelmed', emotion: 'overwhelmed', icon: 'happy'},
                {name: 'Passionate', emotion: 'passionate', icon: 'happy'},
                {name: 'Thrilled', emotion: 'thrilled', icon: 'happy'},
                {name: 'Loved', emotion: 'loved', icon: 'happy'},
                {name: 'Thankful', emotion: 'thankful', icon: 'happy'},
                {name: 'Appreciated', emotion: 'appreciated', icon: 'happy'},
                {name: 'Romantic', emotion: 'romantic', icon: 'love'},
                {name: 'Chill', emotion: 'chill', icon: 'happy'},
                {name: 'Pissed Off', emotion: 'pissed off', icon: 'annoyed'},
                {name: 'Accomplished', emotion: 'accomplished', icon: 'happy'},
                {name: 'Honored', emotion: 'honored', icon: 'happy'},
                {name: 'Young', emotion: 'young', icon: 'happy'},
                {name: 'Wild', emotion: 'wild', icon: 'happy'},
                {name: 'Old', emotion: 'old', icon: 'happy'},
                {name: 'Free', emotion: 'free', icon: 'happy'},
                {name: 'Epic', emotion: 'epic', icon: 'happy'},
                // {name: 'Engaged', emotion: 'engaged', icon: 'happy'},
                {name: 'Fired Up', emotion: 'fired up', icon: 'happy'},
                {name: 'Detached', emotion: 'detached', icon: 'happy'},
                {name: 'Disconnected', emotion: 'disconnected', icon: 'confused'},
                {name: 'Connected', emotion: 'connected', icon: 'happy'},
                // {name: 'Distant', emotion: 'distant', icon: 'happy'},
                {name: 'Beautiful', emotion: 'beautiful', icon: 'happy'},

                {name: 'Confident', emotion: 'confident', icon: 'happy'},
                {name: 'Positive', emotion: 'positive', icon: 'happy'},
                {name: 'Negative', emotion: 'negative', icon: 'annoyed'},
                {name: 'Heartbroken', emotion: 'heartbroken', icon: 'emotional'},
                {name: 'Silly', emotion: 'silly', icon: 'hehe'},
                {name: 'Disappointed', emotion: 'disappointed', icon: 'sad'},
                {name: 'Stressed', emotion: 'stressed', icon: 'annoyed'},
                {name: 'Fantastic', emotion: 'fantastic', icon: 'big-smile'},
                {name: 'Hungry', emotion: 'hungry', icon: 'annoyed'},
                {name: 'Shocked', emotion: 'shocked', icon: 'shocked'},
                {name: 'Frustrated', emotion: 'frustrated', icon: 'annoyed'},
                {name: 'Engrossed', emotion: 'engrossed', icon: 'interested'},
                {name: 'Peaceful', emotion: 'peaceful', icon: 'happy'},
                {name: 'Surprised', emotion: 'surprised', icon: 'woah'},
                {name: 'Satisfied', emotion: 'satisfied', icon: 'happy'},
                {name: 'Incomplete', emotion: 'incomplete', icon: 'sad'},
                {name: 'Complete', emotion: 'complete', icon: 'happy'},
                {name: 'Entertained', emotion: 'entertained', icon: 'hehe'},
                {name: 'Enlightened', emotion: 'enlightened', icon: 'interested'},
                {name: 'Relieved', emotion: 'relieved', icon: 'happy'},
                {name: 'Concerned', emotion: 'concerned', icon: 'sympathetic'},
                {name: 'Strong', emotion: 'strong', icon: 'happy'},
                {name: 'Optimistic', emotion: 'optimistic', icon: 'happy'},
                {name: 'Discouraged', emotion: 'discouraged', icon: 'happy'},
                {name: 'Lucky', emotion: 'lucky', icon: 'happy'},
                {name: 'Scared', emotion: 'scared', icon: 'happy'},
                {name: 'Brave', emotion: 'brave', icon: 'happy'},
                {name: 'Naughty', emotion: 'naughty', icon: 'sexy'},
                {name: 'Alert', emotion: 'alert', icon: 'happy'},
                {name: 'Alive', emotion: 'alive', icon: 'happy'},
                {name: 'Perfect', emotion: 'perfect', icon: 'happy'},
                {name: 'Nervous', emotion: 'nervous', icon: 'happy'},
                {name: 'Tense', emotion: 'tense', icon: 'annoyed'},
                // {name: 'Eager', emotion: 'eager', icon: 'happy'},
                {name: 'Impatient', emotion: 'impatient', icon: 'annoyed'},
                {name: 'Philosophical', emotion: 'philosophical', icon: 'interested'},
                {name: 'Empty', emotion: 'empty', icon: 'happy'},
                {name: 'Informed', emotion: 'informed', icon: 'nerdy'},
                {name: 'Playful', emotion: 'playful', icon: 'happy'},
                {name: 'Wise', emotion: 'wise', icon: 'nerdy'},
                {name: 'Refreshed', emotion: 'refreshed', icon: 'happy'},
                // {name: 'Fortunate', emotion: 'fortunate', icon: 'happy'},
                {name: 'Wanted', emotion: 'wanted', icon: 'annoyed'},
                {name: 'Thirsty', emotion: 'thirsty', icon: 'happy'},
                {name: 'Desperate', emotion: 'desperate', icon: 'happy'}
            ];
        };

        $rootScope.generateGenres();
        $rootScope.generateTypes();

        $rootScope.toastMessage = function (msg) {
            var toast = $mdToast.simple()
                .textContent(msg)
                .position('bottom right')
                .parent(jQuery('#alerts'));
            $mdToast.show(toast);
        };

        $rootScope.toastAction = function (msg, action, cb) {
            var toast = $mdToast.simple()
                .textContent(msg)
                .action(action)
                .hideDelay(0)
                .highlightAction(false)
                .position('bottom right')
                .parent(jQuery('#alerts'));
            $mdToast.show(toast).then(function (response) {
                if (response == 'ok') {
                    cb();
                }
            });
        };

        self.toPage = function (state, args) {
            $state.go(state, args);
        };

        self.notiURL = function (n) {
            if (!n.is_read) {
                self.markAsRead(n);
            }
            self.toPage(n.main_url.state, n.main_url.args);
            jQuery('#NotificationsArea').foundation('close');
        };

        self.markAllAsSeen = function () {
            var unseenList = _.where($rootScope.AppData.Notifications.list, {seen: false});
            var i = 0;

            _.each($rootScope.AppData.Notifications.list, function (a) {
                if (!a.seen) {
                    a.seen = true;
                }
            });
            $interval(function () {
                DataService.update('Action', unseenList[i++].id, {seen: true});
            }, 1000, unseenList.length).then(function (it) {
                // console.log(it);
            });

            /*$rootScope.getNewToken('notification', $rootScope.AppData.User.id).then(function (token) {
             var feed = window.StreamClient.feed('notification', $rootScope.AppData.User.id, token);
             feed.get({limit: 5, mark_seen: true}, function (a) {
             // console.log(a);
             _.each($rootScope.AppData.RawNotifications.list, function (n) {
             n.is_seen = true;
             });
             $rootScope.AppData.RawNotifications.unseen = 0;
             })
             });*/
        };

        self.markAllAsRead = function () {
            $rootScope.getNewToken('notification', $rootScope.AppData.User.id).then(function (token) {
                var feed = $rootScope.StreamClient.feed('notification', $rootScope.AppData.User.id, token);
                feed.get({limit: 20, mark_read: true}, function (a) {
                    _.each($rootScope.AppData.Notifications.list, function (n) {
                        n.is_read = true;
                    });
                    $rootScope.AppData.Notifications.unread = 0;
                })
            });
        };

        self.markAsRead = function (obj) {
            if (!obj.is_seen) {
                $rootScope.getNewToken('notification', $rootScope.AppData.User.id).then(function (token) {
                    var feed = $rootScope.StreamClient.feed('notification', $rootScope.AppData.User.id, token);
                    feed.get({limit:25, mark_read: [obj.id], mark_seen: [obj.id]})
                        .then(function(data) { /* on success */ })
                        .catch(function(reason) { /* on failure */ });
                    if ($rootScope.AppData.Notifications.unseen > 0) {
                        $rootScope.AppData.Notifications.unseen--;
                    }
                    obj.is_seen = true;
                });
            }
            return obj;
        };

        self.doSignOut = function () {
            AuthService.logout().then(function (res) {
                window.location.reload();
            })
        };

        self.openNotificationsMenu = function () {
            jQuery('#NotificationsArea').foundation('toggle');
            self.markAllAsSeen();
        };

        $rootScope.toFavorites = self.toFavorites = toFavorites;
        $rootScope.toWatchLater = self.toWatchLater = toWatchLater;
        $rootScope.checkContains = self.checkContains = checkContains;
        $rootScope.isSame = self.isSame = isSame;

        function toFavorites(obj) {
            return UserActions.favorite(obj);
        }

        function toWatchLater(obj) {
            return UserActions.watchLater(obj);
        }

        function checkContains(obj, search) {
            return _.contains(obj, search);
        }

        function isSame(a, b) {
            return moment(a).isSame(b, 'hour');
        }

        function newsletterRegister(notifyMe) {
            DataService.notifyMe(notifyMe)
                .then(function (res) {
                    if (res.data.status == 'success') {
                        $rootScope.toastMessage('Thanks for joining our newsletter!');
                        return self.notifyMe = {};
                    }
                }, function (err) {
                    // console.log(err);
                });
        }
    }

    HomeCtrl.$inject = ['$rootScope', 'DataService', '$scope', '$window', '$modal', '$interval'];
    function HomeCtrl($rootScope, DataService, $scope, $window, $modal, $interval) {
        var self = this;
        $rootScope.metadata.title = 'Home';

        self.refresh = function () {
            // Trending Videos
            DataService.collection('projects', {sort: 'reactions_count', per_page: 8}).then(function (result) {
                self.trending = result.data;
            });

            // Highest Rated Videos
            DataService.collection('projects', {sort: 'iwRating', per_page: 8}).then(function (result) {
                self.highestRated = result.data;
            });

            // Highest Awarded Videos
            DataService.collection('projects', {sort: 'wins_count', per_page: 8}).then(function (result) {
                self.highestAwarded = result.data;
            });

            // Recent Videos
            DataService.collection('projects', {sort: 'created_at', per_page: 8}).then(function (result) {
                self.recentFilms = result.data;
            });
        };
        self.refresh();
        self.refInterval = $interval(self.refresh, 300000);

        $scope.$on('$destroy', function () {
            $interval.cancel(self.refInterval);
        });

        $window.onfocus = function () {
            //do something
        };

        $window.onblur = function () {
            // console.log('Refresh Stopped');
            $interval.cancel(self.refInterval);
        };
    }

    BrowseCtrl.$inject = ['$scope', '$rootScope', '$state', 'DataService', '$q', '$timeout', '$modal', '_'];
    function BrowseCtrl($scope, $rootScope, $state, DataService, $q, $timeout, $modal, _) {
        $rootScope.metadata.title = 'Browse';
        var self = this;
        self.isOpen = false;
        self.selectedGenres = [];
        self.selectedTypes = [];
        self.films = [];
        self.arrs = {
            genres: [],
            types: []
        };
        self.filters = {
            sort: $rootScope.$stateParams.sort || 'created_at',
            genres: $rootScope.$stateParams.genres || undefined,
            type: $rootScope.$stateParams.types || undefined,
            search: $rootScope.$stateParams.q || undefined
        };

        $rootScope.generateTypes().then(function (types) {
            var d = $q.defer();

            self.arrs.types = angular.isArray(self.selectedTypes) && self.selectedTypes.length ? self.selectedTypes : types;
            return d.promise;
        });

        $rootScope.generateGenres().then(function (genres) {
            var d = $q.defer();
            self.arrs.genres = angular.isArray(self.selectedGenres) && self.selectedGenres.length ? self.selectedGenres : genres;
            return d.promise;
        });

        self.refresh = function () {
            $q.all([$rootScope.generateTypes(), $rootScope.generateGenres()]).then(function (values) {
                self.filters.sort = $rootScope.$stateParams.sort || 'recent';
                self.search();
            });
        };

        self.search = function () {
            var filterField = '';
            switch (self.filters.sort) {
                case 'trending':
                    filterField = 'reactions_count';
                    break;
                case 'rating':
                    filterField = 'iwRating';
                    break;
                case 'awards':
                    filterField = 'wins_count';
                    break;
                case 'recent':
                default:
                    filterField = 'created_at';
                    break;
            }

            DataService.collection('projects', {
                sort: filterField,
                order: 'DESC',
                types: _.pluck(self.selectedTypes, 'id').toString(),
                genres: _.pluck(self.selectedGenres, 'id').toString(),
                search: self.filters.search || undefined,
                per_page: 50,
            }).then(function (res) {
                return self.films = res.data.data;
            });

            $scope.$broadcast('scroll.refreshComplete');
        };

        self.selectGenres = function (genre) {
            var exists = _.findWhere(self.selectedGenres, {id: genre.id});
            !!exists ? self.selectedGenres = _.reject(self.selectedGenres, genre) : self.selectedGenres.push(genre);
            self.search();
        };

        self.selectTypes = function (type) {
            var exists = _.find(self.selectedTypes, {id: type.id});
            !!exists ? self.selectedTypes = _.reject(self.selectedTypes, type) : self.selectedTypes.push(type);
            self.search();
        };

        self.filterBy = function (filter) {
            self.search();
        };

        $scope.$watch('', function (newValue, oldValue) {

        });

        self.refresh();
    }

    LatestCtrl.$inject = ['$rootScope', '$scope', 'DataService', '$timeout', '$interval'];
    function LatestCtrl($rootScope, $scope, DataService, $timeout, $interval) {
        $rootScope.metadata.title = 'Latest';
        var self = this;

        self.init = function () {
            DataService.collection('reactions/latest').then(function (res) {
                self.reactions = res.data;
            });
            DataService.collection('nominations/latest').then(function (res) {
                self.nominations = res.data;
            });
            DataService.collection('critiques/latest').then(function (res) {
                self.critiques = res.data;
            });
        };

        self.init();
        self.refInterval = $interval(self.init, 300000);

        $scope.$on('$destroy', function () {
            $interval.cancel(self.refInterval);
        });

        $timeout(jQuery(document).foundation(), 0);
    }

    VideoCtrl.$inject = ['$rootScope', '$scope', 'Project', '$modal', 'UserActions', 'DataService', '$state', 'Analytics', '$window', '$timeout', '_'];
    function VideoCtrl($rootScope, $scope, Project, $modal, UserActions, DataService, $state, Analytics, $window, $timeout, _) {
        var self = this;
        self.loaded = false;
        self.displayShare = false;
        self.toggleReactionsList = false;
        self.emotions = $rootScope.generateReactions();
        self.critiqueAverage = 0;
        self.activeTab = 'critiques';
        self.isFaved = false;
        self.isSaved = false;
        self.playerResponsiveMode = $window.localStorage.playerResponsiveMode ? JSON.parse($window.localStorage.playerResponsiveMode) : _.contains(['small', 'medium', 'large'], Foundation.MediaQuery.current);
        self.tagsArray = [];
        self.lightsOff = false;

        self.film = Project;
        function init(result) {
            $rootScope.currentTitle = result.name;
            self.loaded = true;

            $rootScope.metadata = {
                title: result.name,
                description: angular.isString(result.description) ? result.description.substr(0, 150) : '',
                image: result.thumbnail_url,
                url: window.location.href
            };

            self.qReactions();

            self.qCritiques();

            self.qNominations();

            self.qWins();

            self.checkUserActions();

            $rootScope.initWatch = function () {
                Analytics.trackEvent('video', 'play', self.film.name);
                UserActions.markAsWatched(self.film)
            };
            //self.activeWatch = UserActions.markAsWatched(self.film);

            $scope.$on('$destroy', function () {
                $rootScope.initWatch = undefined;
            });
            //UserActions.cancelWatched(self.activeWatch);

            self.test = function () {
                // console.log('Clicked');
            };

            //Populate tags array
            if (angular.isString(self.film.tags) && self.film.tags.length) {
                if (self.film.tags.indexOf(',') > -1) {
                    self.tagsArray = self.film.tags.split(',');
                }
            }

            // Get related video
            DataService.collection('projects', {
                notVideo: self.film.id,
                notOwner: $rootScope.AppData.User ? $rootScope.AppData.User.id : undefined,
                per_page: 1,
                random: true,
            })
                .then(function (res) {
                    if (res) {
                        self.relatedvideo = res.data.data[0];
                    }
                });

            // Register Listener
            // console.log('Listener registered!');
            //Backand.on('video_updated_' + self.film.url_id, function (data) {
            //// console.log(self.film);
            // console.log('Listener Triggered!');
            // console.log(data);
            //self.updateVideoObj();
            /*_.each(data, function (a) {
             self.film[a.Key] = a.value;
             })*/
            //});
        }

        self.checkUserActions = function () {
            if ($rootScope.isAuthenticated()) {
                UserActions.canReact(self.film.id).then(function (res) {
                    self.canReact = res;
                }, function (error) {
                    self.canReact = error;
                });

                if (self.film.disableCritique || (self.film.owner_id === $rootScope.AppData.User.id)) {
                    console.log('owner');
                    self.canCritique = false;
                } else {
                    UserActions.canCritique(self.film.id).then(function (res) {
                        self.canCritique = res;
                    }, function (error) {
                        self.canCritique = error;
                    });
                }

                UserActions.canRate(self.film.id).then(function (res) {
                    self.canRate = res;
                }, function (error) {
                    self.canRate = error;
                });
            } else {
                self.canCritique = true;
            }
        };

        /*self.qComments = function () {
         // Fetch Comments
         DataService.collection('comments', [{fieldName: 'created_at', order: 'desc'}],
         [
         {fieldName: 'project', operator: 'in', value: self.film.id},
         {fieldName: 'parentComment', operator: 'in', value: ''}
         ],
         20, false, false, 1).then(function (result) {
         self.comments = result.data;
         // console.log('comments: ", result.data);
         });
         };*/

        self.qReactions = function () {
            // Fetch Reactions
            DataService.collection('reactions', {project: self.film.id, sort: 'created_at', per_page: 300})
                .then(function (result) {
                    self.reactions = result.data;
                    self.chartedReactions = _.countBy(self.reactions.data, function (r) {
                        return _.contains(self.reactions.data, r) ? r.emotion : undefined;
                    });
                    self.reactionCountMax = _.max(self.chartedReactions, function (i) {
                        return i;
                    });

                    var sortable = [];
                    for (var r in self.chartedReactions)
                        sortable.push([r, self.chartedReactions[r]])
                    sortable.sort(function (a, b) {
                        return b[1] - a[1]
                    });

                    self.chartedReactions = _.object(sortable);
                });
        };

        self.qCritiques = function () {
            // Fetch Critiques
            DataService.collection('critiques', {include: '', project: self.film.id, per_page: 50})
                .then(function (result) {
                    self.critiques = result.data.data;
                    self.calcIwAverage(self.critiques);
                });
        };

        self.qNominations = function () {
            DataService.collection('nominations', {include: 'user,award', project: self.film.id, sort: 'created_at'})
                .then(function (result) {
                    self.nominations = result.data.data;
                    //// console.log('Nomination: ', result.data);
                });
        };

        self.qWins = function () {
            DataService.collection('wins', {project: self.film.id, sort: 'created_at'}).then(function (result) {
                self.wins = result.data.data;
                // console.log('AwardWin: ', result.data);
            });
        };

        self.calcIwAverage = function (critiques) {
            var total = 0;
            _.each(critiques, function (a) {
                total += a.overall;
            });
            self.critiqueAverage = total / critiques.length;
        };

        self.getEmoticonByEmotion = function (emotion) {
            var reactions = $rootScope.generateReactions();
            return _.findWhere(reactions, {emotion: emotion});
        };

        self.showMessageDialog = function () {
            UserActions.checkAuth().then(function (res) {
                if (res) {
                    var params = {
                        templateUrl: 'common/contactUserDialog.html',
                        resolve: {
                            recipient: function () {
                                return self.videoOwner.id;
                            }
                        },
                        controller: ContactUserDialogController
                    };
                    var msgModal = $modal.open(params);
                }
            }, function (err) {
                UserActions.loginModal();
            });
        };

        self.rateThrottled = false;
        self.rate = function (direction) {
            if (!!self.rateThrottled) {
                return false;
            }

            if (!$rootScope.isAuthenticated()) {
                UserActions.loginModal();
                return false;
            }

            if ($rootScope.isNotVerified()) {
                $rootScope.toastAction('Please verify your account so you can rate videos! Check your spam folder too.', 'Verify Now', $rootScope.requestVerificationEmail());
                return false;
            }

            self.rateThrottled = true;
            var actionVerb = 'like';
            if (self.canRate === true) {
                DataService.save('ratings', {
                    author_id: $rootScope.AppData.User.id,
                    project_id: self.film.id,
                    up: direction === 'up',
                    down: direction === 'down'
                }).then(function (res) {
                    // console.log(res);
                    switch (direction) {
                        case 'up':
                            // Increment film up_ratings_count
                            self.film.up_ratings_count++;
                            break;
                        case 'down':
                            // Increment film down_ratings_count
                            self.film.down_ratings_count++;
                            actionVerb = 'unlike';
                            break;
                    }

                    self.updateVideoObj();
                    angular.extend(res.data, {projectOwner: self.film.owner_id});
                    self.checkUserActions();
                });

            } else if (angular.isObject(self.canRate)) {
                //up is false && down is false
                if (!self.canRate.up && !self.canRate.down) {
                    DataService.update('ratings', self.canRate.id, {
                        up: direction === 'up',
                        down: direction === 'down',
                    })
                        .then(function (res) {
                            switch (direction) {
                                case 'up':
                                    // Increment film up_ratings_count
                                    self.film.up_ratings_count++;
                                    break;
                                case 'down':
                                    // Increment film down_ratings_count
                                    self.film.down_ratings_count++;
                                    actionVerb = 'unlike';
                                    break;
                            }
                            angular.extend(self.canRate, {up: direction === 'up', down: direction === 'down'});
                            //self.updateVideoObj();
                            angular.extend(res.data, {projectOwner: self.film.owner_id});
                            //self.checkUserActions();
                        });

                    // up is already true && direction is up
                } else if (!!self.canRate.up && direction === 'up') {
                    //DataService.delete('Rating', self.canRate.id)
                    angular.extend(self.canRate, {up: false});
                    DataService.update('ratings', self.canRate.id, {up: false, down: false})
                        .then(function (res) {
                            self.film.up_ratings_count--;
                            //self.updateVideoObj();
                            angular.extend(res.data, {projectOwner: self.film.owner_id});
                            //self.checkUserActions();
                        });

                    // down is already true && direction is down
                } else if (!!self.canRate.down && direction === 'down') {
                    //DataService.delete('Rating', self.canRate.id)
                    angular.extend(self.canRate, {down: false});
                    DataService.update('ratings', self.canRate.id, {up: false, down: false})
                        .then(function (res) {
                            self.film.down_ratings_count--;
                            //self.updateVideoObj();
                            angular.extend(res.data, {projectOwner: self.film.owner_id});
                            //self.checkUserActions();
                        });

                    // down is true && direction is up || up is true && direction is down -> reversal
                } else if ((!!self.canRate.down && direction === 'up') || (!!self.canRate.up && direction === 'down')) {
                    var up = false, down = false;
                    switch (direction) {
                        case 'up':
                            up = true;
                            self.film.up_ratings_count++;
                            self.film.down_ratings_count--;
                            angular.extend(self.canRate, {up: up, down: down});
                            break;
                        case 'down':
                            down = true;
                            self.film.up_ratings_count--;
                            self.film.down_ratings_count++;
                            angular.extend(self.canRate, {up: up, down: down});
                            actionVerb = 'unlike';
                            break;
                    }
                    DataService.update('ratings', self.canRate.id, {up: up, down: down}).then(function (res) {
                        //self.updateVideoObj();
                        //self.checkUserActions();
                        angular.extend(res.data, {projectOwner: self.film.owner_id});
                    });
                }
            }
            $timeout(function () {
                            self.rateThrottled = false;
                        }, 1000);
        };

        self.react = function (emotion) {
            if (angular.isDefined(emotion)) {
                if (!$rootScope.isAuthenticated()) {
                    UserActions.loginModal();
                    return false;
                }

                if ($rootScope.isNotVerified()) {
                    $rootScope.toastAction('Please verify your account and join the conversation! Check your spam folder too.', 'Verify Now', $rootScope.requestVerificationEmail());
                    return false;
                }

                var actionVerb = 'react';
                if (self.canReact === true) {
                    DataService.save('reactions', {
                        user_id: $rootScope.AppData.User.id,
                        project_id: self.film.id,
                        emotion: emotion.emotion
                    }).then(function (resA) {
                        self.film.reactions_count++;
                        // self.updateVideoObj();
                        self.checkUserActions();
                        self.qReactions();
                    });
                } else if (angular.isObject(self.canReact)) {
                    if (self.canReact.emotion !== emotion.emotion) {
                        DataService.update('reactions', self.canReact.id, {
                            emotion: emotion.emotion
                        }).then(function (resA) {
                            self.canReact = resA.data;
                            // self.updateVideoObj();
                            self.checkUserActions();
                            self.qReactions();
                        });
                    }
                }
            }
        };

        self.canReactIcon = function () {
            if (angular.isObject(self.canReact)) {
                var emoticon = _.findWhere(self.emotions, {'emotion': self.canReact.emotion});
                return angular.isObject(emoticon) ? emoticon.icon : false;
            } else return false;
        };

        self.deleteCritique = function (c, ev) {
            if (!$rootScope.isAuthenticated()) {
                UserActions.loginModal();
                return false;
            }

            if ($rootScope.isNotVerified()) {
                $rootScope.toastAction('Please verify your account and join the conversation! Check your spam folder too.', 'Verify Now', $rootScope.requestVerificationEmail());
                return false;
            }

            var modalInstance = $modal.open({
                templateUrl: 'common/confirmDialog.html',
                controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                    $scope.ok = function () {
                        $modalInstance.close(true);
                    };

                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                }],
                size: Foundation.MediaQuery.atLeast('large') ? 'tiny' : 'small',
                keyboard: true
            });
            modalInstance.result.then(function () {
                DataService.collection('nominations', [], [{
                    critique: c.id
                }]).then(function (noms) {
                    var nom = noms.data.data[0];
                    DataService.delete('Nominations', nom.id).then(function () {
                        // Decrement film nominationCount
                        self.film.nominationCount--;
                    });

                    DataService.delete('Critique', c.id).then(function () {
                        $rootScope.toastMessage('Your critique was deleted.');
                        // Decrement film critiques_count
                        self.film.critiques_count--;
                        self.updateVideoObj();
                        self.checkUserActions();
                        self.critiques = _.reject(self.critiques, function (a) {
                            return a.id === c.id;
                        });
                    });
                })
            }, function () {
                // console.info('Modal dismissed at: ' + new Date());
            });
        };

        self.openCritiqueDialog = function ($event) {
            if (self.canCritique !== true && self.canCritique !== false) {
                return $state.go('video_critique', {video_url_id: self.film.url_id, url_id: self.canCritique.url_id});
            }

            CritiqueDialogController.$inject = ['$scope', '$modalInstance', 'critique', '$q', 'Analytics'];
            function CritiqueDialogController($scope, $modalInstance, critique, $q, Analytics) {
                zIndexPlayer();
                $scope.critique = critique;
                $scope.ratingMax = 10;
                $scope.makePrivateHelp = false;

                DataService.collection('awards').then(function (result) {
                    $scope.awardsList = result.data.Awards;
                });

                $scope.dialogModel = {
                    award_id: null
                };

                $scope.nominated = {
                    award_id: $scope.dialogModel.award_id,
                    user_id: $rootScope.AppData.User.id,
                    project_id: $scope.critique.project_id,
                    critique_id: undefined
                };

                $scope.starArray = angular.copy([{"num": 0}, {"num": 1}, {"num": 2}, {"num": 3}, {"num": 4}, {"num": 5}, {"num": 6}, {"num": 7}, {"num": 8}, {"num": 9}, {"num": 10}].reverse());

                $scope.calcOverall = function () {
                    $scope.critique.overall = ($scope.critique.originality + $scope.critique.direction + $scope.critique.writing +
                        $scope.critique.cinematography + $scope.critique.performances + $scope.critique.production +
                        $scope.critique.pacing + $scope.critique.structure + $scope.critique.audio + $scope.critique.music) / 10;
                };

                $scope.$watchCollection('critique', function () {
                    $scope.calcOverall();
                });

                $scope.closeDialog = function () {
                    zIndexPlayer(true);
                    $modalInstance.close(true);
                };

                $scope.cancel = function () {
                    zIndexPlayer(true);
                    $modalInstance.dismiss('cancel');
                };

                $scope.hoveringOver = function (value) {
                    $scope.overStar = value;
                    $scope.percent = 100 * (value / $scope.max);
                };

                $scope.postCritique = function () {
                    $scope.critique.url_id = moment().valueOf();
                    DataService.save('critiques?include=user,award', $scope.critique).then(function (res) {
                        var obj = res.data.data;

                        self.critiques.push(obj);
                        self.calcIwAverage(self.critiques);
                        // Increment film critiques_count
                        self.film.critiques_count++;

                        // register Action
                        Analytics.trackEvent('video', 'critique', self.film.name);

                        // if an award has been selected, create a nomination
                        if (!!$scope.dialogModel.award_id && angular.isString($scope.dialogModel.award_id)) {
                            $scope.nominated.critique_id = obj.id;
                            $scope.nominated.award_id = $scope.dialogModel.award_id;
                            DataService.save('nominations', $scope.nominated).then(function (nom) {
                                // Increment film commentCount
                                self.film.nominationCount++;
                                self.updateVideoObj();
                                // register Action
                                self.qNominations();
                                nom.critique = obj;
                                Analytics.trackEvent('video', 'nominate', self.film.name);
                            }, function (error) {
                                alert('Failed to create new nomination, with error code: ' + error.message);
                            })
                        } else {

                        }

                    }, function (error) {
                        alert('Failed to create new critique, with error code: ' + error.message);

                    }).then(function () {
                        self.qCritiques();
                        self.checkUserActions();
                        $scope.closeDialog();
                    });
                };
            }

            UserActions.canCritique(self.film.id).then(function (res) {
                // is logged in
                if (res) {

                    if ($rootScope.isNotVerified()) {
                        $rootScope.toastAction('Please verify your account and join the conversation! Check your spam folder too.', 'Verify Now', $rootScope.requestVerificationEmail());
                        return false;
                    }

                    $modal.open({
                        templateUrl: 'common/critiqueDialog.html',
                        resolve: {
                            critique: function () {
                                return {
                                    originality: 0,
                                    direction: 0,
                                    writing: 0,
                                    cinematography: 0,
                                    performances: 0,
                                    production: 0,
                                    pacing: 0,
                                    structure: 0,
                                    audio: 0,
                                    music: 0,
                                    overall: 0,
                                    private: false,
                                    user_id: $rootScope.AppData.User.id,
                                    body: '',
                                    project_id: self.film.id
                                };
                            }
                        },
                        controller: CritiqueDialogController,
                        keyboard: true
                    });
                }
            }, function (err) {
                if (angular.isObject(err)) {
                    return false;
                } else UserActions.loginModal();
            });
        };

        self.openShareDialog = function () {
            $modal.open({
                templateUrl: 'common/shareDialog.html',
                resolve: {
                    Video: function () {
                        return self.film;
                    }
                },
                size: Foundation.MediaQuery.atLeast('large') ? 'tiny' : 'small',
                controller: ['$rootScope', '$scope', '$modalInstance', 'Video', function ($rootScope, $scope, $modalInstance, Video) {
                    zIndexPlayer();
                    $scope.video = Video;
                    $scope.shareLink = window.location.origin + '/' + Video.url_id;
                    $scope.cancel = function () {
                        zIndexPlayer(true);
                        $modalInstance.close();
                    };
                }]
            })
        };

        self.openReactionDialog = function () {
            UserActions.checkAuth(self.film.id).then(function (res) {
                // is logged in
                if (res) {

                    if ($rootScope.isNotVerified()) {
                        $rootScope.toastAction('Please verify your account and join the conversation! Check your spam folder too.', 'Verify Now', $rootScope.requestVerificationEmail());
                        return false;
                    }

                    var modalInstance = $modal.open({
                        templateUrl: 'common/reactionDialog.html',
                        resolve: {
                            Video: function () {
                                return self.film;
                            },
                            Reaction: function () {
                                return self.canReact || null;
                            },
                            Emotions: function () {
                                return self.emotions;
                            }
                        },
                        size: Foundation.MediaQuery.atLeast('medium') ? 'tiny' : 'full',
                        controller: ['$scope', '$modalInstance', 'Video', 'Reaction', 'Emotions', function ($scope, $modalInstance, Video, Reaction, Emotions) {
                            zIndexPlayer();
                            $scope.video = Video;
                            $scope.emotions = Emotions;

                            $scope.getEmoticonByEmotion = function (emotion) {
                                return _.findWhere($scope.emotions, {emotion: emotion});
                            };

                            $scope.selectedEmotion = function (e) {
                                zIndexPlayer(true);
                                //$modalInstance.dismiss('cancel');
                                $modalInstance.close(e);
                            };

                            $scope.cancel = function () {
                                zIndexPlayer(true);
                                $modalInstance.dismiss('cancel');
                            };

                            $scope.closeDialog = function () {
                                zIndexPlayer(true);
                                $modalInstance.dismiss('cancel');
                            };

                        }]
                    });

                    modalInstance.result.then(function (reaction) {
                        self.react(reaction);
                    }, function () {
                        // console.info('Modal dismissed at: ' + new Date());
                    }).then(function () {
                        $timeout(function () {
                            // console.log('remove is-reveal-open');
                            jQuery('body').removeClass('is-reveal-open')
                        }, 500);
                    });
                }
            }, function (err) {
                // console.log(err);
                if (angular.isObject(err)) {
                    return false;
                } else UserActions.loginModal();
            });
        };

        self.openAddToDialog = function () {
            $modal.open({
                templateUrl: 'common/shareDialog.html',
                resolve: {
                    Video: function () {
                        return self.film;
                    }
                },
                size: Foundation.MediaQuery.atLeast('large') ? 'tiny' : 'small',
                controller: ['$scope', '$modalInstance', 'Video', function ($scope, $modalInstance, Video) {
                    zIndexPlayer();
                    $scope.video = Video;
                    $scope.shareLink = window.location.origin + '/' + Video.url_id;
                    $scope.cancel = function () {
                        zIndexPlayer(true);
                        $modalInstance.close();
                    };
                }]
            })
        };

        self.toFavorites = function () {
            return $rootScope.toFavorites(self.film);
        };

        self.toWatchLater = function () {
            return $rootScope.toWatchLater(self.film);
        };

        self.toggleWidthMode = function () {
            $window.localStorage.playerResponsiveMode = self.playerResponsiveMode = !self.playerResponsiveMode;
            $timeout(function () {
                $window.videoPlayer.resize();
                //fail-safe
                $timeout(function () {
                    $window.videoPlayer.resize();
                }, 500);
            }, 100);
        };

        $scope.$on('$destroy', function (event) {
            //$scope.commentSubscribe.cancel();
        });

        self.updateVideoObj = function () {
            return DataService.item('projects', self.film.id)
                .then(function (a) {
                    console.log('Project Updated: ', a);
                    self.film = a.data.data;
                });
        };

        self.toggleLights = function () {
            self.lightsOff = !self.lightsOff;
            var overlay = jQuery('#overlay');
            overlay.fadeToggle(1000);
            /* Choose desired delay */
            if (!self.lightsOff) {
                $timeout(function () {
                    overlay.removeClass('highlight');
                }, 1000);
                /* Same delay */
            } else {
                overlay.addClass('highlight');
            }
        };

        self.reportDialog = function () {
            var modalInstance = $modal.open({
                templateUrl: 'common/reportVideoDialog.html',
                resolve: {
                    Video: function () {
                        return self.film;
                    }
                },
                closeOnClick: false,
                size: Foundation.MediaQuery.atLeast('medium') ? 'small' : 'full',
                controller: ['$scope', '$modalInstance', 'DataService', 'Video', function ($scope, $modalInstance, DataService, Video) {
                    zIndexPlayer();
                    $scope.video = Video;
                    $scope.report = {
                        name: '',
                        email: '',
                        body: '',
                        project_id: $scope.video.id,
                        video: $scope.video.url_id
                    };

                    $scope.cancel = function () {
                        zIndexPlayer(true);
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.closeDialog = function () {
                        zIndexPlayer(true);
                        $modalInstance.close($scope.report);
                    };
                }]
            });

            modalInstance.result.then(function (report) {
                DataService.mail('report', report).then(function () {
                    $rootScope.toastMessage('Your Report has been Sent');
                });
            }, function () {
                // console.info('Modal dismissed at: ' + new Date());
            }).then(function () {
                $timeout(function () {
                    // console.log('remove is-reveal-open');
                    jQuery('body').removeClass('is-reveal-open')
                }, 500);
            });
        };

        function zIndexPlayer(remove) {
            var vidDiv = jQuery('.flex-video');
            !!remove ? vidDiv.css('z-index', '') : vidDiv.css('z-index', 0);
        }

        //Lets begin
        init(self.film);
    }

    VideoCritiqueCtrl.$inject = ['$rootScope', '$scope', 'Critique', 'UserActions', 'DataService', '_'];
    function VideoCritiqueCtrl($rootScope, $scope, Critique, UserActions, DataService, _) {
        var self = this;
        self.commentsPage = 1;

        // Fetch Critique
        var init = function (critique) {
            self.critique = critique;
            $scope.commentsParent = self.critique;

            // Fetch Comments
            DataService.collection('comments', {
                critique: self.critique.id,
                per_page: 10,
                page: self.commentsPage,
                replies: false
            }).then(function (result) {
                self.comments = result.data;
            });

        };
        init(Critique.data.data);
    }

    VideoCritiqueEditCtrl.$inject = ['$rootScope', '$scope', 'DataService', '$state', 'Critique'];
    function VideoCritiqueEditCtrl($rootScope, $scope, DataService, $state, Critique) {
        $scope.critique = Critique.data.data;
        $scope.ratingMax = 10;
        $scope.makePrivateHelp = false;

        $scope.editedCritique = angular.copy($scope.critique);

        DataService.collection('awards')
            .then(function (result) {
                $scope.awardsList = result.data.awards;
            });


        $scope.update = function () {
            $scope.editedCritique.edited_at = moment().toDate();
            // $scope.editedCritique.private = !!$scope.editedCritique.private;
            DataService.update('critiques', $scope.critique.id, $scope.editedCritique).then(function (res) {
                    $rootScope.toastMessage('Critique Updated');
                    /*if ($state.is('profile_critique-edit'))
                     $state.go('profile_critiqueselfid: self.critique.id});*/
                    if ($state.is('video_critique-edit'))
                        $state.go('video_critique', {
                            video_url_id: $rootScope.$stateParams.video_url_id, url_id: $scope.critique.url_id
                        });
                }, function (err) {
                    // console.log(err);
                    $rootScope.toastMessage('Something went wrong...')
                }
            )
        };

        $scope.starArray = angular.copy([{"num": 0}, {"num": 1}, {"num": 2}, {"num": 3}, {"num": 4}, {"num": 5}, {"num": 6}, {"num": 7}, {"num": 8}, {"num": 9}, {"num": 10}].reverse());

        $scope.hoveringOver = function (value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.calcOverall = function () {
            $scope.editedCritique.overall = ($scope.editedCritique.originality + $scope.editedCritique.direction + $scope.editedCritique.writing +
                $scope.editedCritique.cinematography + $scope.editedCritique.performances + $scope.editedCritique.production +
                $scope.editedCritique.pacing + $scope.editedCritique.structure + $scope.editedCritique.audio + $scope.editedCritique.music) / 10;
        };

        $scope.$watchCollection('editedCritique', function () {
            $scope.calcOverall();
        });
    }

    ProfileCtrl.$inject = ['$rootScope', 'filepickerService', 'User', 'UserStats', 'AuthService', 'Upload', '_'];
    function ProfileCtrl($rootScope, filepickerService, User, UserStats, AuthService, Upload, _) {
        $rootScope.metadata.title = 'Profile';
        var self = this;
        self.user = User;
        self.userStats = UserStats;
        // self.updateAvatar = _.throttle(updateAvatar, 1000);
        // self.updateCoverPhoto = _.throttle(updateCoverPhoto, 1000);
        self.pickAvatar = pickAvatar;
        self.pickBanner = pickBanner;

        self.getEmoticonByEmotion = function (emotion) {
            var reactions = $rootScope.generateReactions();
            return _.findWhere(reactions, {emotion: emotion});
        };

        self.generatePublicId = function (type) {
            return self.user.url_id + '_' + type + '_' + moment().valueOf();
        };

        function pickBanner(){
            filepickerService.pick(
                {
                    cropRatio: 32/7,
                    mimetype: 'image/*',
                    services: ['CONVERT', 'COMPUTER', 'FACEBOOK', 'GOOGLE_DRIVE', 'WEBCAM', 'INSTAGRAM'],
                    conversions: ['crop', 'rotate', 'filter']
                },
                function (Blob){
                    self.user.coverPhoto = Blob.url;
                    AuthService.updateUser(self.user).then(function (res) {
                        $rootScope.toastMessage('Cover Photo Updated!');
                    });                }
            );
        }
        function pickAvatar(){
            filepickerService.pick(
                {
                    cropRatio: 1/1,
                    mimetype: 'image/*',
                    services: ['CONVERT', 'COMPUTER', 'FACEBOOK', 'GOOGLE_DRIVE', 'WEBCAM', 'INSTAGRAM'],
                    conversions: ['crop', 'rotate', 'filter']
                },
                function (Blob){
                    self.user.avatar = Blob.url;
                    AuthService.updateUser(self.user).then(function (res) {
                        $rootScope.toastMessage('Avatar Updated!');
                    });
                }
            );
        }

        /*function updateAvatar(file) {
            Upload.upload({
                url: 'https://api.cloudinary.com/v1_1/indiewise/upload',
                params: {upload_preset: 'r0kuyqef'},
                data: {file: file, public_id: self.generatePublicId('avatar')},
                skipAuthorization: true  // `Authorization: Bearer <token>` will not be sent on this request.
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                self.user.avatar = resp.data.secure_url;
                AuthService.updateUser(self.user).then(function (res) {
                    $rootScope.toastMessage('Avatar Updated!');
                });
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        }*/

        /*function updateCoverPhoto(file) {
            Upload.upload({
                url: 'https://api.cloudinary.com/v1_1/indiewise/upload',
                params: {upload_preset: 'jmy7rdcs'},
                data: {file: file, public_id: Profile.generatePublicId('cover')},
                skipAuthorization: true  // `Authorization: Bearer <token>` will not be sent on this request.
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                self.user.coverPhoto = resp.data.secure_url;
                AuthService.updateUser(self.user).then(function (res) {
                    $rootScope.toastMessage('Cover Photo Updated!');
                });
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });

        }*/

    }

    ProfileUploadController.$inject = ['$rootScope', '$state', 'User', '$http', 'DataService', '$window', 'Upload', 'filepickerService', '_'];
    function ProfileUploadController($rootScope, $state, User, $http, DataService, $window, Upload, filepickerService, _) {
        var self = this;
        self.user = User.data;
        self.uploadType = 2;
        self.newVideo = {
            name: '',
            description: '',
            director: '',
            writer: '',
            producers: '',
            keyCast: '',
            language: '00000000-0000-6b6e-4371-305344643451',
            completionDate: '',
            filmingCountry: undefined,
            originCountry: undefined,
            owner: $rootScope.AppData.User.id,
            genres: [],
            type: undefined,
            runTime: 0,
            thumbnail_url: '',
            hosting_type: undefined,
            video_url: '',
            tags: '',
            unlist: false,
            disableComments: false,
            disableCritique: false,
            nsfw: false,
            copyrightOwner: false
        };
        self.genresArr = [];

        self.runtime = {
            hours: 0,
            mins: 0,
            secs: 0
        };

        self.maxDate = moment().toDate();

        self.selectedGenre = null;

        $rootScope.generateGenres().then(function (res) {
            $rootScope.genresList = self.genresList = res;
        });
        $rootScope.generateTypes().then(function (res) {
            $rootScope.typesList = self.typesList = res;
        });
        $rootScope.generateCountries().then(function (res) {
            $rootScope.countryList = self.countryList = res;
        });
        $rootScope.generateLanguages().then(function (res) {
            $rootScope.languageList = self.languageList = res;
        });

        self.runtimeToSeconds = function () {
            self.newVideo.runTime = (self.runtime.hours * 3600) + (self.runtime.mins * 60) + self.runtime.secs;
        };

        self.isURL = function (str) {
            var urlRegex = '[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)';
            var url = new RegExp(urlRegex, 'i');
            return str.length < 2083 && url.test(str);
        };

        self.getThumbnailUrl = function (url) {
            if (url != null && url != '') {
                if (url.indexOf('youtu') != -1) {
                    var video_id = url.indexOf('v=') != -1 ? url.split('v=')[1].split('&')[0] : url.split('be/')[1];
                    self.newVideo.hosting_type = 'youtube';
                    self.newVideo.hosting_id = video_id;
                    return self.newVideo.thumbnail_url = 'https://img.youtube.com/vi/' + video_id + '/hqdefault.jpg';
                } else if (url.indexOf('vimeo') != -1) {
                    var video_id = url.split('.com/')[1];
                    self.newVideo.hosting_type = 'vimeo';
                    self.newVideo.hosting_id = video_id;
                    $http.jsonp('https://api.vimeo.com/videos/' + video_id + '/pictures.json?callback=JSON_CALLBACK').then(function (res) {
                        //$http.jsonp('http://www.vimeo.com/api/v2/video/' + video_id + '.json?callback=JSON_CALLBACK').then(function (res) {
                        return self.newVideo.thumbnail_url = angular.isDefined(res.data[0].sizes[6])
                            ? res.data[0].sizes[6] : angular.isDefined(res.data[0].sizes[5])
                            ? res.data[0].sizes[5] : angular.isDefined(res.data[0].sizes[4])
                            ? res.data[0].sizes[4] : res.data[0].sizes[3];
                    });
                } else if (url.indexOf('dailymotion') != -1) {
                    var video_id = url.split('video/')[1].split('_')[0];
                    self.newVideo.hosting_type = 'dailymotion';
                    self.newVideo.hosting_id = video_id;
                    $http.get('https://api.dailymotion.com/video/' + video_id + '?fields=thumbnail_large_url').then(function (res) {
                        return self.newVideo.thumbnail_url = res.data.thumbnail_large_url;
                    });
                } else if (url.indexOf('youku') != -1) {
                    self.newVideo.hosting_type = 'youku';
                    self.newVideo.hosting_id = undefined;

                } else if (url.indexOf('vine') != -1) {
                    self.newVideo.hosting_type = 'vine';
                    self.newVideo.hosting_id = undefined;
                    $http.get('/utils/get-vine-data.php?url=' + url).then(function (res) {
                        return self.newVideo.thumbnail_url = res.data;
                    });
                }
            }
        };

        self.validateNewVideoForm = function () {
            var test = true;
            var msg = 'Your project is missing:';
            if (!self.newVideo.name.length) {
                msg += 'Project Title, ';
                $rootScope.toastMessage();
                test = false;
            }
            if (self.uploadType == 2 && !self.newVideo.video_url.length) {
                msg += 'Video URL, ';
                test = false;
            }
            if (angular.isUndefined(self.genresArr) || (angular.isArray(self.genresArr) && !self.genresArr.length)) {
                msg += 'Genres, ';
                test = false;
            }
            if (angular.isUndefined(self.newVideo.type)) {
                msg += 'Type, ';
                test = false;
            }
            if (angular.isUndefined(self.newVideo.language)) {
                msg += 'Language, ';
                test = false;
            }
            if (self.newVideo.runTime == 0) {
                msg += 'Duration';
                test = false;
            }
            if (!test) {
                $rootScope.toastMessage(msg);
                alert(msg);
            }
            return test;
        };

        self.syncGenres = function (bool, item) {
            if (bool) {
                // add item
                self.genresArr.push(item);
            } else {
                // remove item
                for (var i = 0; i < self.genresArr.length; i++) {
                    if (self.genresArr[i].id == item.id) {
                        self.genresArr.splice(i, 1);
                    }
                }
            }
        };

        self.isCheckedGenre = function (id) {
            var match = false;
            for (var i = 0; i < self.genresArr.length; i++) {
                if (self.genresArr[i].id == id) {
                    match = true;
                }
            }
            return match;
        };

        self.submitNewVideo = function () {
            if (!!self.validateNewVideoForm()) {
                if (angular.isArray(self.genresArr) && self.genresArr.length) {
                    self.newVideo.genres = _.pluck(self.genresArr, 'id');
                }

                var filmParams = {
                    name: self.newVideo.name,
                    description: self.newVideo.description,
                    director: self.newVideo.director,
                    writer: self.newVideo.writer,
                    producers: self.newVideo.producers,
                    keyCast: self.newVideo.keyCast,
                    completionDate: moment({year: self.newVideo.completionDate}).startOf('year').format('YYYY-MM-DD HH:MM:SS'),
                    owner_id: self.newVideo.owner,
                    runTime: self.newVideo.runTime,
                    video_url: self.newVideo.video_url,
                    thumbnail_url: self.newVideo.thumbnail_url,
                    hosting_type: self.newVideo.hosting_type,
                    hosting_id: self.newVideo.hosting_id,
                    tags: self.newVideo.tags,
                    disableComments: self.newVideo.disableComments || false,
                    disableCritique: self.newVideo.disableCritique || false,
                    language_id: self.newVideo.language,
                    filmingCountry_id: self.newVideo.filmingCountry,
                    // originCountry: self.newVideo.originCountry,
                    type_id: self.newVideo.type,
                    unlist: self.newVideo.unlist,
                    nsfw: self.newVideo.nsfw,
                    copyrightOwner: self.newVideo.copyrightOwner,
                    genres: self.newVideo.genres
                };

                DataService.save('projects', filmParams)
                    .then(function (film) {
                        console.log(film.data.data);
                        $rootScope.toastMessage('Video Uploaded Successfully');
                        // register Action
                        $state.go('video', {url_id: film.data.data.url_id});
                        //return film;
                    }, function (err) {
                        // console.log(err);
                        alert('Failed to create new video, with error: ' + err.message);
                    });

            } else {
                $rootScope.toastMessage('Please check the form!');
            }
        };



        self.uploadArtwork = function (file) {
            Upload.upload({
                url: 'https://api.cloudinary.com/v1_1/indiewise/upload',
                params: {upload_preset: 'dzachn6p'},
                data: {file: file},
                skipAuthorization: true  // `Authorization: Bearer <token>` will not be sent on this request.
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                self.newVideo.thumbnail_url = resp.data.secure_url;
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };


        self.files = []; //JSON.parse($window.localStorage.getItem('files') || '[]');

        self.pickFile = function () {

            filepickerService.pick({
                    mimetype: 'video/mp4'
                },
                self.onSuccess
            );
        };

        self.onSuccess = function (Blob) {
            self.newVideo.hosting_type = 'HTML5';
            self.newVideo.video_url = Blob.url;
            // self.files.push(Blob);
            // $window.localStorage.setItem('files', JSON.stringify(self.files));
        };
    }

    ProfileVideoEditCtrl.$inject = ['$rootScope', '$state', '$modal', 'UserActions', 'Project', 'DataService', 'anchorSmoothScroll', 'Upload', '_'];
    function ProfileVideoEditCtrl($rootScope, $state, $modal, UserActions, Project, DataService, anchorSmoothScroll, Upload, _) {
        var self = this;
        self.project = Project.data.data;
        self.uploadType = 2;
        self.genresArr = self.project.genres;
        self.saveComplete = false;
        self.editedProject = angular.copy(self.project);
        angular.extend(self.editedProject, {
            type_id: self.project.type_id,
            language_id: self.project.language_id,
            filmingCountry_id: self.project.filmingCountry_id,
            completionDate: moment(self.project.completionDate).year()
        });
        // console.log(self.editedProject);

        if (self.project.runTime) {
            var totalSeconds = self.project.runTime;
            self.runtime = {};
            self.runtime.hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            self.runtime.mins = Math.floor(totalSeconds / 60);
            self.runtime.secs = totalSeconds % 60;
        }

        if (angular.isString(self.project.video_url)) {
            self.uploadType = 2;
        }

        $rootScope.generateGenres().then(function (res) {
            $rootScope.genresList = self.genresList = res;
        });
        $rootScope.generateTypes().then(function (res) {
            $rootScope.typesList = self.typesList = res;
        });
        $rootScope.generateCountries().then(function (res) {
            $rootScope.countryList = self.countryList = res;
        });
        $rootScope.generateLanguages().then(function (res) {
            $rootScope.languageList = self.languageList = res;
        });

        self.syncGenres = function (bool, item) {
            if (bool) {
                // add item
                self.genresArr.push(item);
                /*DataService.save('Genres', {project: self.editedProject.id, genre: item.id}, true, true)
                 .then(function (res) {
                 self.genresArr.push(res.data);
                 });*/
            } else {
                // remove item
                for (var i = 0; i < self.genresArr.length; i++) {
                    if (self.genresArr[i].id == item.id) {
                        DataService.delete('Genres', self.genresArr[i].id);
                        self.genresArr.splice(i, 1);
                    }
                }
            }
        };

        self.isCheckedGenre = function (id) {
            var match = false;
            for (var i = 0; i < self.genresArr.length; i++) {
                if (self.genresArr[i].id == id) {
                    match = true;
                }
            }
            return match;
        };

        self.runtimeToSeconds = function () {
            self.editedProject.runTime = self.project.runTime = (self.runtime.hours * 3600) + (self.runtime.mins * 60) + self.runtime.secs;
        };

        self.isURL = function (str) {
            var urlRegex = '[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)';
            var url = new RegExp(urlRegex, 'i');
            return str.length < 2083 && url.test(str);
        };

        self.getThumbnailUrl = function (url) {
            if (url != null && url != '') {
                if (url.indexOf('youtu') != -1) {
                    var video_id = url.split('v=')[1].split('&')[0];
                    return self.editedProject.thumbnail_url = self.project.thumbnail_url = 'http://img.youtube.com/vi/' + video_id + '/mqdefault.jpg';
                } else if (url.indexOf('vimeo') != -1) {
                    var video_id = url.split('.com/')[1];
                    $http.jsonp('http://www.vimeo.com/api/v2/video/' + video_id + '.json?callback=JSON_CALLBACK').then(function (res) {
                        return self.editedProject.thumbnail_url = self.project.thumbnail_url = res.data[0].thumbnail_large;
                    });
                } else if (url.indexOf('dailymotion') != -1) {
                    var video_id = url.split('video/')[1].split('_')[0];
                    $http.get('https://api.dailymotion.com/video/' + video_id + '?fields=thumbnail_large_url').then(function (res) {
                        return self.editedProject.thumbnail_url = self.project.thumbnail_url = res.data.thumbnail_large_url;
                    });
                } else if (url.indexOf('youku') != -1) {

                } else if (url.indexOf('vine') != -1) {
                    $http.get('api/utils/get-vine-data?url=' + url).then(function (res) {
                        return self.editedProject.thumbnail_url = self.project.thumbnail_url = res.data;
                    });
                }
            }
        };

        self.uploadArtwork = function (file) {
            Upload.upload({
                url: 'https://api.cloudinary.com/v1_1/indiewise/upload',
                params: {upload_preset: 'dzachn6p'},
                data: {file: file},
                skipAuthorization: true  // `Authorization: Bearer <token>` will not be sent on this request.
            }).then(function (resp) {
                console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                self.editedProject.thumbnail_url = resp.data.secure_url;
                DataService.update('projects', self.editedProject.id, self.editedProject);
            }, function (resp) {
                console.log('Error status: ' + resp.status);
            }, function (evt) {
                var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
        };

        self.updateProject = function () {
            self.editedProject.genres = _.pluck(self.genresArr, 'id');
            self.editedProject.completionDate = moment({year: self.editedProject.completionDate}).startOf('year').format('YYYY-MM-DD HH:mm:ss');
            DataService.update('projects', self.editedProject.id, self.editedProject)
                .then(function (res) {
                    // console.log(res);
                    self.saveComplete = true;
                    // anchorSmoothScroll.scrollTo('success');
                    $rootScope.toastMessage('Video Updated');
                    $state.go('profile.videos');
                });
        };

        /*self.deleteProject = function (ev) {
         if ($rootScope.AppData.User && ($rootScope.AppData.User.id === self.project.owner.id)) {
         var confirm = $modal.confirm()
         .title('Would you like to delete your project?')
         //.content('All of the banks have agreed to <span class="debt-be-gone">forgive</span> you your debts.')
         //.ariaLabel('Lucky day')
         .targetEvent(ev)
         .ok('Delete it!')
         .cancel('Never mind');
         $modal.show(confirm).then(function () {
         //self.project.set('disableProject', true);
         self.project.destroy({
         success: function (myObject) {
         // The object was deleted from the Parse Cloud.
         $state.go('profile');
         },
         error: function (myObject, error) {
         // The delete failed.
         // error is a Parse.Error with an error code and message.
         }
         });
         $state.go('profile');
         }, function () {
         //$scope.status = 'You decided to keep your debt.';
         });
         }
         }*/

    }

    ProfilePlaylistsController.$inject = ['$rootScope', 'DataService', 'User', 'Playlists', 'UserActions', '_', '$interval', '$http'];
    function ProfilePlaylistsController($rootScope, DataService, User, Playlists, UserActions, _, $interval, $http) {
        var self = this;
        self.user = User.data;
        self.playlists = Playlists.data.playlists;
        self.playlistItems = [];
        var hasFave = _.findWhere(self.playlists, {name: 'Favorites', private: true});
        self.selectedPlaylist = !!hasFave ? hasFave.id : self.playlists.length ? self.playlists[0].id : null;

        self.loadPlaylistItems = function () {
            DataService.collection('playlistItems', {playlist: self.selectedPlaylist, include: 'project.owner'})
                .then(function (res) {
                    // console.log(res);
                    self.playlistItems = res.data.data;
                })
        };

        self.removeItem = function (id) {
            UserActions.checkAuth().then(function (res) {
                if (res) {
                    DataService.delete('PlaylistItem', id).then(function () {
                        return self.playlists = _.reject(self.playlists, function (a) {
                            return a.id === id;
                        });
                    })
                }
            });
        };

        // autoload if preselect
        if (angular.isString(self.selectedPlaylist)) {
            self.loadPlaylistItems();
        }
    }

    ProfileSettingsController.$inject = ['$rootScope', 'AuthService', 'User', 'Genres', 'UserTypes', 'DataService', 'anchorSmoothScroll', '_', '$window', '$intercom'];
    function ProfileSettingsController($rootScope, AuthService, User, Genres, UserTypes, DataService, anchorSmoothScroll, _, $window, $intercom) {
        var self = this;
        self.countries = [];
        self.genresArr = [];
        self.typesArr = [];
        self.saveComplete = false;
        self.updating = false;
        User.dob = moment(User.dob).startOf('day').toDate();
        User.settings = angular.isObject(User.settings) ? User.settings : JSON.parse(User.settings||'{}');
        self.user = User;
        self.genresArr = User.genres; //Genres.data.data;
        self.typesArr = User.types;// UserTypes.data.data;
        self.updateUser = _.throttle(updateUser, 1000);
        var pwSetting = $window.localStorage.getItem('pwAllowPushNotifications');
        self.notificationsActive = pwSetting !== 'undefined' && !!JSON.parse(pwSetting);
        self.toggleNotifications = toggleNotifications;
        self.requestVerificationEmail = requestVerificationEmail;
        self.verificationEmailSentMessage = false;

        function toggleNotifications() {
            $window.localStorage.setItem('pwAllowPushNotifications', self.notificationsActive);

            if (!!self.notificationsActive) {
                // subscribe device push notifications
                if ($window.pwCanUseServiceWorkers() || angular.isDefined(window.safari)) {
                    if ($window.chrome && $window.pushwoosh.isBrowserChrome()) {
                        $window.pushwoosh.subscribeAtStart();
                    } else {
                        $window.pushwooshSubscribe();

                        $window.pushwooshSetTags({
                            id: self.user.id,
                            urlId: self.user.url_id,
                            username: self.user.email,
                            firstName: self.user.firstName,
                            lastName: self.user.lastName
                        });
                    }

                }
            }
        }

        function updateUser() {
            if (!self.updating) {
                var user = self.user;
                self.updating = true;
                user.genres = _.pluck(self.genresArr, 'id');
                user.types = _.pluck(self.typesArr, 'id');
                user.settings = JSON.stringify(user.settings);
                AuthService.updateUser(user).then(function (res) {
                    // console.log(res);
                    res.data.data.dob = moment(res.data.data.dob).toDate();
                    res.data.data.settings = JSON.parse(res.data.data.settings);
                    AuthService.currentUser = self.user = res.data.data;
                    $intercom.update(self.user );
                    self.saveComplete = true;
                    self.updating = false;
                    anchorSmoothScroll.scrollTo('success');
                    $rootScope.toastMessage('Profile Updated');
                });
            } else {
                $rootScope.toastMessage('Please wait...');
            }
        }

        function requestVerificationEmail() {
            AuthService.requestVerification().then(function () {
                self.verificationEmailSentMessage = true;
            });
        }

        $rootScope.generateCountries().then(function (res) {
            self.countries = res;
        });

        $rootScope.generateGenres().then(function (res) {
            self.genresList = res;
        });

        $rootScope.generateTypes().then(function (res) {
            self.typesList = res;
        });

        self.syncGenres = function (bool, item) {
            if (bool) {
                // add item
                self.genresArr.push(item);
            } else {
                // remove item
                for (var i = 0; i < self.genresArr.length; i++) {
                    if (self.genresArr[i].id == item.id) {
                        DataService.delete('Genres', self.genresArr[i].id);
                        self.genresArr.splice(i, 1);
                    }
                }
            }
        };

        self.isCheckedGenre = function (id) {
            var match = false;
            for (var i = 0; i < self.genresArr.length; i++) {
                if (self.genresArr[i].id == id) {
                    match = true;
                }
            }
            return match;
        };

        self.syncTypes = function (bool, item) {
            if (bool) {
                // add item
                self.typesArr.push(item);
            } else {
                // remove item
                for (var i = 0; i < self.typesArr.length; i++) {
                    if (self.typesArr[i].id == item.id) {
                        DataService.delete('UserTypes', self.typesArr[i].id);
                        self.typesArr.splice(i, 1);
                    }
                }
            }
        };

        self.isCheckedType = function (id) {
            var match = false;
            for (var i = 0; i < self.typesArr.length; i++) {
                if (self.typesArr[i].id == id) {
                    match = true;
                }
            }
            return match;
        };

    }

    UserCtrl.$inject = ['$rootScope', 'DataService', 'User', 'UserStats', '$state', 'UserActions', '$modal', '_'];
    function UserCtrl($rootScope, DataService, User, UserStats, $state, UserActions, $modal, _) {
        var self = this;
        self.user = User;
        self.userStats = UserStats;
        $rootScope.metadata.title = 'Profile: ' + self.user.firstName + ' ' + self.user.lastName;

        self.showMessageDialog = function () {
            ContactUserDialogController.$inject = ['$rootScope', '$scope', '$modalInstance', 'UserActions', 'DataService', 'recipient', '$timeout'];
            function ContactUserDialogController($rootScope, $scope, $modalInstance, UserActions, DataService, recipient, $timeout) {


                $scope.recipient = recipient;
                $scope.model = {
                    mySubject: $rootScope.AppData.User.fullName + ', ' + $scope.recipient.fullName,
                    myMessage: null
                };

                $scope.postMessage = function () {
                    UserActions.checkAuth().then(function (res) {
                        if (res) {
                            // create new conversation
                            DataService.save('messages', {
                                subject: $scope.model.mySubject,
                                message: $scope.model.myMessage,
                                recipients: new Array($scope.recipient.id)
                            }).then(function (convo) {
                                $scope.model.myMessage = null;
                                $rootScope.toastMessage('Message sent!');
                                // register Action
                                //result.participants = $scope.recipient;
                                $scope.closeDialog();

                                // Creates Duplicate entry Error
                                /*DataService.update('Conversation', convo.data.id, {
                                 id: convo.data.id,
                                 participants: [
                                 {user: $rootScope.AppData.User.id},
                                 {user: $scope.recipient.id}
                                 ],
                                 messages: [
                                 {body: $scope.model.myMessage, from: $rootScope.AppData.User.id}
                                 ]
                                 }, true, true).then(function (convo) {

                                 });*/
                            });
                        }
                    }, function (err) {
                        $rootScope.toastMessage('Message failed. Please log in!');
                        //UserActions.loginModal();
                    });
                };

                $scope.closeDialog = function () {
                    $modalInstance.close(true);
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };

            }

            UserActions.checkAuth().then(function (res) {
                if (res) {
                    $modal.open({
                        templateUrl: 'common/contactUserDialog.html',
                        resolve: {
                            recipient: function () {
                                return self.user;
                            }
                        },
                        controller: ContactUserDialogController
                    });
                }
            }, function (err) {
                UserActions.loginModal();
            });
        };
    }

    UserAboutController.$inject = ['$rootScope', 'DataService', 'User', '$state', 'UserActions'];
    function UserAboutController($rootScope, DataService, User, $state, UserActions) {
        var self = this;
        self.user = User;
        // console.log(self.user);
    }

    UserVideosController.$inject = ['$rootScope', 'DataService', 'User', 'Videos', '$modal', 'UserActions', '_'];
    function UserVideosController($rootScope, DataService, User, Videos, $modal, UserActions, _) {
        var self = this;
        self.user = User;
        self.projects = Videos.data;

        self.deleteProject = function (videoId) {
            UserActions.checkAuth().then(function (res) {
                if (res) {
                    var modalInstance = $modal.open({
                        templateUrl: 'common/confirmDialog.html',
                        controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                            $scope.ok = function () {
                                $modalInstance.close(true);
                            };

                            $scope.cancel = function () {
                                $modalInstance.dismiss('cancel');
                            };
                        }],
                        size: Foundation.MediaQuery.atLeast('large') ? 'tiny' : 'small',
                        keyboard: true
                    });
                    modalInstance.result.then(function () {
                        DataService.delete('projects', videoId).then(function () {
                            self.projects.data = _.reject(self.projects.data, function (a) {

                                return a.id === videoId;
                            });
                        });
                    }, function () {
                        // console.info('Modal dismissed at: ' + new Date());
                    });
                }
            });
        }
    }

    UserCritiquesController.$inject = ['$rootScope', 'User', 'Critiques', 'Critiqued'];
    function UserCritiquesController($rootScope, User, Critiques, Critiqued) {
        var self = this;
        self.user = User;
        self.critiques = Critiques.data.data;
        self.critiqued = Critiqued.data.data;
    }

    UserReactionsController.$inject = ['$rootScope', 'User', 'Reactions', 'Reacted', '_'];
    function UserReactionsController($rootScope, User, Reactions, Reacted, _) {
        var self = this;
        self.user = User;
        self.reactions = Reactions.data.data;
        self.reacted = Reacted.data.data;

        self.getEmoticonByEmotion = function (emotion) {
            var reactions = $rootScope.generateReactions();
            return _.findWhere(reactions, {emotion: emotion});
        };

    }

    UserAwardsController.$inject = ['$rootScope', 'DataService', 'User', 'Awards', 'Nominations', 'Nominated'];
    function UserAwardsController($rootScope, DataService, User, Awards, Nominations, Nominated) {
        var self = this;
        self.user = User;
        self.awards = Awards.data.data;
        self.nominations = Nominations.data.data;
        self.nominated = Nominated.data.data;
    }

    MessagesCtrl.$inject = ['$rootScope', '$scope', 'Conversations', 'DataService', '$window', '$modal', 'UserActions', '$timeout', '$q', '_'];
    function MessagesCtrl($rootScope, $scope, Conversations, DataService, $window, $modal, UserActions, $filter, $q, _) {
        $rootScope.metadata.title = 'Messages';
        var self = this;
        self.selectedConvo = null;
        self.conversations = Conversations.data.conversations;
        self.newMode = false;
        self.newConversation = newConversation;
        self.fetchConvos = fetchConvos;
        self.querySearch = querySearch;
        self.leaveConvo = leaveConvo;
        self.doSendOnEnter = doSendOnEnter;
        self.postReply = postReply;
        self.selectConvo = selectConvo;
        self.getParticipantById = getParticipantById;
        self.myReply = null;
        self.sendOnEnter = $window.localStorage.sendOnEnter ? JSON.parse($window.localStorage.sendOnEnter) : true;
        self.inboxConvos = {};
        self.convoMessages = {};
        self.selectedConvoLoaded = false;
        self.viewportHeight = { height: 500 + 'px' };

        function selectConvo(convo) {
            self.newMode = false;
            self.selectedConvoLoaded = false;
            self.selectedConvo = convo;
            self.currentParticipants = convo.participants;
            DataService.item('messages', convo.id).then(function (msgs) {
                // console.log('Messages: ', msgs.data);
                self.messages = msgs.data.conversation.messages;

                self.convoMessages = {
                    first: 1,
                    data: [],
                    meta: {
                        pagination: {
                            current_page: 1
                        }
                    },
                    get: function (index, count, success) {
                        console.log('index = ' + index + '; count = ' + count);
                        var start = index;
                        var end = Math.min(index + count - 1, this.first);
                        if (this.meta.pagination.total_pages >= this.meta.pagination.current_page) {
                            this.meta.pagination.current_page++;
                        }
                        DataService.collection('messages/' + self.selectedConvo.id + '/messages', {per_page: count, page: this.meta.pagination.current_page})
                            .then(function(response) {
                                self.convoMessages.data = _.union(self.convoMessages.data, response.data.data);
                                angular.extend(self.convoMessages.meta, response.data.meta);
                            })
                            .then(function() {
                                console.log(self.convoMessages);
                                // reverse logic
                                var result = [];
                                if (start <= end) {
                                    for (var i = start; i <= end; i++) {
                                        var serverDataIndex = /*(self.convoMessages.meta.pagination.current_page > 1) ? 0 :*/ (-1) * i + self.convoMessages.first;
                                        var item = self.convoMessages.data[serverDataIndex];
                                        if (item) {
                                            result.push(item);
                                        }
                                    }
                                }

                                success(result);
                            });
                    }
                };
                self.selectedConvoLoaded = true;
            });
        }

        function doSendOnEnter() {
            if (self.sendOnEnter && self.myReply) {
                self.postReply();
            }
        }

        function postReply() {
            if (self.myReply) {
                UserActions.checkAuth().then(function (res) {
                    if (res) {
                        var reply = self.myReply;
                        self.myReply = null;
                        DataService.update('messages', self.selectedConvo.id, {message: reply})
                            .then(function (result) {
                                // self.adapter.append([result.data.message]);
                                self.convoMessages.data.push(result.data.message);
                                $scope.adapter.append([result.data.message]);
                                // update convos
                                self.messages.push(result.data.message);
                                self.fetchConvos();

                            }, function (response) {
                                self.reply = reply;
                            })
                            .then(function () {
                                // scroll to bottom of viewport
                                var viewport = angular.element('.viewport.main-comment');
                                viewport.scrollTop(viewport.prop("scrollHeight"));
                            });
                    }
                }, function (err) {
                    UserActions.loginModal();
                });
            }
        }

        function newConversation() {
            self.newMode = true;
            self.newConvo = {
                participants: [],
                body: ''
            };

            self.postNewMsg = postNewMsg;

            function postNewMsg() {
                var newConvoObj = new Parse.Object('Conversation');
                // Create Conversation
                newConvoObj.save().then(function (convo) {

                    // Set Participants
                    self.newConvo.participants.push($rootScope.AppData.User.id);
                    var relParticipants = convo.relation('participants');
                    relParticipants.add(self.newConvo.participants);
                    newConvoObj.save();

                    // Create Message
                    var message = new Parse.Object('Message');
                    message.set('body', self.newConvo.body);
                    message.set('parent', convo);
                    message.set('from', $rootScope.AppData.User.id);
                    message.save().then(function (result) {
                        // Clear forms
                        self.myReply = null;
                        self.newConvo.body = null;

                        // Clear Conversation
                        self.selectedConvo = convo;
                        self.currentParticipants = self.newConvo.participants;
                        self.messages = [result];
                    }).then(function () {
                        // Update Conversations List
                        var convoDup = angular.copy(convo);
                        convoDup.participants = self.newConvo.participants;
                        convoDup.latest = self.messages;
                        self.convos.push(convoDup);

                        // Switch view to conversation
                        self.newMode = false;

                    });

                });
            }
        }

        /**
         * Search for contacts.
         */
        function querySearch(query) {
            var deferred = $q.defer();
            deferred.reject(false);
            return deferred.promise;
        }

        function fetchConvos() {
            DataService.collection('messages').then(function (result) {
                self.conversations = result.data.conversations;
            });
        }

        function leaveConvo() {
            // TODO replacve confirm dialog
            var confirm = $modal.confirm()
                .title('Leave Conversation?')
                //.textContent('Are you sure you want to delete this conversation?')
                //.ariaLabel('Lucky day')
                //.targetEvent(ev)
                .ok('Yes')
                .cancel('No');
            $modal.show(confirm).then(function () {
                var me = $rootScope.AppData.User.id;
                var message = new Parse.Object('Message');
                message.set('body', me.first_name + ' ' + me.last_name + ' left the conversation...');
                message.set('parent', {
                    __type: 'Pointer',
                    className: 'Conversation',
                    objectId: self.selectedConvo.id
                });
                message.set('from', $rootScope.AppData.User.id);
                message.save().then(function (result) {
                    var relParticipants = self.selectedConvo.relation('participants');
                    relParticipants.remove(me);

                    self.selectedConvo.set('updatedAt', moment().toDate());
                    self.selectedConvo.save().then(function () {
                        self.myReply = null;
                        self.messages = [];
                        self.newMode = false;
                        self.selectedConvo = null;
                        self.currentParticipants = null;

                        // Refresh List
                        fetchConvos()
                    });
                });
            }, function () {
            });
        }

        function getParticipantById(convo, userId) {
            return _.findWhere(convo.participants, {user_id: userId});
        }
    }

    NotificationsCtrl.$inject = ['$rootScope', 'UserActions', '_'];
    function NotificationsCtrl($rootScope, UserActions, _) {
        var self = this;
        self.refresh = function () {
            //$rootScope.getFlatNotificationsFeed();
        };

        self.markAllAsRead = function () {
            /*$rootScope.getNewToken('flat', $rootScope.AppData.User.id).then(function (token) {
             var feed = window.StreamClient.feed('flat_notifications', $rootScope.AppData.User.id, token);
             feed.get({limit: 20, mark_read: true}, function (a) {
             _.each($rootScope.AppData.NotificationsFeed.list, function (n) {
             n.is_read = true;
             });
             $rootScope.AppData.NotificationsFeed.unread = 0;
             })
             });*/
        };

        self.markAsRead = function (n) {
            /*$rootScope.getNewToken('flat', $rootScope.AppData.User.id).then(function (token) {
             var feed = window.StreamClient.feed('flat_notifications', $rootScope.AppData.User.id, token);
             feed.get({limit: 5, mark_read: [n.id]}, function (a) {
             n.is_read = true;
             --$rootScope.AppData.NotificationsFeed.unseen;
             --$rootScope.AppData.NotificationsFeed.unread;
             return n;
             })
             });*/
        };

        self.refresh();
    }

    ContactPageCtrl.$inject = ['$rootScope', 'DataService', '$sce', '_'];
    function ContactPageCtrl($rootScope, DataService, $sce, _) {
        var self = this;
        self.emails = [
            {
                title: 'Technical Support',
                address: 'support@getindiewise.com',
                description: 'For all your Tech Support Needs and Issues.'
            },
            {
                title: 'SafeGuard',
                address: 'safeguard@getindiewise.com',
                description: 'IndieWise cares about the safety and well-being of its users. Contact us immediately, if you come across any inappropriate content on the site. This includes, but is not limited to: content that is Excessively Violent, Pornographic, Racially Offensive, Unlawful, of a Bullying Nature, Directly Harmful to any Individual, Copyright Infringement, Spam, etc.'
            },
            {
                title: 'Marketing',
                address: 'marketing@getindiewise.com',
                description: 'Would you like to advertise your company to our vast and diverse audience? Would you like a featured listing of your film at the top of our Homepage for all to see? Reach out today!'
            },
            {
                title: 'Awards',
                address: 'awards@getindiewise.com',
                description: 'So you have such an amazing project, that 5 or more Users felt like you deserve an Award for it! Congrats! We can help!'
            },
            {
                title: 'Public Relations',
                address: 'pr@getindiewise.com',
                description: 'Reach out for any press and/or media inquiries. Also let us know if you’d like to be featured in our bi-weekly newsletter. Also stay tuned for important announcements and updates!'
            },
            {
                title: 'Career Center',
                address: 'careers@getindiewise.com',
                description: 'Interested in joining Team IndieWise? Let us know! There are several internship opportunities available.'
            },
            {
                title: 'Become a Sponsor',
                address: 'sponsor@getindiewise.com',
                description: 'We’ve reserved a unique spot on our homepage to showcase our amazing sponsors. If you’re interested in becoming a sponsor of IndieWise, let us know!'
            },
            {
                title: 'Invest in IndieWise',
                address: 'investors@getindiewise.com',
                description: 'So you’d like to take the bold step of investing in IndieWise! Great choice. Let’s talk!'
            },
            {
                title: 'Register for IndieWise Convention (JULY 28-30, 2017)',
                address: 'convention@getindiewise.com',
                description: 'Register for our Annual Convention, in Miami, FL! Registration opens on JAN 2, 2017. Over 10,000 Filmmakers from 140+ Countries will be in attendance, as we provide you with 3 days of interactive workshops, educational seminars, film screenings, VIP Receptions, a Yacht Party, and a Closing Gala.<br>Regular 3- Day Package: $150  |  VIP 3-Day Package (Including Yacht Party): $250 (450 Tickets max. To Be Sold)'
            },
            {
                title: 'Feedback Center',
                address: 'feedback@getindiewise.com',
                description: 'We welcome any feedback you have, to help us to provide you with the very best experience! Tell us!'
            },
        ];
        self.selectedEmail = _.contains(_.pluck(self.emails, 'address'), $rootScope.$stateParams.email) ? _.findWhere(self.emails, { address: $rootScope.$stateParams.email}) : null;
        self.description = '';
        self.getDescription = function () {
            self.description = angular.isObject(self.selectedEmail) ? $sce.trustAsHtml(self.selectedEmail.description) : $sce.trustAsHtml('');
        };
        self.getDescription();

        self.form = {
            to: '',
            name: '',
            email: '',
            subject: '',
            message: ''
        };

        self.submitForm = function () {
            self.form.to = self.selectedEmail.address;
            DataService.mail('contact', self.form).then(function (res) {
                $rootScope.toastMessage('Message Sent, Thank you!');
                self.form = {
                    to: '',
                    name: '',
                    email: '',
                    subject: '',
                    message: ''
                };
            });
        }
    }
})
();
/**
 * Created by Jerez Bain on 9/14/2015.
 */
(function () {
    'use strict';
    angular.module('IndieWise.directives', [])
        .directive('layerSlider', ['$rootScope', '$timeout', 'DataService', function ($rootScope, $timeout, DataService) {
            return {
                restrict: 'E',
                transclude: true,
                templateUrl: 'directives/layerSlider.html',
                scope: {},
                link: function (scope, el, attrs) {
                    DataService.collection('users/count').then(function (res) {
                        scope.users = res.data;
                    }).then(function () {
                        $timeout(function () {
                            jQuery("#layerslider").layerSlider({
                                responsive: false,
                                responsiveUnder: 1280,
                                layersContainer: 1280,
                                skin: 'noskin',
                                hoverPrevNext: false,
                                skinsPath: BASE + 'assets/layerslider/skins/'
                            });
                        }, 0);
                    });
                }
            }
        }])
        .directive('premiumCarousel', ['$rootScope', '$state', '$timeout', 'DataService', function ($rootScope, $state, $timeout, DataService) {
            return {
                restrict: 'E',
                replace: true,
                //transclude: true,
                templateUrl: 'directives/featured-area.html',
                scope: {},
                link: function (scope, el, attrs) {
                    DataService.collection("projects", {}[{
                            fieldName: "unlist",
                            operator: "is",
                            value: false
                        }],
                        12, true, true, 1).then(function (result) {
                        scope.featuredFilms = result.data;
                        // console.log("featuredFilms: ", scope.featuredFilms);
                    }).then(function () {
                        $timeout(function () {
                            // console.log('run owl');
                            //Premium carousel
                            var carouselEl = jQuery('#owl-featured');
                            carouselEl.each(function () {
                                var owl = jQuery(this);
                                jQuery(".prev").on('click', function () {
                                    carouselEl.trigger('prev.owl.carousel');
                                });

                                jQuery(".next").on('click', function () {
                                    carouselEl.trigger('next.owl.carousel');
                                });
                                var loopLength = owl.data('car-length');
                                var divLength = jQuery(this).find("div.item").length;
                                if (divLength > loopLength) {
                                    owl.owlCarousel({
                                        dots: owl.data("dots"),
                                        items: owl.data("items"),
                                        slideBy: owl.data("slideby"),
                                        center: owl.data("center"),
                                        loop: owl.data("loop"),
                                        margin: owl.data("margin"),
                                        nav: owl.data("nav"),
                                        autoplay: owl.data("autoplay"),
                                        autoplayTimeout: owl.data("autoplay-timeout"),
                                        autoWidth: owl.data("auto-width"),
                                        autoHeight: owl.data("auto-Height"),
                                        merge: owl.data("merge"),
                                        responsive: {
                                            0: {
                                                items: owl.data("responsive-small"),
                                                nav: false
                                            },
                                            600: {
                                                items: owl.data("responsive-medium"),
                                                nav: false
                                            },
                                            1000: {
                                                items: owl.data("responsive-large"),
                                                nav: false
                                            },
                                            1900: {
                                                items: owl.data("responsive-xlarge"),
                                                nav: false
                                            }
                                        }
                                    });

                                } else {
                                    owl.owlCarousel({
                                        dots: false,
                                        items: owl.data("items"),
                                        loop: false,
                                        margin: owl.data("margin"),
                                        autoplay: false,
                                        autoplayHoverPause: true,
                                        responsiveClass: true,
                                        autoWidth: owl.data("auto-width"),
                                        autoHeight: owl.data("auto-Height"),
                                    });
                                }
                            });
                        }, 300);
                    });

                    scope.isMobile = $rootScope.isMobile;

                }
            }
        }])
        .directive('watchingCarousel', ['$rootScope', '$timeout', '$interval', 'DataService', function ($rootScope, $timeout, $interval, DataService) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'directives/people-watching.html',
                scope: {},
                link: function (scope, el, attrs) {
                    scope.getWatchedList = function () {
                        DataService.collection('projects/watched').then(function (result) {
                            scope.watched = result.data;
                            // console.log('watched');
                            // console.log(scope.watched);
                            $timeout(function () {
                                //console.log('run owl');
                                //Premium carousel
                                jQuery('.owl-carousel').each(function () {
                                    var owl = jQuery(this);
                                    jQuery(".prev").on('click', function () {
                                        jQuery(this).parent().parent().parent().parent().next().trigger('prev.owl.carousel');
                                    });

                                    jQuery(".next").on('click', function () {
                                        jQuery(this).parent().parent().parent().parent().next().trigger('next.owl.carousel');
                                    });
                                    var loopLength = owl.data('car-length');
                                    var divLength = jQuery(this).find("div.item").length;
                                    if (divLength > loopLength) {
                                        owl.owlCarousel({
                                            dots: owl.data("dots"),
                                            items: owl.data("items"),
                                            slideBy: owl.data("slideby"),
                                            center: owl.data("center"),
                                            loop: owl.data("loop"),
                                            margin: owl.data("margin"),
                                            nav: owl.data("nav"),
                                            autoplay: owl.data("autoplay"),
                                            autoplayTimeout: owl.data("autoplay-timeout"),
                                            autoWidth: owl.data("auto-width"),
                                            autoHeight: owl.data("auto-Height"),
                                            merge: owl.data("merge"),
                                            responsive: {
                                                0: {
                                                    items: owl.data("responsive-small"),
                                                    nav: false
                                                },
                                                600: {
                                                    items: owl.data("responsive-medium"),
                                                    nav: false
                                                },
                                                1000: {
                                                    items: owl.data("responsive-large"),
                                                    nav: false
                                                },
                                                1900: {
                                                    items: owl.data("responsive-xlarge"),
                                                    nav: false
                                                }
                                            }
                                        });

                                    } else {
                                        owl.owlCarousel({
                                            dots: false,
                                            items: owl.data("items"),
                                            loop: false,
                                            margin: owl.data("margin"),
                                            autoplay: false,
                                            autoplayHoverPause: true,
                                            responsiveClass: true,
                                            autoWidth: owl.data("auto-width"),
                                            autoHeight: owl.data("auto-Height"),
                                        });
                                    }
                                });
                            }, 0);
                        });
                    };
                    /*$interval(function () {
                     scope.getWatchedList()
                     }, 60000);*/

                    scope.getWatchedList();
                }
            }
        }])
        .directive('owlCarousel', ['$rootScope', '$timeout', '$interval', 'DataService', function ($rootScope, $timeout, $interval, DataService) {
            return {
                restrict: 'A',
                //scope: {},
                link: function (scope, el, attrs) {
                    scope.getWatchedList = function () {
                        $timeout(function () {
                                //console.log('run owl');
                                //Premium carousel
                                el.each(function () {
                                    var owl = jQuery(this);
                                    jQuery(".prev").on('click', function () {
                                        jQuery(this).parent().parent().parent().parent().next().trigger('prev.owl.carousel');
                                    });

                                    jQuery(".next").on('click', function () {
                                        jQuery(this).parent().parent().parent().parent().next().trigger('next.owl.carousel');
                                    });
                                    var loopLength = owl.data('car-length');
                                    var divLength = jQuery(this).find("div.item").length;
                                    if (divLength > loopLength) {
                                        owl.owlCarousel({
                                            dots: owl.data("dots"),
                                            items: owl.data("items"),
                                            slideBy: owl.data("slideby"),
                                            center: owl.data("center"),
                                            loop: owl.data("loop"),
                                            margin: owl.data("margin"),
                                            nav: owl.data("nav"),
                                            autoplay: owl.data("autoplay"),
                                            autoplayTimeout: owl.data("autoplay-timeout"),
                                            autoWidth: owl.data("auto-width"),
                                            autoHeight: owl.data("auto-Height"),
                                            merge: owl.data("merge"),
                                            responsive: {
                                                0: {
                                                    items: owl.data("responsive-small"),
                                                    nav: false
                                                },
                                                600: {
                                                    items: owl.data("responsive-medium"),
                                                    nav: false
                                                },
                                                1000: {
                                                    items: owl.data("responsive-large"),
                                                    nav: false
                                                },
                                                1900: {
                                                    items: owl.data("responsive-xlarge"),
                                                    nav: false
                                                }
                                            }
                                        });

                                    } else {
                                        owl.owlCarousel({
                                            dots: false,
                                            items: owl.data("items"),
                                            loop: false,
                                            margin: owl.data("margin"),
                                            autoplay: false,
                                            autoplayHoverPause: true,
                                            responsiveClass: true,
                                            autoWidth: owl.data("auto-width"),
                                            autoHeight: owl.data("auto-Height"),
                                        });
                                    }
                                });
                            }, 0);
                    };
                    /*$interval(function () {
                     scope.getWatchedList()
                     }, 60000);*/

                    scope.getWatchedList();
                }
            }
        }])
        .directive('playlists', ['$rootScope', 'DataService', 'UserActions', '_', function ($rootScope, DataService, UserActions, _) {
            return {
                restrict: 'E',
                templateUrl: 'directives/playlists.html',
                replace: false,
                scope: {
                    project: '='
                },
                link: function (scope, el, attrs) {
                    scope.model = {
                        newName: null,
                        playlistArr: [],
                    };
                    scope.playlists = [];
                    scope.newPlInput = false;

                    // Get playlists
                    if ($rootScope.AppData.User) {
                        DataService.collection('playlists')
                            .then(function (res) {
                                // Check playlist items for this video
                                DataService.collection('playlistItems', {project: scope.project.id, playlists: _.pluck(res.data.playlists, 'id').toString()})
                                    .then(function (resA) {
                                        // console.log(resA);
                                        scope.model.playlistArr = resA.data.data;

                                        // list playlists
                                        scope.playlists = res.data.playlists;
                                        // console.log(scope.playlists);
                                    });
                            });
                    }


                    scope.toggleNewPlInput = function (clear) {
                        scope.newPlInput = !scope.newPlInput;
                        if (clear) {
                            scope.model.newName = null;
                        }
                    };

                    scope.newPlaylist = function () {
                        UserActions.checkAuth().then(function (res) {
                            DataService.save('playlists', {
                                name: scope.model.newName,
                                user_id: $rootScope.AppData.User.id
                            }, false, true).then(function (pl) {
                                scope.toggleNewPlInput(false);
                                scope.model.newName = null;
                                scope.playlists.push(pl.data.data)
                            });
                        }, function (err) {
                            UserActions.loginModal().then(function (res) {
                                debugger;
                            });
                        });
                    };

                    scope.syncPlaylists = function (bool, item) {
                        if (bool) {
                            // add item
                            scope.model.playlistArr.push(item);
                            DataService.save('playlistItems', {playlist: item.id, project: scope.project.id});
                            $rootScope.toastMessage('Added to playlist');
                            // console.log('Added to playlist: ', item);
                        } else {
                            // remove item

                            for (var i = 0; i < scope.model.playlistArr.length; i++) {
                                if (scope.model.playlistArr[i].id == item.id) {
                                    var genreSetting = _.findWhere(scope.model.playlistArr, {
                                        project: scope.project.id,
                                        playlist_id: item.id
                                    });
                                    // console.log(genreSetting);
                                    if (genreSetting) {
                                        DataService.delete('PlaylistItem', genreSetting.id);
                                    }
                                    scope.model.playlistArr.splice(i, 1);
                                    $rootScope.toastMessage('Removed from playlist');
                                    // console.log('Removed from playlist: ', item);
                                }
                            }
                        }
                    };

                    scope.isCheckedPlaylist = function (id) {
                        var match = false;
                        for (var i = 0; i < scope.model.playlistArr.length; i++) {
                            if (scope.model.playlistArr[i].playlist_id == id) {
                                match = true;
                            }
                        }
                        return match;
                    };
                }
            }
        }])
        .directive('toggleShowMore', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
            return {
                restrict: 'A',
                scope: {
                    showMoreHeight: '=showMoreHeight'
                },
                link: function (scope, el, attrs) {
                    $timeout(function () {
                        //show more and less
                        el.showMore({
                            speedDown: 300,
                            speedUp: 300,
                            height: scope.showMoreHeight ? scope.showMoreHeight + 'px' : '165px',
                            showText: 'Show more',
                            hideText: 'Show less'
                        });
                    }, 500);

                }
            }
        }])
        .directive('elitePlayer', ['$rootScope', 'DataService', 'UserActions', '$timeout', '$interval', '$state', 'anchorSmoothScroll', '_', function ($rootScope, DataService, UserActions, $timeout, $interval, $state, anchorSmoothScroll, _) {
            return {
                restrict: 'E',
                templateUrl: 'directives/videoPlayer.html',
                scope: {film: '=film', type: '=type', lightsOff: '=lightsOff'},
                link: function (scope, el, attrs) {
                    var listenerStarted = false;
                    var hasWatched = false;
                    var playlist = [];
                    //console.log(scope.film);
                    var video = scope.film;
                    //attrs.$observe("film", function (video) {
                    //video = JSON.parse(video);
                    playlist.push({
                        videoType: scope.type,                                      //choose video type: "HTML5", "youtube", "vimeo", "image"
                        title: video.name,                                             //video title
                        youtubeID: scope.type === 'youtube' ? video.hosting_id : "",   //last part if the URL https://www.youtube.com/watch?v=0dJO0HyE8xE
                        vimeoID: scope.type === 'vimeo' ? video.hosting_id : "",          //last part of the URL http://vimeo.com/119641053
                        mp4: scope.type === 'HTML5' ? video.video_url : "",               //HTML5 video mp4 url
                        imageUrl: video.thumbnail_url,                                     //display image instead of playing video
                        imageTimer: 4, 																	  //set time how long image will display
                        prerollAD: "no",                                                                  //show pre-roll "yes","no"
                        prerollGotoLink: "http://getindiewise.com/",                                         //pre-roll goto link
                        // preroll_mp4: "http://creativeinteractivemedia.com/player/videos/Short_Elegant_Logo_Reveal.mp4",   //pre-roll video mp4 format
                        prerollSkipTimer: 5,
                        midrollAD: "no",                                                                  //show mid-roll "yes","no"
                        midrollAD_displayTime: "00:10",                                                    //show mid-roll at any custom time in format "minutes:seconds" ("00:00")
                        midrollGotoLink: "http://getindiewise.com/",                                         //mid-roll goto link
                        // midroll_mp4: "http://creativeinteractivemedia.com/player/videos/Logo_Explode.mp4", //mid-roll video mp4 format
                        midrollSkipTimer: 5,
                        postrollAD: "no",                                                                 //show post-roll "yes","no"
                        postrollGotoLink: "http://getindiewise.com/",                                        //post-roll goto link
                        // postroll_mp4: "http://creativeinteractivemedia.com/player/videos/Logo_Light.mp4",  //post-roll video mp4 format
                        postrollSkipTimer: 5,
                        // popupImg: "images/preview_images/popup.jpg",                        			  	  //popup image URL
                        popupAdShow: "no",                                                                //enable/disable popup image: "yes","no"
                        popupAdStartTime: "00:03",                                                         //time to show popup ad during playback
                        popupAdEndTime: "00:07",                                                           //time to hide popup ad during playback
                        popupAdGoToLink: "http://getindiewise.com/",                                         //re-direct to URL when popup ad clicked
                        description: video.description,                                                      //video description
                        thumbImg: video.thumbnail_url||'/assets/img/default_avatar.jpg',                //path to playlist thumbnail image
                        info: ""                                                                                    //video info
                    });

                    // Generate playlist
                    DataService.collection('projects', {owner: video.owner.id, notVideo: video.id, per_page: 20}).then(function (result) {
                        scope.playlistFilms = result.data.data;
                        return scope.playlistFilms;
                    }).then(function (res) {
                        _.each(res, function (vid) {
                            var type = '';
                            if (vid.video_url.indexOf('youtu') != -1) {
                                type = 'youtube';
                            } else if (vid.video_url.indexOf('vimeo') != -1) {
                                type = 'vimeo';
                            } else {
                                type = 'other';
                            }

                            playlist.push({
                                videoType: type,                                                              //choose video type: "HTML5", "youtube", "vimeo", "image"
                                title: vid.name,                                                            //video title
                                youtubeID: type === 'youtube' ? vid.hosting_id : "",                                                          //last part if the URL https://www.youtube.com/watch?v=0dJO0HyE8xE
                                vimeoID: type === 'vimeo' ? vid.hosting_id : "",                                                              //last part of the URL http://vimeo.com/119641053
                                mp4: type === 'hosted' ? vid.video_url : "",               //HTML5 video mp4 url
                                //imageUrl:"images/preview_images/poster2.jpg",                                     //display image instead of playing video
                                //imageTimer:4, 																	  //set time how long image will display
                                prerollAD: "no",                                                                  //show pre-roll "yes","no"
                                prerollGotoLink: "http://getindiewise.com/",                                         //pre-roll goto link
                                preroll_mp4: "http://creativeinteractivemedia.com/player/videos/Short_Elegant_Logo_Reveal.mp4",   //pre-roll video mp4 format
                                prerollSkipTimer: 5,
                                midrollAD: "no",                                                                  //show mid-roll "yes","no"
                                midrollAD_displayTime: "00:10",                                                    //show mid-roll at any custom time in format "minutes:seconds" ("00:00")
                                midrollGotoLink: "http://getindiewise.com/",                                         //mid-roll goto link
                                midroll_mp4: "http://creativeinteractivemedia.com/player/videos/Logo_Explode.mp4", //mid-roll video mp4 format
                                midrollSkipTimer: 5,
                                postrollAD: "no",                                                                 //show post-roll "yes","no"
                                postrollGotoLink: "http://getindiewise.com/",                                        //post-roll goto link
                                postroll_mp4: "http://creativeinteractivemedia.com/player/videos/Logo_Light.mp4",  //post-roll video mp4 format
                                postrollSkipTimer: 5,
                                popupImg: "images/preview_images/popup.jpg",                        			  	  //popup image URL
                                popupAdShow: "no",                                                                //enable/disable popup image: "yes","no"
                                popupAdStartTime: "00:03",                                                         //time to show popup ad during playback
                                popupAdEndTime: "00:07",                                                           //time to hide popup ad during playback
                                popupAdGoToLink: "http://getindiewise.com/",                                         //re-direct to URL when popup ad clicked
                                description: vid.url_id,                                                      //video description
                                thumbImg: vid.thumbnail_url||'/assets/img/default_avatar.jpg',                //path to playlist thumbnail image
                                info: ""                                                                                    //video info
                            });
                        });
                    }).finally(function () {
                        window.videoPlayer = scope.videoPlayer = el.Video({                  //ALL PLUGIN OPTIONS
                            instanceName: "player1",                      //name of the player instance
                            instanceTheme:"dark",                        //choose video player theme: "dark", "light"
                            autohideControls: 2,                          //autohide HTML5 player controls
                            hideControlsOnMouseOut: "No",                 //hide HTML5 player controls on mouse out of the player: "Yes","No"
                            playerLayout: "fitToContainer",                   //Select player layout: "fitToContainer", "fixedSize", "fitToBrowser"
                            // videoPlayerWidth: '100%',                     //fixed total player width
                            // videoPlayerHeight: Foundation.MediaQuery.atLeast('large') ? 470 : 420,                       //fixed total player height
                            responsive: true,  //!Foundation.MediaQuery.atLeast('large'),				             //this option will overwrite above videoPlayerWidth/videoPlayerHeight and set player to fit your div (parent) container: true/false
                            playlist: /*scope.type === 'vimeo' ? "Off" :*/ "Right playlist",                   //choose playlist type: "Right playlist", "Off"
                            playlistScrollType: "light",                  //choose scrollbar type: "light","minimal","light-2","light-3","light-thick","light-thin","inset","inset-2","inset-3","rounded","rounded-dots","3d"
                            playlistBehaviourOnPageload: "closed",		 //choose playlist behaviour when webpage loads: "closed", "opened" (not apply to Vimeo player)
                            autoplay: false,                              //autoplay when webpage loads: true/false
                            colorAccent: "#3F51B5",                       //plugin colors accent (hexadecimal or RGB value - http://www.colorpicker.com/)
                            vimeoColor: "00adef",                         //set "hexadecimal value", default vimeo color is "00adef"
                            youtubeControls: "custom controls",			 //choose youtube player controls: "custom controls", "default controls"
                            youtubeSkin: "dark",                          //default youtube controls theme: light, dark
                            youtubeColor: "red",                          //default youtube controls bar color: red, white
                            youtubeQuality: "default",                    //choose youtube quality: "small", "medium", "large", "hd720", "hd1080", "highres", "default"
                            youtubeShowRelatedVideos: "No",				 //choose to show youtube related videos when video finish: "Yes", "No" (onFinish:"Stop video" needs to be enabled)
                            videoPlayerShadow: "effect2",                 //choose player shadow:  "effect1" , "effect2", "effect3", "effect4", "effect5", "effect6", "off"
                            loadRandomVideoOnStart: "No",                 //choose to load random video when webpage loads: "Yes", "No"
                            shuffle: "No",				                 //choose to shuffle videos when playing one after another: "Yes", "No" (shuffle button enabled/disabled on start)
                            posterImg: '',//video.thumbnail_url,                               //player poster image
                            onFinish: "Stop video",                      //"Play next video","Restart video", "Stop video",
                            nowPlayingText: "Yes",                        //enable disable now playing title: "Yes","No"
                            fullscreen: "Fullscreen native",              //choose fullscreen type: "Fullscreen native","Fullscreen browser"
                            rightClickMenu: false,                         //enable/disable right click over HTML5 player: true/false
                            hideVideoSource: true,						 //option to hide self hosted video sources (to prevent users from download/steal your videos): true/false
                            showAllControls: true,						 //enable/disable all HTML5 player controls: true/false
                            allowSkipAd: true,                            //enable/disable "Skip advertisement" option: true/false
                            infoShow: "No",                              //enable/disable info option: "Yes","No"
                            shareShow: "No",                             //enable/disable all share options: "Yes","No"
                            facebookShow: "No",                          //enable/disable facebook option individually: "Yes","No"
                            twitterShow: "No",                           //enable/disable twitter option individually: "Yes","No"
                            mailShow: "No",                              //enable/disable mail option individually: "Yes","No"
                            facebookShareName: video.name,      //first parametar of facebook share in facebook feed dialog is title
                            facebookShareLink: window.location.href,  //second parametar of facebook share in facebook feed dialog is link below title
                            facebookShareDescription: video.description, //third parametar of facebook share in facebook feed dialog is description below link
                            facebookSharePicture: video.thumbnail_url, //fourth parametar in facebook feed dialog is picture on left side
                            twitterText: video.name,			 //first parametar of twitter share in twitter feed dialog is text
                            twitterLink: window.location.href, //second parametar of twitter share in twitter feed dialog is link
                            twitterHashtags: "indiewise",		 //third parametar of twitter share in twitter feed dialog is hashtag
                            twitterVia: "IndieWise",				 //fourth parametar of twitter share in twitter feed dialog is via (@)
                            googlePlus: window.location.href, //share link over Google +
                            logoShow: "Yes",                              //"Yes","No"
                            logoClickable: "No",                         //"Yes","No"
                            logoPath: "/assets/img/Logo_alt2_web_87x45.png",             //path to logo image
                            logoGoToLink: "http://getindiewise.com",       //redirect to page when logo clicked
                            logoPosition: "bottom-left",                  //choose logo position: "bottom-right","bottom-left"
                            embedShow: "No",                             //enable/disable embed option: "Yes","No"
                            embedCodeSrc: "www.yourwebsite.com/videoplayer/index.html", //path to your video player on server
                            embedCodeW: "746",                            //embed player code width
                            embedCodeH: "420",                            //embed player code height
                            embedShareLink: window.location.href, //direct link to your site (or any other URL) you want to be "shared"
                            youtubePlaylistID: "",                        //automatic youtube playlist ID (leave blank "" if you want to use manual playlist) LL4qbSRobYCjvwo4FCQFrJ4g
                            youtubeChannelID: "",                         //automatic youtube channel ID (leave blank "" if you want to use manual playlist) UCHqaLr9a9M7g9QN6xem9HcQ

                            //manual playlist
                            videos: playlist
                        });

                        // playlist actions
                        el.find('.elite_vp_item:not(:first) *').bind('click', function (event) {
                            event.preventDefault();
                            var $parent = jQuery(this).hasClass('elite_vp_item') ? jQuery(this) : jQuery(this).parents('.elite_vp_item');
                            var $description = $parent.find('.elite_vp_description');
                            var urlId = $description.html().trim();
                            $state.go('video', {url_id: urlId});
                        });

                        el.find('.fa-elite-backward').bind('click', function (event) {
                            event.preventDefault();
                            var $parent = jQuery('.elite_vp_itemSelected').prev();
                            if (!$parent.length) {
                                $parent = jQuery('.elite_vp_item').last();
                            }
                            var $description = $parent.find('.elite_vp_description');
                            var urlId = $description.html().trim();
                            $state.go('video', {url_id: urlId});
                        });

                        el.find('.fa-elite-forward').bind('click', function (event) {
                            event.preventDefault();
                            var $parent = jQuery('.elite_vp_itemSelected').next();
                            var $description = $parent.find('.elite_vp_description');
                            var urlId = $description.html().trim();
                            $state.go('video', {url_id: urlId});
                        });

                        // $timeout(function () {
                        //     scope.startedPlaying();
                        // }, 100);

                        scope.startedPlaying = $interval(function () {
                            // If Vimeo video
                            if (scope.videoPlayer.state === 'loading' && !!angular.element('#elite_vp_vimeoWrapper iframe')) {
                                // Listen for messages from the player
                                if (!listenerStarted) {
                                    if (window.addEventListener) {
                                        window.addEventListener('message', vimeoListener, false);
                                    }
                                    else {
                                        window.attachEvent('onmessage', vimeoListener);
                                    }
                                    listenerStarted = true;
                                }
                            }

                            // if YouTube Video
                            if (scope.videoPlayer.state === "elite_vp_playing") {
                                toggleLights();
                                $rootScope.initWatch();

                                switch (scope.type) {
                                    case "youtube":
                                        //console.log('Youtube API is Ready');
                                        scope.videoPlayer.youtubePlayer.addEventListener("onStateChange", function (a) {
                                            //console.log(a.target.getPlayerState());
                                            if (a.target.getPlayerState() == 0) {
                                                //console.log('Scroll page to content');
                                                if (!!scope.lightsOff) {
                                                    toggleLights();
                                                }
                                                //anchorSmoothScroll.scrollTo('SinglePostStats');
                                            }
                                        });
                                        break;
                                }

                                $interval.cancel(scope.startedPlaying)
                            }
                        }, 1000);

                    });

                    function vimeoListener(event) {
                        // Handle messages from the vimeo player only
                        if (!(/^https?:\/\/player.vimeo.com/).test(event.origin)) {
                            return false;
                        }
                        var data = JSON.parse(event.data);

                        if (data.event === 'playProgress') {
                            if (!hasWatched) {
                                if (!!scope.lightsOff) {
                                    toggleLights();
                                }
                                $rootScope.initWatch();
                                hasWatched = true;
                                $interval.cancel(scope.startedPlaying)
                            }

                            if (window.addEventListener) {
                                window.removeEventListener('message', vimeoListener, false);
                            }
                            else {
                                window.detachEvent('onmessage', vimeoListener);
                            }
                        }
                    }

                    function toggleLights() {
                        scope.lightsOff = !scope.lightsOff;
                        var overlay = jQuery('#overlay');
                        overlay.fadeToggle(1000);
                        /* Choose desired delay */
                        if (!scope.lightsOff) {
                            $timeout(function () {
                                overlay.removeClass('highlight');
                            }, 1000);
                            /* Same delay */
                        } else {
                            overlay.addClass('highlight');
                        }
                    }

                    jQuery('#overlay').on('click', function () {
                        toggleLights();
                    });

                    // TODO: on playlist end, exit fullscreen
                    //videoPlayer.fsEnter.click()


                    //$state.go('stateName',params,{
                    //    // prevent the events onStart and onSuccess from firing
                    //    notify:false,
                    //    // prevent reload of the current state
                    //    reload:false,
                    //    // replace the last record when changing the params so you don't hit the back button and get old params
                    //    location:'replace',
                    //    // inherit the current params on the url
                    //    inherit:true
                    //});
                }
            }
        }])
        .directive('elitePlayerEmbed', ['$rootScope', '_', function ($rootScope, _) {
            return {
                restrict: 'E',
                templateUrl: 'directives/videoPlayer.html',
                scope: { name: '=', hosting_id: '=', url: '=', type: '=', thumbnail: '=', description: '=' },
                link: function (scope, el, attrs) {
                    var playlist = [];
                    playlist.push({
                        videoType: scope.type,                                      //choose video type: "HTML5", "youtube", "vimeo", "image"
                        title: scope.name,                                             //video title
                        youtubeID: scope.type === 'youtube' ? scope.hosting_id : "",   //last part if the URL https://www.youtube.com/watch?v=0dJO0HyE8xE
                        vimeoID: scope.type === 'vimeo' ? scope.hosting_id : "",          //last part of the URL http://vimeo.com/119641053
                        mp4: scope.type === 'HTML5' ? scope.url : "",               //HTML5 video mp4 url
                        imageUrl: scope.thumbnail,                                     //display image instead of playing video
                        imageTimer: 4, 																	  //set time how long image will display
                        prerollAD: "no",                                                                  //show pre-roll "yes","no"
                        prerollGotoLink: "http://getindiewise.com/",                                         //pre-roll goto link
                        // preroll_mp4: "http://creativeinteractivemedia.com/player/videos/Short_Elegant_Logo_Reveal.mp4",   //pre-roll video mp4 format
                        prerollSkipTimer: 5,
                        midrollAD: "no",                                                                  //show mid-roll "yes","no"
                        midrollAD_displayTime: "00:10",                                                    //show mid-roll at any custom time in format "minutes:seconds" ("00:00")
                        midrollGotoLink: "http://getindiewise.com/",                                         //mid-roll goto link
                        // midroll_mp4: "http://creativeinteractivemedia.com/player/videos/Logo_Explode.mp4", //mid-roll video mp4 format
                        midrollSkipTimer: 5,
                        postrollAD: "no",                                                                 //show post-roll "yes","no"
                        postrollGotoLink: "http://getindiewise.com/",                                        //post-roll goto link
                        // postroll_mp4: "http://creativeinteractivemedia.com/player/videos/Logo_Light.mp4",  //post-roll video mp4 format
                        postrollSkipTimer: 5,
                        // popupImg: "images/preview_images/popup.jpg",                        			  	  //popup image URL
                        popupAdShow: "no",                                                                //enable/disable popup image: "yes","no"
                        popupAdStartTime: "00:03",                                                         //time to show popup ad during playback
                        popupAdEndTime: "00:07",                                                           //time to hide popup ad during playback
                        popupAdGoToLink: "http://getindiewise.com/",                                         //re-direct to URL when popup ad clicked
                        description: '',                                                      //video description
                        thumbImg: scope.thumbnail,                                                      //path to playlist thumbnail image
                        info: ""                                                                                    //video info
                    });

                    scope.videoPlayer = el.Video({                  //ALL PLUGIN OPTIONS
                        instanceName: "player_" + new Date().valueOf().toString(),                      //name of the player instance
                        instanceTheme:"dark",                        //choose video player theme: "dark", "light"
                        autohideControls: 2,                          //autohide HTML5 player controls
                        hideControlsOnMouseOut: "No",                 //hide HTML5 player controls on mouse out of the player: "Yes","No"
                        playerLayout: "fixedSize",
                        videoPlayerWidth: '100%',                     //fixed total player width
                        videoPlayerHeight: Foundation.MediaQuery.atLeast('large') ? 470 : 420,                       //fixed total player height
                        // responsive: true,  //!Foundation.MediaQuery.atLeast('large'),				             //this option will overwrite above videoPlayerWidth/videoPlayerHeight and set player to fit your div (parent) container: true/false
                        playlist: "Off",                   //choose playlist type: "Right playlist", "Off"
                        playlistScrollType: "light",                  //choose scrollbar type: "light","minimal","light-2","light-3","light-thick","light-thin","inset","inset-2","inset-3","rounded","rounded-dots","3d"
                        playlistBehaviourOnPageload: "closed",		 //choose playlist behaviour when webpage loads: "closed", "opened" (not apply to Vimeo player)
                        autoplay: false,                              //autoplay when webpage loads: true/false
                        colorAccent: "#3F51B5",                       //plugin colors accent (hexadecimal or RGB value - http://www.colorpicker.com/)
                        vimeoColor: "00adef",                         //set "hexadecimal value", default vimeo color is "00adef"
                        youtubeControls: "custom controls",			 //choose youtube player controls: "custom controls", "default controls"
                        youtubeSkin: "dark",                          //default youtube controls theme: light, dark
                        youtubeColor: "red",                          //default youtube controls bar color: red, white
                        youtubeQuality: "default",                    //choose youtube quality: "small", "medium", "large", "hd720", "hd1080", "highres", "default"
                        youtubeShowRelatedVideos: "No",				 //choose to show youtube related videos when video finish: "Yes", "No" (onFinish:"Stop video" needs to be enabled)
                        videoPlayerShadow: "effect2",                 //choose player shadow:  "effect1" , "effect2", "effect3", "effect4", "effect5", "effect6", "off"
                        loadRandomVideoOnStart: "No",                 //choose to load random video when webpage loads: "Yes", "No"
                        shuffle: "No",				                 //choose to shuffle videos when playing one after another: "Yes", "No" (shuffle button enabled/disabled on start)
                        posterImg: '',//video.thumbnail_url,                               //player poster image
                        onFinish: "Stop video",                      //"Play next video","Restart video", "Stop video",
                        nowPlayingText: "Yes",                        //enable disable now playing title: "Yes","No"
                        fullscreen: "Fullscreen native",              //choose fullscreen type: "Fullscreen native","Fullscreen browser"
                        rightClickMenu: false,                         //enable/disable right click over HTML5 player: true/false
                        hideVideoSource: true,						 //option to hide self hosted video sources (to prevent users from download/steal your videos): true/false
                        showAllControls: true,						 //enable/disable all HTML5 player controls: true/false
                        allowSkipAd: true,                            //enable/disable "Skip advertisement" option: true/false
                        infoShow: "No",                              //enable/disable info option: "Yes","No"
                        shareShow: "No",                             //enable/disable all share options: "Yes","No"
                        facebookShow: "No",                          //enable/disable facebook option individually: "Yes","No"
                        twitterShow: "No",                           //enable/disable twitter option individually: "Yes","No"
                        mailShow: "No",                              //enable/disable mail option individually: "Yes","No"
                        facebookShareName: scope.name,      //first parametar of facebook share in facebook feed dialog is title
                        facebookShareLink: window.location.href,  //second parametar of facebook share in facebook feed dialog is link below title
                        facebookShareDescription: scope.description, //third parametar of facebook share in facebook feed dialog is description below link
                        facebookSharePicture: scope.thumbnail, //fourth parametar in facebook feed dialog is picture on left side
                        twitterText: scope.name,			 //first parametar of twitter share in twitter feed dialog is text
                        twitterLink: window.location.href, //second parametar of twitter share in twitter feed dialog is link
                        twitterHashtags: "indiewise",		 //third parametar of twitter share in twitter feed dialog is hashtag
                        twitterVia: "IndieWise",				 //fourth parametar of twitter share in twitter feed dialog is via (@)
                        googlePlus: window.location.href, //share link over Google +
                        logoShow: "Yes",                              //"Yes","No"
                        logoClickable: "No",                         //"Yes","No"
                        logoPath: "/assets/img/Logo_alt2_web_87x45.png",             //path to logo image
                        logoGoToLink: "http://getindiewise.com",       //redirect to page when logo clicked
                        logoPosition: "bottom-left",                  //choose logo position: "bottom-right","bottom-left"
                        embedShow: "No",                             //enable/disable embed option: "Yes","No"
                        embedCodeSrc: "www.yourwebsite.com/videoplayer/index.html", //path to your video player on server
                        embedCodeW: "746",                            //embed player code width
                        embedCodeH: "420",                            //embed player code height
                        embedShareLink: window.location.href, //direct link to your site (or any other URL) you want to be "shared"
                        youtubePlaylistID: "",                        //automatic youtube playlist ID (leave blank "" if you want to use manual playlist) LL4qbSRobYCjvwo4FCQFrJ4g
                        youtubeChannelID: "",                         //automatic youtube channel ID (leave blank "" if you want to use manual playlist) UCHqaLr9a9M7g9QN6xem9HcQ

                        //manual playlist
                        videos: playlist
                    });
                }
            }
        }])
        .directive('offCanvasNav', ['$rootScope', function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    el.find('a').on('click', function () {
                        angular.element('#offCanvas-responsive').foundation('close');
                    });
                }
            }
        }])
        .directive('messagesHeight', ['$window', function ($window) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    setHeight();
                    angular.element($window).bind('resize', function(){
                        setHeight();

                        scope.$digest();
                    });

                    function setHeight() {
                        var parentEl = el.parent();
                        var prevElHeight = el.prev().height();
                        var nextElHeight = el.next().height();
                        var newHeight = $window.innerHeight - (parentEl.offset().top + prevElHeight + nextElHeight);
                        scope.Msgs.viewportHeight = {height: newHeight + 'px'};
                    }
                }
            }
        }])
        .directive('sideNavNotif', ['$mdSidenav', function ($mdSidenav) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    el.find('a').bind('click', function () {
                        $mdSidenav('right').close();
                    });
                }
            }
        }])
        .directive('helpInfo', [function () {
            return {
                restrict: 'E',
                transclude: true,
                templateUrl: 'directives/help-info.html',
                scope: {
                    text: '=text',
                    direction: '=direction'
                }
            }
        }])
        .directive('projectCard', ['$rootScope', '$state', '$modal', '$mdMedia', 'UserActions', function ($rootScope, $state, $modal, $mdMedia, UserActions) {
            return {
                restrict: 'E',
                transclude: true,
                replace: false,
                templateUrl: 'directives/project-card.html',
                scope: {
                    video: '=video',
                    type: '=type',
                    related: '=related',
                    queried: '=queried'
                },
                link: function (scope, el, attrs) {
                    scope.isQueried = scope.queried === 'true';
                    scope.isLoggedIn = $rootScope.AppData.User;
                    scope.openShareDialog = openShareDialog;

                    function openShareDialog(video) {
                        $modal.open({
                            templateUrl: 'common/shareDialog.html',
                            resolve: {
                                Video: function () {
                                    return video;
                                }
                            },
                            controller: ['$scope', '$modalInstance', 'Video', function ($scope, $modalInstance, Video) {
                                $scope.video = Video;
                                $scope.shareLink = window.location.origin + '/' + Video.url_id;
                                $scope.cancel = function () {
                                    $modalInstance.close();
                                };
                            }]
                        })
                    }
                }
            }
        }])
        .directive('commentsBlock', ['$rootScope', 'DataService', 'UserActions', '$modal', '_', function ($rootScope, DataService, UserActions, $modal, _) {
            return {
                restrict: 'E',
                templateUrl: 'directives/comments.html',
                scope: {
                    comments: '=comments',
                    disable: '=disable',
                    parent: '=parent'
                },
                link: function (scope, el, attrs) {
                    scope.model = {
                        myComment: null,
                        isLoggedIn: $rootScope.AppData.User,
                    };
                    scope.myReply = null;
                    scope.showCommentInput = false;
                    scope.showReplyInput = false;
                    scope.editCommentMode = false;
                    scope.postComment = _.throttle(postComment, 1000);
                    scope.deleteComment = deleteComment;
                    scope.loadReplies = loadReplies;
                    scope.showReplies = false;
                    scope.toggleCommentInput = toggleCommentInput;
                    scope.toggleEditCommentMode = toggleEditCommentMode;
                    scope.toggleReplyInput = toggleReplyInput;

                    function postComment() {
                        if (!$rootScope.isAuthenticated()) {
                            UserActions.loginModal();
                            return false;
                        }

                        if ($rootScope.isNotVerified()) {
                            $rootScope.toastAction('Please verify your account so you can rate videos! Check your spam folder too.', 'Verify Now', $rootScope.requestVerificationEmail());
                            return false;
                        }

                        DataService.save('comments', {
                            body: scope.model.myComment,
                            critique_id: !scope.parent.hasOwnProperty('unlist') ? scope.parent.id : undefined,
                            user_id: scope.model.isLoggedIn.id
                        })
                            .then(function (comment) {
                                scope.comments.data.push(comment.data.data);
                                $rootScope.toastMessage('Comment posted!');
                                scope.model.myComment = null;
                                clearCommentinput();
                                scope.parent.comments_count++;
                            }, function (error) {
                                console.log('Failed to create new comment, with error code: ' + error.message);
                            });
                    }

                    function deleteComment(c, ev) {
                        UserActions.checkAuth().then(function (res) {
                            if (res) {
                                var confirm = $modal.confirm()
                                    .title('Would you like to delete your comment?')
                                    //.content('All of the banks have agreed to <span class="debt-be-gone">forgive</span> you your debts.')
                                    //.ariaLabel('Lucky day')
                                    .targetEvent(ev)
                                    .ok('Delete')
                                    .cancel('Cancel');
                                $modal.show(confirm).then(function () {
                                    var p = c.parentComment || undefined;

                                    DataService.delete('comments', c.id).then(function (res) {
                                        // Decrement film commentCount
                                        scope.parent.commentCount--;


                                        if (angular.isUndefined(p)) {
                                            // normal comment
                                            scope.comments = _.reject(scope.comments, function (a) {
                                                return a.id === c.id;
                                            });

                                        } else {
                                            // reply comment
                                            var z = _.find(scope.comments, function (a) {
                                                return a.id === p.id;
                                            });

                                            z.replies = _.reject(z.replies, function (a) {
                                                return a.id === c.id;
                                            });
                                            // Increment film commentCount
                                            var pcQuery = new Parse.Query("Comment");
                                            pcQuery.get(p.id).then(function (res) {
                                                res.increment('replyCount', -1);
                                                res.save();
                                            });

                                            return c = undefined;
                                        }

                                        $rootScope.toastMessage('Your comment was deleted.');
                                    });
                                }, function () {
                                    //$scope.status = 'You decided to keep your debt.';
                                });
                            }
                        })
                    }

                    function loadReplies(comment) {
                        // Fetch Replies
                        if (!comment.repliesLoaded) {
                            DataService.collection('comments', {comment: comment.id}).then(function (replies) {
                                comment.replies = replies.data.data;
                                comment.repliesLoaded = true;
                                comment.showReplies = !comment.showReplies;
                                return comment;
                            });
                        } else {
                            comment.showReplies = !comment.showReplies;
                            return comment;
                        }
                    }

                    function toggleCommentInput() {
                        scope.showCommentInput = !scope.showCommentInput;
                    }

                    function clearCommentinput() {
                        scope.model.myComment = null;
                    }

                    function toggleEditCommentMode(comment) {
                        scope.editCommentMode = !scope.editCommentMode;
                        scope.editComment = !!scope.editCommentMode ? comment : undefined;
                    }

                    function toggleReplyInput(comment) {
                        scope.showReplyInput = !scope.showReplyInput;
                        scope.targetComment = comment;
                    }

                    scope.$on('reply:complete', function (event, comment) {
                        scope.toggleReplyInput(undefined);
                    });
                }
            }
        }])
        .directive('critiquesBlock', ['$rootScope', 'DataService', 'UserActions', '$modal', '_', function ($rootScope, DataService, UserActions, $modal, _) {
            return {
                restrict: 'E',
                templateUrl: 'directives/critiques.html',
                scope: {
                    critiques: '=critiques',
                    disable: '=disable',
                    parentUrlId: '=',
                    parentOwnerId: '='
                },
                link: function (scope, el, attrs) {
                    scope.isLoggedIn = $rootScope.AppData.User;
                    scope.showQuickReply = Foundation.MediaQuery.atLeast('large');

                    scope.isPrivate = function (critique) {
                        return critique.private;
                    };

                    scope.isOwnerOrAuthor = function (critique) {
                        return scope.isLoggedIn && (scope.isLoggedIn.id == critique.user_id || scope.isLoggedIn.id == scope.parentOwnerId);
                    };

                    scope.deleteCritique = function (c) {
                        UserActions.checkAuth().then(function (res) {
                            if (res) {
                                var modalInstance = $modal.open({
                                    templateUrl: 'common/confirmDialog.html',
                                    controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                                        $scope.ok = function () {
                                            $modalInstance.close(true);
                                        };

                                        $scope.cancel = function () {
                                            $modalInstance.dismiss('cancel');
                                        };
                                    }],
                                    size: Foundation.MediaQuery.atLeast('large') ? 'tiny' : 'small',
                                    keyboard: true
                                });
                                modalInstance.result.then(function () {
                                    if (scope.isOwnerOrAuthor) {
                                        DataService.delete('Critique', c.id).then(function () {
                                            $rootScope.toastMessage('Your critique was deleted.');
                                            // Decrement film critiques_count
                                            self.film.critiques_count--;
                                            scope.updateVideoObj();
                                            self.checkUserActions();
                                            scope.critiques = _.reject(scope.critiques, function (a) {
                                                return a.id === c.id;
                                            });
                                        });
                                    }
                                }, function () {
                                    // console.info('Modal dismissed at: ' + new Date());
                                });
                            }
                        })
                    };
                }
            }
        }])
        .directive('toggleReplies', ['$rootScope', function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    /*if (scope.comment.replies_count) {
                        el.html('Show replies <i class="fa fa-angle-down"></i>');
                    }*/
                    //comments reply hide show
                    el.on('click', function () {
                        scope.loadReplies(scope.comment);
                        if (scope.comment.replies_count  /*jQuery(this).parent().next().length > 0*/) {
                            jQuery(this).parent().nextAll().slideToggle();
                            //jQuery(this).html(jQuery(this).text() === 'Hide replies' ? 'Show replies' : 'Hide replies');
                            if (jQuery(this).hasClass('hide-reply')) {
                                jQuery(this).removeClass('hide-reply');
                                jQuery(this).html('Show replies <i class="fa fa-angle-down"></i>');
                            } else {
                                jQuery(this).addClass('hide-reply');
                                jQuery(this).html('Hide replies <i class="fa fa-angle-up"></i>');
                            }
                        }
                    });

                }
            }
        }])
        .directive('repliesBlock', [function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'directives/replies.html',
                link: function (scope, el, attrs) {

                }
            }
        }])
        .directive('replyBlock', ['$rootScope', 'UserActions', 'DataService', '_', function ($rootScope, UserActions, DataService, _) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'directives/reply-comment.html',
                link: function (scope, el, attrs) {
                    scope.postReply = _.throttle(postReply, 1000);
                    function postReply() {
                        if (!$rootScope.isAuthenticated()) {
                            UserActions.loginModal();
                            return false;
                        }

                        if ($rootScope.isNotVerified()) {
                            $rootScope.toastAction('Please verify your account so you can rate videos! Check your spam folder too.', 'Verify Now', $rootScope.requestVerificationEmail());
                            return false;
                        }

                                var repliedTo = angular.isString(scope.targetComment.comment_id) ? scope.targetComment.comment_id : scope.targetComment;
                                if (angular.isString(repliedTo)) {
                                    repliedTo = _.findWhere(scope.comments.data, {id: scope.targetComment.comment_id})
                                }
                                DataService.save('comments', {
                                    body: scope.myReply,
                                    critique_id: scope.parent.id,
                                    comment_id: repliedTo.id,
                                    user_id: scope.model.isLoggedIn.id
                                }).then(function (comment) {

                                    if (!!repliedTo.repliesLoaded) {
                                        var repliesLoaded = true;
                                        var oldReplies = repliedTo.replies || [];
                                    }
                                    if (!repliedTo.replies) {
                                        repliedTo.replies = [];
                                    }

                                    repliedTo.replies.push(comment.data.data);
                                    repliedTo.replies_count++;
                                    scope.toggleReplyInput();
                                    // refresh parent data
                                    scope.parent.comments_count++;
                                    if (scope.parent.hasOwnProperty('unlist')) {
                                        DataService.item('projects', scope.parent.id).then(function (a) {
                                            angular.extend(scope.parent, a.data.data);
                                            if (repliesLoaded) {
                                                repliedTo.repliesLoaded = true;
                                                oldReplies.push(comment.data.data);
                                                repliedTo.replies = oldReplies;
                                            }
                                        });
                                    } else {
                                        DataService.item('critiques', scope.parent.id).then(function (a) {
                                            angular.extend(scope.parent, a.data.data);
                                            if (repliesLoaded) {
                                                repliedTo.repliesLoaded = true;
                                                oldReplies.push(comment.data.data);
                                                repliedTo.replies = oldReplies;
                                            }
                                        });
                                    }
                                    $rootScope.toastMessage('Reply posted!');
                                    scope.myReply = null;

                                }, function (error) {
                                    console.log('Failed to create new reply, with error code: ' + error.message);
                                });
                    }
                }
            }
        }])
        .directive('quickReplyBlock', ['$rootScope', 'UserActions', 'DataService', '_', function ($rootScope, UserActions, DataService, _) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'directives/reply-comment.html',
                link: function (scope, el, attrs) {
                    scope.model = {
                        isLoggedIn: $rootScope.AppData.User
                    };

                    scope.postReply = _.throttle(postReply, 1000);
                    function postReply() {
                        if (!$rootScope.isAuthenticated()) {
                            UserActions.loginModal();
                            return false;
                        }

                        if ($rootScope.isNotVerified()) {
                            $rootScope.toastAction('Please verify your account so you can rate videos! Check your spam folder too.', 'Verify Now', $rootScope.requestVerificationEmail());
                            return false;
                        }

                        DataService.save('comments', {
                            body: scope.myReply,
                            critique_id: scope.critique.id,
                            user_id: scope.model.isLoggedIn.id
                        }).then(function (comment) {
                            scope.critique.comments_count++;
                            scope.myReply = null;
                            scope.showQuickReply = false;

                            // register Action
                            $rootScope.toastMessage('Quick Reply posted!');
                        }, function (error) {
                            console.log('Failed to create new reply, with error code: ' + error.message);
                        });
                    }
                }
            }
        }])
        .directive('editCommentBlock', ['$rootScope', 'UserActions', 'DataService', '_', function ($rootScope, UserActions, DataService, _) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'directives/edit-comment.html',
                link: function (scope, el, attrs) {
                    scope.editedBody = scope.editComment.body;
                    scope.updateComment = _.throttle(updateComment, 1000);
                    function updateComment() {
                        if (scope.editedBody === scope.editComment.body) {
                            scope.toggleEditCommentMode();
                            return scope.editComment;
                        }
                        UserActions.checkAuth().then(function (res) {
                            DataService.update('comments', scope.editComment.id, {
                                body: scope.editedBody,
                                editedAt: moment().toDate()
                            }).then(function (comment) {
                                scope.toggleEditCommentMode();
                                return comment.data;
                            })
                        });
                    }
                }
            }
        }])
        .directive('focusOn', ['$timeout', function ($timeout) {
            return {
                restrict: 'A',
                link: function ($scope, $element, $attr) {
                    $scope.$watch($attr.focusOn, function (_focusVal) {
                        $timeout(function () {
                            _focusVal ? $element.focus() :
                                $element.blur();
                        });
                    });
                }
            }
        }])
        .directive('validateEmail', function () {
            var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5})$/;

            return {
                require: 'ngModel',
                restrict: '',
                link: function (scope, elm, attrs, ctrl) {
                    // only apply the validator if ngModel is present and Angular has added the email validator
                    if (ctrl && ctrl.$validators.email) {

                        // this will overwrite the default Angular email validator
                        ctrl.$validators.email = function (modelValue) {
                            return ctrl.$isEmpty(modelValue) || EMAIL_REGEXP.test(modelValue);
                        };
                    }
                }
            };
        })
        .directive('myEnter', function () {
            return function (scope, element, attrs) {
                element.bind("keydown keypress", function (event) {
                    if (event.which === 13) {
                        scope.$apply(function () {
                            scope.$eval(attrs.myEnter);
                        });

                        event.preventDefault();
                    }
                });
            };
        })
        .directive('datepicker', ['$document', function ($document) {
            return {
                require: 'ngModel',
                restrict: 'A',
                scope: {format: "="},
                link: function (scope, el, attrs, ngModel) {
                    var FIREFOX = /Firefox/i.test(navigator.userAgent);
                    var IEXPLORER = $document.documentMode||false;

                    if (FIREFOX || IEXPLORER) {
                        jQuery(el).fdatepicker({format: scope.format || "mm-dd-yyyy"}).on('changeDate', function (ev) {
                            scope.$apply(function () {
                                ngModel.$setViewValue(ev.date);
                            });
                        })
                    }
                }
            }
        }])
        .directive('linkify', ['$filter', '$timeout', 'linkify', function ($filter, $timeout, linkify) {
            return {
                restrict: 'A',
                link: function (scope, element, attrs) {
                    var type = attrs.linkify || 'normal';
                    $timeout(function () {
                        element.html(linkify[type](element.html()));
                    });
                }
            };
        }])
        .directive('broadstreetZone', ['$window', '$sce', function ($window, $sce) {
            return {
                restrict: 'E',
                templateUrl: 'directives/broadstreet-zone.html',
                transclude: true,
                scope: { 
                    zone: "=",
                    width: "=",
                    height: "=",
                },
                link: function (scope, el, attrs) {
                    scope.link = $sce.trustAsResourceUrl('https://ad.broadstreetads.com/zdisplay/' + scope.zone + '.html');
                }
            }
        }])
        .directive('staticSideBar', ['$window', '$sce', function ($window, $sce) {
            return {
                restrict: 'E',
                templateUrl: 'directives/static-sidebar.html',
                transclude: true,
                replace: true
            }
        }]);

    angular.module('IndieWise.filters', [])
        .filter('truncate', function () {
            return function (text, length, end) {
                if (angular.isString(text)) {
                    if (isNaN(length))
                        length = 10;

                    if (end === undefined)
                        end = "...";

                    if (text.length <= length || text.length - end.length <= length) {
                        return text;
                    }
                    else {
                        return String(text).substring(0, length - end.length) + end;
                    }
                }
            };
        })
        .filter('secondsToDateTime', [function () {
            return function (seconds) {
                return new Date(1970, 0, 1).setSeconds(seconds);
            };
        }])
        .filter('linkify', function () {

            function linkify(_str, type) {
                if (!_str) {
                    return;
                }

                var _text = _str.replace(/(?:https?\:\/\/|www\.)+(?![^\s]*?")([\w.,@?!^=%&amp;:\/~+#-]*[\w@?!^=%&amp;\/~+#-])?/ig, function (url) {
                    var wrap = document.createElement('div');
                    var anch = document.createElement('a');
                    anch.href = url;
                    anch.target = "_blank";
                    anch.innerHTML = url;
                    wrap.appendChild(anch);
                    return wrap.innerHTML;
                });

                // bugfix
                if (!_text) {
                    return '';
                }

                // Twitter
                if (type === 'twitter') {
                    _text = _text.replace(/(|\s)*@([\u00C0-\u1FFF\w]+)/g, '$1<a href="https://twitter.com/$2" target="_blank">@$2</a>');
                    _text = _text.replace(/(^|\s)*#([\u00C0-\u1FFF\w]+)/g, '$1<a href="https://twitter.com/search?q=%23$2" target="_blank">#$2</a>');
                }


                // Github
                if (type === 'github') {
                    _text = _text.replace(/(|\s)*@(\w+)/g, '$1<a href="https://github.com/$2" target="_blank">@$2</a>');
                }

                return _text;
            }

            //
            return function (text, type) {
                return linkify(text, type);
            };
        });
        /*.filter('moment', function () {
            return function (input, momentFn /!*, param1, param2, ...param n *!/) {
                var args = Array.prototype.slice.call(arguments, 2),
                    momentObj = moment(input);
                return momentObj[momentFn].apply(momentObj, args);
            };
        })*/
})();
(function () {
    'use strict';
    angular
        .module('IndieWise.services', [])
        .factory('FacebookAngularPatch', function ($q, $timeout) {

            var fbApiAngular = function () {

                var params = [].splice.call(arguments, 0);
                var defer = $q.defer();
                var angularWrap = $timeout;

                window.fbPromise.then(function () {

                    // Pushing callback function that will resolve to the params array
                    params.push(function (response) {
                        if (!___.isUndefined(response.error)) {
                            angularWrap(function () {
                                defer.reject(response.error);
                            });
                            return;
                        }

                        angularWrap(function () {
                            defer.resolve(response);
                        });
                    });

                    FB.api.apply(FB, params);

                });

                return defer.promise;
            };


            // using the fbPromise we set up in index.html, we extend the FB SDK with FB.apiAngular
            // now we use FB.apiAngular instead of FB.api, which gives us an angular wrapped promise

            window.FB.init({
                appId: '150687055270744',
                status: true,
                cookie: true,
                xfbml: true,
                version: 'v2.4'
            });

            window.fbPromise.then(function () {
                FB.apiAngular = fbApiAngular;
            });


        })
        .factory('AuthService', AuthService)
        .factory('UserActions', UserActions)
        .factory('DataService', DataService)
        .factory('socket', ['$rootScope', '$window',function ($rootScope, $window) {
            var socket = io($window.location.origin, {
                'secure': true,
                'reconnect': true,
                'reconnection delay': 500,
                'max reconnection attempts': 10
            });
            return {
                on: function (eventName, callback) {
                    socket.on(eventName, function () {
                        var args = arguments;
                        $rootScope.$apply(function () {
                            callback.apply(socket, args);
                        });
                    });
                },
                emit: function (eventName, data, callback) {
                    socket.emit(eventName, data, function () {
                        var args = arguments;
                        $rootScope.$apply(function () {
                            if (callback) {
                                callback.apply(socket, args);
                            }
                        });
                    })
                }
            };
        }])
        .factory('linkify', ['$filter', function ($filter) {
            function _linkifyAsType(type) {
                return function (str) {
                    // (type, str);
                    return $filter('linkify')(str, type);
                };
            }

            return {
                twitter: _linkifyAsType('twitter'),
                github: _linkifyAsType('github'),
                normal: _linkifyAsType()
            };
        }])
        .service('anchorSmoothScroll', function(){

            this.scrollTo = function(eID) {

                // This scrolling function
                // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

                var startY = currentYPosition();
                var stopY = elmYPosition(eID);
                var distance = stopY > startY ? stopY - startY : startY - stopY;
                if (distance < 100) {
                    scrollTo(0, stopY); return;
                }
                var speed = Math.round(distance / 100);
                if (speed >= 20) speed = 20;
                var step = Math.round(distance / 25);
                var leapY = stopY > startY ? startY + step : startY - step;
                var timer = 0;
                if (stopY > startY) {
                    for ( var i=startY; i<stopY; i+=step ) {
                        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                        leapY += step; if (leapY > stopY) leapY = stopY; timer++;
                    } return;
                }
                for ( var i=startY; i>stopY; i-=step ) {
                    setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
                    leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
                }

                function currentYPosition() {
                    // Firefox, Chrome, Opera, Safari
                    if (self.pageYOffset) return self.pageYOffset;
                    // Internet Explorer 6 - standards mode
                    if (document.documentElement && document.documentElement.scrollTop)
                        return document.documentElement.scrollTop;
                    // Internet Explorer 6, 7 and 8
                    if (document.body.scrollTop) return document.body.scrollTop;
                    return 0;
                }

                function elmYPosition(eID) {
                    var elm = document.getElementById(eID);
                    var y = elm.offsetTop;
                    var node = elm;
                    while (node.offsetParent && node.offsetParent != document.body) {
                        node = node.offsetParent;
                        y += node.offsetTop;
                    } return y;
                }

            };

        });

    UserActions.$inject = ['$rootScope', '$q', 'AuthService', 'DataService', 'UtilsService', '$timeout', '$modal', '$mdMedia'];
    function UserActions($rootScope, $q, AuthService, DataService, UtilsService, $timeout, $modal, $mdMedia) {
        var service = {
            checkAuth: function () {
                var deferred = $q.defer();
                AuthService.isAuthenticated() ? deferred.resolve(true) : deferred.reject(false);
                return deferred.promise;
            },
            markAsWatched: function (video) {
                // Set as watched when user has watched 20% for the video's runtime or 6 seconds
                var time = 0;// (video.attributes.runTime * 200) || 6000;
                return $timeout(function () {
                    //console.log('Marked as Watched');
                    DataService.save('projects/watched', {
                        project_id: video.id
                    });
                }, time);
            },
            cancelWatched: function (promise) {
                $timeout.cancel(promise);
            },
            canCritique: function (filmId) {
                var deferred = $q.defer();
                if (AuthService.isAuthenticated()) {
                    DataService.collection('critiques', {project: filmId, user: AuthService.currentUser.id})
                        .then(function (res) {
                            res.data.data.length
                                // critique exists already from this user
                                ? deferred.reject(res.data.data[0])
                                // user hasn't critiqued yet
                                : deferred.resolve(true);
                        });
                } else {
                    deferred.reject(false);
                }
                return deferred.promise;
            },
            canReact: function (filmId) {
                var deferred = $q.defer();
                if (AuthService.currentUser) {
                    DataService.collection('reactions', {project: filmId, user: AuthService.currentUser.id})
                        .then(function (res) {
                            res.data.data.length
                                // critique exists already from this user
                                ? deferred.reject(res.data.data[0])
                                // user hasn't critiqued yet
                                : deferred.resolve(true);
                        });
                } else {
                    deferred.reject(false);
                }
                return deferred.promise;
            },
            canRate: function (filmId) {
                var deferred = $q.defer();
                if (AuthService.currentUser) {
                    DataService.collection('ratings', {project: filmId, user: AuthService.currentUser.id})
                        .then(function (res) {
                            res.data.ratings.length
                                // critique exists already from this user
                                ? deferred.reject(res.data.ratings[0])
                                // user hasn't critiqued yet
                                : deferred.resolve(true);
                        });
                } else {
                    deferred.reject(false);
                }
                return deferred.promise;
            },
            loginModal: function () {
                if (!$rootScope.authModalOpen) {
                    var options = {
                        controller: SignInModalCtrl,
                        controllerAs: 'SIC',
                        templateUrl: 'auth/sign-in-dialog.html',
                        size: Foundation.MediaQuery.atLeast('medium') ? 'large' : 'full'
                    };

                    var modalInstance = $modal.open(options);
                    modalInstance.result.then(function (answer) {
                        console.log(answer);
                        $rootScope.authModalOpen = false;
                        zIndexPlayer(true);
                    }, function () {
                        console.log('You cancelled the dialog.');
                        $rootScope.authModalOpen = false;
                        zIndexPlayer(true);
                    });
                    $rootScope.authModalOpen = true;
                }
            }
        };
        return service;
    }

    AuthService.$inject = ['$rootScope', '$q', '$state', '$http', 'DataService', '$auth', 'API'];
    function AuthService($rootScope, $q, $state, $http, DataService, $auth, API) {
        /**
         *
         * @returns {*}
         */


        var service = {
            /**
             *
             * @param _userParams
             */
            createUser: function (_userParams) {

                var user = {
                    email: _userParams.email,
                    password: _userParams.password,
                    password_confirmation:_userParams.passwordCheck,
                    username: _userParams.email,
                    firstName: _userParams.firstName,
                    lastName: _userParams.lastName,
                    fullName: _userParams.firstName + ' ' + _userParams.lastName,
                    country_id: _userParams.country,
                    dob: _userParams.dob,
                    gender: _userParams.gender,
                };

                return $auth.signup(user)
                    .then(function (userData) {
                        service.error = '';
                        console.log('User ' + userData.username + ' created successfully!');
                        return service.login(_userParams.email, _userParams.password).then(function (res) {
                            console.log(res);
                            service.getCurrentUser().then(function (res) {
                                console.log(res);
                                $state.go('profile.about');
                            });
                        });
                    })
                    .catch(function (error) {
                        return {
                            status: false,
                            errors: service.error = error.data.errors || 'Unknown error from server'
                        };
                    });
            },
            /**
             *
             * @param _userParams
             */
            updateUser: function (_userParams) {
                return DataService.update('users', _userParams.id, _userParams).then(function (response) {
                    return response;
                });
            },
            /**
             *
             * @param _userParams
             */
            requestVerification: function () {
                return DataService.collection('request_verification').then(function (response) {
                    return response;
                });
            },
            /**
             *
             * @param Back&
             * @returns {Promise}
             */
            currentUser: null,
            getCurrentUser: function (force) {
                var deferred = $q.defer();
                if(service.isAuthenticated()) {
                    if (!angular.isObject(service.currentUser)) {
                        $http.get(API + 'authenticate').then(function (response) {
                            deferred.resolve($rootScope.AppData.User = service.currentUser = response.data.user);
                        });
                    } else {
                        deferred.resolve(service.currentUser);
                    }
                } else {
                    deferred.reject(false);
                }
                return deferred.promise;

            },
            /**
             *
             * @param _user
             * @param _password
             * @returns {Promise}
             */
            login: function (_user, _password) {
                return $auth.login({ email: _user, password: _password })
                    .then(function (response) {
                        if (response.status === 200) {
                            $http.defaults.headers.common.Authorization = 'Bearer ' + response.data.token;
                            $auth.setToken(response.data.token);
                            service.getCurrentUser();
                            return true;
                        } else {
                            return {
                                status: false,
                                errors: service.error = { credentials: ['Invalid email or password']}
                            };
                        }
                    })
                    .catch(function(response) {
                        // Handle errors here, such as displaying a notification
                        // for invalid email and/or password.
                        console.log(response);
                        return {
                            status: false,
                            errors: service.error = response.data.errors || 'Unknown error from server'
                        };
                    });
            },
            socialLogin: function (provider) {
                return $auth.authenticate(provider)
                    .then(function(response) {
                        // console.log(response.data);
                        service.getCurrentUser().then(function (user) {
                            self.error = '';
                            if (moment(user.created_at).isSame(moment(), 'hour')) {
                                console.log('User ' + user.fullName + ' created successfully!');
                                $state.go('profile.about');
                            } else {
                                $state.go('home');
                            }
                        });
                    })
                    .catch(function(response) {
                        return {
                            status: false,
                            errors: service.error = response.data.errors || 'Unknown error from server'
                        };
                    });
            },
            /**
             *
             * @returns {Promise}
             */
            logout: function () {
                //var deferred = $q.defer();
                return $http.post(API + 'logout', null).then(function () {
                    $auth.removeToken();
                    $auth.logout();
                    // localStorage.removeItem('User');
                    // $rootScope.AppData.User = undefined;
                    //deferred.resolve(true);
                });
                //return deferred.promise;
            },
            /**
             *
             * @param email
             * @returns {Promise}
             */
            requestPasswordReset: function (email) {
                return $http.post(API + 'requestPasswordReset', {email: email}).then(function (res) {
                    console.log(res);
                    return res;
                }, function (error) {
                    //console.log(error);
                    return error;
                });
            },
            passwordReset: function (email, password, password_confirmation,token) {
                return $http.post(API + 'resetPassword', {email: email, password: password, password_confirmation: password_confirmation, token: token})
                    .then(function (res) {
                        console.log(res);
                        $state.go('sign_in');
                        return res;
                    }, function (error) {
                        //console.log(error);
                        return error;
                    });
            },
            parseJwt: function(token) {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                return JSON.parse(atob(base64));
            },
            isAuthenticated: function() {
                //var params = $auth.getPayload();
                //console.log(params);
                return $auth.isAuthenticated();
            }
        };

        function _init() {
            service.getCurrentUser();
        }

        _init();
        return service;
    }

    DataService.$inject = ['$http', 'API'];
    function DataService($http, API) {
        var vm = this;

        vm.collection = function (name, params) {
            var data = angular.extend({per_page: 10, page: 1}, params);
            return $http({
                method: 'GET',
                url: API + name,
                params: data
            });
        };
        vm.item = function (name, id, include, search) {
            return $http({
                method: 'GET',
                url: API + name + '/' + id,
                params: {
                    include: include,
                    search: search
                }
            });
        };
        vm.save = function (name, data, params) {
            return $http({
                method: 'POST',
                url: API + name,
                params: params,
                data: data
            });
        };
        vm.update = function (name, id, data, params) {
            return $http({
                method: 'PUT',
                url: API + name + '/' + id,
                params: params,
                data: data
            });
        };
        vm.delete = function (name, id) {
            return $http({
                method: 'DELETE',
                url: API + name + '/' + id
            });
        };
        vm.mail = function (route, params) {
            return $http.post(API + route, params);
        };


        // Newsletter Form
        vm.notifyMe = function (params) {
            return $http.post('utils/notify-me.php', params);
        };

        return vm;
    }

    SignInModalCtrl.$inject = ['$rootScope', '$timeout', 'AuthService', '$modalInstance'];
    function SignInModalCtrl($rootScope, $timeout, AuthService, $modalInstance) {
        zIndexPlayer();
        $rootScope.metadata.title = 'Sign In';
        var self = this;
        self.user = {
            email: '',
            password: ''
        };

        self.doLogin = function (redirect) {
            redirect = redirect || true;
            self.error = false;
            AuthService.login(self.user.email, self.user.password).then(function (res) {
                console.log('Success', res);
                if (redirect) {
                    //$state.go('home');
                    //window.location.reload();
                }
            }, function (res) {
                self.error = res;
                console.log('Failed', res);
            }).then(function () {
                self.ok();
            });
        };


        self.authenticate = function (provider) {
            self.error = null;
            AuthService.socialLogin(provider, false).then(function (a) {
                console.log(a);
            });
        };

        self.ok = function () {
            $modalInstance.close();
        };

        self.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $timeout(function () {
            jQuery(document).foundation();
            $timeout(function () {
                jQuery(document).foundation();
            }, 500);
        }, 0);
    }

    function zIndexPlayer(remove) {
        var vidDiv = jQuery('.flex-video');
        if (vidDiv) {
            !!remove ? vidDiv.css('z-index', '') : vidDiv.css('z-index', 0);
        }
    }

})();


/**
 * Utility Functions
 * Created by Jerez on 11/8/2015.
 */
angular.module('IndieWise.utilities', [])
.factory('UtilsService',  ['$rootScope', '$window', 'DataService', function ($rootScope, $window, DataService) {
        'use strict';
        return {
            compressArray: function (original) {
                var compressed = [];
                // make a copy of the input array
                var copy = original.slice(0);

                // first loop goes over every element
                for (var i = 0; i < original.length; i++) {

                    var myCount = 0;
                    // loop over every element in the copy and see if it's the same
                    for (var w = 0; w < copy.length; w++) {
                        if (original[i] == copy[w]) {
                            // increase amount of times duplicate is found
                            myCount++;
                            // sets item to undefined
                            delete copy[w];
                        }
                    }

                    if (myCount > 0) {
                        var a = new Object();
                        a.value = original[i];
                        a.count = myCount;
                        compressed.push(a);
                    }
                }

                return compressed;
            },
            parseJwt: function(token) {
                var base64Url = token.split('.')[1];
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                return JSON.parse($window.atob(base64));
            }
        }
    }]);

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(searchString, position) {
        var subjectString = this.toString();
        if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
            position = subjectString.length;
        }
        position -= searchString.length;
        var lastIndex = subjectString.indexOf(searchString, position);
        return lastIndex !== -1 && lastIndex === position;
    };
}

/**
 *  @function String.reverse
 *  @description Reverse a string
 *  @return string
 **/
String.prototype.reverse = function(){
    return this.split('').reverse().join('');
};

//# sourceMappingURL=all.js.map
