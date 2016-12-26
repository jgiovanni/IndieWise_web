// import moment = require("moment");
(function () {
    'use strict';

    function mysql_real_escape_string(str: string) {
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

    RegisterCtrl.$inject = ['$rootScope', '$timeout', '$q', '$state', 'AuthService', 'DataService', 'anchorSmoothScroll', '_'];
    class RegisterCtrl {
        constructor($rootScope, $timeout, $q, $state, AuthService, DataService, anchorSmoothScroll, _) {
            $rootScope.metadata.title = 'Register';
            let self = this;
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
            for (let i = self.thisYear; i > (self.thisYear - 100); i--) {
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
    }

    SignInCtrl.$inject = ['$rootScope', '$timeout', '$q', '$state', 'AuthService', '$window', '$modal', 'cfpLoadingBar'];
    class SignInCtrl {
        constructor($rootScope, $timeout, $q, $state, AuthService, $window, $modal, cfpLoadingBar) {
            $rootScope.metadata.title = 'Sign In';
            let self = this;
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
                            if($rootScope.$stateParams.redirect) {
                                return $window.location.href = $rootScope.$stateParams.redirect;
                            }
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
                    if (res && res.hasOwnProperty('status') && res.status === false) {
                        self.authErrors = res.errors;
                        $rootScope.toastMessage('There is an error, please check your form');
                        // console.log('Failed', res);
                    } else {
                        $rootScope.toastMessage('There is an error, please try again');
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
    }

    ForgotPasswordCtrl.$inject = ['$rootScope', '$state', 'AuthService'];
    class ForgotPasswordCtrl {
        constructor($rootScope, $state, AuthService) {
            $rootScope.metadata.title = 'Password Recovery';

            let self = this;
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
    }

    BodyCtrl.$inject = ['$rootScope', '$localForage', '$q', '$state', 'AuthService', '$mdToast', 'UserActions', '$sce', 'DataService', '_', '$interval', '$mdSidenav'];
    class BodyCtrl {
        constructor($rootScope, $localForage, $q, $state, AuthService, $mdToast, UserActions, $sce, DataService, _, $interval, $mdSidenav) {
            let self = this;

            self.selected = null;
            $rootScope.AppData.searchText = decodeURIComponent($rootScope.$stateParams.q || '');
            self.selectedItem = '';

            self.notificationsTemplate = $sce.trustAsResourceUrl('src/directives/notification.html');
            self.newsletterRegister = newsletterRegister;

            //if cache is too old, empty it
            $localForage.getItem('timestamp', true).then(function (timestamp) {
                // if older than 1 week, clear it
                if (moment(timestamp).add(1, 'w').isBefore()) {
                    $localForage.clear();
                }
            }, function (error) {
                $localForage.clear();
            });

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

            let isIOS = function() {
                return !!(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i));
            };
            let isAndroid = function() {
                return !!navigator.userAgent.match(/Android/i);
            };

            $rootScope.isMobile = self.isMobile = function () {
                return isIOS() || isAndroid() || Foundation.MediaQuery.current === 'small';
            };

            $rootScope.requestVerificationEmail = function () {
                debugger;
                AuthService.requestVerification().then(function () {
                    self.verificationEmailSentMessage = true;
                });
            };

            $rootScope.generateGenres = function () {
                let deferred = $q.defer();
                // $localForage.removeItem('genres');
                $localForage.getItem('genres', true).then(function (data) {
                    $rootScope.genresList = data;
                    deferred.resolve(data);
                }, function (error) {
                    DataService.collection('genres').then(function (result) {
                        $rootScope.genresList = result.data.Genres;
                        $localForage.setItem('genres', result.data.Genres);
                        $localForage.setItem('timestamp', moment().toISOString());
                        deferred.resolve(result.data.Genres);
                    });
                });

                return deferred.promise;
            };

            $rootScope.generateTypes = function () {
                let deferred = $q.defer();
                // $localForage.removeItem('types');
                $localForage.getItem('types', true).then(function (data) {
                    $rootScope.typesList = data;
                    deferred.resolve(data);
                }, function (error) {
                    DataService.collection('types').then(function (result) {
                        $rootScope.typesList = result.data.Types;
                        $localForage.setItem('types', result.data.Types);
                        $localForage.setItem('timestamp', moment().toISOString());
                        deferred.resolve(result.data.Types);
                    });
                });

                return deferred.promise;
            };

            $rootScope.generateCountries = function () {
                let deferred = $q.defer();
                // $localForage.removeItem('countries');
                $localForage.getItem('countries', true).then(function (data) {
                    $rootScope.countryList = data;
                    deferred.resolve(data);
                }, function (error) {
                    DataService.collection('countries').then(function (result) {
                        $rootScope.countryList = result.data.Countries;
                        $localForage.setItem('countries', result.data.Countries);
                        $localForage.setItem('timestamp', moment().toISOString());
                        deferred.resolve(result.data.Countries);
                    });
                });

                return deferred.promise;
            };

            $rootScope.generateLanguages = function () {
                let deferred = $q.defer();
                // $localForage.removeItem('languages');
                $localForage.getItem('languages', true).then(function (data) {
                    $rootScope.languageList = data;
                    deferred.resolve(data);
                }, function (error) {
                    DataService.collection('languages').then(function (result) {
                        $rootScope.languageList = result.data.Languages;
                        $localForage.setItem('languages', result.data.Languages);
                        $localForage.setItem('timestamp', moment().toISOString());
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
                let toast = $mdToast.simple()
                    .textContent(msg)
                    .position('bottom right')
                    .parent(jQuery('#alerts'));
                $mdToast.show(toast);
            };

            $rootScope.toastAction = function (msg, action, cb) {
                let toast = $mdToast.simple()
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

            self.toggleSideNav = toggleSideNav;
            self.closeSideNav = closeSideNav;

            function toggleSideNav(navID) {
                $mdSidenav(navID)
                    .toggle()
                    .then(function () {
                        $rootScope.$broadcast('overVideoPlayer', false);
                    });
            }

            function closeSideNav(navID) {
                $mdSidenav(navID)
                    .close()
                    .then(function () {
                        $rootScope.$broadcast('overVideoPlayer', true);
                    });
            }

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
                let unseenList = _.where($rootScope.AppData.Notifications.list, {seen: false});
                let i = 0;

                _.each($rootScope.AppData.Notifications.list, function (a) {
                    if (!a.seen) {
                        a.seen = true;
                    }
                });

                $rootScope.getNewToken('notification', $rootScope.AppData.User.id).then(function (token) {
                    let feed = $rootScope.StreamClient.feed('notification', $rootScope.AppData.User.id, token);
                    feed.get({limit: 20, mark_seen: true}, function (a) {
                        _.each($rootScope.AppData.Notifications.list, function (n) {
                            n.is_seen = true;
                        });
                        $rootScope.AppData.Notifications.unseen = 0;
                    })
                });
            };

            self.markAllAsRead = function () {
                $rootScope.getNewToken('notification', $rootScope.AppData.User.id).then(function (token) {
                    let feed = $rootScope.StreamClient.feed('notification', $rootScope.AppData.User.id, token);
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
                        let feed = $rootScope.StreamClient.feed('notification', $rootScope.AppData.User.id, token);
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

            self.toSignInRedirect = function () {
                return window.location = window.location.origin + '/sign-in?redirect=' + window.location.pathname;
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
    }

    VideoCritiqueCtrl.$inject = ['$rootScope', '$scope', 'Critique', 'UserActions', 'DataService', '_'];
    class VideoCritiqueCtrl {
        constructor($rootScope, $scope, Critique, UserActions, DataService, _) {
            let self = this;
            self.commentsPage = 1;

            // Fetch Critique
            let init = function (critique) {
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
    }

    VideoCritiqueEditCtrl.$inject = ['$rootScope', '$scope', 'DataService', '$state', 'Critique'];
    class VideoCritiqueEditCtrl {
        constructor($rootScope, $scope, DataService, $state, Critique) {
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
                switch ($scope.editedCritique.type){
                    case 'script':
                        $scope.editedCritique.overall = ($scope.editedCritique.originality + $scope.editedCritique.pacing + $scope.editedCritique.structure +
                            $scope.editedCritique.writing + $scope.editedCritique.style + $scope.editedCritique.theme + $scope.editedCritique.dialogue +
                            $scope.editedCritique.characters + $scope.editedCritique.presentation + $scope.editedCritique.concept) / 10;
                        break;
                    case 'video':
                    default:
                        $scope.editedCritique.overall = ($scope.editedCritique.originality + $scope.editedCritique.direction + $scope.editedCritique.writing +
                            $scope.editedCritique.cinematography + $scope.editedCritique.performances + $scope.editedCritique.production +
                            $scope.editedCritique.pacing + $scope.editedCritique.structure + $scope.editedCritique.audio + $scope.editedCritique.music) / 10;
                        break;
                }        };

            $scope.$watchCollection('editedCritique', function () {
                $scope.calcOverall();
            });
        }
    }

    MessagesCtrl.$inject = ['$rootScope', '$scope', 'Conversations', 'DataService', '$window', '$modal', 'UserActions', '$timeout', '$q', '_'];
    class MessagesCtrl {
        constructor($rootScope, $scope, Conversations, DataService, $window, $modal, UserActions, $filter, $q, _) {
            $rootScope.metadata.title = 'Messages';
            let self = this;
            self.selectedConvo = null;
            self.newConvo = null;
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
                            let start = index;
                            let end = Math.min(index + count - 1, this.first);
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
                                    let result = [];
                                    if (start <= end) {
                                        for (let i = start; i <= end; i++) {
                                            let serverDataIndex = /*(self.convoMessages.meta.pagination.current_page > 1) ? 0 :*/ (-1) * i + self.convoMessages.first;
                                            let item = self.convoMessages.data[serverDataIndex];
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
                    self.newMode ? self.postNewMsg() : self.postReply();
                }
            }

            function postReply() {
                if (self.myReply) {
                    if (self.newMode) {
                        return self.postNewMsg();
                    }

                    UserActions.checkAuth().then(function (res) {
                        if (res) {
                            let reply = self.myReply;
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
                                    let viewport = angular.element('.viewport.main-comment');
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
                self.selectedConvo = {
                    participants: [],
                    body: ''
                };

                self.postNewMsg = postNewMsg;

                function postNewMsg() {
                    DataService.save('messages', {
                        subject: _.pluck(self.selectedConvo.participants, 'fullName').toString() + ', ' + $rootScope.AppData.User.fullName,
                        message: self.myReply,
                        recipients: _.pluck(self.selectedConvo.participants, 'id')
                    }).then(function (response) {
                        self.myReply = null;
                        $rootScope.toastMessage('Message sent!');
                        fetchConvos().then(function (conversations) {
                            selectConvo(_.findWhere(conversations, {id: response.data.id}));
                        });
                    });
                }
            }

            /**
             * Search for contacts.
             */
            function querySearch(query) {
                return DataService.collection('users', { search: query, notUsers: $rootScope.AppData.User.id }).then(function (response) {
                    return response.data.data;
                });
            }

            function fetchConvos() {
                return DataService.collection('messages').then(function (result) {
                    return self.conversations = result.data.conversations;
                });
            }

            function leaveConvo() {
                // TODO replacve confirm dialog
                let confirm = $modal.confirm()
                    .title('Leave Conversation?')
                    //.textContent('Are you sure you want to delete this conversation?')
                    //.ariaLabel('Lucky day')
                    //.targetEvent(ev)
                    .ok('Yes')
                    .cancel('No');
                $modal.show(confirm).then(function () {
                    let me = $rootScope.AppData.User.id;
                    let message = new Parse.Object('Message');
                    message.set('body', me.first_name + ' ' + me.last_name + ' left the conversation...');
                    message.set('parent', {
                        __type: 'Pointer',
                        className: 'Conversation',
                        objectId: self.selectedConvo.id
                    });
                    message.set('from', $rootScope.AppData.User.id);
                    message.save().then(function (result) {
                        let relParticipants = self.selectedConvo.relation('participants');
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
    }

    NotificationsCtrl.$inject = ['$rootScope', 'UserActions', '_'];
    class NotificationsCtrl {
        constructor($rootScope, UserActions, _) {
            let self = this;
            self.refresh = function () {
                //$rootScope.getFlatNotificationsFeed();
            };

            self.markAllAsRead = function () {
                /*$rootScope.getNewToken('flat', $rootScope.AppData.User.id).then(function (token) {
                 let feed = window.StreamClient.feed('flat_notifications', $rootScope.AppData.User.id, token);
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
                 let feed = window.StreamClient.feed('flat_notifications', $rootScope.AppData.User.id, token);
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
    }

    ContactPageCtrl.$inject = ['$rootScope', 'DataService', '$sce', '_'];
    class ContactPageCtrl {
        constructor($rootScope, DataService, $sce, _) {
            let self = this;
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
    }

    angular.module('IndieWise.controllers', [])
        // Auth Controllers
        .controller('SignInCtrl', SignInCtrl)
        .controller('ForgotPasswordCtrl', ForgotPasswordCtrl)
        .controller('RegisterCtrl', RegisterCtrl)

        .controller('MessagesCtrl', MessagesCtrl)
        .controller('NotificationsCtrl', NotificationsCtrl)

        // Other App Controllers
        .controller('BodyCtrl', BodyCtrl)
        .controller('VideoCritiqueCtrl', VideoCritiqueCtrl)
        .controller('VideoCritiqueEditCtrl', VideoCritiqueEditCtrl)
        .controller('ContactPageCtrl', ContactPageCtrl);
})();