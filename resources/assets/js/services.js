(function () {
    'use strict';
    angular
        .module('IndieWise.services', [])
        .factory('FacebookAngularPatch', ['$q', '$timeout', '$window', function ($q, $timeout, $window) {
            var fbApiAngular = function () {
                var params = [].splice.call(arguments, 0);
                var defer = $q.defer();
                var angularWrap = $timeout;
                $window.fbPromise.then(function () {
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
            if (angular.isObject($window.FB)) {
                $window.FB.init({
                    appId: '150687055270744',
                    status: true,
                    cookie: true,
                    xfbml: true,
                    version: 'v2.7'
                });
                $window.FB.AppEvents.activateApp();
            }
            return fbApiAngular;
        }])
        .factory('UserActions', UserActions)
        .factory('socket', ['$rootScope', '$window', function ($rootScope, $window) {
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
                    });
                }
            };
        }])
        .factory('linkify', ['$filter', function ($filter) {
            function _linkifyAsType(type) {
                return function (str) {
                    return $filter('linkify')(str, type);
                };
            }
            return {
                twitter: _linkifyAsType('twitter'),
                github: _linkifyAsType('github'),
                normal: _linkifyAsType()
            };
        }])
        .service('anchorSmoothScroll', function () {
        this.scrollTo = function (eID) {
            var startY = currentYPosition();
            var stopY = elmYPosition(eID);
            var distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 100) {
                scrollTo(0, stopY);
                return;
            }
            var speed = Math.round(distance / 100);
            if (speed >= 20)
                speed = 20;
            var step = Math.round(distance / 25);
            var leapY = stopY > startY ? startY + step : startY - step;
            var timer = 0;
            if (stopY > startY) {
                for (var i = startY; i < stopY; i += step) {
                    setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                    leapY += step;
                    if (leapY > stopY)
                        leapY = stopY;
                    timer++;
                }
                return;
            }
            for (var i = startY; i > stopY; i -= step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY -= step;
                if (leapY < stopY)
                    leapY = stopY;
                timer++;
            }
            function currentYPosition() {
                if (self.pageYOffset)
                    return self.pageYOffset;
                if (document.documentElement && document.documentElement.scrollTop)
                    return document.documentElement.scrollTop;
                if (document.body.scrollTop)
                    return document.body.scrollTop;
                return 0;
            }
            function elmYPosition(eID) {
                var elm = document.getElementById(eID);
                var y = elm.offsetTop;
                var node = elm;
                while (node.offsetParent && node.offsetParent != document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                }
                return y;
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
                var time = 0;
                return $timeout(function () {
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
                    DataService.collection('critiques', { project: filmId, user: AuthService.currentUser.id })
                        .then(function (res) {
                        res.data.data.length
                            ? deferred.reject(res.data.data[0])
                            : deferred.resolve(true);
                    });
                }
                else {
                    deferred.reject(false);
                }
                return deferred.promise;
            },
            canReact: function (filmId) {
                var deferred = $q.defer();
                if (AuthService.currentUser) {
                    DataService.collection('reactions', { project: filmId, user: AuthService.currentUser.id })
                        .then(function (res) {
                        res.data.data.length
                            ? deferred.reject(res.data.data[0])
                            : deferred.resolve(true);
                    });
                }
                else {
                    deferred.reject(false);
                }
                return deferred.promise;
            },
            canRate: function (filmId) {
                var deferred = $q.defer();
                if (AuthService.currentUser) {
                    DataService.collection('ratings', { project: filmId, user: AuthService.currentUser.id })
                        .then(function (res) {
                        res.data.ratings.length
                            ? deferred.reject(res.data.ratings[0])
                            : deferred.resolve(true);
                    });
                }
                else {
                    deferred.reject(false);
                }
                return deferred.promise;
            },
            loginModal: function () {
                if (!$rootScope.authModalOpen) {
                    var options = {
                        controller: SignInModalCtrl,
                        controllerAs: 'SIC',
                        templateUrl: 'templates/auth/sign-in-dialog.html',
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
            AuthService.socialLogin(provider, true).then(function (a) {
                console.log(a);
                self.ok();
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
//# sourceMappingURL=services.js.map