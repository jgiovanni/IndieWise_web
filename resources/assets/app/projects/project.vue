<template>
    <md-layout md-flex="100" md-gutter="8" md-column-small class="row" v-if="project">
            <!-- left side content area -->
            <md-layout md-flex md-flex-large="66" class="">
                <!-- single post stats -->
                <project-stats-actions :project="project" @handle-actions="handleActions"></project-stats-actions>
                <!-- End single post stats -->

                <md-layout md-flex="100" class="SinglePostStats hide-for-large">
                    <md-layout md-flex md-column class="secBg">
                        <md-list>
                            <md-list-item>
                                <md-icon>star</md-icon>
                                <span>IndieWise Average</span>

                                <md-button class="md-list-action">
                                    <span v-if="project.critiques_count > 0" class="label info">{{project.iwRating.toFixed(1)}}</span>
                                    <span v-else class="label info">N/A</span>
                                </md-button>
                            </md-list-item>

                            <md-list-item>
                                <md-icon style="color: #FFC10E;" md-src="assets/svg/trophy.svg"></md-icon>
                                <span>Awards</span>

                                <md-list-expand>
                                    <md-list-item class="md-inset" v-if="wins.length" v-for="win in wins">
                                        <md-icon style="color: #FFC10E;" md-src="assets/svg/trophy.svg"></md-icon>

                                        <span>{{win.award.data.name}}</span>
                                        <!--<span class="flex"></span>-->
                                        <md-icon v-if="win.rewarded === 0">hourglass_empty</md-icon>
                                        <!--<small v-if="win.rewarded === 0" class="has-tip no-border">
											pending
										</small>-->
                                        <md-tooltip v-if="win.rewarded === 0" md-direction="top">Awards are reviewed before being given. Once verified this label will disappear.</md-tooltip>
                                    </md-list-item>
                                    <md-list-item class="md-inset" v-else>
                                        No Awards won yet.
                                    </md-list-item>
                                </md-list-expand>
                            </md-list-item>

                            <md-list-item>
                                <md-icon>face</md-icon>
                                <span>Reactions</span>

                                <md-list-expand>
                                    <project-reactions :project="project" :inset="true"></project-reactions>
                                </md-list-expand>
                            </md-list-item>
                        </md-list>
                    </md-layout>
                </md-layout>
                <!-- single post description -->
                <md-layout md-flex="100" v-once class="singlePostDescription">
                    <md-layout md-flex md-column class="secBg">
                        <div class="large-12 columns">
                            <div class="heading">
                                <h5>Description</h5>
                            </div>
                            <div class="description showmore_one" toggle-show-more>
                                <p v-if="project.description" v-text="project.description"></p>

                                <div class="row" v-if="project.keyCast">
                                    <div class="columns small-6">
                                <span>
                                    <b>Key Cast</b><br>
                                    <span v-text="project.keyCast"></span>
                                </span><br>
                                    </div>
                                </div>

                                <div class="categories" v-if="project.director.length">
                                    <button><i class="fa fa-chevron-right"></i>Director</button>
                                    <a :href="'browse?q=' + project.director" class="inner-btn"
                                       v-text="project.director"></a>
                                </div>
                                <div class="categories">
                                    <button><i class="fa fa-chevron-right"></i>Writer</button>
                                    <a :href="'browse?q=' + project.writer" class="inner-btn"
                                       v-text="project.writer"></a>
                                </div>
                                <div class="categories">
                                    <button><i class="fa fa-chevron-right"></i>Producer(s)</button>
                                    <a :href="'browse?q=' + project.producers" class="inner-btn"
                                       v-text="project.producers"></a>
                                </div>
                                <div class="categories" v-if="project.hosting_type !== 'script'">
                                    <button><i class="fa fa-chevron-right"></i>Country of Filming</button>
                                    <a :href="'browse?filming_country=' + project.filming_country.name" class="inner-btn"
                                       v-text="project.filming_country.name"></a>
                                </div>
                                <div class="categories">
                                    <button><i class="fa fa-chevron-right"></i>Year of Completion</button>
                                    <a :href="'browse?q=' + project.completionDate" class="inner-btn"
                                       v-text="(project.completionDate)||'N/A'"></a>
                                </div>
                                <div class="categories">
                                    <button><i class="fa fa-chevron-right"></i>Type</button>
                                    <a :href="'browse?types=' + project.type.name" class="inner-btn"
                                       v-text="project.type.name"></a>
                                </div>
                                <div class="categories">
                                    <button><i class="fa fa-chevron-right"></i>Genres</button>
                                    <a v-for="g in project.genres" :href="'browse?genres=' + g.name"
                                       style="margin-right: 2px;" class="inner-btn">{{g.name}}</a>
                                </div>
                                <div class="categories" v-if="project.hosting_type !== 'script'">
                                    <button><i class="fa fa-chevron-right"></i>Running Time</button>
                                    <a class="inner-btn">{{ project.runTime|secondsToTimeLength }}</a>
                                </div>
                                <div class="categories" v-if="project.hosting_type === 'script'">
                                    <button><i class="fa fa-chevron-right"></i>Pages</button>
                                    <a class="inner-btn" v-text="project.runTime"></a>
                                </div>
                                <div class="tags" v-if="project.tags.length">
                                    <button><i class="fa fa-tags"></i>Tags</button>
                                    <a class="inner-btn" :href="'browse?q=' + tag" v-for="tag in tagsArray"
                                       style="margin-right: 2px;">{{tag}}</a>
                                </div>
                                <br>
                            </div>
                        </div>
                    </md-layout>
                </md-layout>
                <!-- End single post description -->

                <md-tabs md-fixed md-dynamic-height md-centered class="md-transparents">
                    <md-tab :md-label="pluralizeCritiquesCount">
                        <!-- Critiques -->
                        <critique-view :critique="selectedCritique" :parent-url-id="project.url_id" :parent-owner-id="project.owner_id"></critique-view>

                        <critiques :parent-url-id="project.url_id" :params="critiquesParams"
                                   :parent-owner-id="project.owner_id" :disable="project.disableCritique"></critiques>
                        <!-- End Critiques -->
                    </md-tab>
                    <md-tab  :md-label="pluralizeWinsCount">
                        <!-- Awards -->
                        <section class="content comments">
                            <div class="row secBg">
                                <div class="large-12 columns">
                                    <div class="main-heading borderBottom">
                                        <div class="row padding-14">
                                            <div class="medium-12 small-12 columns">
                                                <div class="head-title">
                                                    <i class="fa fa-trophy"></i>
                                                    <h4>Awards <span>({{project.wins_count||0}})</span></h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <md-tabs md-fixed md-dynamic-height md-centered class="md-transparent">
                                        <md-tab md-active :md-label="'Nominations ' + (nominations.length||0)">
                                            <div class="comment-sort text-right">
                                        <span>
                                                <md-icon>sort</md-icon>
                                                <a :class="{'active':sortOrderA=='created_at|desc'}"
                                                   @click="sortOrderA='created_at|desc'">newest</a> | <a
                                                :class="{'active':sortOrderA=='created_at|asc'}"
                                                @click="sortOrderA='created_at|asc'">oldest</a>
                                        </span>
                                            </div>

                                            <!-- main comment -->
                                            <div class="main-comment showmore_one">
                                                <div class="media-object stack-for-small"
                                                     v-for="nom in sortNominations">
                                                    <div class="media-object-section comment-img text-center">
                                                        <div class="comment-box-img">
                                                            <img :src="nom.user.data.avatar || '/assets/img/avatar-1.png'"
                                                                 alt="comment">
                                                        </div>
                                                    </div>
                                                    <div class="media-object-section comment-desc">
                                                        <div class="comment-title">
                                                            <span class="name"><a :href="'/user/'+nom.user.data.url_id">
                                                                {{nom.user.data.fullName}}</a> nominated this video for:
                                                            </span>
                                                            <span class="time float-right"><i class="fa fa-clock-o"></i>
                                                                <!--<abbr :title="nom.created_at|amUtc|amLocal|amDateFormat:'lll'"
																	  am-time-ago="nom.created_at"></abbr>-->
                                                            </span>
                                                        </div>
                                                        <div class="comment-text">
                                                            <p>{{nom.award.data.name||nom.award.name}} Award</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <!-- End main comment -->
                                        </md-tab>
                                        <md-tab :md-label="'Wins ' + (wins.length||0)">
                                            <div class="comment-sort text-right">
                                <span><md-icon>sort</md-icon><a :class="{'active':sortOrderA=='-created_at'}"
                                                                @click="sortOrderA='-created_at'">newest</a> | <a
                                        :class="{'active':sortOrderA=='created_at'}"
                                        @click="sortOrderA='created_at'">oldest</a></span>
                                            </div>

                                            <div class="main-comment showmore_one">
                                                <div class="media-object stack-for-small" v-for="win in wins">
                                                    <div class="media-object-section comment-img text-center">
                                                        <div class="comment-box-img">
                                                            <img src="/assets/img/award_win_small.png" alt="award">
                                                        </div>
                                                    </div>
                                                    <div class="media-object-section comment-desc">
                                                        <div class="comment-title">
                                            <span class="time float-right"><i class="fa fa-clock-o"></i>
                                                <!--<abbr title="{{win.created_at|amUtc|amLocal|amDateFormat:'lll'}}"
                                                      am-time-ago="win.created_at"></abbr>-->
                                            </span>
                                                        </div>
                                                        <div class="comment-text">
                                                            <h2>{{win.award.data.name}}</h2>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                        </md-tab>
                                    </md-tabs>

                                </div>
                            </div>
                        </section>
                        <!-- End Awards -->
                    </md-tab>
                </md-tabs>
            </md-layout>
            <!-- end left side content area -->
            <!-- sidebar -->
            <md-layout md-flex md-flex-large="33" class="">
                <md-layout md-flex="100" class="secBg sidebar">
                    <div class="row">

                        <!-- IndieWise Average Widget -->
                        <div class="large-12 medium-7 medium-centered columns show-for-large">
                            <!--<project-average project="project"></project-average>-->
                            <div class="widgetBox">
                                <div class="widgetTitle">
                                    <h5 class="has-tip" style="display: block;">
                                        IndieWise Average
                                        <span style="float: right;">
                                            <span v-if="project.critiques_count > 0" class="label info">{{project.iwRating.toFixed(1)}}</span>
                                            <span v-else class="label info">N/A</span>
                                        </span>
                                        <md-tooltip md-direction="bottom">This is the Average of all Ratings you've received on this Video.</md-tooltip>
                                    </h5>
                                </div>
                            </div>
                        </div>
                        <!-- End IndieWise Average Widget -->

                        <!-- Awards Widget -->
                        <div class="large-12 medium-7 medium-centered columns show-for-large">
                            <!--<project-awards project="project"></project-awards>-->
                            <div class="widgetBox">
                                <div class="widgetTitle">
                                    <h5 class="has-tip" style="display: block;">
                                        Awards
                                        <md-tooltip md-direction="top">You need at least 5 nominations of the same award to win</md-tooltip>
                                    </h5>

                                </div>
                                <div class="widgetContent">
                                    <md-list>
                                        <md-list-item v-if="wins.length" v-for="win in wins">
                                            <md-icon style="color: #FFC10E;" md-src="assets/svg/trophy.svg"></md-icon>
                                            <!--<span class="md-icon fa-stack fa-lg">
                                                  <i class="fa fa-circle fa-stack-2x" style="color: #EEEEEE;"></i>
                                                  <i class="fa fa-trophy fa-stack-1x fa-inverse" style="color: #FFC10E;"></i>
                                                </span>-->

                                            <span>{{win.award.data.name}}</span>
                                                <!--<span class="flex"></span>-->
                                            <md-icon v-if="win.rewarded === 0">hourglass_empty</md-icon>
                                                <!--<small v-if="win.rewarded === 0" class="has-tip no-border">
                                                    pending
                                                </small>-->
                                            <md-tooltip v-if="win.rewarded === 0" md-direction="top">Awards are reviewed before being given. Once verified this label will disappear.</md-tooltip>
                                        </md-list-item>
                                        <md-list-item v-else>
                                            No Awards won yet.
                                        </md-list-item>
                                    </md-list>

                                </div>

                            </div>
                        </div>
                        <!-- End Awards Widget -->

                        <!-- Reactions Widget -->
                        <div class="large-12 medium-7 medium-centered columns show-for-large" v-if="project.reactions_count>0">
                            <div class="widgetBox">
                                <div class="widgetTitle">
                                    <h5>Reactions</h5>
                                </div>
                                <div class="widgetContent">
                                    <project-reactions :project="project"></project-reactions>
                                </div>
                            </div>
                        </div>
                        <!-- End Reactions Widget -->

                        <!-- most view Widget -->
                        <div class="large-12 medium-7 medium-centered columns">
                            <div class="widgetBox">
                                <div class="widgetTitle">
                                    <h5>Recommended Next</h5>
                                </div>
                                <div class="widgetContent">
                                    <div class="media-object stack-for-small" v-for="video in relatedVideos">
                                        <div class="media-object-section">
                                            <div class="recent-img">
                                                <img :src="video.thumbnail_url || '/assets/img/default_video_thumbnail.jpg'"
                                                     :alt="video.name">
                                                <a :href="video.url_id" class="hover-posts">
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
                            </div>
                        </div>
                        <!-- end most view Widget -->


                        <!-- ad banner widget -->
                        <div class="large-12 medium-7 medium-centered columns">
                            <div class="widgetBox">
                                <!--<div class="widgetTitle">
                                    <h5>Sponsored Ad</h5>
                                </div>-->
                                <div class="widgetContent">
                                    <div class="advBanner text-center">
                                        <!--<broadstreet-zone zone="51349" width="300" height="250"></broadstreet-zone>-->
                                        <!--<a><img src="/assets/images/sideradv.png" alt="sidebar adv"></a>-->
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- end ad banner widget -->
                    </div>
                </md-layout>
            </md-layout>
            <!-- end sidebar -->
        </md-layout>
