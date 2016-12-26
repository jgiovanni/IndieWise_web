(function () {
    'use strict';
    angular.module('IndieWise.directives', [])
        .directive('owlCarousel', ['$rootScope', '$timeout', '$interval', 'DataService', function ($rootScope, $timeout, $interval, DataService) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    scope.getWatchedList = function () {
                        $timeout(function () {
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
                                }
                                else {
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
                    scope.getWatchedList();
                }
            };
        }])
        .directive('toggleShowMore', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
            return {
                restrict: 'A',
                scope: {
                    showMoreHeight: '=showMoreHeight'
                },
                link: function (scope, el, attrs) {
                    $timeout(function () {
                        el.showMore({
                            speedDown: 300,
                            speedUp: 300,
                            height: scope.showMoreHeight ? scope.showMoreHeight + 'px' : '165px',
                            showText: 'Show more',
                            hideText: 'Show less'
                        });
                    }, 500);
                }
            };
        }])
        .directive('offCanvasNav', ['$rootScope', function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    el.find('a').on('click', function () {
                        angular.element('#offCanvas-responsive').foundation('close');
                    });
                }
            };
        }])
        .directive('messagesHeight', ['$window', function ($window) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    setHeight();
                    angular.element($window).bind('resize', function () {
                        setHeight();
                        scope.$digest();
                    });
                    function setHeight() {
                        var parentEl = el.parent();
                        var prevElHeight = el.prev().height();
                        var nextElHeight = el.next().height();
                        var newHeight = $window.innerHeight - (parentEl.offset().top + prevElHeight + nextElHeight);
                        scope.Msgs.viewportHeight = { height: newHeight + 'px' };
                    }
                }
            };
        }])
        .directive('sideNavNotif', ['$mdSidenav', function ($mdSidenav) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    el.find('a').bind('click', function () {
                        $mdSidenav('right').close();
                    });
                }
            };
        }])
        .directive('helpInfo', [function () {
            return {
                restrict: 'E',
                transclude: true,
                templateUrl: 'templates/directives/help-info.html',
                scope: {
                    text: '=text',
                    direction: '=direction'
                }
            };
        }])
        .directive('editCommentBlock', ['$rootScope', 'UserActions', 'DataService', '_', function ($rootScope, UserActions, DataService, _) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'templates/directives/edit-comment.html',
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
                            });
                        });
                    }
                }
            };
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
            };
        }])
        .directive('validateEmail', function () {
        var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return {
            require: 'ngModel',
            restrict: '',
            link: function (scope, elm, attrs, ctrl) {
                if (ctrl && ctrl.$validators.email) {
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
                scope: { format: "=" },
                link: function (scope, el, attrs, ngModel) {
                    var FIREFOX = /Firefox/i.test(navigator.userAgent);
                    var IEXPLORER = $document.documentMode || false;
                    if (FIREFOX || IEXPLORER) {
                        jQuery(el).fdatepicker({ format: scope.format || "mm-dd-yyyy" }).on('changeDate', function (ev) {
                            scope.$apply(function () {
                                ngModel.$setViewValue(ev.date);
                            });
                        });
                    }
                }
            };
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
                templateUrl: 'templates/directives/broadstreet-zone.html',
                transclude: true,
                scope: {
                    zone: "=",
                    width: "=",
                    height: "=",
                },
                link: function (scope, el, attrs) {
                    scope.link = $sce.trustAsResourceUrl('https://ad.broadstreetads.com/zdisplay/' + scope.zone + '.html');
                }
            };
        }])
        .directive('staticSideBar', ['$window', '$sce', function ($window, $sce) {
            return {
                restrict: 'E',
                templateUrl: 'templates/directives/static-sidebar.html',
                transclude: true,
                replace: true
            };
        }])
        .directive('nonAngularRoutes', ['$window', '$rootElement', function ($window, $rootElement) {
            return {
                restrict: 'A',
                link: function () {
                    $rootElement.off('click');
                }
            };
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
            if (!_text) {
                return '';
            }
            if (type === 'twitter') {
                _text = _text.replace(/(|\s)*@([\u00C0-\u1FFF\w]+)/g, '$1<a href="https://twitter.com/$2" target="_blank">@$2</a>');
                _text = _text.replace(/(^|\s)*#([\u00C0-\u1FFF\w]+)/g, '$1<a href="https://twitter.com/search?q=%23$2" target="_blank">#$2</a>');
            }
            if (type === 'github') {
                _text = _text.replace(/(|\s)*@(\w+)/g, '$1<a href="https://github.com/$2" target="_blank">@$2</a>');
            }
            return _text;
        }
        return function (text, type) {
            return linkify(text, type);
        };
    });
})();
//# sourceMappingURL=directives.js.map