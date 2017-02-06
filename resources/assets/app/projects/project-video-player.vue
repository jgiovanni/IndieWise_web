<template>
    <video-player v-if="videoOptions" :configs="configs" :options="videoOptions" @player-state-changed="playerStateChanged" ref="myPlayer"></video-player>
    <!--<video id="video" class="video-js vjs-default-skin vjs-big-play-centered" controls preload="auto" width="1170" height="264"
           poster="https://getindiewise.com/assets/img/default_video_thumbnail.jpg" data-setup="{}">
        <source src="https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm" type='video/webm'>
        <p class="vjs-no-js">
            To view this video please enable JavaScript, and consider upgrading to a web browser that
            <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a>
        </p>
    </video>-->
    <!--<section class="main-preview-player">
        <video id="video" class="video-js vjs-default-skin vjs-16-9 vjs-big-play-centered vjs-fluid" controls
               preload="auto" crossorigin="anonymous">
            <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser
                that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>
        </video>

        &lt;!&ndash;<div class="playlist-container  preview-player-dimensions vjs-fluid">
            <ol class="vjs-playlist"></ol>
        </div>&ndash;&gt;
    </section>-->
</template>
<style>
    .flex-video.widescreen {
        height: auto;
        padding: 0;
    }
    /*.vjs-fluid {
        padding-top: 0;
    }*/
    /*.vjs-playlist {
        display: none;
    }

    .vjs-playlist .vjs-playlist-items {
        overflow-x: hidden;
        background: #000;
    }*/
</style>
<script type="text/babel">
        import { videoPlayer } from 'vue-video-player'
    export default {
        name: 'project-video-player',
        components: {videoPlayer},
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
                configs: {
                    youtube: true,
                    vimeo: true,
                    hls: false,
                },
                throttledWatcher: null,
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
                },
                videoOptions: false
            }
        },
        methods: {
            playerStateChanged(playerCurrentState) {
                // console.log(playerCurrentState);
                if (playerCurrentState.currentTime) {
                    this.throttledWatcher(playerCurrentState.currentTime);
                }
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
            markAsWatched(time){
                if (time > 10 && !this.watched) {
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

            this.throttledWatcher = _.throttle(this.markAsWatched, 1000);
            let config =  {
                techOrder: ['youtube', 'vimeo', 'Html5'],
                live: false,
                autoplay: false,
                controls: true,
                source: {}
            };

            switch (this.project.hosting_type) {
                case 'HTML5':
                    config.source.type = 'video/mp4';
                    config.source.src = this.project.video_url;
                    config.controls = true;
//                    config.techOrder = ['Html5'];
                    break;
                case 'youtube':
                    config.source.type = 'video/youtube';
                    config.source.src = 'https://www.youtube.com/watch?v=' + this.project.hosting_id;
                    config.ytControls = false;
//                    config.techOrder = ['youtube'];
                    // source.youtube = { 'ytControls': 2, 'cc_load_policy': 1, 'iv_load_policy': 1, 'modestbranding': 1, 'cc': 1};
                    break;
                case 'vimeo':
                    config.source.type = 'video/vimeo';
                    config.source.src = 'https://vimeo.com/' + this.project.hosting_id;
//                    config.techOrder = ['vimeo'];
                    // source.vimeo = { "ytControls": 2 };
                    break;
            }
            this.videoOptions = config;

            /*this.setupSource(this.project, this.playlist);
            const player = window.player = this.player = videojs('video', this.setupOptions);

            player.on('loadstart', function (e) {
                // console.log(e);
                const pl = player.playlist();
                const plitem = pl[player.playlist.currentItem()];
            });


            player.on('timeupdate', throttledWatcher, 1000);

            player.playlist(this.playlist);
            player.playlistUi();*/
        }
    }
</script>