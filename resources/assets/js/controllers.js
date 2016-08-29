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

    SignInCtrl.$inject = ['$rootScope', '$timeout', '$q', '$state', 'AuthService', '$modal'];
    function SignInCtrl($rootScope, $timeout, $q, $state, AuthService, $modal) {
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
                } else {
                    if (redirect && angular.isDefined(res)) {
                        $state.go('home');
                    }
                }
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
                // UserActions.markAsWatched(self.film)
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
                    mimetype: 'video/*'
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