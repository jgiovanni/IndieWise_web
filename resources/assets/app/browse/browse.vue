<template>
    <div>
        <md-drawer :md-active.sync="showfilterNav" class="md-left" v-cloak>
            <md-toolbar class="md-primary">
                <h2 class="md-title text-white" style="flex: 1">Filters</h2>

                <md-button class="md-icon-button" aria-label="Close menu" @click="toggleFilterNav()">
                    <md-icon>close</md-icon>
                </md-button>
            </md-toolbar>

            <div class="md-layout md-alignment-top-center md-gutter">
                <div class=" md-layout-item md-size-100">
                    <md-field>
                        <label for="filterNavSort">Sort</label>
                        <md-select id="filterNavSort" name="filterNavSort" v-model="filters.sort" @change="filterBy(filters.sort)">
                            <md-option value="recent">Recently Added</md-option>
                            <md-option value="trending">Trending</md-option>
                            <md-option value="rating">Highest Rated</md-option>
                            <md-option value="awards">Award Winning</md-option>
                        </md-select>
                    </md-field>
                </div>
                <div class=" md-layout-item md-size-100">
                    <form id="searchformA" @submit.stop.prevent="search()" role="search">
                        <md-field>
                            <label>Search</label>
                            <md-input v-model="filters.search" placeholder="Search"></md-input>
                        </md-field>
                    </form>
                </div>
                <div class=" md-layout-item md-size-100">
                    <h6>Types</h6>
                    <md-checkbox :value="g.id" v-model="selectedTypes" v-for="(g, $index) in $root.typesList" :key="g.id">{{g.name}}</md-checkbox>
                </div>
                <div class=" md-layout-item md-size-100">
                    <h6>Genres</h6>
                    <md-checkbox :value="g.id" v-model="selectedGenres" v-for="(g, $index) in $root.genresList" :key="g.id">{{g.name}}</md-checkbox>
                </div>
                <div class=" md-layout-item md-size-100"></div>
                <div class=" md-layout-item md-size-100"></div>
            </div>
        </md-drawer>

        <section class="category-content">
            <div md-flex="100" class="md-layout row">
                <!-- left side content area -->
                <div class="large-8 columns">
                    <section class="content content-with-sidebar">
                        <!-- newest video -->
                        <div class="main-heading removeMargin">
                            <div class="row secBg paddiv-14 removeBorderBottom">
                                <div class="small-12 columns">
                                    <div class="head-title">
                                        <i class="fa fa-search"></i>
                                        <h4>Browse {{pagination.total}} Videos</h4>
                                        <md-button @click.native="toggleFilterNav()" class="pull-right hide-for-large">
                                            <i class="fa fa-filter"></i>&nbsp;Filters
                                        </md-button>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="row secBg">
                            <div class="large-12 columns">
                                <div class="row column head-text clearfix">
                                    <!--<p class="pull-left">Search Results :<span>38 matching Comedy Videos found</span></p>-->

                                    <div class="grid-system pull-right show-for-large">
                                        <a class="secondary-button grid-default" @click="typeA='grid-default'"
                                           :class="{'current':typeA === 'grid-default'}"><i class="fa fa-th"></i></a>
                                        <a class="secondary-button grid-medium" @click="typeA='grid-medium'"
                                           :class="{'current':typeA === 'grid-medium'}"><i
                                                class="fa fa-th-large"></i></a>
                                        <a class="secondary-button list" @click="typeA='list'"
                                           :class="{'current':typeA === 'list'}"><i class="fa fa-th-list"></i></a>
                                    </div>
                                </div>
                                <div class="tabs-content" data-tabs-content="newVideos">
                                    <div class="tabs-panel is-active" style="display: block;" id="new-all">
                                        <div class="row list-group" v-if="films.length">
                                            <project-card v-for="video in films" :key="video.id" :video="video" :type="typeA"
                                                          :queried="true"></project-card>
                                        </div>
                                        <h3 v-else>No results found</h3>
                                    </div>
                                </div>
                                <div class="text-center loadMore">
                                    <button class="button" type="button" @click="loadMore()">
                                        <span v-if="!loading">load more</span>
                                        <span v-else><i class="fa fa-spinner fa-spin"></i>&nbsp;Loading</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </section>
                    <!-- ad Section -->
                    <!--<div class="googleAdv">
                        <a href="#"><img src="/assets/images/goodleadv.png" alt="googel ads"></a>
                    </div>&lt;!&ndash; End ad Section &ndash;&gt;-->
                </div><!-- end left side content area -->
                <!-- sidebar -->
                <div class="large-4 columns show-for-large">
                    <aside class="secBg sidebar">
                        <div class="row">
                            <!-- categories -->
                            <div class="large-12 medium-7 medium-centered columns">
                                <div class="widgetBox">
                                    <div class="widgetTitle">
                                        <h5>
                                            filters
                                        </h5>
                                    </div>
                                    <div class="md-layout widgetContent">
                                        <div class=" md-layout-item md-size-100">
                                            <md-field>
                                                <label for="filterSort">Sort</label>
                                                <md-select id="filterSort" name="filterSort" v-model="filters.sort" @change="filterBy(filters.sort)">
                                                    <md-option value="recent">Recently Added</md-option>
                                                    <md-option value="trending">Trending</md-option>
                                                    <md-option value="rating">Highest Rated</md-option>
                                                    <md-option value="awards">Award Winning</md-option>
                                                </md-select>
                                            </md-field>
                                        </div>
                                        <div class=" md-layout-item md-size-100">
                                            <form id="searchform" @submit.stop.prevent="search()" role="search">
                                                <md-field md-inline>
                                                    <label>Search</label>
                                                    <md-input v-model="filters.search"></md-input>
                                                    <md-button class="md-icon-button"><md-icon class="md-accent">search</md-icon></md-button>
                                                </md-field>
                                                <!--<div class="input-group">
													<input class="input-group-field" type="text" v-model="filters.search"
														   my-enter="search()" placeholder="Enter your keyword">
													<div class="input-group-button">
														<input type="submit" class="button" value="Search">
													</div>
												</div>-->
                                            </form>
                                        </div>
                                        <div class=" md-layout-item md-size-100">
                                            <h6>Types</h6>
                                            <md-checkbox :value="g.id" v-model="selectedTypes" v-for="(g, $index) in $root.typesList" :key="g.id">{{g.name}}</md-checkbox>
                                        </div>
                                        <div class=" md-layout-item md-size-100">
                                            <h6>Genres</h6>
                                            <md-checkbox :value="g.id" v-model="selectedGenres" v-for="(g, $index) in $root.genresList" :key="g.id">{{g.name}}</md-checkbox>
                                        </div>
                                        <div class=" md-layout-item md-size-100"></div>
                                        <div class=" md-layout-item md-size-100"></div>


                                        <!--<label>Sort by:
                                            <select v-model="filters.sort" @change="filterBy(filters.sort)">
                                                <option value="recent">Recently Added</option>
                                                <option value="trending">Trending</option>
                                                <option value="rating">Highest Rated</option>
                                                <option value="awards">Award Winning</option>
                                            </select>
                                        </label>-->
                                        <!--<hr class="">-->

                                        <!--<hr class="">-->
                                        <!--{{typesList}}-->







                                    </div>
                                </div>
                            </div>

                        </div>
                    </aside>
                </div><!-- end sidebar -->
            </div>
        </section>
        <!-- End Category Content-->
    </div>
