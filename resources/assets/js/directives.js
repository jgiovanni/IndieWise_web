(function () {
    'use strict';
    angular.module('IndieWise.directives', [])
        .directive('layerSlider', ['$rootScope', '$timeout', 'DataService', '$q', function ($rootScope, $timeout, DataService, $q) {
            return {
                restrict: 'E',
                transclude: true,
                templateUrl: 'templates/directives/layerSlider.html',
                scope: {},
                link: function (scope, el, attrs) {
                    scope.BASE = BASE || '/';
                    var b = DataService.collection('projects', { random: true, per_page: 3 }).then(function (res) {
                        scope.projects = res.data;
                    });
                    $q.all([b]).then(function () {
                        $timeout(function () {
                            jQuery("#layerslider").layerSlider({
                                responsive: true,
                                slideDelay: 5000,
                                layersContainer: 950,
                                skin: 'noskin',
                                hoverPrevNext: false,
                                skinsPath: BASE + 'assets/layerslider/skins/'
                            });
                        }, 0);
                    });
                }
            };
        }])
        .directive('premiumCarousel', ['$rootScope', '$state', '$timeout', 'DataService', function ($rootScope, $state, $timeout, DataService) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'templates/directives/featured-area.html',
                scope: {},
                link: function (scope, el, attrs) {
                    DataService.collection("projects", { random: true, per_page: 3 }).then(function (result) {
                        scope.featuredFilms = result.data;
                    }).then(function () {
                        $timeout(function () {
                            var carouselEl = jQuery('#owl-featured');
                            carouselEl.each(function () {
                                var owl = jQuery(this);
                                jQuery(".prev").on('click', function () {
                                    carouselEl.trigger('prev.owl.carousel');
                                });
                                jQuery(".next").on('click', function () {
                                    carouselEl.trigger('next.owl.carousel');
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
                        }, 300);
                    });
                    scope.isMobile = $rootScope.isMobile;
                }
            };
        }])
        .directive('watchingCarousel', ['$rootScope', '$timeout', '$interval', 'DataService', function ($rootScope, $timeout, $interval, DataService) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'templates/directives/people-watching.html',
                scope: {},
                link: function (scope, el, attrs) {
                    scope.getWatchedList = function () {
                        DataService.collection('projects/watched').then(function (result) {
                            scope.watched = result.data;
                            $timeout(function () {
                                jQuery('.owl-carousel').each(function () {
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
                        });
                    };
                    scope.getWatchedList();
                }
            };
        }])
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
        .directive('playlists', ['$rootScope', 'DataService', 'UserActions', '_', function ($rootScope, DataService, UserActions, _) {
            return {
                restrict: 'E',
                templateUrl: 'templates/directives/playlists.html',
                replace: false,
                scope: {
                    project: '='
                },
                link: function (scope, el, attrs) {
                    scope.model = {
                        newName: null,
                        playlistArr: [],
                    };
                    scope.playlists = [];
                    scope.newPlInput = false;
                    if ($rootScope.AppData.User) {
                        DataService.collection('playlists')
                            .then(function (res) {
                            DataService.collection('playlistItems', { project: scope.project.id, playlists: _.pluck(res.data.playlists, 'id').toString() })
                                .then(function (resA) {
                                scope.model.playlistArr = resA.data.data;
                                scope.playlists = res.data.playlists;
                            });
                        });
                    }
                    scope.toggleNewPlInput = function (clear) {
                        scope.newPlInput = !scope.newPlInput;
                        if (clear) {
                            scope.model.newName = null;
                        }
                    };
                    scope.newPlaylist = function () {
                        UserActions.checkAuth().then(function (res) {
                            DataService.save('playlists', {
                                name: scope.model.newName,
                                user_id: $rootScope.AppData.User.id
                            }, false, true).then(function (pl) {
                                scope.toggleNewPlInput(false);
                                scope.model.newName = null;
                                scope.playlists.push(pl.data.data);
                            });
                        }, function (err) {
                            UserActions.loginModal().then(function (res) {
                                debugger;
                            });
                        });
                    };
                    scope.syncPlaylists = function (bool, item) {
                        if (bool) {
                            scope.model.playlistArr.push(item);
                            DataService.save('playlistItems', { playlist: item.id, project: scope.project.id });
                            $rootScope.toastMessage('Added to playlist');
                        }
                        else {
                            for (var i = 0; i < scope.model.playlistArr.length; i++) {
                                if (scope.model.playlistArr[i].id == item.id) {
                                    var genreSetting = _.findWhere(scope.model.playlistArr, {
                                        project: scope.project.id,
                                        playlist_id: item.id
                                    });
                                    if (genreSetting) {
                                        DataService.delete('PlaylistItem', genreSetting.id);
                                    }
                                    scope.model.playlistArr.splice(i, 1);
                                    $rootScope.toastMessage('Removed from playlist');
                                }
                            }
                        }
                    };
                    scope.isCheckedPlaylist = function (id) {
                        var match = false;
                        for (var i = 0; i < scope.model.playlistArr.length; i++) {
                            if (scope.model.playlistArr[i].playlist_id == id) {
                                match = true;
                            }
                        }
                        return match;
                    };
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
        .directive('scriptViewer', ['$timeout', function ($timeout) {
            return {
                restrict: 'E',
                templateUrl: 'templates/directives/script-viewer.html',
                transclude: true,
                scope: { film: '=film', lightsOff: '=lightsOff' },
                link: function (scope, el, attrs) {
                    scope.script = scope.film.video_url + '?cache=true&css=https://www.filestackapi.com/api/file/5dYvfXsLTqiri3YfMd1e';
                }
            };
        }])
        .directive('videoPlayer', ['$rootScope', 'DataService', 'UserActions', '$timeout', '$interval', '$state', 'anchorSmoothScroll', '_', function ($rootScope, DataService, UserActions, $timeout, $interval, $state, anchorSmoothScroll, _) {
            return {
                restrict: 'E',
                templateUrl: 'templates/directives/video-player.html',
                transclude: true,
                scope: { film: '=film', type: '=type', lightsOff: '=lightsOff' },
                link: function (scope, el, attrs) {
                    var sources = [];
                    var tracks = [];
                    var otherSources = [];
                    scope.hideSidebar = false;
                    scope.loaded = false;
                    scope.setupOptions = {
                        controls: true,
                        preload: 'auto',
                        autoplay: false,
                        techOrder: ['youtube', 'vimeo', 'Html5'],
                        plugins: {
                            videoJsResolutionSwitcher: {
                                default: 'high',
                                dynamicLabel: true
                            }
                        }
                    };
                    setupSource(scope.film, sources);
                    scope.media = {
                        sources: sources,
                        tracks: tracks,
                    };
                    DataService.collection('projects', { owner: scope.film.owner.id, notVideo: scope.film.id, per_page: 20 })
                        .then(function (response) {
                        scope.otherSources = response.data.data;
                        _.each(response.data.data, function (vid) {
                            otherSources.push({
                                title: vid.name,
                                url: '/' + vid.url_id,
                                image: vid.thumbnail_url || 'https://getindiewise.com/assets/img/default_video_thumbnail.jpg',
                                alt: vid.description,
                                target: '_self'
                            });
                        });
                        console.log(scope.media);
                    }).finally(function (res) {
                        scope.loaded = true;
                    });
                    scope.$on('vjsVideoReady', function (e, data) {
                        console.log('video id:' + data.id);
                        console.log('video.js player instance: ', data.player);
                        window.player = scope.player = data.player;
                        console.log('video.js controlBar instance: ', data.controlBar);
                        scope.controlBar = data.controlBar;
                        scope.player.suggestedVideoEndcap({
                            header: 'Other videos from ' + scope.film.owner.fullName + '...',
                            suggestions: otherSources
                        });
                        var timeForPlayButton = scope.$watch('player.currentTime()', function (newValue, oldValue) {
                            if (newValue > 5) {
                                $rootScope.initWatch();
                                timeForPlayButton();
                            }
                        });
                        scope.player.on('sourcechanged', function (e, data) {
                            videojs.log('SOURCE CHANGED!', e, data);
                        });
                        scope.player.socialShare({
                            facebook: {
                                shareImage: scope.film.thumbnail_url,
                                shareText: 'I\'m watching ' + scope.film.name + ' on IndieWise - Check it out!'
                            },
                            twitter: {
                                handle: 'indiewise',
                                shareUrl: '',
                                shareText: 'I\'m watching ' + scope.film.name + ' on IndieWise - Check it out!'
                            }
                        });
                    });
                    scope.$on('vjsVideoMediaChanged', function (e, data) {
                        console.log('vjsVideoMediaChanged event was fired');
                    });
                    function setupSource(video, dest) {
                        var source = {
                            id: video.id,
                            src: video.video_url,
                            title: video.name,
                            thumbnail: video.thumbnail_url || 'https://getindiewise.com/assets/img/default_video_thumbnail.jpg'
                        };
                        switch (video.hosting_type) {
                            case 'HTML5':
                                source.type = 'video/mp4';
                                break;
                            case 'youtube':
                                source.type = 'video/youtube';
                                source.src = 'https://www.youtube.com/watch?v=' + video.hosting_id;
                                break;
                            case 'vimeo':
                                source.type = 'video/vimeo';
                                source.src = 'https://vimeo.com/' + video.hosting_id;
                                break;
                        }
                        dest.push(source);
                    }
                    function updateElementWidth(player) {
                        var resize = function resize(p) {
                            var itemWidth = scope.hideSidebar ? 0 : 300;
                            var playerWidth = p.el().offsetWidth;
                            var playerHeight = p.el().offsetHeight;
                            var itemHeight = Math.round(playerHeight / 5);
                            var youtube = p.$(".vjs-tech");
                            var newSize = playerWidth - itemWidth;
                            if (newSize >= 0) {
                                var style = document.createElement('style');
                                var def = ' ' + '.vjs-playlist .vjs-poster { width: ' + newSize + 'px !important; }' + '.vjs-playlist .vjs-playlist-items { width: ' + itemWidth + 'px !important; }' + '.vjs-playlist .vjs-playlist-items li { width: ' + itemWidth + 'px !important; height: ' + itemHeight + 'px !important; }' + '.vjs-playlist .vjs-modal-dialog { width: ' + newSize + 'px !important; } ' + '.vjs-playlist .vjs-control-bar, .vjs-playlist .vjs-tech { width: ' + newSize + 'px !important; } ' + '.vjs-playlist .vjs-big-play-button, .vjs-playlist .vjs-loading-spinner { left: ' + Math.round(newSize / 2) + 'px !important; } ';
                                style.setAttribute('type', 'text/css');
                                style.setAttribute('id', 'videoplayer-playlist-stylesheet');
                                document.getElementsByTagName('head')[0].appendChild(style);
                                if (style.styleSheet) {
                                    style.styleSheet.cssText = def;
                                }
                                else {
                                    style.appendChild(document.createTextNode(def));
                                }
                            }
                        };
                        if (player) {
                            resize(player);
                        }
                        if (!scope.hideSidebar) {
                            window.onresize = function () {
                                resize(player);
                            };
                        }
                    }
                    ;
                    function toggleLights() {
                        scope.lightsOff = !scope.lightsOff;
                        var overlay = jQuery('#overlay');
                        var body = jQuery('body');
                        overlay.fadeToggle(1000);
                        if (!scope.lightsOff) {
                            $timeout(function () {
                                overlay.removeClass('highlight');
                                body.removeClass('cinema-mode');
                            }, 1000);
                        }
                        else {
                            overlay.addClass('highlight');
                            body.addClass('cinema-mode');
                        }
                    }
                    jQuery('#overlay').on('click', function () {
                        toggleLights();
                    });
                }
            };
        }])
        .directive('videogularPlayer', ['$rootScope', 'DataService', 'UserActions', '$timeout', '$interval', '$state', 'anchorSmoothScroll', '$sce', '_', function ($rootScope, DataService, UserActions, $timeout, $interval, $state, anchorSmoothScroll, $sce, _) {
            return {
                restrict: 'E',
                templateUrl: 'templates/directives/videogular-player.html',
                transclude: true,
                scope: { film: '=film', type: '=type', lightsOff: '=lightsOff' },
                link: function (scope, el, attrs) {
                    scope.onPlayerReady = false;
                    scope.config = {
                        sources: [
                            { src: $sce.trustAsResourceUrl(scope.film.video_url), type: (scope.type === 'HTML5' ? 'video/mp4' : undefined) }
                        ],
                        tracks: [],
                        theme: 'http://www.videogular.com/styles/themes/default/latest/videogular.css',
                        plugins: {
                            poster: scope.film.thumbnail_url,
                            controls: {
                                autoHide: false,
                                autoHideTime: 3000,
                            },
                        },
                    };
                    var sources = [];
                    var tracks = [];
                    scope.hideSidebar = false;
                    scope.loaded = false;
                    DataService.collection('projects', { owner: scope.film.owner.id, notVideo: scope.film.id, per_page: 20 })
                        .then(function (response) {
                        scope.media = {
                            sources: sources,
                            tracks: tracks,
                        };
                        console.log(scope.media);
                    }).finally(function (res) {
                        scope.loaded = true;
                    });
                }
            };
        }])
        .directive('elitePlayer', ['$rootScope', 'DataService', 'UserActions', '$timeout', '$interval', '$state', 'anchorSmoothScroll', '_', function ($rootScope, DataService, UserActions, $timeout, $interval, $state, anchorSmoothScroll, _) {
            return {
                restrict: 'E',
                templateUrl: 'templates/directives/videoPlayer.html',
                scope: { film: '=film', type: '=type', lightsOff: '=lightsOff' },
                link: function (scope, el, attrs) {
                    var listenerStarted = false;
                    var hasWatched = false;
                    var playlist = [];
                    var video = scope.film;
                    playlist.push({
                        videoType: scope.type,
                        title: video.name,
                        youtubeID: scope.type === 'youtube' ? video.hosting_id : "",
                        vimeoID: scope.type === 'vimeo' ? video.hosting_id : "",
                        mp4: scope.type === 'HTML5' ? video.video_url : "",
                        imageUrl: video.thumbnail_url,
                        imageTimer: 4,
                        prerollAD: "no",
                        prerollGotoLink: "http://getindiewise.com/",
                        prerollSkipTimer: 5,
                        midrollAD: "no",
                        midrollAD_displayTime: "00:10",
                        midrollGotoLink: "http://getindiewise.com/",
                        midrollSkipTimer: 5,
                        postrollAD: "no",
                        postrollGotoLink: "http://getindiewise.com/",
                        postrollSkipTimer: 5,
                        popupAdShow: "no",
                        popupAdStartTime: "00:03",
                        popupAdEndTime: "00:07",
                        popupAdGoToLink: "http://getindiewise.com/",
                        description: video.description,
                        thumbImg: video.thumbnail_url || '/assets/img/default_avatar.jpg',
                        info: ""
                    });
                    DataService.collection('projects', { owner: video.owner.id, notVideo: video.id, per_page: 20 }).then(function (result) {
                        scope.playlistFilms = result.data.data;
                        return scope.playlistFilms;
                    }).then(function (res) {
                        _.each(res, function (vid) {
                            var type = '';
                            if (vid.video_url.indexOf('youtu') != -1) {
                                type = 'youtube';
                            }
                            else if (vid.video_url.indexOf('vimeo') != -1) {
                                type = 'vimeo';
                            }
                            else {
                                type = 'other';
                            }
                            playlist.push({
                                videoType: type,
                                title: vid.name,
                                youtubeID: type === 'youtube' ? vid.hosting_id : "",
                                vimeoID: type === 'vimeo' ? vid.hosting_id : "",
                                mp4: type === 'hosted' ? vid.video_url : "",
                                prerollAD: "no",
                                prerollGotoLink: "http://getindiewise.com/",
                                preroll_mp4: "http://creativeinteractivemedia.com/player/videos/Short_Elegant_Logo_Reveal.mp4",
                                prerollSkipTimer: 5,
                                midrollAD: "no",
                                midrollAD_displayTime: "00:10",
                                midrollGotoLink: "http://getindiewise.com/",
                                midroll_mp4: "http://creativeinteractivemedia.com/player/videos/Logo_Explode.mp4",
                                midrollSkipTimer: 5,
                                postrollAD: "no",
                                postrollGotoLink: "http://getindiewise.com/",
                                postroll_mp4: "http://creativeinteractivemedia.com/player/videos/Logo_Light.mp4",
                                postrollSkipTimer: 5,
                                popupImg: "images/preview_images/popup.jpg",
                                popupAdShow: "no",
                                popupAdStartTime: "00:03",
                                popupAdEndTime: "00:07",
                                popupAdGoToLink: "http://getindiewise.com/",
                                description: vid.url_id,
                                thumbImg: vid.thumbnail_url || '/assets/img/default_avatar.jpg',
                                info: ""
                            });
                        });
                    }).finally(function () {
                        window.videoPlayer = scope.videoPlayer = el.Video({
                            instanceName: "player1",
                            instanceTheme: "dark",
                            autohideControls: 2,
                            hideControlsOnMouseOut: "No",
                            playerLayout: "fitToContainer",
                            responsive: true,
                            playlist: "Right playlist",
                            playlistScrollType: "light",
                            playlistBehaviourOnPageload: "closed",
                            autoplay: false,
                            colorAccent: "#3F51B5",
                            vimeoColor: "00adef",
                            youtubeControls: "custom controls",
                            youtubeSkin: "dark",
                            youtubeColor: "red",
                            youtubeQuality: "default",
                            youtubeShowRelatedVideos: "No",
                            videoPlayerShadow: "effect2",
                            loadRandomVideoOnStart: "No",
                            shuffle: "No",
                            posterImg: '',
                            onFinish: "Stop video",
                            nowPlayingText: "Yes",
                            fullscreen: "Fullscreen native",
                            rightClickMenu: false,
                            hideVideoSource: true,
                            showAllControls: true,
                            allowSkipAd: true,
                            infoShow: "No",
                            shareShow: "No",
                            facebookShow: "No",
                            twitterShow: "No",
                            mailShow: "No",
                            facebookShareName: video.name,
                            facebookShareLink: window.location.href,
                            facebookShareDescription: video.description,
                            facebookSharePicture: video.thumbnail_url,
                            twitterText: video.name,
                            twitterLink: window.location.href,
                            twitterHashtags: "indiewise",
                            twitterVia: "IndieWise",
                            googlePlus: window.location.href,
                            logoShow: "Yes",
                            logoClickable: "No",
                            logoPath: "/assets/img/Logo_alt2_web_87x45.png",
                            logoGoToLink: "http://getindiewise.com",
                            logoPosition: "bottom-left",
                            embedShow: "No",
                            embedCodeSrc: "www.yourwebsite.com/videoplayer/index.html",
                            embedCodeW: "746",
                            embedCodeH: "420",
                            embedShareLink: window.location.href,
                            youtubePlaylistID: "",
                            youtubeChannelID: "",
                            videos: playlist
                        });
                        el.find('.elite_vp_item:not(:first) *').bind('click', function (event) {
                            event.preventDefault();
                            var $parent = jQuery(this).hasClass('elite_vp_item') ? jQuery(this) : jQuery(this).parents('.elite_vp_item');
                            var $description = $parent.find('.elite_vp_description');
                            var urlId = $description.html().trim();
                            $state.go('video', { url_id: urlId });
                        });
                        el.find('.fa-elite-backward').bind('click', function (event) {
                            event.preventDefault();
                            var $parent = jQuery('.elite_vp_itemSelected').prev();
                            if (!$parent.length) {
                                $parent = jQuery('.elite_vp_item').last();
                            }
                            var $description = $parent.find('.elite_vp_description');
                            var urlId = $description.html().trim();
                            $state.go('video', { url_id: urlId });
                        });
                        el.find('.fa-elite-forward').bind('click', function (event) {
                            event.preventDefault();
                            var $parent = jQuery('.elite_vp_itemSelected').next();
                            var $description = $parent.find('.elite_vp_description');
                            var urlId = $description.html().trim();
                            $state.go('video', { url_id: urlId });
                        });
                        scope.startedPlaying = $interval(function () {
                            if (scope.videoPlayer.state === 'loading' && !!angular.element('#elite_vp_vimeoWrapper iframe')) {
                                if (!listenerStarted) {
                                    if (window.addEventListener) {
                                        window.addEventListener('message', vimeoListener, false);
                                    }
                                    else {
                                        window.attachEvent('onmessage', vimeoListener);
                                    }
                                    listenerStarted = true;
                                }
                            }
                            if (scope.videoPlayer.state === "elite_vp_playing") {
                                toggleLights();
                                $rootScope.initWatch();
                                switch (scope.type) {
                                    case "youtube":
                                        scope.videoPlayer.youtubePlayer.addEventListener("onStateChange", function (a) {
                                            if (a.target.getPlayerState() == 0) {
                                                if (!!scope.lightsOff) {
                                                    toggleLights();
                                                }
                                            }
                                        });
                                        break;
                                }
                                $interval.cancel(scope.startedPlaying);
                            }
                        }, 1000);
                    });
                    function vimeoListener(event) {
                        if (!(/^https?:\/\/player.vimeo.com/).test(event.origin)) {
                            return false;
                        }
                        var data = JSON.parse(event.data);
                        if (data.event === 'playProgress') {
                            if (!hasWatched) {
                                if (!!scope.lightsOff) {
                                    toggleLights();
                                }
                                $rootScope.initWatch();
                                hasWatched = true;
                                $interval.cancel(scope.startedPlaying);
                            }
                            if (window.addEventListener) {
                                window.removeEventListener('message', vimeoListener, false);
                            }
                            else {
                                window.detachEvent('onmessage', vimeoListener);
                            }
                        }
                    }
                    function toggleLights() {
                        scope.lightsOff = !scope.lightsOff;
                        var overlay = jQuery('#overlay');
                        overlay.fadeToggle(1000);
                        if (!scope.lightsOff) {
                            $timeout(function () {
                                overlay.removeClass('highlight');
                            }, 1000);
                        }
                        else {
                            overlay.addClass('highlight');
                        }
                    }
                    jQuery('#overlay').on('click', function () {
                        toggleLights();
                    });
                }
            };
        }])
        .directive('elitePlayerEmbed', ['$rootScope', '_', function ($rootScope, _) {
            return {
                restrict: 'E',
                templateUrl: 'templates/directives/videoPlayer.html',
                scope: { name: '=', hosting_id: '=', url: '=', type: '=', thumbnail: '=', description: '=' },
                link: function (scope, el, attrs) {
                    var playlist = [];
                    playlist.push({
                        videoType: scope.type,
                        title: scope.name,
                        youtubeID: scope.type === 'youtube' ? scope.hosting_id : "",
                        vimeoID: scope.type === 'vimeo' ? scope.hosting_id : "",
                        mp4: scope.type === 'HTML5' ? scope.url : "",
                        imageUrl: scope.thumbnail,
                        imageTimer: 4,
                        prerollAD: "no",
                        prerollGotoLink: "http://getindiewise.com/",
                        prerollSkipTimer: 5,
                        midrollAD: "no",
                        midrollAD_displayTime: "00:10",
                        midrollGotoLink: "http://getindiewise.com/",
                        midrollSkipTimer: 5,
                        postrollAD: "no",
                        postrollGotoLink: "http://getindiewise.com/",
                        postrollSkipTimer: 5,
                        popupAdShow: "no",
                        popupAdStartTime: "00:03",
                        popupAdEndTime: "00:07",
                        popupAdGoToLink: "http://getindiewise.com/",
                        description: '',
                        thumbImg: scope.thumbnail,
                        info: ""
                    });
                    scope.videoPlayer = el.Video({
                        instanceName: "player_" + new Date().valueOf().toString(),
                        instanceTheme: "dark",
                        autohideControls: 2,
                        hideControlsOnMouseOut: "No",
                        playerLayout: "fixedSize",
                        videoPlayerWidth: '100%',
                        videoPlayerHeight: Foundation.MediaQuery.atLeast('large') ? 470 : 420,
                        playlist: "Off",
                        playlistScrollType: "light",
                        playlistBehaviourOnPageload: "closed",
                        autoplay: false,
                        colorAccent: "#3F51B5",
                        vimeoColor: "00adef",
                        youtubeControls: "custom controls",
                        youtubeSkin: "dark",
                        youtubeColor: "red",
                        youtubeQuality: "default",
                        youtubeShowRelatedVideos: "No",
                        videoPlayerShadow: "effect2",
                        loadRandomVideoOnStart: "No",
                        shuffle: "No",
                        posterImg: '',
                        onFinish: "Stop video",
                        nowPlayingText: "Yes",
                        fullscreen: "Fullscreen native",
                        rightClickMenu: false,
                        hideVideoSource: true,
                        showAllControls: true,
                        allowSkipAd: true,
                        infoShow: "No",
                        shareShow: "No",
                        facebookShow: "No",
                        twitterShow: "No",
                        mailShow: "No",
                        facebookShareName: scope.name,
                        facebookShareLink: window.location.href,
                        facebookShareDescription: scope.description,
                        facebookSharePicture: scope.thumbnail,
                        twitterText: scope.name,
                        twitterLink: window.location.href,
                        twitterHashtags: "indiewise",
                        twitterVia: "IndieWise",
                        googlePlus: window.location.href,
                        logoShow: "Yes",
                        logoClickable: "No",
                        logoPath: "/assets/img/Logo_alt2_web_87x45.png",
                        logoGoToLink: "http://getindiewise.com",
                        logoPosition: "bottom-left",
                        embedShow: "No",
                        embedCodeSrc: "www.yourwebsite.com/videoplayer/index.html",
                        embedCodeW: "746",
                        embedCodeH: "420",
                        embedShareLink: window.location.href,
                        youtubePlaylistID: "",
                        youtubeChannelID: "",
                        videos: playlist
                    });
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
        .directive('toggleReplies', ['$rootScope', function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    el.on('click', function () {
                        scope.loadReplies(scope.comment);
                        if (scope.comment.replies_count) {
                            jQuery(this).parent().nextAll().slideToggle();
                            if (jQuery(this).hasClass('hide-reply')) {
                                jQuery(this).removeClass('hide-reply');
                                jQuery(this).html('Show replies <i class="fa fa-angle-down"></i>');
                            }
                            else {
                                jQuery(this).addClass('hide-reply');
                                jQuery(this).html('Hide replies <i class="fa fa-angle-up"></i>');
                            }
                        }
                    });
                }
            };
        }])
        .directive('quickReplyBlock', ['$rootScope', 'UserActions', 'DataService', '_', function ($rootScope, UserActions, DataService, _) {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: 'templates/directives/reply-comment.html',
                link: function (scope, el, attrs) {
                    scope.model = {
                        isLoggedIn: $rootScope.AppData.User
                    };
                    scope.postReply = _.throttle(postReply, 1000);
                    function postReply() {
                        if (!$rootScope.isAuthenticated()) {
                            UserActions.loginModal();
                            return false;
                        }
                        if ($rootScope.isNotVerified()) {
                            $rootScope.toastAction('Please verify your account so you can rate videos! Check your spam folder too.', 'Verify Now', $rootScope.requestVerificationEmail);
                            return false;
                        }
                        DataService.save('comments', {
                            body: scope.myReply,
                            critique_id: scope.critique.id,
                            user_id: scope.model.isLoggedIn.id
                        }).then(function (comment) {
                            scope.critique.comments_count++;
                            scope.myReply = null;
                            scope.showQuickReply = false;
                            $rootScope.toastMessage('Quick Reply posted!');
                        }, function (error) {
                            console.log('Failed to create new reply, with error code: ' + error.message);
                        });
                    }
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