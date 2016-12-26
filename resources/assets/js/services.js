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
    }
    function LinkifyService($filter) {
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
    }
    function SocketService($rootScope, $window) {
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
    }
    function FacebookAngularPatchService($q, $timeout, $window) {
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
    }
    function zIndexPlayer(remove) {
        var vidDiv = jQuery('.flex-video');
        if (vidDiv) {
            !!remove ? vidDiv.css('z-index', '') : vidDiv.css('z-index', 0);
        }
    }
})();
//# sourceMappingURL=services.js.map