</template>
<style scoped>
    .md-checkbox {
        margin: 5px 8px 5px 0;
    }
</style>
<script type="text/javascript">
    import projectCard from '../common/project-card.vue';
    export default {
        name: 'browse',
        components: {projectCard},
        data(){
            return {
                typeA: 'grid-medium',
                isOpen: false,
                loading: false,
                showfilterNav: false,
                selectedGenres: [],
                selectedTypes: [],
                pagination: { current_page: 1 },
                films: [],
                arrs: {
                    genres: [],
                    types: []
                },
                filters: {
                    sort: 'recent',
                    genres: '',
                    type: '',
                    search: '',
                    page: 1
                },
            }
        },
        watch: {
            'selectedTypes'(val) {
                this.search();
            },
            'selectedGenres'(val) {
                this.search();
            },
        },
        methods: {
            contains(arr, string){
                return _.contains(this[arr], string);
            },
            handleUrlFilters(){
                let self = this;
                let filters = decodeURIComponent(location.search).substr(1).split('&');
                _.each(filters, function (filter, key, list) {
                    let arr = filter.split('=');
                    if (arr[0] === 'q')
                        arr[0] = 'search';
                    self.filters[arr[0]] = arr[1];
                });
                if(this.filters.type) {
                    // handle types
                    let type = _.findWhere(this.$root.typesList, {slug: this.filters.type});
                    this.selectedTypes.push(type.id);
                }
                if(this.filters.genres) {
                    // handle genres
                    let genres = _.findWhere(this.$root.genresList, {slug: this.filters.genres});
                    this.selectedGenres.push(type.id);
                }
            },
            refresh() {
                let self = this;
                Promise.all([self.generateTypes(), self.generateGenres()])
                    .then((values) => {
                        self.search();
                    });
            },

            search() {
                let self = this;
                self.loading = true;
                let filterField = '';
                switch (self.filters.sort) {
                    case 'trending':
                        filterField = 'reactions_count';
                        break;
                    case 'rating':
                        filterField = 'iwRating';
                        break;
                    case 'awards':
                        filterField = 'wins_count';
                        break;
                    case 'recent':
                    default:
                        filterField = 'created_at';
                        break;
                }

                self.$root.searchText = self.filters.search || undefined;
                self.$http.get('projects', { params: {
                    sort: filterField,
                    order: 'DESC',
                    types: self.selectedTypes,
                    genres: self.selectedGenres,
                    search: self.filters.search || undefined,
                    per_page: 50,
                    page: self.filters.page
                }}).then(res => {
                    self.pagination = res.data.meta.pagination;
                    return self.films = res.data.data;
                }, (error) => console.log(error)).then(() => self.loading = false);

            },

            loadMore() {
                let self = this;
                if (self.loading) {
                    self.$root.$emit('toastMessage', 'Please wait...');
                }

                self.loading = true;
                let filterField = '';
                switch (self.filters.sort) {
                    case 'trending':
                        filterField = 'reactions_count';
                        break;
                    case 'rating':
                        filterField = 'iwRating';
                        break;
                    case 'awards':
                        filterField = 'wins_count';
                        break;
                    case 'recent':
                    default:
                        filterField = 'created_at';
                        break;
                }

                self.$http.get('projects', { params: {
                    sort: filterField,
                    order: 'DESC',
                    types: self.selectedTypes,
                    genres: self.selectedGenres,
                    search: self.filters.search || undefined,
                    per_page: 50,
                    page: ++self.filters.page
                }})
                    .then(res => self.films = _.union(self.films, res.data.data), (error) => console.log(error))
                    .then(() => self.loading = false);
            },

            filterBy(filter) {
                let self = this;
                self.search();
            },

            toggleFilterNav() {
                this.showfilterNav = !this.showfilterNav;
            },
        },
        mounted(){
            setTimeout(function () {
                this.handleUrlFilters();

                this.refresh();
            }.bind(this), 2000)
        }
    }
</script>