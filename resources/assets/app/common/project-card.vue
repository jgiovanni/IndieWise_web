<template>
    <div :id="'card-' + video.id" class="item large-3 medium-6 small-12 columns project-card" v-if="video.name"
         :class="[{'end': isLast()}, type]">
        <div class="post thumb-border">
            <a class="post-thumb" :href="video.url_id">
                <md-ink-ripple></md-ink-ripple>
                <img v-if="video.hosting_type !== 'script'"
                     :src="video.thumbnail_url||'/assets/img/default_video_thumbnail.jpg'" :alt="video.name">
                <img v-else :src="video.thumbnail_url||'https://cdn.filepicker.io/api/file/XFaspYLQTreMc63hx9ng'"
                     alt="new video">
                <!--<a class="hover-posts">
                    <span><i class="fa fa-play"></i>Watch Video</span>
                </a>-->
                <div class="video-stats clearfix">
                    <div class="thumb-stats pull-left">
                        <i class="fa fa-star"></i>
                        <span v-if="video.critiques_count>0">{{video.iwRating}}</span>
                        <span v-else>N/A</span>
                        <md-tooltip md-direction="top">IndieWise Average</md-tooltip>
                    </div>
                    <div class="thumb-stats pull-left">
                        <i class="fa fa-trophy"></i>
                        <span>{{(video.wins_count)||0}}</span>
                        <md-tooltip md-direction="top">Award Wins</md-tooltip>
                    </div>
                    <div class="thumb-stats pull-left">
                        <i class="fa fa-smile-o"></i>
                        <span>{{(video.reactions_count)||0}}</span>
                        <md-tooltip md-direction="top">Reactions</md-tooltip>
                    </div>
                    <div class="thumb-stats pull-right">
                        <span v-if="video.hosting_type !== 'script'">{{video.runTime|secondsToTimeLength}}</span>
                        <span v-else>{{video.runTime}} pages</span>
                    </div>
                </div>
            </a>
            <div class="post-des">
                <h6><a :href="video.url_id">{{video.name}}</a></h6>
                <div class="post-stats clearfix">
                    <p class="pull-left">
                        <i class="fa fa-user"></i>
                        <span>
                        <a :href="'user/'+video.owner.url_id+'/about'">{{video.owner.fullName}}</a>
                    </span>
                    </p>
                    <p class="pull-left" v-if="!isFirstUrlSegment('profile')">
                        <i class="fa fa-share"></i>
                        <span><a @click="openShareDialog()">Share</a></span>
                    </p>
                    <!--<dropdown-toggle close-on-click="true" class="pull-left" ng-if="!$state.is('profile')" ng-click="check(video)">
                        <toggle>
                            <i class="fa fa-heart"></i>
                            <span><a href="#">Add to</a></span>
                        </toggle>
                        <pane>
                            <ul class="menu vertical">
                                <li class="checkbox">
                                    <input type="checkbox" id="isFaved" ng-model="isFaved" ng-false-value="false||'login'" ng-change="toFavorites(video)">
                                    <label class="customLabel" for="isFaved">Favorites</label>
                                </li>
                                <li class="checkbox">
                                    <input type="checkbox" id="isSaved" ng-model="isSaved" ng-false-value="false||'login'" ng-change="toWatchLater(video)">
                                    <label class="customLabel" for="isSaved">Watch Later</label>
                                </li>
                            </ul>
                        </pane>
                    </dropdown-toggle>-->
                </div>
                <div class="post-summary">
                    <p>{{video.description}}</p>
                </div>
                <div class="post-button">
                    <a :href="video.url_id" class="secondary-button"><i
                            class="fa fa-play-circle"></i>watch video</a>
                </div>
            </div>
        </div>
        <share-dialog :id="video.id" :url="video.url_id" :name="video.name" :description="video.description"></share-dialog>
    </div>
</template>
<style scoped></style>
<script type="text/javascript">
    import shareDialog from  './share-dialog.vue';
    export default {
        name: 'project-card',
        components: {shareDialog},
        props: {
            video: {
                type: Object,
            },
            type: {
                type: String,
                default: 'grid-default'
            },
            queried: {
                type: Boolean
            },
            index: {
                type: Number
            }
        },
        data(){
            return {
                isQueried: this.queried,
                related: null,
                isLoggedIn: this.$root.user,
            }
        },
        methods: {
            isLast(){
                return this.$parent.perPage === (this.index + 1);
            },
            openShareDialog() {
                this.$root.$emit('openShareDialog-' + this.video.id);
            },
        },
        created(){
            if (this.video.thumbnail_url.indexOf('cloudinary') !== -1) {
                let str = this.video.thumbnail_url.split('upload/');
                this.video.thumbnail_url = str[0] + 'upload/c_scale,f_auto,h_275,q_80/' + str[1];
            }
        }
    }
</script>