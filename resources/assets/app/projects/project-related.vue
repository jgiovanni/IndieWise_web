<template>
    <div>
        <div class="media-object stack-for-small" v-for="video in relatedVideos">
            <div class="media-object-section">
                <div class="recent-img">
                    <img :src="video.thumbnail_url || '/assets/img/default_video_thumbnail.jpg'"
                         :alt="video.name">
                    <a :href="'/'+video.url_id" class="hover-posts">
                        <span><i class="fa fa-play"></i></span>
                    </a>
                </div>
            </div>
            <div class="media-object-section">
                <div class="media-content">
                    <h6><a :href="video.url_id">{{video.name}}</a></h6>
                    <p>
                        <!--<i class="fa fa-user"></i>-->
                        <span>
                            <i class="fa fa-user"></i>
                            <a :href="'/user/' + video.owner.url_id + '/about'">
                                {{video.owner.fullName}}
                            </a>
                        </span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped></style>
<script type="text/babel">
    export default {
        name: 'project-related',
        props: ['id'],
        data(){
            return {
                relatedVideos: [],
            }
        },
        methods: {},
        mounted(){
            let self = this;
            // Get related videos
            this.$http.get('projects', {
                params: {
                    notVideo: this.id,
                    notOwner: this.$root.user ? this.$root.user.id : undefined,
                    per_page: 3,
                    random: true,
                }
            })
                .then((res) => {
                    if (res) {
                        self.relatedVideos = res.body.data;
                    }
                }, (error) => console.log(error));
        }
    }
</script>