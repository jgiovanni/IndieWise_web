<template>
    <div v-if="project">
        <project-owner-actions v-if="isOwner" :project="project"></project-owner-actions>
        <!-- single post stats -->
        <project-stats-actions :project="project" @handle-actions="handleActions"></project-stats-actions>
        <!-- End single post stats -->

        <div class="md-layout SinglePostStats hide-for-large md-size-100">
            <div class="md-layout-item md-size-100 secBg">
                <md-list>
                    <project-average view="mobile" :rating="project.iwRating"
                                     :critiques="project.critiques_count"></project-average>

                    <md-list-item md-expand>
                        <md-icon style="color: #FFC10E;" md-src="assets/svg/trophy.svg"></md-icon>
                        <span v-if="project.wins_count > 0"> {{project.wins_count}} Awards</span>
                        <span v-else>No Awards won yet.</span>

                        <md-list slot="md-expand">
                            <project-awards view="mobile" :id="project.id"></project-awards>
                        </md-list>
                    </md-list-item>

                    <md-list-item md-expand>
                        <md-icon>face</md-icon>
                        <span>Reactions</span>

                        <md-list slot="md-expand">
                            <project-reactions :id="project.id" :reactions-count="project.reactions_count"
                                               :inset="true"></project-reactions>
                        </md-list>
                    </md-list-item>
                </md-list>
            </div>
        </div>

        <!-- single post description -->
        <div md-flex="100" v-once class="md-layout singlePostDescription">
            <div md-flex md-column class="md-layout secBg">
                <div class="large-12 columns">
                    <div class="heading">
                        <h5>Description</h5>
                    </div>
                    <div class="description">
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
                            <a :href="'browse?type=' + project.type.slug" class="inner-btn"
                               v-text="project.type.name"></a>
                        </div>
                        <div class="categories">
                            <button><i class="fa fa-chevron-right"></i>Genres</button>
                            <a v-for="g in project.genres" :href="'browse?genres=' + g.slug"
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
            </div>
        </div>
        <!-- End single post description -->
    </div>
</template>
<style>
    .sidebar .widgetBox {
        margin-bottom: 10px;
    }

    .md-layout.row::before, .md-layout.row::after {
        display: flex;
    }

    .secBg.sidebar, .secBg.sidebar > div, .widgetBox {
        width: 100%
    }
</style>
<script type="text/javascript">
    import projectOwnerActions from './project-owner-actions.vue';
    import projectReactions from './project-reactions.vue';
    import projectAverage from './project-average.vue';
    import projectAwards from './project-awards.vue';
    import projectStatsActions from './project-stats-actions.vue';
    export default {
        name: 'project',
        components: {
            projectOwnerActions,
            projectAverage,
            projectAwards,
            projectReactions,
            projectStatsActions,

        },
        props: {
            id: {
                type: String,
                required: true
            }
        },
        data(){
            return {
                loaded: false,
                loadingNominations: true,
                displayShare: false,
                toggleReactionsList: false,
                tagsArray: [],
                lightsOff: false,
                project: null,
                selectedCritique: null,
                sortOrderA: 'created_at|desc',
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
            pluralizeNominationsCount() {
                if (this.project.nominations_count === 0) {
                    return 'Nominations';
                } else if (this.project.nominations_count === 1) {
                    return '1 Nomination';
                } else {
                    return this.project.nominations_count + ' Nominations';
                }
            },
            isOwner() {
                return this.$root.user && this.project.owner_id === this.$root.user.id;
            }
        },
        methods: {
            init(project) {
                let self = this;

                this.loaded = true;

                //Populate tags array
                if (_.isString(project.tags) && project.tags.length) {
                    if (project.tags.indexOf(',') > -1) {
                        self.tagsArray = project.tags.replace(/,\s/g, ',').split(',');
                    }
                }
            },

            handleActions(action, data) {
                switch (action) {
                    case 'reaction':
                        // communicate with child to refresh reaction
                        // console.log('refresh reactions');
                        // console.log(data);
                        this.$root.$emit('loadProjectReactions');
                        break;
                    case 'rate':
                        // console.log('refresh rates');
                        // console.log(data);
                        break;
                    case 'critique':
                        // console.log('refresh critiques');
                        // console.log(data);
                        this.$root.$emit('loadProjectCritiques');
                        break;
                }
            },

            updateVideoObj () {
                let self = this;
                return this.$http.get('projects' + this.project.id)
                    .then((response) => {
                        // console.log('Project Updated: ', response);
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

            this.$http.get('projects/' + this.id).then((response) => {
                this.project = response.data.data;
                this.init(this.project);
            });

            this.$root.$on('openCritiqueView', function (critique) {
                self.selectedCritique = critique;
            });

        }
    }
</script>