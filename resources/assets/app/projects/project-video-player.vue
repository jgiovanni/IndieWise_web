<template>
    <!--<video-player :options="videoOptions" @player-state-changed="playerStateChanged" ref="myPlayer"></video-player>-->
    <!--<video id="video" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" width="1170" height="264"
           poster="https://getindiewise.com/assets/img/default_video_thumbnail.jpg" data-setup="{}">
        <source src="https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm" type='video/webm'>
        <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a web browser that
            <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
        </p>
    </video>-->
    <section class="main-preview-player">
        <video id="video" class="video-js vjs-default-skin vjs-16-9 vjs-big-play-centered vjs-fluid" controls
               preload="auto" crossorigin="anonymous">
            <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser
                that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
        </video>

        <!--<div class="playlist-container  preview-player-dimensions vjs-fluid">
            <ol class="vjs-playlist"></ol>
        </div>-->
    </section>
</template>
<style scoped>
    /*.vjs-fluid {
        padding-top: 0;
    }*/
    .vjs-playlist {
        display: none;
    }

    .vjs-playlist .vjs-playlist-items {
        overflow-x: hidden;
        background: #000;
    }
</style>
<script type="text/babel">
    //    import { videoPlayer } from 'vue-video-player'
    export default {
        name: 'video-player',
//        components: {videoPlayer},
        props: {
            project: {
                type: Object,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            lightsOff: {
                type: Boolean
            }
        },
        data(){
            return {
                player: null,
                watched: false,
                playlist: [],
                setupOptions: {
                    fluid: true,
                    controls: true,
                    preload: 'auto',
                    autoplay: false,
                    techOrder: ['youtube', 'vimeo', 'Html5'],
                    plugins: {
                        /*mux: {
                         data: {
                         property_key: 'VJSISBEST',
                         }
                         }*/

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
                    },
                }
            }
        },
        methods: {
            playerStateChanged(playerCurrentState) {
                console.log(playerCurrentState)
            },
            setupSource(video, dest) {
                let source = {
                    id: video.id,
//                    src: video.video_url,
                    name: video.name,
                    poster: video.thumbnail_url || 'https://getindiewise.com/assets/img/default_video_thumbnail.jpg',
//                    thumbnail: video.thumbnail_url || 'https://getindiewise.com/assets/img/default_video_thumbnail.jpg',
                    description: video.description,
                    sources: []
                };
                let src = {};
                switch (video.hosting_type) {
                    case 'HTML5':
                        src.type = 'video/mp4';
                        src.src = video.video_url;
                        break;
                    case 'youtube':
                        src.type = 'video/youtube';
                        src.src = 'https://www.youtube.com/watch?v=' + video.hosting_id;
                        // source.youtube = { 'ytControls': 2, 'cc_load_policy': 1, 'iv_load_policy': 1, 'modestbranding': 1, 'cc': 1};
                        break;
                    case 'vimeo':
                        src.type = 'video/vimeo';
                        src.src = 'https://vimeo.com/' + video.hosting_id;
                        // source.vimeo = { "ytControls": 2 };
                        break;
                }
                source.sources.push(src);
                dest.push(source);
            },
            toggleLights() {
                this.$parent.lightsOff = !this.lightsOff;
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
            },
            markAsWatched(){
                const pl = this.player.playlist();
                const plitem = pl[this.player.playlist.currentItem()];

                if (this.player.currentTime() > 10 && !this.watched) {
                    //console.log('Marked as Watched');
                    this.$http.post('projects/watched', {
                        project_id: plitem.id
                    }).then(function () {
                        this.player.off('timeupdate', this.markAsWatched);
                        this.watched = true;
                    });
                }
            }
        },
        mounted(){

            this.setupSource(this.project, this.playlist);
            const player = window.player = this.player = videojs('video', this.setupOptions);

            player.on('loadstart', function (e) {
                // console.log(e);
                const pl = player.playlist();
                const plitem = pl[player.playlist.currentItem()];

                /*player.mux.emit('videochange', {
                 video_id: plitem.name,
                 video_title: plitem.name,
                 video_duration: plitem.duration,
                 });*/

                // Init Sharing

                /*player.socialShare({
                    facebook: { // optional, includes a Facebook share button (See the [Facebook documentation](https://developers.facebook.com/docs/sharing/reference/share-dialog) for more information)
                        // shareUrl: '', // optional, defaults to window.location.href
                        shareImage: plitem.poster, // optional, defaults to the Facebook-scraped image
                        shareText: 'I\'m watching ' + plitem.name + ' on IndieWise - Check it out!'
                    },
                    twitter: { // optional, includes a Twitter share button (See the [Twitter documentation](https://dev.twitter.com/web/tweet-button/web-intent) for more information)
                        handle: 'indiewise', // optional, appends `via @handle` to the end of the tweet
                        shareUrl: '', // optional, defaults to window.location.href
                        shareText: 'I\'m watching ' + plitem.name + ' on IndieWise - Check it out!'
                    }
                });*/
            });


            let throttledWatcher = _.throttle(this.markAsWatched, 1000);
            player.on('timeupdate', throttledWatcher, 1000);

            player.playlist(this.playlist);
            player.playlistUi();
        }
    }
</script>