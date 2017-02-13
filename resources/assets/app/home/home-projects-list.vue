<template>
    <section class="content">
        <div class="main-heading">
            <div class="row secBg padding-14 head-text">
                <div class="medium-8 small-8 columns">
                    <div class="head-title">
                        <i :class="icon"></i>
                        <h4 :class="{'has-tip': tip}">
                            {{ title }}
                            <md-tooltip v-if="tip" md-direction="right">{{tip}}</md-tooltip>
                        </h4>
                    </div>
                </div>
                <div class="medium-4 small-4 columns">
                    <div class="grid-system pull-right show-for-large">
                        <a class="secondary-button grid-default" @click="toggleType('grid-default')"
                           :class="{'current': type === 'grid-default'}"><i class="fa fa-th"></i></a>
                        <a class="secondary-button grid-medium" @click="toggleType('grid-medium')"
                           :class="{'current': type === 'grid-medium'}"><i class="fa fa-th-large"></i></a>
                        <a class="secondary-button list" @click="toggleType('list')" :class="{'current':type === 'list'}"><i
                                class="fa fa-th-list"></i></a>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="large-12 columns">
                <div>
                    <div class="tabs-panel is-active" style="display: block;" id="popular-all">
                        <div class="row list-group">
                            <project-card v-for="(video, $index, $last) in projects.data" :key="video.id" :index="$index" :video="video" :type.sync="type"
                                          :queried="true"></project-card>
                        </div>
                    </div>
                </div>
                <div class="text-center row-btn">
                    <a class="button radius" :href="'browse?sort=' + sort">View More Videos</a>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped></style>
<script type="text/javascript">
    import projectCard from '../common/project-card.vue'
    export default {
        name: 'home-projects-list',
        components: {projectCard},
        props: {
            perPage: {
                type: Number
            },
            type: {
                type: String,
                default: 'grid-default'
            },
            sort: {
                type: String
            }
        },
        data(){
            return {
                icon: '',
                title: '',
                tip: '',
                projects: [],
                refInterval: null,
                field: ''
            }
        },
        methods: {
            refresh() {
                this.$http.get('projects', { params: {sort: this.field, per_page: this.perPage}})
                    .then(function (result) {
                        this.projects = result.data;
                    });
            },
            toggleType(type){
                this.$parent.type = type;
            }
        },
        mounted(){
            let self = this;
            switch (this.sort) {
                case 'rating':
                    this.icon = 'fa fa-star';
                    this.title = 'Highest Rated';
                    this.tip = 'Top videos ranked according to IndieWise Average';
                    this.field = 'topRating';
                    break;
                case 'trending':
                    this.icon = 'fa fa-line-chart';
                    this.title = 'Trending';
                    this.tip = 'Top videos ranked according to number of Reactions received';
                    this.field = 'reactions_count';
                    break;
                case 'awards':
                    this.icon = 'fa fa-trophy';
                    this.title = 'Award-Winning';
                    this.tip = 'Top videos ranked according to number of Award Wins';
                    this.field = 'wins_count';
                    break;
                case 'recent':
                    this.icon = 'fa fa-plus';
                    this.title = 'Recently Added';
                    this.tip = '';
                    this.field = 'created_at';
                    break;
            }

            this.refresh();
//            this.refInterval = this.$interval(self.refresh.bind(this), 300000);

            window.onfocus = function () {
                //do something
            };

            window.onblur = function () {
                // console.log('Refresh Stopped');
//                self.$interval.cancel(self.refInterval);
            };
        }
    }
</script>