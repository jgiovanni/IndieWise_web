(function () {
    'use strict';
    angular
        .module('IndieWise.services', [])
        .factory('FacebookAngularPatch', ['$q', '$timeout', '$window', FacebookAngularPatchService])
        .factory('socket', ['$rootScope', '$window', SocketService])
        .factory('linkify', ['$filter', LinkifyService])
        .service('anchorSmoothScroll', AnchorSmoothScrollService);
    function AnchorSmoothScrollService() {

        this.scrollTo = function (eID) {

            // This scrolling function
            // is from http://www.itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

            let startY = currentYPosition();
            let stopY = elmYPosition(eID);
            let distance = stopY > startY ? stopY - startY : startY - stopY;
            if (distance < 100) {
                scrollTo(0, stopY);
                return;
            }
            let speed = Math.round(distance / 100);
            if (speed >= 20) speed = 20;
            let step = Math.round(distance / 25);
            let leapY = stopY > startY ? startY + step : startY - step;
            let timer = 0;
            if (stopY > startY) {
                for (let i = startY; i < stopY; i += step) {
                    setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                    leapY += step;
                    if (leapY > stopY) leapY = stopY;
                    timer++;
                }
                return;
            }
            for (let i = startY; i > stopY; i -= step) {
                setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
                leapY -= step;
                if (leapY < stopY) leapY = stopY;
                timer++;
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
                let elm = document.getElementById(eID);
                let y = elm.offsetTop;
                let node = elm;
                while (node.offsetParent && node.offsetParent != document.body) {
                    node = node.offsetParent;
                    y += node.offsetTop;
                }
                return y;
            }

        };

    }

    function LinkifyService($filter) {
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
    }

    function SocketService($rootScope, $window) {
        let socket = io($window.location.origin, {
            'secure': true,
            'reconnect': true,
            'reconnection delay': 500,
            'max reconnection attempts': 10
        });
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    let args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    let args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                })
            }
        };
    }

    function FacebookAngularPatchService($q, $timeout, $window) {

        let fbApiAngular = function () {

            let params = [].splice.call(arguments, 0);
            let defer = $q.defer();
            let angularWrap = $timeout;

            $window.fbPromise.then(function () {

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
        if (angular.isObject($window.FB)) {
            $window.FB.init({
                appId: '150687055270744',
                status: true,
                cookie: true,
                xfbml: true,
                version: 'v2.7'
            });

            $window.FB.AppEvents.activateApp();
            /*$window.fbPromise.then(function () {
                FB.apiAngular = fbApiAngular;
            });*/
        }

        return fbApiAngular
            ;
    }

    function zIndexPlayer(remove) {
        let vidDiv = jQuery('.flex-video');
        if (vidDiv) {
            !!remove ? vidDiv.css('z-index', '') : vidDiv.css('z-index', 0);
        }
    }
})();

