<template>
    <section class="content comments">
        <div class="row secBg">
            <div class="large-12 columns">
                <template v-if="!disable">
                    <div class="main-heading borderBottom">
                        <div class="row padding-14">
                            <div class="medium-12 small-12 columns">
                                <div class="head-title">
                                    <i class="fa fa-star"></i>
                                    <h4>Critiques <span v-if="pagination">({{pagination.total||0}})</span></h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <template v-if="pagination">
                        <h4 class="text-center" v-if="pagination.total === 0">Be the first to judge this project!</h4>
                        <template v-else>
                            <div class="comment-sort text-right">
                                <span>Sort By :
                                    <a :class="{'active':sortOrder === 'comments_count|desc'}"
                                       @click="reSort('comments_count|desc')">comments</a> |
                                    <a :class="{'active':sortOrder === 'created_at|desc'}"
                                       @click="reSort('created_at|desc')">newest</a> |
                                    <a :class="{'active':sortOrder === 'created_at|asc'}"
                                       @click="reSort('created_at|asc')">oldest</a>
                                </span>
                            </div>

                            <!-- main comment -->
                            <div class="main-comment showmore_ones" toggle-show-mores="368">
                                <critique-item v-for="critique in critiques" :critique="critique"
                                               :parent-url-id="parentUrlId" :parent-owner-id="parentOwnerId"></critique-item>

                                <div class="text-center loadMore" v-show="pagination.total_pages > 0">
                                    <button class="button" type="button" @click="loadMore" disabled="loading">
                                        <span v-if="!loading">load more</span>
                                        <span v-else><i class="fa fa-spinner fa-spin"></i>&nbsp;Loading</span>
                                    </button>
                                </div>
                            </div>
                            <!-- End main comment -->
                        </template>
                    </template>

                </template>
                <template v-else>
                    <div class="main-heading borderBottom">
                        <div class="row padding-14">
                            <div class="medium-12 small-12 columns">
                                <div class="head-title">
                                    <i class="fa fa-comments"></i>
                                    <h4>Critiques disabled by Uploader</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>
<style scoped></style>
<script type="text/babel">
    import critiqueItem from './critique-item.vue';
    export default {
        name: 'critiques',
        components: {critiqueItem},
        props: {
            params: {
                type: Object
            },
            parentOwnerId: {
                type: String
            },
            parentUrlId: {
                type: String
            },
            disable: {
                type: Boolean,
                default: false
            },
        },
        data(){
            return {
                critiques: [],
                pagination: null,
                sortOrder: 'created_at|desc',
                isLoggedIn: null,
                showQuickReply: window.Foundation.MediaQuery.atLeast('large'),
                loading: true,
            }
        },
        methods: {
            load() {
                let self = this;
                this.params.sort = this.sortOrder || 'created_at|desc';
                this.$http.get('critiques', {params: this.params})
                    .then((result) => {
                        self.critiques = result.data.data;
                        self.pagination = result.data.meta.pagination;
                        this.loading = false;
                    }, (error) => {
                        console.log(error);
                        this.loading = false;
                    });
            },

            loadMore() {
                let self = this;
                this.params.page = this.pagination.current_page + 1;
                this.loading = true;
                this.$http.get('critiques', {params: this.params})
                    .then((result) => {
                        self.critiques = _.union(self.critiques, result.data.data);
                        self.pagination = result.data.meta.pagination;
                        this.loading = false;
                    }, (error) => {
                        console.log(error);
                        this.loading = false;
                    });

            },

            reSort(order) {
                this.sortOrder = order;
                this.params.page = 1;
                this.loading = true;
                this.load();
            },
        },
        mounted(){
            this.$parent.projectCritiques = this;
            this.load();
        }
    }
</script>