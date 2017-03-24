<template>
    <video-player v-if="videoOptions" :options="videoOptions" @player-state-changed="playerStateChanged" @timeupdate="onPlayerTimeupdate" ref="myPlayer"></video-player>
</template>
<style>
    .flex-video.widescreen {
        padding-bottom: 0;
        height: auto;
    }
    .vjs-vimeo { min-height: 100%; height: 360px !important; }
    iframe#vjs_video_3_Vimeo_api.vimeoplayer { height: 55%; }
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
    .vjs-resolution-button {
        color: #ccc;
        font-family: VideoJS;
    }

    .vjs-resolution-button .vjs-resolution-button-staticlabel:before {
        content: '\f110';
        font-size: 1.8em;
        line-height: 1.67;
    }

    .vjs-resolution-button .vjs-resolution-button-label {
        font-size: 1em;
        line-height: 3em;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        text-align: center;
        box-sizing: inherit;
        font-family: Arial, Helvetica, sans-serif;
    }

    .vjs-resolution-button ul.vjs-menu-content {
        width: 4em !important;
    }

    .vjs-resolution-button .vjs-menu {
        left: 0;
    }

    .vjs-resolution-button .vjs-menu li {
        text-transform: none;
        font-size: 1em;
        font-family: Arial, Helvetica, sans-serif;
    }
</style>
<script type="text/babel">
    export default {
        name: 'project-video-player',
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
                            ui: true,
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

            },
            onPlayerTimeupdate(player){
                if (player.currentTime() && !this.watched) {
                    this.throttledWatcher(player.currentTime());
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
                        this.setupOptions.youtube = {
                            ytControls: 2,
                                customVars: {
                                wmode: 'transparent'
                            }
                        };
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
                        project_id: this.project.id
                    }).then(function () {
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
                height: 500,
                source: {},
                plugins: {
                    videoJsResolutionSwitcher: {
                        default: 'low',
                        dynamicLabel: true
                    }
                },
                sources: [],
            };

            switch (this.project.hosting_type) {
                case 'HTML5':
                    config.sources.push({
                        type: 'video/mp4',
                        src: this.project.video_url
                    });
                    config.controls = true;
                    break;
                case 'youtube':
                    config.sources.push({
                        type: 'video/youtube',
                        src: 'https://www.youtube.com/watch?v=' + this.project.hosting_id
                    });

                    /*config.controls = false;
                    config.youtube = {
                        ytControls: 2,
                        customVars: {
                            wmode: 'transparent'
                        }
                    };*/

                    break;
                case 'vimeo':
                    config.sources.push({
                        type: 'video/vimeo',
                        src: 'https://vimeo.com/' + this.project.hosting_id
                    });
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