<template>
    <section class="category-content latest-page">
            <div class="row">
                <!-- sidebar -->
                <div class="large-4 columns">
                    <aside class="secBg sidebar">
                        <div class="row">
                            <!-- categories -->
                            <div class="medium-centered columns">
                                <div class="widgetBox">
                                    <div class="widgetTitle">
                                        <h5>Reactions</h5>
                                    </div>
                                    <div class="widgetContent">
                                        <div class="media-object stack-for-small" v-for="r in reactions">
                                            <div class="media-object-section">
                                                <div class="recent-img">
                                                    <img :src="r.projectThumbnail||'/assets/img/default_video_thumbnail.jpg'"
                                                         alt="recent">
                                                    <a :href="r.projectUrlId" class="hover-posts">
                                                        <span><i class="fa fa-play"></i></span>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="media-object-section">
                                                <div class="media-content">
                                                    <h6><a :href="r.projectUrlId">{{r.projectName|truncate(50)}}</a>
                                                    </h6>

                                                    <p>
                                                        <!--<i class="fa fa-user"></i>-->
                                                        <span>
                                                    made
                                                    <a :href="'user/' + r.userUrlId">{{r.userFullName}}</a>
                                                    feel {{r.emotion}}</span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </aside>
                </div>
                <!-- end sidebar -->

                <!-- sidebar -->
                <div class="large-4 columns">
                    <aside class="secBg sidebar">
                        <div class="row">
                            <!-- categories -->
                            <div class="medium-centered columns">
                                <div class="widgetBox">
                                    <div class="widgetTitle">
                                        <h5>Nominations</h5>
                                    </div>
                                    <div class="widgetContent">
                                        <div class="media-object stack-for-small" v-for="n in nominations">
                                            <div class="media-object-section">
                                                <div class="recent-img">
                                                    <img :src="n.projectThumbnail||'/assets/img/default_video_thumbnail.jpg'"
                                                         alt="recent">
                                                    <a :href="n.projectUrlId" class="hover-posts">
                                                        <span><i class="fa fa-play"></i></span>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="media-object-section">
                                                <div class="media-content">
                                                    <h6><a :href="n.projectUrlId">{{n.projectName|truncate(50)}}</a>
                                                    </h6>

                                                    <p>
                                                <span>
                                                    Nominated by <a :href="'user/' + n.userUrlId">{{n.userFullName}}</a> for {{n.awardName}}
                                                </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </aside>
                </div>
                <!-- end sidebar -->

                <!-- sidebar -->
                <div class="large-4 columns">
                    <aside class="secBg sidebar">
                        <div class="row">
                            <!-- categories -->
                            <div class="medium-centered columns">
                                <div class="widgetBox">
                                    <div class="widgetTitle">
                                        <h5>Critiques</h5>
                                    </div>
                                    <div class="widgetContent">
                                        <div class="media-object stack-for-small" v-for="c in critiques">
                                            <div class="media-object-section">
                                                <div class="recent-img">
                                                    <img :src="c.projectThumbnail||'/assets/img/default_video_thumbnail.jpg'"
                                                         alt="recent">
                                                    <a :href="c.projectUrlId + '/critique/' +c.url_id" class="hover-posts">
                                                        <span><i class="fa fa-star"></i></span>
                                                    </a>
                                                </div>
                                            </div>
                                            <div class="media-object-section">
                                                <div class="media-content">
                                                    <h6>
                                                        <a :href="'user/' + c.userUrlId">{{c.userFullName}}</a>
                                                    </h6>

                                                    <p>
                                                <span>
                                                    gave
                                                    <a :href="c.projectUrlId">{{c.projectName|truncate(50)}}</a>
                                                     a {{c.overall}}
                                                </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </aside>
                </div>
                <!-- end sidebar -->

            </div>

            <!-- ad Section -->
            <div class="googleAdv text-center">
                <a href="#"><img src="/assets/images/goodleadv.png" alt="googel ads"></a>
            </div>
            <!-- End ad Section -->

        </section>
</template>
<style scoped></style>
<script type="text/babel">
    export default {
        name: 'latest',
        components: {},
        data(){
            return {
                reactions: null,
                nominations: null,
                critiques: null,
            }
        },
        methods: {
            init() {
                let self = this;
                this.$http.get('reactions/latest')
                    .then(function (res) {
                        self.reactions = res.data;
                    }, (error) => {
                        console.log(error);
                    });
                this.$http.get('nominations/latest')
                    .then(function (res) {
                        self.nominations = res.data;
                    }, (error) => {
                        console.log(error);
                    });
                this.$http.get('critiques/latest')
                    .then(function (res) {
                        self.critiques = res.data;
                    }, (error) => {
                        console.log(error);
                    });
            }
        },
        mounted(){
            this.init();
            jQuery(document).foundation();
        }
    }
</script>