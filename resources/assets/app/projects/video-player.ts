import {IRootScopeService, ITimeoutService, IIntervalService, IScope} from "angular";
import {IDataService} from "../services/dataService.service";
import {IUserActionsService} from "../services/userActions.service";
import {IStateService} from "angular-ui-router";
interface IVideoPlayer {
    sources: Array<Object>;
    tracks: Array<Object>;
    otherSources: Array<Object>;
    hideSidebar: boolean;
    loaded: boolean;
    media: Object;
    project: Object;
    setupOptions: Object;

    setupSource: (video: Object, dest: Array<Object>) => void;
    updateElementWidth: (player: any) => void;
    toggleLights: () => void;
}

export class VideoPlayerController implements IVideoPlayer {
    sources: Array<Object> = [];
    tracks: Array<Object> = [];
    otherSources: Array<Object> = [];
    hideSidebar: boolean = false;
    loaded: boolean = false;
    media: Object;
    project: Object;
    setupOptions: Object = {
        controls: true,
        preload: 'auto',
        autoplay: false,
        techOrder: ['youtube', 'vimeo', 'Html5'],
        plugins: {
            // airplayButton: {},
            /*chromecast: {
             appId: "AppID of your Chromecast App",
             metadata: {
             title: 'IndieWise',
             subtitle: project.name
             }
             },*/
            videoJsResolutionSwitcher: {
                default: 'high',
                dynamicLabel: true
            }
        }
    };

    static $inject = ['$rootScope', '$scope', 'DataService', 'UserActions', '$timeout', '$interval', '$state', 'anchorSmoothScroll', '_'];
    constructor(private $rootScope: IRootScopeService, private $scope: IScope, private DataService: IDataService, private UserActions: IUserActionsService, private $timeout: ITimeoutService, private $interval: IIntervalService, private $state: IStateService, private anchorSmoothScroll: any, private _: any){}

    $onInit = () => {
        let self = this;
        // Setup Source
        this.setupSource(self.project, self.sources);

        // build media object
        this.media = {
            sources: this.sources,
            tracks: this.tracks,
        };

        // Setup Playlist
        // Generate playlist
        this.DataService.collection('projects', {owner: this.project.owner.id, notVideo: this.project.id, per_page: 20})
            .then((response) => {
                self.otherSources = response.body.data;
                self._.each(response.body.data, function (vid) {
                    // setupSource(vid, otherSources);
                    self.otherSources.push({
                        title: vid.name,
                        url: '/' + vid.url_id,
                        image: vid.thumbnail_url || 'https://getindiewise.com/assets/img/default_video_thumbnail.jpg', // could be an animated GIF
                        alt: vid.description, // optional photo description, defaults to the title
                        target: '_self' // can be any anchor target type
                    })
                });

                console.log(self.media);
            }, (error) => {
                console.log(error);
            }).finally(function (res) {
            self.loaded = true;
        });

        this.$scope.$on('vjsVideoReady', function (e, data) {
            //data contains `id`, `vid`, `player` and `controlBar`
            //NOTE: vid is depricated, use player instead
            console.log('video id:' + data.id);
            console.log('video.js player instance: ', data.player);
            window.player = self.player = data.player;
            console.log('video.js controlBar instance: ', data.controlBar);
            self.controlBar = data.controlBar;

            // Add Playlist toggle button
            /*let Button = videojs.getComponent('Button');
             let MyButton = videojs.extend(Button, {
             constructor: function() {
             Button.apply(this, arguments);
             /!* initialize your button *!/
             },
             handleClick: function() {
             /!* do something on click *!/
             }
             });
             videojs.registerComponent('MyButton', MyButton);
             scope.player.getChild('controlBar').addChild('myButton', {});*/

            // Use playlist as suggested others
            self.player.suggestedVideoEndcap({
                header: 'Other videos from ' + self.project.owner.fullName + '...',
                suggestions: self.otherSources
            });
            // handle watched
            //if (scope.type !== 'vimeo') {
            let timeForPlayButton = self.$interval(function () {
                if (self.player.currentTime() > 5) {
                    self.$rootScope.initWatch();
                    self.$interval.cancel(timeForPlayButton);
                }
            }, 1000, 500, false);
            //}

            // Setup watcher
            self.player.on('sourcechanged', function(e, data) {
                window.videojs.log('SOURCE CHANGED!', e, data);

                // Find which source it changed to
                /*if (angular.isDefined(data.from)) {
                 let videoObj = _.findWhere(scope.otherSources, {id: _.findWhere(scope.media.sources, {src: data.to}).id});
                 if (videoObj && videoObj.hasOwnProperty('id')) {
                 // Send video object to rest of page or reload
                 scope.$emit('VideoPlayer:sourceChanged', videoObj);
                 }
                 }*/
            });

            // Init behaviours
            // scope.player.perSourceBehaviors();

            // Init Sharing
            self.player.socialShare({
                facebook: { // optional, includes a Facebook share button (See the [Facebook documentation](https://developers.facebook.com/docs/sharing/reference/share-dialog) for more information)
                    // shareUrl: '', // optional, defaults to window.location.href
                    shareImage: self.project.thumbnail_url, // optional, defaults to the Facebook-scraped image
                    shareText: 'I\'m watching ' + self.project.name + ' on IndieWise - Check it out!'
                },
                twitter: { // optional, includes a Twitter share button (See the [Twitter documentation](https://dev.twitter.com/web/tweet-button/web-intent) for more information)
                    handle: 'indiewise', // optional, appends `via @handle` to the end of the tweet
                    shareUrl: '', // optional, defaults to window.location.href
                    shareText: 'I\'m watching ' + self.project.name + ' on IndieWise - Check it out!'
                }
            });

            // init Playlist
            // scope.player.playlist({ videos: sources, playlist: { hideSidebar: scope.hideSidebar, upNext: true, hideIcons: true, thumbnailSize: 300, items: 5 } })

            /*$timeout(function () {
             console.log('hiding sidebar');
             scope.hideSidebar = true;

             updateElementWidth(scope.player);
             }, 5000)*/
        });

        this.$scope.$on('vjsVideoMediaChanged', function (e, data) {
            console.log('vjsVideoMediaChanged event was fired');
        });


        jQuery('#overlay').on('click', function () {
            self.toggleLights();
        })
    };

