function loadScript(url, callback) {

    var script = document.createElement("script");
    script.type = "text/javascript";

    script.onload = function () {
        callback();
    };
    script.src = url;
    document.getElementsByTagName("head")[0].appendChild(script);
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
    "use strict";
    /*Layer slider trigger*/
    /*jQuery("#layerslider").layerSlider({
     responsive: false,
     responsiveUnder: 1280,
     layersContainer: 1280,
     skin: 'noskin',
     hoverPrevNext: false,
     skinsPath: '../layerslider/skins/'
     });*/
    //login register click
    jQuery(".loginReg").on("click", function (e) {
        e.preventDefault();
        jQuery(this).next().slideToggle();
        jQuery(this).toggleClass("active");
    });

    //search bar
    jQuery(".search.end").on("click", function () {
        if (jQuery(this).children().hasClass("fa-search")) {
            jQuery(this).children().removeClass("fa-search");
            jQuery(this).children().addClass("fa-times");
        } else {
            jQuery(this).children().removeClass("fa-times");
            jQuery(this).children().addClass("fa-search");
        }
        jQuery(this).toggleClass("search-active");
        jQuery("#search-bar").slideToggle();

    });

    //grid system
    /*jQuery(".grid-system > a").on("click", function(event){
     event.preventDefault();
     var selector = jQuery(this).parent().parent().next().find('div.item');
     var classStr = jQuery(selector).attr('class'),
     lastClass = classStr.substr( classStr.lastIndexOf(' ') + 1);
     jQuery(selector)
     // Remove last class
     .removeClass(lastClass)
     // Put back .item class + the clicked elements class with the added prefix "group-item-".
     .addClass('item group-item-' + jQuery(this).attr('class') );
     if(jQuery(this).hasClass("current")!== true)
     {
     jQuery('.grid-system > a').removeClass("current");
     jQuery(this) .addClass("current");
     }
     });*/

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
    //newsTicker
    /*jQuery('#newsBar').inewsticker({
     speed       : 2500,
     effect      : 'fade',
     dir         : 'ltr',
     font_size   : 13,
     color       : '#fff',
     font_family : 'arial',
     delay_after : 1000
     });*/

    //show more and less
    /*jQuery('.showmore_one').showMore({
     speedDown: 300,
     speedUp: 300,
     height: '165px',
     showText: 'Show more',
     hideText: 'Show less'
     });*/

    /*jQuery(".reply").each(function(){
     if(jQuery(this).parent().next().length > 0){
     jQuery(this).html('Hide replies <i class="fa fa-angle-up"></i>');
     }
     });
     //comments reply hide show
     jQuery(".reply").on('click', function(){
     if(jQuery(this).parent().next().length > 0){
     jQuery(this).parent().nextAll().slideToggle();
     //jQuery(this).html(jQuery(this).text() === 'Hide replies' ? 'Show replies' : 'Hide replies');
     if(jQuery(this).hasClass('hide-reply')){
     jQuery(this).removeClass('hide-reply');
     jQuery(this).html('show replies <i class="fa fa-angle-down"></i>');
     }else {
     jQuery(this).addClass('hide-reply');
     jQuery(this).html('Hide replies <i class="fa fa-angle-up"></i>');
     }
     }
     });*/

    //register form
    jQuery("div.social-login").mouseenter(function () {
        jQuery("i.arrow-left").addClass("active");
    })
        .mouseleave(function () {
            jQuery("i.arrow-left").removeClass("active");
        });
    jQuery("div.register-form").mouseenter(function () {
        jQuery("i.arrow-right").addClass("active");
    })
        .mouseleave(function () {
            jQuery("i.arrow-right").removeClass("active");
        });

    //vertical thumb slider
    var thumb = jQuery('.thumb-slider .thumbs').find('.ver-thumbnail');
    jQuery(thumb).on('click', function () {
        var id = jQuery(this).attr('id');
        //alert(id);
        jQuery('.image').eq(0).show();
        jQuery('.image').hide();
        jQuery('.' + id).fadeIn();
    });
    var $par = jQuery('.thumb-slider .thumbs .thumbnails').scrollTop(0);
    jQuery('.thumb-slider .thumbs a').click(function (e) {
        e.preventDefault();                      // Prevent defautl Anchors behavior
        var n = jQuery(this).hasClass("down") ? "+=200" : "-=200"; // Direction
        $par.animate({scrollTop: n});
    });

    //tab panel
    /*jQuery('[data-tab]').on('click', function (e) {
     jQuery(this).addClass('active').siblings('[data-tab]').removeClass('active');
     jQuery(this).siblings('[data-content=' + jQuery(this).data('tab') + ']').addClass('active').siblings('[data-content]').removeClass('active');
     e.preventDefault();
     });*/

});
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
            'angular-loading-bar',
            'LocalForageModule',
            'ui.router',
            'angular-google-analytics',
            'flow',
            'satellizer',
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
        .constant('API', window.API || 'http://52.207.215.154/api/')
        .config(['$authProvider', 'API', function ($authProvider, API) {
            $authProvider.loginUrl = '/api/login';
            $authProvider.signupUrl = '/api/register';

            $authProvider.facebook({
                clientId: '150687055270744',
                // url: window.location.origin + '/auth/facebook',
                // redirectUri: window.location.origin + '/auth/facebook/callback',
            });

            $authProvider.google({
                clientId: '322274582930-4m1dueb708gvdic28n12e5dhqq121a6b.apps.googleusercontent.com',
                // url: window.location.origin + '/auth/google',
                // redirectUri: window.location.origin + '/auth/google/callback',
            });

            $authProvider.twitter({
                clientId: 'nnSvvHd86gBpxPwJaLGvzM2Mm',
                // url: window.location.origin + '/auth/twitter',
                // redirectUri: window.location.origin + '/auth/twitter/callback',
            });
        }])
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
            // BackandProvider.setSignUpToken('ed37a6ff-ff08-4d3a-b82c-5f29f9a36c05');
            // BackandProvider.setAnonymousToken('6ef61886-faa0-4f42-bf4d-d827339accfe');
            BackandProvider.runSocket(false); //enable the web sockets that makes the database realtime
        })
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
        }])
        .factory('authInterceptor', ['$q', '$injector', '$location', 'API', function ($q, $injector, $location, API) {
            return {
                'request': function (config) {
                    config.headers = config.headers || {};
                    return config;
                },
                'response': function (response) {
                    // only contains "content-type" and "cache-control"
                    // console.log(response.headers());
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
                        Critique: ['$stateParams', 'DataService', function ($stateParams, DataService) {
                            return DataService.item('critiques', $stateParams.url_id).then(function (result) {
                                return result;
                            });
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
                            DataService.item('critiques', $stateParams.url_id).then(function (result) {
                                result.data[0].author === AuthService.currentUser.id ? deferred.resolve(result) : deferred.reject('Not Owner');
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
                    templateUrl: './src/auth/user-about.html',
                    controller: 'UserAboutController as UserAboutCtrl'
                })
                .state('user.videos', {
                    url: '/videos',
                    templateUrl: './src/auth/user-videos.html',
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
                    templateUrl: './src/auth/user-critiques.html',
                    controller: 'UserCritiquesController as UserCritiquesCtrl',
                    resolve: {
                        Critiques: ['User', 'DataService', function (User, DataService) {
                            return DataService.collection('critiques', {user: User.id})
                                .then(function (result) {
                                    return result;
                                });
                        }],
                        Critiqued: ['User', 'DataService', function (User, DataService) {
                            return DataService.collection('critiques', {notUser: User.id})
                                .then(function (result) {
                                    return result;
                                });
                        }]
                    }
                })
                .state('user.reactions', {
                    url: '/reactions',
                    templateUrl: './src/auth/user-reactions.html',
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
                    templateUrl: './src/auth/user-awards.html',
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
                    templateUrl: './src/auth/profile.html',
                    controller: 'ProfileCtrl as Profile',
                    resolve: {
                        User: ['AuthService', function (AuthService) {
                            return AuthService.getCurrentUser().then(function (response) {
                                return response;
                            });
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
                    templateUrl: './src/auth/profile-videos-edit.html',
                    controller: 'ProfileVideoEditCtrl as VEC',
                    resolve: {
                        Project: ['AuthService', '$stateParams', 'DataService', function (AuthService, $stateParams, DataService) {
                            return DataService.item('projects', $stateParams.url_id, true, false, 1).then(function (result) {
                                return result;
                            });
                        }]
                    }
                })
                .state('profile.critiques', {
                    url: '/critiques',
                    authenticate: true,
                    templateUrl: './src/auth/profile-critiques.html',
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
                    templateUrl: './src/auth/profile-reactions.html',
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
                    templateUrl: './src/auth/profile-awards.html',
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
                    templateUrl: './src/auth/profile-playlists.html',
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
                    templateUrl: './src/auth/profile-settings.html',
                    controller: 'ProfileSettingsController as PSC',
                    resolve: {
                        Genres: ['AuthService', 'DataService', '$q', function (AuthService, DataService, $q) {
                            return DataService.collection('Genres', [],
                                [{fieldName: "user", operator: "in", value: AuthService.currentUser.id}],
                                20, false, false, 1).then(function (result) {
                                return result;
                            });
                        }],
                        UserTypes: ['AuthService', 'DataService', '$q', function (AuthService, DataService, $q) {
                            return DataService.collection('UserTypes', [],
                                [{fieldName: "user", operator: "in", value: AuthService.currentUser.id}],
                                20, false, false, 1).then(function (result) {
                                return result;
                            });
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
                            return DataService.query('getUserConversations', {
                                username: AuthService.currentUser.username
                            }).then(function (result) {
                                return result;
                            });
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
                    //$rootScope.listenNotifications(newValue.username);
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
