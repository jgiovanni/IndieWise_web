    (function () {
    'use strict';
    angular.module('underscore', [])
        .factory('_', function () {
            return window.___; // assumes underscore has already been loaded on the page
        });

    angular
        .module('IndieWise', [
            'ngMaterial',
            'mm.foundation',
            'angucomplete-alt',
            'ngMessages',
            'cloudinary',
            'underscore',
            'angularMoment',
            'videosharing-embed',
            'LocalForageModule',
            'ui.router',
            'angular-google-analytics',
            'flow',
            'angular-filepicker',
            'backand',
            'pascalprecht.translate',
            '720kb.socialshare',
            'ngAnimate-animate.css',
            'IndieWise.controllers',
            'IndieWise.services',
            'IndieWise.directives',
            'IndieWise.filters',
            'IndieWise.utilities'
        ])
        .config(['flowFactoryProvider', function (flowFactoryProvider) {
            flowFactoryProvider.defaults = {
                //target: 'utils/upload.php',
                query: {
                    upload_preset: "r0kuyqef"
                },
                target: 'https://api.cloudinary.com/v1_1/indiewise/upload',
                permanentErrors: [404, 500, 501],
                maxChunkRetries: 1,
                chunkRetryInterval: 5000,
                simultaneousUploads: 1,
                singleFile: true
            };
            /*flowFactoryProvider.on('catchAll', function (event) {
             console.log('catchAll', arguments);
             })*/
        }])
        .config(function (filepickerProvider) {
            filepickerProvider.setKey('APbjTx44SlSuCI6P58jwvz');
        })
        .config(['cloudinaryProvider', function (cloudinaryProvider) {
            cloudinaryProvider
                .set("cloud_name", "indiewise")
                .set("upload_preset", "r0kuyqef");
        }])
        .config(['$compileProvider', function ($compileProvider) {
            // significant performance boost
            $compileProvider.debugInfoEnabled(false);
        }])
        .constant('angularMomentConfig', {
            timezone: 'UTC'
        })
        .config(function (AnalyticsProvider) {
            // Add configuration code as desired - see below
            AnalyticsProvider
                .setAccount('UA-27155404-17')
                // Remove prefix on launch
                .trackPrefix('alpha');
        })
        .config(function (BackandProvider) {
            BackandProvider.setAppName('indiewise');
            BackandProvider.setSignUpToken('ed37a6ff-ff08-4d3a-b82c-5f29f9a36c05');
            BackandProvider.setAnonymousToken('6ef61886-faa0-4f42-bf4d-d827339accfe');
            BackandProvider.runSocket(false); //enable the web sockets that makes the database realtime
        })
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
        }])
        .factory('authInterceptor', ['$q', '$injector', '$localForage', '$location', function ($q, $injector, $localForage, $location) {
            return {
                'request': function (config) {
                    var defer = $q.defer();
                    config.headers = config.headers || {};
                    /*if ($localStorage.token) {
                        config.headers.Authorization = 'Bearer ' + $localStorage.token;
                    }*/

                    $localForage.getItem('token').then(function (token) {
                        if (token) {
                            config.headers.Authorization = 'Bearer ' + token;
                        }
                        defer.resolve(config);
                    });
                    return defer.promise;
                },
                'response': function(response) {
                    // only contains "content-type" and "cache-control"
                    console.log(response.headers());
                    return response;
                },
                'responseError': function (response) {
                        if (response.status === 401 || response.status === 403) {   
                            //$location.path('/sign-in');
                        }
                    return $q.reject(response);
                }
            };
        }])

        .config(function ($mdThemingProvider, $mdIconProvider) {
            // Emoticons
            $mdIconProvider
                .icon("emotion", "./assets/svg/emotion.svg", 120)
                .icon("angry", "./assets/svg/emoticons/angry.svg", 120)
                .icon("annoyed", "./assets/svg/emoticons/annoyed.svg", 120)
                .icon("big-smile", "./assets/svg/emoticons/big-smile.svg", 120)
                .icon("bored", "./assets/svg/emoticons/bored.svg", 120)
                .icon("confused", "./assets/svg/emoticons/confused.svg", 120)
                .icon("crying", "./assets/svg/emoticons/crying.svg", 120)
                .icon("disappointed", "./assets/svg/emoticons/disappointed.svg", 120)
                .icon("emotional", "./assets/svg/emoticons/emotional.svg", 120)
                .icon("grinning", "./assets/svg/emoticons/grinning.svg", 120)
                .icon("happy", "./assets/svg/emoticons/happy.svg", 120)
                .icon("hehe", "./assets/svg/emoticons/hehe.svg", 120)
                .icon("hopeful", "./assets/svg/emoticons/hopeful.svg", 120)
                .icon("interested", "./assets/svg/emoticons/interested.svg", 120)
                .icon("joking", "./assets/svg/emoticons/joking.svg", 120)
                .icon("kiss", "./assets/svg/emoticons/kiss.svg", 120)
                .icon("love", "./assets/svg/emoticons/love.svg", 120)
                .icon("mad", "./assets/svg/emoticons/mad.svg", 120)
                .icon("meh", "./assets/svg/emoticons/meh.svg", 120)
                .icon("mute", "./assets/svg/emoticons/mute.svg", 120)
                .icon("nerdy", "./assets/svg/emoticons/nerdy.svg", 120)
                .icon("neutral", "./assets/svg/emoticons/neutral.svg", 120)
                .icon("ninja", "./assets/svg/emoticons/ninja.svg", 120)
                .icon("nostalgic", "./assets/svg/emoticons/nostalgic.svg", 120)
                .icon("oh-really", "./assets/svg/emoticons/oh-really.svg", 120)
                .icon("sad", "./assets/svg/emoticons/sad.svg", 120)
                .icon("sad-tear", "./assets/svg/emoticons/sad-tear.svg", 120)
                .icon("sarcastic", "./assets/svg/emoticons/sarcastic.svg", 120)
                .icon("sexy", "./assets/svg/emoticons/sexy.svg", 120)
                .icon("shocked", "./assets/svg/emoticons/shocked.svg", 120)
                .icon("silent", "./assets/svg/emoticons/silent.svg", 120)
                .icon("silly", "./assets/svg/emoticons/silly.svg", 120)
                .icon("smile", "./assets/svg/emoticons/smile.svg", 120)
                .icon("sympathetic", "./assets/svg/emoticons/sympathetic.svg", 120)
                .icon("wink", "./assets/svg/emoticons/wink.svg", 120)
                .icon("woah", "./assets/svg/emoticons/woah.svg", 120)
                .icon("matureSmall", "./assets/svg/OFLC_small_M.svg", 120)
                .icon("matureLarge", "./assets/svg/OFLC_large_M.svg", 120);
        })
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

            $urlRouterProvider.when('', '/home');
            $urlRouterProvider.when('/', '/home');
            $stateProvider
                .state('home', {
                    url: '/home',
                    authenticate: false,
                    templateUrl: './src/home/view/index.html',
                    controller: 'HomeCtrl as Home'
                })
                .state('browse', {
                    url: '/browse?q&sort&types&genres',
                    authenticate: false,
                    templateUrl: './src/browse/view/index.html',
                    controller: 'BrowseCtrl as Browse'
                })
                .state('latest', {
                    url: '/latest',
                    authenticate: false,
                    templateUrl: './src/latest/view/index.html',
                    controller: 'LatestCtrl as LC'
                })
                .state('video_critique', {
                    url: '/{video_url_id}/critique/{url_id}',
                    authenticate: false,
                    templateUrl: './src/common/critique.html',
                    controller: 'VideoCritiqueCtrl as VCC',
                    resolve: {
                        Critique: ['$stateParams', 'DataService', '$q', function ($stateParams, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.query('getCritiqueByUrlId', {urlId: $stateParams.url_id}).then(function (result) {
                                deferred.resolve(result);
                            });

                            return deferred.promise;
                        }]
                    }
                })
                .state('video_critique-edit', {
                    url: '/{video_url_id}/critique/{url_id}/edit',
                    authenticate: true,
                    templateUrl: './src/common/critique-edit.html',
                    controller: 'VideoCritiqueEditCtrl',
                    resolve: {
                        Critique: ['AuthService', '$stateParams', 'DataService', '$q', function (AuthService, $stateParams, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.query('getCritiqueByUrlId', {urlId: $stateParams.url_id}).then(function (result) {
                                if (result.data[0].author === AuthService.currentUser.id) {
                                    deferred.resolve(result);
                                } else {
                                    deferred.reject('Not Owner');
                                }
                                deferred.resolve(result);
                            });
                            return deferred.promise;
                        }]
                    }
                })
                // Authenticated Pages
                .state('user', {
                    url: '/user/{url_id}',
                    authenticate: true,
                    abstract: true,
                    templateUrl: './src/auth/user.html',
                    controller: 'UserCtrl as UserC',
                    resolve: {
                        User: ['$stateParams', 'DataService', '$q', function ($stateParams, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.query('getUserByUrlId', {urlId: $stateParams.url_id}, false).then(function (result) {
                                deferred.resolve(result.data[0]);
                            });
                            return deferred.promise;
                        }],
                        UserStats: ['User', 'DataService', '$q', function (User, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.query('countUserStats', {id: User.id}).then(function (response) {
                                deferred.resolve(response);
                            });
                            return deferred.promise;
                        }]
                    }
                })
                .state('user.about', {
                    url: '/about',
                    templateUrl: './src/auth/user-about.html',
                    controller: 'UserAboutController as UserAboutCtrl'
                })
                .state('user.videos', {
                    url: '/videos',
                    templateUrl: './src/auth/user-videos.html',
                    controller: 'UserVideosController as UserVideosCtrl',
                    resolve: {
                        Videos: ['User', 'DataService', '$q', function (User, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.getList('Project', [{fieldName: "createdAt", order: "desc"}],
                                [
                                    {fieldName: "owner", operator: "in", value: User.id},
                                    {fieldName: "unlist", operator: "is", value: false}
                                ], 20, true, true, 1).then(function (result) {
                                    deferred.resolve(result);
                                });
                            return deferred.promise;
                        }]
                    }
                })
                .state('user.critiques', {
                    url: '/critiques',
                    templateUrl: './src/auth/user-critiques.html',
                    controller: 'UserCritiquesController as UserCritiquesCtrl',
                    resolve: {
                        Critiques: ['User', 'DataService', '$q', function (User, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.query('getUserCritiques', {id: User.id})
                                .then(function (result) {
                                    deferred.resolve(result);
                                });
                            return deferred.promise;
                        }],
                        Critiqued: ['User', 'DataService', '$q', function (User, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.query('getUserCritiqued', {id: User.id})
                                .then(function (result) {
                                    deferred.resolve(result);
                                });
                            return deferred.promise;
                        }]
                    }
                })
                .state('user.reactions', {
                    url: '/reactions',
                    templateUrl: './src/auth/user-reactions.html',
                    controller: 'UserReactionsController as UserReactionsCtrl',
                    resolve: {
                        Reactions: ['User', 'DataService', '$q', function (User, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.query('getUserReactions', {id: User.id})
                                .then(function (result) {
                                    deferred.resolve(result);
                                });
                            return deferred.promise;
                        }],
                        Reacted: ['User', 'DataService', '$q', function (User, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.query('getUserReacted', {id: User.id})
                                .then(function (result) {
                                    deferred.resolve(result);
                                });
                            return deferred.promise;
                        }]
                    }
                })
                .state('user.awards', {
                    url: '/awards',
                    templateUrl: './src/auth/user-awards.html',
                    controller: 'UserAwardsController as UserAwardsCtrl',
                    resolve: {
                        Awards: ['User', 'DataService', '$q', function (User, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.query('getUserAwards', {id: User.id}).then(function (result) {
                                deferred.resolve(result);
                            });
                            return deferred.promise;
                        }],
                        Nominations: ['User', 'DataService', '$q', function (User, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.query('getUserNominations', {id: User.id})
                                .then(function (result) {
                                    deferred.resolve(result);
                                });
                            return deferred.promise;
                        }],
                        Nominated: ['User', 'DataService', '$q', function (User, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.query('getUserNominated', {id: User.id})
                                .then(function (result) {
                                    deferred.resolve(result);
                                });
                            return deferred.promise;
                        }]
                    }
                })
                .state('profile', {
                    url: '/profile',
                    authenticate: true,
                    abstract: true,
                    templateUrl: './src/auth/profile.html',
                    controller: 'ProfileCtrl as Profile',
                    resolve: {
                        User: ['AuthService', '$q', function (AuthService, $q) {
                            var deferred = $q.defer();
                            AuthService.getCurrentUser().then(function (response) {
                                //console.log(response);
                                deferred.resolve(response);
                            });
                            return deferred.promise;
                        }],
                        UserStats: ['AuthService', 'DataService', '$q', function (AuthService, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.collection('users/countUserStats').then(function (response) {
                                deferred.resolve(response.data);
                            });
                            return deferred.promise;
                        }]
                    }
                })
                .state('profile.about', {
                    url: '/about',
                    authenticate: true,
                    templateUrl: './src/auth/profile-about.html',
                    controller: 'ProfileAboutController as ProfileAboutCtrl'
                })
                .state('profile.upload', {
                    url: '/upload',
                    authenticate: true,
                    templateUrl: './src/auth/profile-upload.html',
                    controller: 'ProfileUploadController as UC'
                })
                .state('profile.videos', {
                    url: '/videos',
                    authenticate: true,
                    templateUrl: './src/auth/profile-videos.html',
                    controller: 'ProfileVideosController as ProfileVideosCtrl',
                    resolve: {
                        Videos: ['AuthService', 'DataService', '$q', function (AuthService, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.collection('projects', {owner: AuthService.currentUser.id, sort: 'created_at', per_page: 50})
                                .then(function (result) {
                                    deferred.resolve(result);
                                });
                            return deferred.promise;
                        }]
                    }
                })
                .state('profile.videos-edit', {
                    url: '/videos/{url_id}/edit',
                    authenticate: true,
                    templateUrl: './src/auth/profile-videos-edit.html',
                    controller: 'ProfileVideoEditCtrl as VEC',
                    resolve: {
                        Project: ['AuthService', '$stateParams', 'DataService', '$q', function (AuthService, $stateParams, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.item('projects', result.data[0].id, true, false, 1).then(function (res) {
                                deferred.resolve(res);
                            });
                            return deferred.promise;
                        }]
                    }
                })
                .state('profile.critiques', {
                    url: '/critiques',
                    authenticate: true,
                    templateUrl: './src/auth/profile-critiques.html',
                    controller: 'ProfileCritiquesController as ProfileCritiquesCtrl',
                    resolve: {
                        Critiques: ['AuthService', 'DataService', '$q', function (AuthService, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.collection('critiques', {user: AuthService.currentUser.id})
                                .then(function (result) {
                                    deferred.resolve(result);
                                });
                            return deferred.promise;
                        }],
                        Critiqued: ['AuthService', 'DataService', '$q', function (AuthService, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.collection('critiques', {notUser: AuthService.currentUser.id})
                                .then(function (result) {
                                    deferred.resolve(result);
                                });
                            return deferred.promise;
                        }]
                    }
                })
                .state('profile.reactions', {
                    url: '/reactions',
                    authenticate: true,
                    templateUrl: './src/auth/profile-reactions.html',
                    controller: 'ProfileReactionsController as ProfileReactionsCtrl',
                    resolve: {
                        Reactions: ['AuthService', 'DataService', '$q', function (AuthService, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.collection('reactions', {user: AuthService.currentUser.id})
                                .then(function (result) {
                                    deferred.resolve(result);
                                });
                            return deferred.promise;
                        }],
                        Reacted: ['AuthService', 'DataService', '$q', function (AuthService, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.collection('reactions', {notUser: AuthService.currentUser.id})
                                .then(function (result) {
                                    deferred.resolve(result);
                                });
                            return deferred.promise;
                        }]
                    }
                })
                .state('profile.awards', {
                    url: '/awards',
                    authenticate: true,
                    templateUrl: './src/auth/profile-awards.html',
                    controller: 'ProfileAwardsController as ProfileAwardsCtrl',
                    resolve: {
                        Awards: ['AuthService', 'DataService', '$q', function (AuthService, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.collection('awards', {id: AuthService.currentUser.id}).then(function (result) {
                                deferred.resolve(result);
                            });
                            return deferred.promise;
                        }],
                        Nominations: ['AuthService', 'DataService', '$q', function (AuthService, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.collection('nominations', {user: AuthService.currentUser.id})
                                .then(function (result) {
                                    deferred.resolve(result);
                                });
                            return deferred.promise;
                        }],
                        Nominated: ['AuthService', 'DataService', '$q', function (AuthService, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.query('nominations', {notUser: AuthService.currentUser.id})
                                .then(function (result) {
                                    deferred.resolve(result);
                                });
                            return deferred.promise;
                        }]
                    }
                })
                .state('profile.playlists', {
                    url: '/playlists',
                    authenticate: true,
                    templateUrl: './src/auth/profile-playlists.html',
                    controller: 'ProfilePlaylistsController as ProfilePlaylistsCtrl',
                    resolve: {
                        Playlists: ['AuthService', 'DataService', '$q', function (AuthService, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.collection('playlists', [],
                                [{fieldName: 'user', operator: 'in', value: AuthService.currentUser.id}],
                                50, true, false).then(function (result) {
                                    deferred.resolve(result);
                                });
                            return deferred.promise;
                        }]
                    }
                })
                .state('profile.settings', {
                    url: '/settings',
                    authenticate: true,
                    templateUrl: './src/auth/profile-settings.html',
                    controller: 'ProfileSettingsController as PSC',
                    resolve: {
                        Genres: ['AuthService', 'DataService', '$q', function (AuthService, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.getList('Genres', [],
                                [{fieldName: "user", operator: "in", value: AuthService.currentUser.id}],
                                20, false, false, 1).then(function (result) {
                                    deferred.resolve(result);
                                });
                            return deferred.promise;
                        }],
                        UserTypes: ['AuthService', 'DataService', '$q', function (AuthService, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.getList('UserTypes', [],
                                [{fieldName: "user", operator: "in", value: AuthService.currentUser.id}],
                                20, false, false, 1).then(function (result) {
                                    deferred.resolve(result);
                                });
                            return deferred.promise;
                        }]
                    }
                })
                .state('messages', {
                    url: '/messages',
                    authenticate: true,
                    templateUrl: './src/auth/messages.html',
                    controller: 'MessagesCtrl as Msgs',
                    resolve: {
                        Conversations: ['AuthService', 'DataService', '$q', function (AuthService, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.query('getUserConversations', {
                                username: AuthService.currentUser.username
                            }).then(function (result) {
                                deferred.resolve(result);
                            });
                            return deferred.promise;
                        }]
                    }
                })
                .state('messages.message', {
                    authenticate: true,
                    templateUrl: './src/auth/messages.html',
                    controller: 'MessagesCtrl as Msgs'
                })
                /*.state('notifications', {
                 url: '/notifications',
                 authenticate: true,
                 templateUrl: './src/auth/notifications.html',
                 controller: 'NotificationsCtrl as NC'
                 })*/

                // Auth Pages
                .state('register', {
                    url: '/register',
                    authenticate: false,
                    templateUrl: './src/auth/register.html',
                    controller: 'RegisterCtrl as RC'
                })
                .state('sign_in', {
                    url: '/sign-in',
                    authenticate: false,
                    templateUrl: './src/auth/sign-in.html',
                    controller: 'SignInCtrl as SIC'
                })
                .state('reset_password', {
                    url: '/reset-password?email&token',
                    authenticate: false,
                    templateUrl: './src/auth/reset-password.html',
                    controller: 'ForgotPasswordCtrl as FPC'
                })

                // Static Pages
                .state('about', {
                    url: '/about',
                    authenticate: false,
                    templateUrl: './src/static/about.html'
                })
                .state('contact', {
                    url: '/contact',
                    authenticate: false,
                    templateUrl: './src/static/contact.html',
                    controller: 'ContactPageCtrl as CC'
                })
                .state('tos', {
                    url: '/terms-of-service',
                    authenticate: false,
                    templateUrl: './src/static/tos.html'
                })
                .state('advertise', {
                    url: '/advertise',
                    authenticate: false,
                    templateUrl: './src/static/advertise.html'
                })
                .state('privacy', {
                    url: '/privacy-policy',
                    authenticate: false,
                    templateUrl: './src/static/privacy.html'
                })
                .state('404', {
                    url: '/404',
                    authenticate: false,
                    templateUrl: './src/static/404.html'
                })

                // Video Pages
                .state('video', {
                    url: '/{url_id:[0-9]{13}}',
                    authenticate: false,
                    templateUrl: './src/common/video.html',
                    controller: 'VideoCtrl as VC',
                    resolve: {
                        Project: ['$stateParams', 'DataService', '$q', function ($stateParams, DataService, $q) {
                            var deferred = $q.defer();
                            DataService.item('projects', $stateParams.url_id, '').then(function (result) {
                                deferred.resolve(result.data.data);
                            });

                            return deferred.promise;
                        }]
                    }
                })
            ;

            $urlRouterProvider.otherwise('/404');
            $locationProvider.html5Mode({enabled: false, requireBase: true, rewriteLinks: true});

        }])
        .constant('Config', {
            streamApiKey: 'pftnxtwf4yuz',
            streamApiSecret: 'k563yw7srhjeubw6xbx26def8xta47ume75uqaaewh6k4qyzj4mr3cfcmbts6cf3',
            streamApp: '6408'
        })
        .run(['$rootScope', '$state', '$stateParams', 'AuthService', 'UtilsService', 'DataService', '$http', '$timeout', '$transitions', 'Backand', function ($rootScope, $state, $stateParams, AuthService, UtilsService, DataService, $http, $timeout, $transitions, Backand) {
            FastClick.attach(document.body);
            $rootScope.AppData = {
                User: AuthService.currentUser,
                //UserData: AuthService.currentUser,
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

            $rootScope.listenNotifications = function (username) {
                $rootScope.refreshNotifications(username);
                Backand.on('notifications', function (data) {
                    console.log('Notifications: ', data);
                    $rootScope.refreshNotifications(username);
                });
            };

            $rootScope.refreshNotifications = function (id) {
                $rootScope.AppData.Notifications.loaded = 'indeterminate';
                DataService.query('getUserNotifications', {
                    username: id
                }).then(function (res) {
                    console.log(res.data);
                    $rootScope.AppData.Notifications = {
                        loaded: '',
                        list: res.data,
                        unseen: _.where(res.data, {seen: false}).length,
                        unread: 0
                    };
                    console.log($rootScope.AppData.Notifications);
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

            var endWatch = $rootScope.$watch('AppData.User', function (newValue, oldValue) {
                if (newValue && angular.isString(newValue.id)) {
                    console.log('User Logged In');
                    $rootScope.listenNotifications(newValue.username);
                    endWatch();
                }
            });

            // loading animation
            $rootScope.setLoading = function () {
                /*var opts = {
                 lines: 13 // The number of lines to draw
                 , length: 9 // The length of each line
                 , width: 7 // The line thickness
                 , radius: 42 // The radius of the inner circle
                 , scale: 1 // Scales overall size of the spinner
                 , corners: 1 // Corner roundness (0..1)
                 , color: '#000' // #rgb or #rrggbb or array of colors
                 , opacity: 0.25 // Opacity of the lines
                 , rotate: 0 // The rotation offset
                 , direction: 1 // 1: clockwise, -1: counterclockwise
                 , speed: 1 // Rounds per second
                 , trail: 60 // Afterglow percentage
                 , fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
                 , zIndex: 2e9 // The z-index (defaults to 2000000000)
                 , className: 'spinner' // The CSS class to assign to the spinner
                 , top: '-50%' // Top position relative to parent
                 , left: '50%' // Left position relative to parent
                 , shadow: true // Whether to render a shadow
                 , hwaccel: true // Whether to use hardware acceleration
                 , position: 'absolute' // Element positioning
                 };
                 var target = document.getElementById('alerts');
                 $rootScope.spinner = window.spinner = new Spinner(opts).spin(target);*/
                $rootScope.isViewLoading = true;
            };
            $rootScope.unsetLoading = function () {
                $rootScope.isViewLoading = false;
                //$rootScope.spinner.stop();
            };

            // State transition hooks
            $transitions.onBefore({}, function ($transition$) {
                $rootScope.setLoading();
            });

            $transitions.onStart({to: 'register', from: '*'}, function ($transition$, $state, AuthService) {
                return AuthService.currentUser ? $state.target('home') : true;
            });
            $transitions.onStart({to: 'sign_in', from: '*'}, function ($transition$, $state, AuthService) {
                return AuthService.currentUser ? $state.target('home') : true;
            });
            $transitions.onStart({to: 'reset_password', from: '*'}, function ($transition$, $state, AuthService) {
                return AuthService.currentUser ? $state.target('home') : true;
            });
            $transitions.onStart({
                to: function (state) {
                    return !!state.authenticate;
                }
            }, function ($transition$, $state, AuthService) {
                return AuthService.currentUser ? true : AuthService.getCurrentUser().then(function () {
                    return true;
                }, function () {
                    return $state.target('sign_in');
                });

                //return  ? true : $state.target('sign_in');
            });

            $transitions.onSuccess({}, function () {
                $rootScope.unsetLoading();
                $timeout(function () {
                    jQuery(document).foundation();
                }, 100);
                //Analytics.trackPage($location.path());
            });

            $transitions.onError({}, function ($state) {
                console.log($state);
            });
        }])
        .config(['$localForageProvider', function ($localForageProvider) {
            $localForageProvider.config({
                //driver      : 'localStorageWrapper', // if you want to force a driver
                name: 'iw', // name of the database and prefix for your data, it is "lf" by default
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
                // 'https://api.backand.com/**',
                new RegExp('^(http[s]?):\/\/(w{3}.)?youtube\.com/.+$')
            ]);
        }]);
})
();
