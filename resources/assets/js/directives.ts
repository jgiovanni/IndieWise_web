/**
 * Created by Jerez Bain on 9/14/2015.
 */
(function () {
    'use strict';
    angular.module('IndieWise.directives', [])
        .directive('owlCarousel', ['$rootScope', '$timeout', '$interval', 'DataService', function ($rootScope, $timeout, $interval, DataService) {
            return {
                restrict: 'A',
                //scope: {},
                link: function (scope, el, attrs) {
                    scope.getWatchedList = function () {
                        $timeout(function () {
                                //console.log('run owl');
                                //Premium carousel
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

                                    } else {
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
                    /*$interval(function () {
                     scope.getWatchedList()
                     }, 60000);*/

                    scope.getWatchedList();
                }
            }
        }])
        .directive('toggleShowMore', ['$rootScope', '$timeout', function ($rootScope, $timeout) {
            return {
                restrict: 'A',
                scope: {
                    showMoreHeight: '=showMoreHeight'
                },
                link: function (scope, el, attrs) {
                    $timeout(function () {
                        //show more and less
                        el.showMore({
                            speedDown: 300,
                            speedUp: 300,
                            height: scope.showMoreHeight ? scope.showMoreHeight + 'px' : '165px',
                            showText: 'Show more',
                            hideText: 'Show less'
                        });
                    }, 500);

                }
            }
        }])
        /*.directive('videoPlayer', ['$rootScope', 'DataService', 'UserActions', '$timeout', '$interval', '$state', 'anchorSmoothScroll', '_', function ($rootScope, DataService, UserActions, $timeout, $interval, $state, anchorSmoothScroll, _) {
            return {
                restrict: 'E',
                templateUrl: 'templates/directives/video-player.html',
                transclude: true,
                // replace: true,
                scope: {film: '=film', type: '=type', lightsOff: '=lightsOff'},
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
                            // airplayButton: {},
                            /!*chromecast: {
                                appId: "AppID of your Chromecast App",
                                metadata: {
                                    title: 'IndieWise',
                                    subtitle: scope.film.name
                                }
                            },*!/
                            videoJsResolutionSwitcher: {
                                default: 'high',
                                dynamicLabel: true
                            }
                        }
                    };

                    // Setup Source
                    setupSource(scope.film, sources);

                    // build media object
                    scope.media = {
                        sources: sources,
                        tracks: tracks,
                    };

                    // Setup Playlist
                    // Generate playlist
                    DataService.collection('projects', {owner: scope.film.owner.id, notVideo: scope.film.id, per_page: 20})
                        .then(function (response) {
                            scope.otherSources = response.data.data;
                            _.each(response.data.data, function (vid) {
                                // setupSource(vid, otherSources);
                                otherSources.push({
                                    title: vid.name,
                                    url: '/' + vid.url_id,
                                    image: vid.thumbnail_url || 'https://getindiewise.com/assets/img/default_video_thumbnail.jpg', // could be an animated GIF
                                    alt: vid.description, // optional photo description, defaults to the title
                                    target: '_self' // can be any anchor target type
                                })
                            });

                            console.log(scope.media);
                        }).finally(function (res) {
                            scope.loaded = true;
                        });

                    scope.$on('vjsVideoReady', function (e, data) {
                        //data contains `id`, `vid`, `player` and `controlBar`
                        //NOTE: vid is depricated, use player instead
                        console.log('video id:' + data.id);
                        console.log('video.js player instance: ', data.player);
                        window.player = scope.player = data.player;
                        console.log('video.js controlBar instance: ', data.controlBar);
                        scope.controlBar = data.controlBar;

                        // Add Playlist toggle button
                        /!*var Button = videojs.getComponent('Button');
                        var MyButton = videojs.extend(Button, {
                            constructor: function() {
                                Button.apply(this, arguments);
                                /!* initialize your button *!/
                            },
                            handleClick: function() {
                                /!* do something on click *!/
                            }
                        });
                        videojs.registerComponent('MyButton', MyButton);
                        scope.player.getChild('controlBar').addChild('myButton', {});*!/

                        // Use playlist as suggested others
                        scope.player.suggestedVideoEndcap({
                            header: 'Other videos from ' + scope.film.owner.fullName + '...',
                            suggestions: otherSources
                        });
                        // handle watched
                        //if (scope.type !== 'vimeo') {
                            var timeForPlayButton = scope.$watch('player.currentTime()', function (newValue, oldValue) {
                                if (newValue > 5) {
                                    $rootScope.initWatch();
                                    timeForPlayButton();
                                }
                            });
                        //}

                        // Setup watcher
                        scope.player.on('sourcechanged', function(e, data) {
                            videojs.log('SOURCE CHANGED!', e, data);

                            // Find which source it changed to
                            /!*if (angular.isDefined(data.from)) {
                                var videoObj = _.findWhere(scope.otherSources, {id: _.findWhere(scope.media.sources, {src: data.to}).id});
                                if (videoObj && videoObj.hasOwnProperty('id')) {
                                    // Send video object to rest of page or reload
                                    scope.$emit('VideoPlayer:sourceChanged', videoObj);
                                }
                            }*!/
                        });

                        // Init behaviours
                        // scope.player.perSourceBehaviors();

                        // Init Sharing
                        scope.player.socialShare({
                            facebook: { // optional, includes a Facebook share button (See the [Facebook documentation](https://developers.facebook.com/docs/sharing/reference/share-dialog) for more information)
                                // shareUrl: '', // optional, defaults to window.location.href
                                shareImage: scope.film.thumbnail_url, // optional, defaults to the Facebook-scraped image
                                shareText: 'I\'m watching ' + scope.film.name + ' on IndieWise - Check it out!'
                            },
                            twitter: { // optional, includes a Twitter share button (See the [Twitter documentation](https://dev.twitter.com/web/tweet-button/web-intent) for more information)
                                handle: 'indiewise', // optional, appends `via @handle` to the end of the tweet
                                shareUrl: '', // optional, defaults to window.location.href
                                shareText: 'I\'m watching ' + scope.film.name + ' on IndieWise - Check it out!'
                            }
                        });

                        // init Playlist
                        // scope.player.playlist({ videos: sources, playlist: { hideSidebar: scope.hideSidebar, upNext: true, hideIcons: true, thumbnailSize: 300, items: 5 } })

                        /!*$timeout(function () {
                            console.log('hiding sidebar');
                            scope.hideSidebar = true;

                            updateElementWidth(scope.player);
                        }, 5000)*!/
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
                                // source.youtube = { 'ytControls': 2, 'cc_load_policy': 1, 'iv_load_policy': 1, 'modestbranding': 1, 'cc': 1};
                                break;
                            case 'vimeo':
                                source.type = 'video/vimeo';
                                source.src = 'https://vimeo.com/' + video.hosting_id;
                                // source.vimeo = { "ytControls": 2 };
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
                                } else {
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
                    };

                    function toggleLights() {
                        scope.lightsOff = !scope.lightsOff;
                        var overlay = jQuery('#overlay');
                        var body = jQuery('body');
                        overlay.fadeToggle(1000);
                        /!* Choose desired delay *!/
                        if (!scope.lightsOff) {
                            $timeout(function () {
                                overlay.removeClass('highlight');
                                body.removeClass('cinema-mode');
                            }, 1000);
                            /!* Same delay *!/
                        } else {
                            overlay.addClass('highlight');
                            body.addClass('cinema-mode');
                        }
                    }

                    jQuery('#overlay').on('click', function () {
                        toggleLights();
                    });
                }
            }
        }])*/
        /*.directive('videogularPlayer', ['$rootScope', 'DataService', 'UserActions', '$timeout', '$interval', '$state', 'anchorSmoothScroll', '$sce', '_', function ($rootScope, DataService, UserActions, $timeout, $interval, $state, anchorSmoothScroll, $sce, _) {
            return {
                restrict: 'E',
                templateUrl: 'templates/directives/videogular-player.html',
                transclude: true,
                // replace: true,
                scope: {film: '=film', type: '=type', lightsOff: '=lightsOff'},
                link: function (scope, el, attrs) {

                    scope.onPlayerReady = false;
                    scope.config = {
                        sources: [
                            {src: $sce.trustAsResourceUrl(scope.film.video_url), type: (scope.type === 'HTML5' ? 'video/mp4': undefined) }
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
                        // var otherSources = [];
                    scope.hideSidebar = false;
                    scope.loaded = false;


                    // Setup Playlist
                    // Generate playlist
                    DataService.collection('projects', {owner: scope.film.owner.id, notVideo: scope.film.id, per_page: 20})
                        .then(function (response) {
                            /!*scope.otherSources = response.data.data;
                            _.each(response.data.data, function (vid) {
                                setupSource(vid, sources);
                            });*!/

                            // build media object
                            scope.media = {
                                sources: sources,
                                tracks: tracks,
                            };
                            console.log(scope.media);
                        }).finally(function (res) {
                            scope.loaded = true;
                        });
                }
            }
        }])
        .directive('elitePlayer', ['$rootScope', 'DataService', 'UserActions', '$timeout', '$interval', '$state', 'anchorSmoothScroll', '_', function ($rootScope, DataService, UserActions, $timeout, $interval, $state, anchorSmoothScroll, _) {
            return {
                restrict: 'E',
                templateUrl: 'templates/directives/videoPlayer.html',
                scope: {film: '=film', type: '=type', lightsOff: '=lightsOff'},
                link: function (scope, el, attrs) {
                    var listenerStarted = false;
                    var hasWatched = false;
                    var playlist = [];
                    //console.log(scope.film);
                    var video = scope.film;
                    //attrs.$observe("film", function (video) {
                    //video = JSON.parse(video);
                    playlist.push({
                        videoType: scope.type,                                      //choose video type: "HTML5", "youtube", "vimeo", "image"
                        title: video.name,                                             //video title
                        youtubeID: scope.type === 'youtube' ? video.hosting_id : "",   //last part if the URL https://www.youtube.com/watch?v=0dJO0HyE8xE
                        vimeoID: scope.type === 'vimeo' ? video.hosting_id : "",          //last part of the URL http://vimeo.com/119641053
                        mp4: scope.type === 'HTML5' ? video.video_url : "",               //HTML5 video mp4 url
                        imageUrl: video.thumbnail_url,                                     //display image instead of playing video
                        imageTimer: 4, 																	  //set time how long image will display
                        prerollAD: "no",                                                                  //show pre-roll "yes","no"
                        prerollGotoLink: "http://getindiewise.com/",                                         //pre-roll goto link
                        // preroll_mp4: "http://creativeinteractivemedia.com/player/videos/Short_Elegant_Logo_Reveal.mp4",   //pre-roll video mp4 format
                        prerollSkipTimer: 5,
                        midrollAD: "no",                                                                  //show mid-roll "yes","no"
                        midrollAD_displayTime: "00:10",                                                    //show mid-roll at any custom time in format "minutes:seconds" ("00:00")
                        midrollGotoLink: "http://getindiewise.com/",                                         //mid-roll goto link
                        // midroll_mp4: "http://creativeinteractivemedia.com/player/videos/Logo_Explode.mp4", //mid-roll video mp4 format
                        midrollSkipTimer: 5,
                        postrollAD: "no",                                                                 //show post-roll "yes","no"
                        postrollGotoLink: "http://getindiewise.com/",                                        //post-roll goto link
                        // postroll_mp4: "http://creativeinteractivemedia.com/player/videos/Logo_Light.mp4",  //post-roll video mp4 format
                        postrollSkipTimer: 5,
                        // popupImg: "images/preview_images/popup.jpg",                        			  	  //popup image URL
                        popupAdShow: "no",                                                                //enable/disable popup image: "yes","no"
                        popupAdStartTime: "00:03",                                                         //time to show popup ad during playback
                        popupAdEndTime: "00:07",                                                           //time to hide popup ad during playback
                        popupAdGoToLink: "http://getindiewise.com/",                                         //re-direct to URL when popup ad clicked
                        description: video.description,                                                      //video description
                        thumbImg: video.thumbnail_url||'/assets/img/default_avatar.jpg',                //path to playlist thumbnail image
                        info: ""                                                                                    //video info
                    });

                    // Generate playlist
                    DataService.collection('projects', {owner: video.owner.id, notVideo: video.id, per_page: 20}).then(function (result) {
                        scope.playlistFilms = result.data.data;
                        return scope.playlistFilms;
                    }).then(function (res) {
                        _.each(res, function (vid) {
                            var type = '';
                            if (vid.video_url.indexOf('youtu') != -1) {
                                type = 'youtube';
                            } else if (vid.video_url.indexOf('vimeo') != -1) {
                                type = 'vimeo';
                            } else {
                                type = 'other';
                            }

                            playlist.push({
                                videoType: type,                                                              //choose video type: "HTML5", "youtube", "vimeo", "image"
                                title: vid.name,                                                            //video title
                                youtubeID: type === 'youtube' ? vid.hosting_id : "",                                                          //last part if the URL https://www.youtube.com/watch?v=0dJO0HyE8xE
                                vimeoID: type === 'vimeo' ? vid.hosting_id : "",                                                              //last part of the URL http://vimeo.com/119641053
                                mp4: type === 'hosted' ? vid.video_url : "",               //HTML5 video mp4 url
                                //imageUrl:"images/preview_images/poster2.jpg",                                     //display image instead of playing video
                                //imageTimer:4, 																	  //set time how long image will display
                                prerollAD: "no",                                                                  //show pre-roll "yes","no"
                                prerollGotoLink: "http://getindiewise.com/",                                         //pre-roll goto link
                                preroll_mp4: "http://creativeinteractivemedia.com/player/videos/Short_Elegant_Logo_Reveal.mp4",   //pre-roll video mp4 format
                                prerollSkipTimer: 5,
                                midrollAD: "no",                                                                  //show mid-roll "yes","no"
                                midrollAD_displayTime: "00:10",                                                    //show mid-roll at any custom time in format "minutes:seconds" ("00:00")
                                midrollGotoLink: "http://getindiewise.com/",                                         //mid-roll goto link
                                midroll_mp4: "http://creativeinteractivemedia.com/player/videos/Logo_Explode.mp4", //mid-roll video mp4 format
                                midrollSkipTimer: 5,
                                postrollAD: "no",                                                                 //show post-roll "yes","no"
                                postrollGotoLink: "http://getindiewise.com/",                                        //post-roll goto link
                                postroll_mp4: "http://creativeinteractivemedia.com/player/videos/Logo_Light.mp4",  //post-roll video mp4 format
                                postrollSkipTimer: 5,
                                popupImg: "images/preview_images/popup.jpg",                        			  	  //popup image URL
                                popupAdShow: "no",                                                                //enable/disable popup image: "yes","no"
                                popupAdStartTime: "00:03",                                                         //time to show popup ad during playback
                                popupAdEndTime: "00:07",                                                           //time to hide popup ad during playback
                                popupAdGoToLink: "http://getindiewise.com/",                                         //re-direct to URL when popup ad clicked
                                description: vid.url_id,                                                      //video description
                                thumbImg: vid.thumbnail_url||'/assets/img/default_avatar.jpg',                //path to playlist thumbnail image
                                info: ""                                                                                    //video info
                            });
                        });
                    }).finally(function () {
                        window.videoPlayer = scope.videoPlayer = el.Video({                  //ALL PLUGIN OPTIONS
                            instanceName: "player1",                      //name of the player instance
                            instanceTheme:"dark",                        //choose video player theme: "dark", "light"
                            autohideControls: 2,                          //autohide HTML5 player controls
                            hideControlsOnMouseOut: "No",                 //hide HTML5 player controls on mouse out of the player: "Yes","No"
                            playerLayout: "fitToContainer",                   //Select player layout: "fitToContainer", "fixedSize", "fitToBrowser"
                            // videoPlayerWidth: '100%',                     //fixed total player width
                            // videoPlayerHeight: Foundation.MediaQuery.atLeast('large') ? 470 : 420,                       //fixed total player height
                            responsive: true,  //!Foundation.MediaQuery.atLeast('large'),				             //this option will overwrite above videoPlayerWidth/videoPlayerHeight and set player to fit your div (parent) container: true/false
                            playlist: /!*scope.type === 'vimeo' ? "Off" :*!/ "Right playlist",                   //choose playlist type: "Right playlist", "Off"
                            playlistScrollType: "light",                  //choose scrollbar type: "light","minimal","light-2","light-3","light-thick","light-thin","inset","inset-2","inset-3","rounded","rounded-dots","3d"
                            playlistBehaviourOnPageload: "closed",		 //choose playlist behaviour when webpage loads: "closed", "opened" (not apply to Vimeo player)
                            autoplay: false,                              //autoplay when webpage loads: true/false
                            colorAccent: "#3F51B5",                       //plugin colors accent (hexadecimal or RGB value - http://www.colorpicker.com/)
                            vimeoColor: "00adef",                         //set "hexadecimal value", default vimeo color is "00adef"
                            youtubeControls: "custom controls",			 //choose youtube player controls: "custom controls", "default controls"
                            youtubeSkin: "dark",                          //default youtube controls theme: light, dark
                            youtubeColor: "red",                          //default youtube controls bar color: red, white
                            youtubeQuality: "default",                    //choose youtube quality: "small", "medium", "large", "hd720", "hd1080", "highres", "default"
                            youtubeShowRelatedVideos: "No",				 //choose to show youtube related videos when video finish: "Yes", "No" (onFinish:"Stop video" needs to be enabled)
                            videoPlayerShadow: "effect2",                 //choose player shadow:  "effect1" , "effect2", "effect3", "effect4", "effect5", "effect6", "off"
                            loadRandomVideoOnStart: "No",                 //choose to load random video when webpage loads: "Yes", "No"
                            shuffle: "No",				                 //choose to shuffle videos when playing one after another: "Yes", "No" (shuffle button enabled/disabled on start)
                            posterImg: '',//video.thumbnail_url,                               //player poster image
                            onFinish: "Stop video",                      //"Play next video","Restart video", "Stop video",
                            nowPlayingText: "Yes",                        //enable disable now playing title: "Yes","No"
                            fullscreen: "Fullscreen native",              //choose fullscreen type: "Fullscreen native","Fullscreen browser"
                            rightClickMenu: false,                         //enable/disable right click over HTML5 player: true/false
                            hideVideoSource: true,						 //option to hide self hosted video sources (to prevent users from download/steal your videos): true/false
                            showAllControls: true,						 //enable/disable all HTML5 player controls: true/false
                            allowSkipAd: true,                            //enable/disable "Skip advertisement" option: true/false
                            infoShow: "No",                              //enable/disable info option: "Yes","No"
                            shareShow: "No",                             //enable/disable all share options: "Yes","No"
                            facebookShow: "No",                          //enable/disable facebook option individually: "Yes","No"
                            twitterShow: "No",                           //enable/disable twitter option individually: "Yes","No"
                            mailShow: "No",                              //enable/disable mail option individually: "Yes","No"
                            facebookShareName: video.name,      //first parametar of facebook share in facebook feed dialog is title
                            facebookShareLink: window.location.href,  //second parametar of facebook share in facebook feed dialog is link below title
                            facebookShareDescription: video.description, //third parametar of facebook share in facebook feed dialog is description below link
                            facebookSharePicture: video.thumbnail_url, //fourth parametar in facebook feed dialog is picture on left side
                            twitterText: video.name,			 //first parametar of twitter share in twitter feed dialog is text
                            twitterLink: window.location.href, //second parametar of twitter share in twitter feed dialog is link
                            twitterHashtags: "indiewise",		 //third parametar of twitter share in twitter feed dialog is hashtag
                            twitterVia: "IndieWise",				 //fourth parametar of twitter share in twitter feed dialog is via (@)
                            googlePlus: window.location.href, //share link over Google +
                            logoShow: "Yes",                              //"Yes","No"
                            logoClickable: "No",                         //"Yes","No"
                            logoPath: "/assets/img/Logo_alt2_web_87x45.png",             //path to logo image
                            logoGoToLink: "http://getindiewise.com",       //redirect to page when logo clicked
                            logoPosition: "bottom-left",                  //choose logo position: "bottom-right","bottom-left"
                            embedShow: "No",                             //enable/disable embed option: "Yes","No"
                            embedCodeSrc: "www.yourwebsite.com/videoplayer/index.html", //path to your video player on server
                            embedCodeW: "746",                            //embed player code width
                            embedCodeH: "420",                            //embed player code height
                            embedShareLink: window.location.href, //direct link to your site (or any other URL) you want to be "shared"
                            youtubePlaylistID: "",                        //automatic youtube playlist ID (leave blank "" if you want to use manual playlist) LL4qbSRobYCjvwo4FCQFrJ4g
                            youtubeChannelID: "",                         //automatic youtube channel ID (leave blank "" if you want to use manual playlist) UCHqaLr9a9M7g9QN6xem9HcQ

                            //manual playlist
                            videos: playlist
                        });

                        // playlist actions
                        el.find('.elite_vp_item:not(:first) *').bind('click', function (event) {
                            event.preventDefault();
                            var $parent = jQuery(this).hasClass('elite_vp_item') ? jQuery(this) : jQuery(this).parents('.elite_vp_item');
                            var $description = $parent.find('.elite_vp_description');
                            var urlId = $description.html().trim();
                            $state.go('video', {url_id: urlId});
                        });

                        el.find('.fa-elite-backward').bind('click', function (event) {
                            event.preventDefault();
                            var $parent = jQuery('.elite_vp_itemSelected').prev();
                            if (!$parent.length) {
                                $parent = jQuery('.elite_vp_item').last();
                            }
                            var $description = $parent.find('.elite_vp_description');
                            var urlId = $description.html().trim();
                            $state.go('video', {url_id: urlId});
                        });

                        el.find('.fa-elite-forward').bind('click', function (event) {
                            event.preventDefault();
                            var $parent = jQuery('.elite_vp_itemSelected').next();
                            var $description = $parent.find('.elite_vp_description');
                            var urlId = $description.html().trim();
                            $state.go('video', {url_id: urlId});
                        });

                        // $timeout(function () {
                        //     scope.startedPlaying();
                        // }, 100);

                        scope.startedPlaying = $interval(function () {
                            // If Vimeo video
                            if (scope.videoPlayer.state === 'loading' && !!angular.element('#elite_vp_vimeoWrapper iframe')) {
                                // Listen for messages from the player
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

                            // if YouTube Video
                            if (scope.videoPlayer.state === "elite_vp_playing") {
                                toggleLights();
                                $rootScope.initWatch();

                                switch (scope.type) {
                                    case "youtube":
                                        //console.log('Youtube API is Ready');
                                        scope.videoPlayer.youtubePlayer.addEventListener("onStateChange", function (a) {
                                            //console.log(a.target.getPlayerState());
                                            if (a.target.getPlayerState() == 0) {
                                                //console.log('Scroll page to content');
                                                if (!!scope.lightsOff) {
                                                    toggleLights();
                                                }
                                                //anchorSmoothScroll.scrollTo('SinglePostStats');
                                            }
                                        });
                                        break;
                                }

                                $interval.cancel(scope.startedPlaying)
                            }
                        }, 1000);

                    });

                    function vimeoListener(event) {
                        // Handle messages from the vimeo player only
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
                                $interval.cancel(scope.startedPlaying)
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
                        /!* Choose desired delay *!/
                        if (!scope.lightsOff) {
                            $timeout(function () {
                                overlay.removeClass('highlight');
                            }, 1000);
                            /!* Same delay *!/
                        } else {
                            overlay.addClass('highlight');
                        }
                    }

                    jQuery('#overlay').on('click', function () {
                        toggleLights();
                    });

                    // TODO: on playlist end, exit fullscreen
                    //videoPlayer.fsEnter.click()


                    //$state.go('stateName',params,{
                    //    // prevent the events onStart and onSuccess from firing
                    //    notify:false,
                    //    // prevent reload of the current state
                    //    reload:false,
                    //    // replace the last record when changing the params so you don't hit the back button and get old params
                    //    location:'replace',
                    //    // inherit the current params on the url
                    //    inherit:true
                    //});
                }
            }
        }])
        .directive('elitePlayerEmbed', ['$rootScope', '_', function ($rootScope, _) {
            return {
                restrict: 'E',
                templateUrl: 'templates/directives/videoPlayer.html',
                scope: { name: '=', hosting_id: '=', url: '=', type: '=', thumbnail: '=', description: '=' },
                link: function (scope, el, attrs) {
                    var playlist = [];
                    playlist.push({
                        videoType: scope.type,                                      //choose video type: "HTML5", "youtube", "vimeo", "image"
                        title: scope.name,                                             //video title
                        youtubeID: scope.type === 'youtube' ? scope.hosting_id : "",   //last part if the URL https://www.youtube.com/watch?v=0dJO0HyE8xE
                        vimeoID: scope.type === 'vimeo' ? scope.hosting_id : "",          //last part of the URL http://vimeo.com/119641053
                        mp4: scope.type === 'HTML5' ? scope.url : "",               //HTML5 video mp4 url
                        imageUrl: scope.thumbnail,                                     //display image instead of playing video
                        imageTimer: 4, 																	  //set time how long image will display
                        prerollAD: "no",                                                                  //show pre-roll "yes","no"
                        prerollGotoLink: "http://getindiewise.com/",                                         //pre-roll goto link
                        // preroll_mp4: "http://creativeinteractivemedia.com/player/videos/Short_Elegant_Logo_Reveal.mp4",   //pre-roll video mp4 format
                        prerollSkipTimer: 5,
                        midrollAD: "no",                                                                  //show mid-roll "yes","no"
                        midrollAD_displayTime: "00:10",                                                    //show mid-roll at any custom time in format "minutes:seconds" ("00:00")
                        midrollGotoLink: "http://getindiewise.com/",                                         //mid-roll goto link
                        // midroll_mp4: "http://creativeinteractivemedia.com/player/videos/Logo_Explode.mp4", //mid-roll video mp4 format
                        midrollSkipTimer: 5,
                        postrollAD: "no",                                                                 //show post-roll "yes","no"
                        postrollGotoLink: "http://getindiewise.com/",                                        //post-roll goto link
                        // postroll_mp4: "http://creativeinteractivemedia.com/player/videos/Logo_Light.mp4",  //post-roll video mp4 format
                        postrollSkipTimer: 5,
                        // popupImg: "images/preview_images/popup.jpg",                        			  	  //popup image URL
                        popupAdShow: "no",                                                                //enable/disable popup image: "yes","no"
                        popupAdStartTime: "00:03",                                                         //time to show popup ad during playback
                        popupAdEndTime: "00:07",                                                           //time to hide popup ad during playback
                        popupAdGoToLink: "http://getindiewise.com/",                                         //re-direct to URL when popup ad clicked
                        description: '',                                                      //video description
                        thumbImg: scope.thumbnail,                                                      //path to playlist thumbnail image
                        info: ""                                                                                    //video info
                    });

                    scope.videoPlayer = el.Video({                  //ALL PLUGIN OPTIONS
                        instanceName: "player_" + new Date().valueOf().toString(),                      //name of the player instance
                        instanceTheme:"dark",                        //choose video player theme: "dark", "light"
                        autohideControls: 2,                          //autohide HTML5 player controls
                        hideControlsOnMouseOut: "No",                 //hide HTML5 player controls on mouse out of the player: "Yes","No"
                        playerLayout: "fixedSize",
                        videoPlayerWidth: '100%',                     //fixed total player width
                        videoPlayerHeight: Foundation.MediaQuery.atLeast('large') ? 470 : 420,                       //fixed total player height
                        // responsive: true,  //!Foundation.MediaQuery.atLeast('large'),				             //this option will overwrite above videoPlayerWidth/videoPlayerHeight and set player to fit your div (parent) container: true/false
                        playlist: "Off",                   //choose playlist type: "Right playlist", "Off"
                        playlistScrollType: "light",                  //choose scrollbar type: "light","minimal","light-2","light-3","light-thick","light-thin","inset","inset-2","inset-3","rounded","rounded-dots","3d"
                        playlistBehaviourOnPageload: "closed",		 //choose playlist behaviour when webpage loads: "closed", "opened" (not apply to Vimeo player)
                        autoplay: false,                              //autoplay when webpage loads: true/false
                        colorAccent: "#3F51B5",                       //plugin colors accent (hexadecimal or RGB value - http://www.colorpicker.com/)
                        vimeoColor: "00adef",                         //set "hexadecimal value", default vimeo color is "00adef"
                        youtubeControls: "custom controls",			 //choose youtube player controls: "custom controls", "default controls"
                        youtubeSkin: "dark",                          //default youtube controls theme: light, dark
                        youtubeColor: "red",                          //default youtube controls bar color: red, white
                        youtubeQuality: "default",                    //choose youtube quality: "small", "medium", "large", "hd720", "hd1080", "highres", "default"
                        youtubeShowRelatedVideos: "No",				 //choose to show youtube related videos when video finish: "Yes", "No" (onFinish:"Stop video" needs to be enabled)
                        videoPlayerShadow: "effect2",                 //choose player shadow:  "effect1" , "effect2", "effect3", "effect4", "effect5", "effect6", "off"
                        loadRandomVideoOnStart: "No",                 //choose to load random video when webpage loads: "Yes", "No"
                        shuffle: "No",				                 //choose to shuffle videos when playing one after another: "Yes", "No" (shuffle button enabled/disabled on start)
                        posterImg: '',//video.thumbnail_url,                               //player poster image
                        onFinish: "Stop video",                      //"Play next video","Restart video", "Stop video",
                        nowPlayingText: "Yes",                        //enable disable now playing title: "Yes","No"
                        fullscreen: "Fullscreen native",              //choose fullscreen type: "Fullscreen native","Fullscreen browser"
                        rightClickMenu: false,                         //enable/disable right click over HTML5 player: true/false
                        hideVideoSource: true,						 //option to hide self hosted video sources (to prevent users from download/steal your videos): true/false
                        showAllControls: true,						 //enable/disable all HTML5 player controls: true/false
                        allowSkipAd: true,                            //enable/disable "Skip advertisement" option: true/false
                        infoShow: "No",                              //enable/disable info option: "Yes","No"
                        shareShow: "No",                             //enable/disable all share options: "Yes","No"
                        facebookShow: "No",                          //enable/disable facebook option individually: "Yes","No"
                        twitterShow: "No",                           //enable/disable twitter option individually: "Yes","No"
                        mailShow: "No",                              //enable/disable mail option individually: "Yes","No"
                        facebookShareName: scope.name,      //first parametar of facebook share in facebook feed dialog is title
                        facebookShareLink: window.location.href,  //second parametar of facebook share in facebook feed dialog is link below title
                        facebookShareDescription: scope.description, //third parametar of facebook share in facebook feed dialog is description below link
                        facebookSharePicture: scope.thumbnail, //fourth parametar in facebook feed dialog is picture on left side
                        twitterText: scope.name,			 //first parametar of twitter share in twitter feed dialog is text
                        twitterLink: window.location.href, //second parametar of twitter share in twitter feed dialog is link
                        twitterHashtags: "indiewise",		 //third parametar of twitter share in twitter feed dialog is hashtag
                        twitterVia: "IndieWise",				 //fourth parametar of twitter share in twitter feed dialog is via (@)
                        googlePlus: window.location.href, //share link over Google +
                        logoShow: "Yes",                              //"Yes","No"
                        logoClickable: "No",                         //"Yes","No"
                        logoPath: "/assets/img/Logo_alt2_web_87x45.png",             //path to logo image
                        logoGoToLink: "http://getindiewise.com",       //redirect to page when logo clicked
                        logoPosition: "bottom-left",                  //choose logo position: "bottom-right","bottom-left"
                        embedShow: "No",                             //enable/disable embed option: "Yes","No"
                        embedCodeSrc: "www.yourwebsite.com/videoplayer/index.html", //path to your video player on server
                        embedCodeW: "746",                            //embed player code width
                        embedCodeH: "420",                            //embed player code height
                        embedShareLink: window.location.href, //direct link to your site (or any other URL) you want to be "shared"
                        youtubePlaylistID: "",                        //automatic youtube playlist ID (leave blank "" if you want to use manual playlist) LL4qbSRobYCjvwo4FCQFrJ4g
                        youtubeChannelID: "",                         //automatic youtube channel ID (leave blank "" if you want to use manual playlist) UCHqaLr9a9M7g9QN6xem9HcQ

                        //manual playlist
                        videos: playlist
                    });
                }
            }
        }])*/
        .directive('offCanvasNav', ['$rootScope', function ($rootScope) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    el.find('a').on('click', function () {
                        angular.element('#offCanvas-responsive').foundation('close');
                    });
                }
            }
        }])
        .directive('messagesHeight', ['$window', function ($window) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    setHeight();
                    angular.element($window).bind('resize', function(){
                        setHeight();

                        scope.$digest();
                    });

                    function setHeight() {
                        var parentEl = el.parent();
                        var prevElHeight = el.prev().height();
                        var nextElHeight = el.next().height();
                        var newHeight = $window.innerHeight - (parentEl.offset().top + prevElHeight + nextElHeight);
                        scope.Msgs.viewportHeight = {height: newHeight + 'px'};
                    }
                }
            }
        }])
        .directive('sideNavNotif', ['$mdSidenav', function ($mdSidenav) {
            return {
                restrict: 'A',
                link: function (scope, el, attrs) {
                    el.find('a').bind('click', function () {
                        $mdSidenav('right').close();
                    });
                }
            }
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
                            })
                        });
                    }
                }
            }
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
            }
        }])
        .directive('validateEmail', function () {
            // var EMAIL_REGEXP = /^[_a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,5})$/;
            var EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            // var EMAIL_REGEXP = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            return {
                require: 'ngModel',
                restrict: '',
                link: function (scope, elm, attrs, ctrl) {
                    // only apply the validator if ngModel is present and Angular has added the email validator
                    if (ctrl && ctrl.$validators.email) {

                        // this will overwrite the default Angular email validator
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
                scope: {format: "="},
                link: function (scope, el, attrs, ngModel) {
                    var FIREFOX = /Firefox/i.test(navigator.userAgent);
                    var IEXPLORER = $document.documentMode||false;

                    if (FIREFOX || IEXPLORER) {
                        jQuery(el).fdatepicker({format: scope.format || "mm-dd-yyyy"}).on('changeDate', function (ev) {
                            scope.$apply(function () {
                                ngModel.$setViewValue(ev.date);
                            });
                        })
                    }
                }
            }
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
        .directive('nonAngularRoutes', ['$window', '$rootElement', function ($window, $rootElement) {
            return {
                restrict: 'A',
                // templateUrl: 'templates/directives/static-sidebar.html',
                // transclude: true,
                link: function () {
                    $rootElement.off('click');
                }
            }
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

                // bugfix
                if (!_text) {
                    return '';
                }

                // Twitter
                if (type === 'twitter') {
                    _text = _text.replace(/(|\s)*@([\u00C0-\u1FFF\w]+)/g, '$1<a href="https://twitter.com/$2" target="_blank">@$2</a>');
                    _text = _text.replace(/(^|\s)*#([\u00C0-\u1FFF\w]+)/g, '$1<a href="https://twitter.com/search?q=%23$2" target="_blank">#$2</a>');
                }


                // Github
                if (type === 'github') {
                    _text = _text.replace(/(|\s)*@(\w+)/g, '$1<a href="https://github.com/$2" target="_blank">@$2</a>');
                }

                return _text;
            }

            //
            return function (text, type) {
                return linkify(text, type);
            };
        });
})();