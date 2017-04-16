"use strict";
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
                    return "\\" + char;
            }
        });
    }
    var BodyController = (function () {
        function BodyController($rootScope, $localForage, $q, $state, AuthService, $mdToast, UserActions, $sce, DataService, _, $interval, $mdSidenav) {
            this.selected = null;
            this.selectedItem = '';
            var self = this;
            self.selected = null;
            $rootScope.AppData.searchText = decodeURIComponent($rootScope.$stateParams.q || '');
            self.selectedItem = '';
            self.notificationsTemplate = $sce.trustAsResourceUrl('src/directives/notification.html');
            self.newsletterRegister = newsletterRegister;
            $localForage.getItem('timestamp', true).then(function (timestamp) {
                if (moment(timestamp).add(1, 'w').isBefore()) {
                    $localForage.clear();
                }
            }, function (error) {
                $localForage.clear();
            });
            DataService.collection('projects', { per_page: 3, sort: 'created_at' }).then(function (result) {
                _.each(result.body.data, function (i) {
                });
                self.footerRecentVideos = result.data;
            });
            self.startSearch = function (text) {
                if (text) {
                    self.toPage('browse', { q: text });
                }
            };
            var isIOS = function () {
                return !!(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i));
            };
            var isAndroid = function () {
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
                var deferred = $q.defer();
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
                var deferred = $q.defer();
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
                var deferred = $q.defer();
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
                var deferred = $q.defer();
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
                    { name: 'Happy', emotion: 'happy', icon: 'happy' },
                    { name: 'Sad', emotion: 'sad', icon: 'sad' },
                    { name: 'Offended', emotion: 'offended', icon: 'annoyed' },
                    { name: 'Amused', emotion: 'amused', icon: 'grinning' },
                    { name: 'Mad', emotion: 'mad', icon: 'mad' },
                    { name: 'Furious', emotion: 'furious', icon: 'angry' },
                    { name: 'Awesome', emotion: 'awesome', icon: 'woah' },
                    { name: 'Terrified', emotion: 'terrified', icon: 'shocked' },
                    { name: 'Confused', emotion: 'confused', icon: 'confused' },
                    { name: 'In-Love', emotion: 'in-love', icon: 'love' },
                    { name: 'Amazed', emotion: 'amazed', icon: 'woah' },
                    { name: 'Motivated', emotion: 'motivated', icon: 'interested' },
                    { name: 'Inspired', emotion: 'inspired', icon: 'interested' },
                    { name: 'Bored', emotion: 'bored', icon: 'bored' },
                    { name: 'Sleepy', emotion: 'sleepy', icon: 'bored' },
                    { name: 'Emotional', emotion: 'emotional', icon: 'emotional' },
                    { name: 'Excited', emotion: 'excited', icon: 'big-smile' },
                    { name: 'Nostalgic', emotion: 'nostalgic', icon: 'nostalgic' },
                    { name: 'Annoyed', emotion: 'annoyed', icon: 'annoyed' },
                    { name: 'Sorry', emotion: 'sorry', icon: 'sad-tear' },
                    { name: 'Ashamed', emotion: 'ashamed', icon: 'sad-tear' },
                    { name: 'Meh', emotion: 'meh', icon: 'meh' },
                    { name: 'Special', emotion: 'special', icon: 'wink' },
                    { name: 'Sick', emotion: 'sick', icon: 'mute' },
                    { name: 'Great', emotion: 'great', icon: 'grinning' },
                    { name: 'Guilty', emotion: 'guilty', icon: 'sympathetic' },
                    { name: 'Hopeful', emotion: 'hopeful', icon: 'hopeful' },
                    { name: 'Hopeless', emotion: 'hopeless', icon: 'sad' },
                    { name: 'Secure', emotion: 'secure', icon: 'nerdy' },
                    { name: 'Blessed', emotion: 'blessed', icon: 'grinning' },
                    { name: 'Interested', emotion: 'interested', icon: 'interested' },
                    { name: 'Comfortable', emotion: 'comfortable', icon: 'hehe' },
                    { name: 'Disturbed', emotion: 'disturbed', icon: 'confused' },
                    { name: 'Stupid', emotion: 'stupid', icon: 'confused' },
                    { name: 'Sexy', emotion: 'sexy', icon: 'sexy' },
                    { name: 'Relaxed', emotion: 'relaxed', icon: 'happy' },
                    { name: 'Empowered', emotion: 'empowered', icon: 'happy' },
                    { name: 'Cool', emotion: 'cool', icon: 'happy' },
                    { name: 'Pumped', emotion: 'pumped', icon: 'happy' },
                    { name: 'Turned On', emotion: 'turned on', icon: 'happy' },
                    { name: 'Proud', emotion: 'Proud', icon: 'happy' },
                    { name: 'Disgusted', emotion: 'disgusted', icon: 'annoyed' },
                    { name: 'Sympathetic', emotion: 'sympathetic', icon: 'happy' },
                    { name: 'Overwhelmed', emotion: 'overwhelmed', icon: 'happy' },
                    { name: 'Passionate', emotion: 'passionate', icon: 'happy' },
                    { name: 'Thrilled', emotion: 'thrilled', icon: 'happy' },
                    { name: 'Loved', emotion: 'loved', icon: 'happy' },
                    { name: 'Thankful', emotion: 'thankful', icon: 'happy' },
                    { name: 'Appreciated', emotion: 'appreciated', icon: 'happy' },
                    { name: 'Romantic', emotion: 'romantic', icon: 'love' },
                    { name: 'Chill', emotion: 'chill', icon: 'happy' },
                    { name: 'Pissed Off', emotion: 'pissed off', icon: 'annoyed' },
                    { name: 'Accomplished', emotion: 'accomplished', icon: 'happy' },
                    { name: 'Honored', emotion: 'honored', icon: 'happy' },
                    { name: 'Young', emotion: 'young', icon: 'happy' },
                    { name: 'Wild', emotion: 'wild', icon: 'happy' },
                    { name: 'Old', emotion: 'old', icon: 'happy' },
                    { name: 'Free', emotion: 'free', icon: 'happy' },
                    { name: 'Epic', emotion: 'epic', icon: 'happy' },
                    { name: 'Fired Up', emotion: 'fired up', icon: 'happy' },
                    { name: 'Detached', emotion: 'detached', icon: 'happy' },
                    { name: 'Disconnected', emotion: 'disconnected', icon: 'confused' },
                    { name: 'Connected', emotion: 'connected', icon: 'happy' },
                    { name: 'Beautiful', emotion: 'beautiful', icon: 'happy' },
                    { name: 'Confident', emotion: 'confident', icon: 'happy' },
                    { name: 'Positive', emotion: 'positive', icon: 'happy' },
                    { name: 'Negative', emotion: 'negative', icon: 'annoyed' },
                    { name: 'Heartbroken', emotion: 'heartbroken', icon: 'emotional' },
                    { name: 'Silly', emotion: 'silly', icon: 'hehe' },
                    { name: 'Disappointed', emotion: 'disappointed', icon: 'sad' },
                    { name: 'Stressed', emotion: 'stressed', icon: 'annoyed' },
                    { name: 'Fantastic', emotion: 'fantastic', icon: 'big-smile' },
                    { name: 'Hungry', emotion: 'hungry', icon: 'annoyed' },
                    { name: 'Shocked', emotion: 'shocked', icon: 'shocked' },
                    { name: 'Frustrated', emotion: 'frustrated', icon: 'annoyed' },
                    { name: 'Engrossed', emotion: 'engrossed', icon: 'interested' },
                    { name: 'Peaceful', emotion: 'peaceful', icon: 'happy' },
                    { name: 'Surprised', emotion: 'surprised', icon: 'woah' },
                    { name: 'Satisfied', emotion: 'satisfied', icon: 'happy' },
                    { name: 'Incomplete', emotion: 'incomplete', icon: 'sad' },
                    { name: 'Complete', emotion: 'complete', icon: 'happy' },
                    { name: 'Entertained', emotion: 'entertained', icon: 'hehe' },
                    { name: 'Enlightened', emotion: 'enlightened', icon: 'interested' },
                    { name: 'Relieved', emotion: 'relieved', icon: 'happy' },
                    { name: 'Concerned', emotion: 'concerned', icon: 'sympathetic' },
                    { name: 'Strong', emotion: 'strong', icon: 'happy' },
                    { name: 'Optimistic', emotion: 'optimistic', icon: 'happy' },
                    { name: 'Discouraged', emotion: 'discouraged', icon: 'happy' },
                    { name: 'Lucky', emotion: 'lucky', icon: 'happy' },
                    { name: 'Scared', emotion: 'scared', icon: 'happy' },
                    { name: 'Brave', emotion: 'brave', icon: 'happy' },
                    { name: 'Naughty', emotion: 'naughty', icon: 'sexy' },
                    { name: 'Alert', emotion: 'alert', icon: 'happy' },
                    { name: 'Alive', emotion: 'alive', icon: 'happy' },
                    { name: 'Perfect', emotion: 'perfect', icon: 'happy' },
                    { name: 'Nervous', emotion: 'nervous', icon: 'happy' },
                    { name: 'Tense', emotion: 'tense', icon: 'annoyed' },
                    { name: 'Impatient', emotion: 'impatient', icon: 'annoyed' },
                    { name: 'Philosophical', emotion: 'philosophical', icon: 'interested' },
                    { name: 'Empty', emotion: 'empty', icon: 'happy' },
                    { name: 'Informed', emotion: 'informed', icon: 'nerdy' },
                    { name: 'Playful', emotion: 'playful', icon: 'happy' },
                    { name: 'Wise', emotion: 'wise', icon: 'nerdy' },
                    { name: 'Refreshed', emotion: 'refreshed', icon: 'happy' },
                    { name: 'Wanted', emotion: 'wanted', icon: 'annoyed' },
                    { name: 'Thirsty', emotion: 'thirsty', icon: 'happy' },
                    { name: 'Desperate', emotion: 'desperate', icon: 'happy' }
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
                var unseenList = _.where($rootScope.AppData.Notifications.list, { seen: false });
                var i = 0;
                _.each($rootScope.AppData.Notifications.list, function (a) {
                    if (!a.seen) {
                        a.seen = true;
                    }
                });
                $rootScope.getNewToken('notification', $rootScope.AppData.User.id).then(function (token) {
                    var feed = $rootScope.StreamClient.feed('notification', $rootScope.AppData.User.id, token);
                    feed.get({ limit: 20, mark_seen: true }, function (a) {
                        _.each($rootScope.AppData.Notifications.list, function (n) {
                            n.is_seen = true;
                        });
                        $rootScope.AppData.Notifications.unseen = 0;
                    });
                });
            };
            self.markAllAsRead = function () {
                $rootScope.getNewToken('notification', $rootScope.AppData.User.id).then(function (token) {
                    var feed = $rootScope.StreamClient.feed('notification', $rootScope.AppData.User.id, token);
                    feed.get({ limit: 20, mark_read: true }, function (a) {
                        _.each($rootScope.AppData.Notifications.list, function (n) {
                            n.is_read = true;
                        });
                        $rootScope.AppData.Notifications.unread = 0;
                    });
                });
            };
            self.markAsRead = function (obj) {
                if (!obj.is_seen) {
                    $rootScope.getNewToken('notification', $rootScope.AppData.User.id).then(function (token) {
                        var feed = $rootScope.StreamClient.feed('notification', $rootScope.AppData.User.id, token);
                        feed.get({ limit: 25, mark_read: [obj.id], mark_seen: [obj.id] })
                            .then(function (data) {
                        })
                            .catch(function (reason) {
                        });
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
                });
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
                });
            }
        }
        BodyController.$inject = ['$rootScope', '$localForage', '$q', '$state', 'AuthService', '$mdToast', 'UserActions', '$sce', 'DataService', '_', '$interval', '$mdSidenav'];
        return BodyController;
    }());
    angular.module('IndieWise.controllers', [])
        .controller('BodyCtrl', BodyController);
})();
//# sourceMappingURL=controllers.js.map