    setupSource(video: Object, dest: Array<Object>) {
        let source = {
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

    updateElementWidth(player: any) {
        let resize = function resize(p) {
            let itemWidth = this.hideSidebar ? 0 : 300;

            let playerWidth = p.el().offsetWidth;
            let playerHeight = p.el().offsetHeight;
            let itemHeight = Math.round(playerHeight / 5);

            let youtube = p.$(".vjs-tech");
            let newSize = playerWidth - itemWidth;

            if (newSize >= 0) {

                let style = document.createElement('style');
                let def = ' ' + '.vjs-playlist .vjs-poster { width: ' + newSize + 'px !important; }' + '.vjs-playlist .vjs-playlist-items { width: ' + itemWidth + 'px !important; }' + '.vjs-playlist .vjs-playlist-items li { width: ' + itemWidth + 'px !important; height: ' + itemHeight + 'px !important; }' + '.vjs-playlist .vjs-modal-dialog { width: ' + newSize + 'px !important; } ' + '.vjs-playlist .vjs-control-bar, .vjs-playlist .vjs-tech { width: ' + newSize + 'px !important; } ' + '.vjs-playlist .vjs-big-play-button, .vjs-playlist .vjs-loading-spinner { left: ' + Math.round(newSize / 2) + 'px !important; } ';

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

        if (!this.hideSidebar) {
            window.onresize = function () {
                resize(player);
            };

        }
    }

    toggleLights() {
        this.lightsOff = !this.lightsOff;
        let overlay = jQuery('#overlay');
        let body = jQuery('body');
        overlay.fadeToggle(1000);
        /* Choose desired delay */
        if (!this.lightsOff) {
            this.$timeout(function () {
                overlay.removeClass('highlight');
                body.removeClass('cinema-mode');
            }, 1000);
            /* Same delay */
        } else {
            overlay.addClass('highlight');
            body.addClass('cinema-mode');
        }
    }
    
}
angular.module('IndieWise.directives')
    .component('videoPlayer', {
        transclude: true,
        templateUrl: 'projects/video-player.html',
        controller: VideoPlayerController,
        bindings: {project: '<', type: '<', lightsOff: '='}
    });