</template>
<style scoped>
    .sidebar .widgetBox {
        margin-bottom: 10px;
    }
</style>
<script type="text/babel">
    import projectReactions from './project-reactions.vue';
    import projectStatsActions from './project-stats-actions.vue';
    import critiques from '../critiques/critiques.vue';
    import critiqueView from '../critiques/critique-view.vue';
    export default {
        name: 'project',
        components:{projectReactions, projectStatsActions, critiques, critiqueView},
        props: {
            id: {
                type: String,
                required: true
            }
        },
        data(){
            return {
                loaded: false,
                displayShare: false,
                toggleReactionsList: false,
                playerResponsiveMode: localStorage.playerResponsiveMode ? JSON.parse(localStorage.playerResponsiveMode) : _.contains(['small', 'medium', 'large'], Foundation.MediaQuery.current),
                tagsArray: [],
                lightsOff: false,
                project: null,
                projectStats: null,
                projectCritiques: null,
                projectReactions: null,
                critiquesParams: {},
                selectedCritique: null,
                wins: [],
                nominations: [],
                nominationsPage: 1,
                sortOrderA: 'created_at|desc',
                relatedVideos: null
            }
        },
        computed: {
            pluralizeCritiquesCount() {
                if (this.project.critiques_count === 0) {
                    return 'Critiques';
                } else if (this.project.critiques_count === 1) {
                    return '1 Critique';
                } else {
                    return this.project.critiques_count + ' Critiques';
                }
            },
            pluralizeWinsCount() {
                if (this.project.wins_count === 0) {
                    return 'Awards';
                } else if (this.project.wins_count === 1) {
                    return '1 Award';
                } else {
                    return this.project.wins_count + ' Awards';
                }
            },
            sortNominations() {
                return _.sortBy(this.nominations, this.sortOrderA);
            }
        },
        methods: {
            init(project) {
                let self = this;

                this.loaded = true;

                this.qNominations();

                this.qWins();


                //Populate tags array
                if (_.isString(project.tags) && project.tags.length) {
                    if (project.tags.indexOf(',') > -1) {
                        self.tagsArray = project.tags.replace(/,\s/g, ',').split(',');
                    }
                }

                // Get related video
                this.$http.get('projects', { params: { notVideo: project.id, 
                    notOwner: this.$root.user ? this.$root.user.id : undefined,
                    per_page: 3,
                    random: true,
                }})
                    .then((res) => {
                        if (res) {
                            self.relatedVideos = res.data.data;
                        }
                    }, (error) => console.log(error));
            },

            qNominations () {
                let self = this;
                this.$http.get('nominations', { params: {include: 'user,award', project: this.project.id, sort: 'created_at', per_page: 50, page: this.nominationsPage}})
                    .then((result) => {
                        self.nominations = result.data.data;
                        //// console.log('Nomination: ', result.data);
                    }, (error) => console.log(error));
            },

            qWins () {
                let self = this;
                this.$http.get('wins', { params: {project: this.project.id, sort: 'created_at'}})
                    .then((result) => {
                        self.wins = result.data.data;
                        // console.log('AwardWin: ', result.data);
                    }, (error) => console.log(error));
            },

            handleActions(action, data) {
                let self = this;
                switch (action) {
                    case 'reaction':
                        // communicate with child to refresh reaction
                        console.log('refresh reactions');
                        console.log(data);
                        this.projectReactions.refresh();
                        break;
                    case 'rate':
                        console.log('refresh rates');
                        console.log(data);
                        break;
                    case 'critique':
                        console.log('refresh critiques');
                        console.log(data);
                        this.projectCritiques.load();
                        break;
                }
            },

            updateVideoObj () {
                let self = this;
                return this.$http.get('projects' + this.project.id)
                    .then(function (response) {
                        console.log('Project Updated: ', response);
                        self.project = response.data.data;
                    }, (error) => console.log(error));
            },

            zIndexPlayer(remove) {
                let vidDiv = jQuery('.flex-video');
                !!remove ? vidDiv.css('z-index', '') : vidDiv.css('z-index', 0);
            }
        },
        created() {
            let self = this;

            this.$http.get('projects/' + this.id).then(function (response) {
                this.project = response.data.data;
                this.init(this.project);
                this.critiquesParams = {
                    include: 'comments:limit(1|0)',
                    project: this.project.id,
                    sort: 'comments_count'
                }
            });

            this.$root.$on('openCritiqueView', function (critique) {
                self.selectedCritique = critique;
            });

            this.$root.$on('playerResponsiveMode', function (mode) {
                self.playerResponsiveMode = mode;
            });

        }
    }
</script>