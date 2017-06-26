<template>
    <section class="content comments">
        <div class="row secBg">
            <div class="large-12 columns">
                <div class="main-heading borderBottom">
                    <div class="row padding-14">
                        <div class="medium-12 small-12 columns">
                            <div class="head-title">
                                <i class="fa fa-trophy"></i>
                                <h4>Nominations <span v-if="pagination">({{(pagination.count * pagination.current_page)}} of {{pagination.total||0}})</span></h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="comment-sort text-right">
                    <span>
                            <md-icon>sort</md-icon>
                            <a :class="{'active':sortOrderA==='created_at|desc'}"
                               @click="sortOrderA='created_at|desc'">newest</a> |
                            <a :class="{'active':sortOrderA==='created_at|asc'}"
                            @click="sortOrderA='created_at|asc'">oldest</a>
                    </span>
                </div>

                <!-- main comment -->
                <div class="main-comment showmore_one">
                    <md-progress v-if="loadingNominations" md-indeterminate></md-progress>

                    <md-list class="md-double-line">
                        <md-list-item v-for="nom in sortNominations" :key="nom.id">
                            <md-avatar>
                                <img :src="nom.user.data.avatar || '/assets/img/avatar-1.png'"
                                     :alt="nom.user.data.fullName">
                            </md-avatar>

                            <div class="md-list-text-container normal-wrap">
                                                <span>
                                                    <a :href="'/user/'+nom.user.data.url_id">
                                                        {{nom.user.data.fullName}}
                                                    </a>&nbsp;nominated this video for <b>{{nom.award.data.name||nom.award.name}} Award</b>
                                                </span>
                                <span>
                                                    <i class="fa fa-clock-o"></i>&nbsp;{{ nom.created_at|vmUtc|vmLocal|vmDateFormat('lll') }}
                                                </span>
                            </div>
                        </md-list-item>
                    </md-list>
                </div>
                <!-- End main comment -->


            </div>
        </div>
    </section>
</template>
<style scoped></style>
<script type="text/babel">
    export default {
        name: 'project-nominations',
        props: ['id', 'nominationsCount'],
        data(){
            return {
                loadingNominations: false,
                nominations: [],
                pagination: { current_page: 1 },
                sortOrderA: 'created_at|desc'
            }
        },
        watch: {
            'sortOrderA'() {
                this.getNominations();
            }
        },
        computed: {
            sortNominations() {
                return _.sortBy(this.nominations, this.sortOrderA);
            }
        },
        methods: {
            getNominations(){
                let self = this;
                this.loadingNominations = true;
                this.$http.get('nominations', {
                    params: {
                        include: 'user,award',
                        project: this.id,
                        sort: this.sortOrderA,
                        per_page: 25,
                        page: this.pagination.current_page
                    }
                })
                    .then((result) => {
                        self.loadingNominations = false;
                        self.nominations = result.body.data;
                        self.pagination = result.data.meta.pagination;
                        //// console.log('Nomination: ', result.data);
                    }, (error) => console.log(error));
            }
        },
        mounted(){
            this.getNominations();
        }
    }
</script>