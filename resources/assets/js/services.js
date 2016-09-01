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
        .factory('socket', function ($rootScope) {
            var socket = io.connect('/socket');
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
        })
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

