<template>
    <md-tabs md-dynamic-height md-border-bottom class="md-transparent">
        <md-tab md-label="Audience Awards">
                <h3>
                    <select v-model="date" @change="fetchWinners()">
                        <option :value="date.value" v-for="date in winnersMonths" v-text="date.label"></option>
                    </select>
                </h3>
            <template v-if="awards" v-for="award in awards">
                <md-table md-card :id="award.slug">
                    <md-toolbar>
                        <h1 class="md-title">
                            <span class="fa-stack fa-lg">
                                <i class="fa fa-circle fa-stack-2x" style="color: #EEEEEE;"></i>
                                <i class="fa fa-trophy fa-stack-1x fa-inverse" style="color: #FFC10E;"></i>
                            </span>
                            {{award.name}}
                        </h1>
                        <!--<md-button class="md-icon-button">
                            <md-icon>filter_list</md-icon>
                        </md-button>

                        <md-button class="md-icon-button">
                            <md-icon>search</md-icon>
                        </md-button>-->
                    </md-toolbar>
                    <md-table :md-sort="sort" md-sort-type="asc">
                        <md-table-row>
                            <md-table-head md-sort-by="project.name">Title</md-table-head>
                            <md-table-head md-sort-by="project.director">Director</md-table-head>
                            <md-table-head md-sort-by="project.type.name">Type</md-table-head>
                            <md-table-head md-sort-by="project.genres">Genres</md-table-head>
                            <md-table-head md-sort-by="project.filming_country.name">Country</md-table-head>
                        </md-table-row>

                        <template v-if="award.winners.length > 0">
                            <md-table-row v-for="(winner, index) in award.winners" :key="index">
                                <template v-if="winner.project">
                                    <md-table-cell><a :href="'/'+winner.project.url_id" v-text="winner.project.name"></a></md-table-cell>
                                    <md-table-cell>{{ winner.project.director }}</md-table-cell>
                                    <md-table-cell>{{ winner.project.type.name }}</md-table-cell>
                                    <md-table-cell>
                                        <md-chip v-for="(genre, gIndex) in winner.project.genres" :key="genre.name">
                                            {{genre.name}}
                                        </md-chip>
                                    </md-table-cell>
                                    <md-table-cell>{{ winner.project.filming_country.name }}</md-table-cell>
                                </template>
                            </md-table-row>
                        </template>

                        <template v-else>
                            <md-table-row>
                                <md-table-cell colspan="5" class="text-center">No winners this month</md-table-cell>
                            </md-table-row>
                        </template>
                    </md-table>
                </md-table>
                <br>
            </template>
        </md-tab>
        <!--<md-tab md-label="Top Performers">
            <md-content class="">
                <h3>Top 3 Trending</h3>
                <div layout="row">
                    <md-card flex>
                        <md-card-header>
                            <md-card-avatar>
                                <img src="https://cdn.filepicker.io/api/file/r6rU5cw3T5wbwpKTRec7?cache=true"/>
                            </md-card-avatar>
                            <md-card-header-text>
                                <a ui-sref="user.about({ url_id: 'MXZ9NZNn4Q'})" class="md-title">Vassia Papailiou</a>
                                &lt;!&ndash;<span class="md-subhead">Material</span>&ndash;&gt;
                            </md-card-header-text>
                        </md-card-header>
                        <img style="max-height: 159px" ui-sref="video({ url_id: 'Dj93dPdpMQ'})" src="https://res.cloudinary.com/indiewise/image/upload/v1474013720/gjjpdair2m5rqzupjkxp.jpg" class="md-card-image" alt="Washed Out">
                        <md-card-title>
                            <md-card-title-text>
                                <a ui-sref="video({ url_id: 'Dj93dPdpMQ'})" class="md-subhead">Under The Clock</a>
                            </md-card-title-text>
                        </md-card-title>
                    </md-card>
                    <md-card flex>
                        <md-card-header>
                            <md-card-avatar>
                                <img src="https://cdn.filepicker.io/api/file/UIcTHMSRUPqkCmGab9vg?cache=true"/>
                            </md-card-avatar>
                            <md-card-header-text>
                                <a ui-sref="user.about({ url_id: '3Xe682Em4j'})" class="md-title">Arman Sargsyan</a>
                                &lt;!&ndash;<span class="md-subhead">Material</span>&ndash;&gt;
                            </md-card-header-text>
                        </md-card-header>
                        <img style="max-height: 159px" ui-sref="video({ url_id: 'Zaz9AWLb9j'})" src="https://res.cloudinary.com/indiewise/image/upload/v1473790734/f7denivx5ihb0udtgqgv.jpg" class="md-card-image" alt="Washed Out">
                        <md-card-title>
                            <md-card-title-text>
                                <a ui-sref="video({ url_id: 'Zaz9AWLb9j'})" class="md-subhead">Inside my head (Official Selection to IndieWise Virtual Festival)</a>
                            </md-card-title-text>
                        </md-card-title>
                    </md-card>
                    <md-card flex>
                        <md-card-header>
                            <md-card-avatar>
                                <img src="https://lh5.googleusercontent.com/-4VQA-rVdI4E/AAAAAAAAAAI/AAAAAAAAAGI/7tHEN1Lmc8M/photo.jpg?sz=50"/>
                            </md-card-avatar>
                            <md-card-header-text>
                                <a ui-sref="user.about({ url_id: 'Mjy3OGx3vQ'})" class="md-title">Hemant Pandya Production</a>
                                &lt;!&ndash;<span class="md-subhead">Material</span>&ndash;&gt;
                            </md-card-header-text>
                        </md-card-header>
                        <img style="max-height: 159px" ui-sref="video({ url_id: 'Ya3z47qYbj'})" src="https://img.youtube.com/vi/XUeMcp-uUSw/hqdefault.jpg" class="md-card-image" alt="Washed Out">
                        <md-card-title>
                            <md-card-title-text>
                                <a ui-sref="video({ url_id: 'Ya3z47qYbj'})" class="md-subhead">WO-men (the discomfort in inequality)</a>
                            </md-card-title-text>
                        </md-card-title>
                    </md-card>
                </div>

                <h3>Top 3 Highest Rated</h3>
                <div layout="row">
                    <md-card flex>
                        <md-card-header>
                            <md-card-avatar>
                                <img src="https://cdn.filepicker.io/api/file/r6rU5cw3T5wbwpKTRec7?cache=true"/>
                            </md-card-avatar>
                            <md-card-header-text>
                                <a ui-sref="user.about({ url_id: 'MXZ9NZNn4Q'})" class="md-title">Vassia Papailiou</a>
                                &lt;!&ndash;<span class="md-subhead">Material</span>&ndash;&gt;
                            </md-card-header-text>
                        </md-card-header>
                        <img style="max-height: 159px" ui-sref="video({ url_id: 'Dj93dPdpMQ'})" src="https://res.cloudinary.com/indiewise/image/upload/v1474013720/gjjpdair2m5rqzupjkxp.jpg" class="md-card-image" alt="Washed Out">
                        <md-card-title>
                            <md-card-title-text>
                                <a ui-sref="video({ url_id: 'Dj93dPdpMQ'})" class="md-subhead">Under The Clock</a>
                            </md-card-title-text>
                        </md-card-title>
                    </md-card>
                    <md-card flex>
                        <md-card-header>
                            <md-card-avatar>
                                <img src="https://getindiewise.com/assets/img/default_avatar.jpg"/>
                            </md-card-avatar>
                            <md-card-header-text>
                                <a ui-sref="user.about({ url_id: 'VXOWLbo8xX'})" class="md-title">Ragip Taranç</a>
                                &lt;!&ndash;<span class="md-subhead">Material</span>&ndash;&gt;
                            </md-card-header-text>
                        </md-card-header>
                        <img style="max-height: 159px" ui-sref="video({ url_id: 'EQA7Md2RAj'})" src="https://img.youtube.com/vi/SEqlCj1CvNU/hqdefault.jpg" class="md-card-image" alt="Washed Out">
                        <md-card-title>
                            <md-card-title-text>
                                <a ui-sref="video({ url_id: 'EQA7Md2RAj'})" class="md-subhead">Fermanin mi var?</a>
                            </md-card-title-text>
                        </md-card-title>
                    </md-card>
                    <md-card flex>
                        <md-card-header>
                            <md-card-avatar>
                                <img src="https://cdn.filepicker.io/api/file/c1iaKW9S4CYWoMBGZmgv?cache=true"/>
                            </md-card-avatar>
                            <md-card-header-text>
                                <a ui-sref="user.about({ url_id: '9XLmv6eNyj'})" class="md-title">Darijo Bosnjak</a>
                                &lt;!&ndash;<span class="md-subhead">Material</span>&ndash;&gt;
                            </md-card-header-text>
                        </md-card-header>
                        <img style="max-height: 159px" ui-sref="video({ url_id: 'Bj65D3pyvX'})" src="https://img.youtube.com/vi/Okx8H7PH_08/hqdefault.jpg" class="md-card-image" alt="Washed Out">
                        <md-card-title>
                            <md-card-title-text>
                                <a ui-sref="video({ url_id: 'Bj65D3pyvX'})" class="md-subhead">Some New Kids</a>
                            </md-card-title-text>
                        </md-card-title>
                    </md-card>
                </div>

                <h3>Top 3 Award-Winning</h3>
                <div layout="row">
                    <md-card flex>
                        <md-card-header>
                            <md-card-avatar>
                                <img src="https://cdn.filepicker.io/api/file/r6rU5cw3T5wbwpKTRec7?cache=true"/>
                            </md-card-avatar>
                            <md-card-header-text>
                                <a ui-sref="user.about({ url_id: 'MXZ9NZNn4Q'})" class="md-title">Vassia Papailiou</a>
                                &lt;!&ndash;<span class="md-subhead">Material</span>&ndash;&gt;
                            </md-card-header-text>
                        </md-card-header>
                        <img style="max-height: 159px" ui-sref="video({ url_id: 'Dj93dPdpMQ'})" src="https://res.cloudinary.com/indiewise/image/upload/v1474013720/gjjpdair2m5rqzupjkxp.jpg" class="md-card-image" alt="Washed Out">
                        <md-card-title>
                            <md-card-title-text>
                                <a ui-sref="video({ url_id: 'Dj93dPdpMQ'})" class="md-subhead">Under The Clock</a>
                            </md-card-title-text>
                        </md-card-title>
                    </md-card>

                    <div flex>
                        <md-card>
                            <md-card-header>
                                <md-card-avatar>
                                    <img src="https://cdn.filepicker.io/api/file/c1iaKW9S4CYWoMBGZmgv?cache=true"/>
                                </md-card-avatar>
                                <md-card-header-text>
                                    <a ui-sref="user.about({ url_id: '9XLmv6eNyj'})" class="md-title">Darijo Bosnjak</a>
                                    <a ui-sref="video({ url_id: 'Bj65D3pyvX'})" class="md-subhead">Some New Kids</a>
                                    &lt;!&ndash;<span class="md-subhead">Material</span>&ndash;&gt;
                                </md-card-header-text>
                            </md-card-header>
                        </md-card>
                        <md-card>
                            <md-card-header>
                                <md-card-avatar>
                                    <img src="https://cdn.filepicker.io/api/file/nJNeWQaoRICE3RAObIJV?cache=true"/>
                                </md-card-avatar>
                                <md-card-header-text>
                                    <a ui-sref="user.about({ url_id: 'Dj93dPpg3Q'})" class="md-title">Drew Mewse</a>
                                    <a ui-sref="video({ url_id: 'Napd5pMwoa'})" class="md-subhead">Pandora</a>
                                    &lt;!&ndash;<span class="md-subhead">Material</span>&ndash;&gt;
                                </md-card-header-text>
                            </md-card-header>
                        </md-card>
                        <md-card>
                            <md-card-header>
                                <md-card-avatar>
                                    <img src="https://cdn.filepicker.io/api/file/UIcTHMSRUPqkCmGab9vg?cache=true"/>
                                </md-card-avatar>
                                <md-card-header-text>
                                    <a ui-sref="user.about({ url_id: 'Zaz9AWLb9j'})" class="md-title">Arman Sargsyan</a>
                                    <a ui-sref="video({ url_id: 'Zaz9AWLb9j'})" class="md-subhead">Inside my head</a>
                                    &lt;!&ndash;<span class="md-subhead">Material</span>&ndash;&gt;
                                </md-card-header-text>
                            </md-card-header>
                        </md-card>
                    </div>

                    <md-card flex>
                        <md-card-header>
                            <md-card-avatar>
                                <img src="https://graph.facebook.com/v2.6/1808782572736015/picture?type=normal"/>
                            </md-card-avatar>
                            <md-card-header-text>
                                <a ui-sref="user.about({ url_id: '0a2kWelryQ'})" class="md-title">Redmond Butling</a>
                                &lt;!&ndash;<span class="md-subhead">Material</span>&ndash;&gt;
                            </md-card-header-text>
                        </md-card-header>
                        <img style="max-height: 159px" ui-sref="video({ url_id: '7XY3olzxMa'})" src="https://res.cloudinary.com/indiewise/image/upload/v1473856649/qozvpmq2zydnkobfaeqc.jpg" class="md-card-image" alt="X">
                        <md-card-title>
                            <md-card-title-text>
                                <a ui-sref="video({ url_id: '2jkxnOEWMa'})" class="md-subhead">´´Oitavo Andar´´ (English subs)</a>
                            </md-card-title-text>
                        </md-card-title>
                    </md-card>
                </div>

            </md-content>
        </md-tab>-->
        <md-tab md-label="IndustryBOOST Competition 2016">
            <a href="/9XLmv6ZxGj">
                <img src="https://img.youtube.com/vi/0FkjJGhbfaM/hqdefault.jpg" style="width:100%;" class="" alt="Safe Train">
            </a>
        </md-tab>
    </md-tabs>
</template>
<style scoped>
    .md-card {
        box-shadow: none;
    }
</style>
<script type="text/javascript">
    import _ from 'underscore';
    export default {
        name: 'winners',
        data(){
            return {
                awards: [],
                date: moment().subtract(1, 'months').date(1).startOf('day').format('YYYY-MM-DD HH:mm:ss'),
                sort: 'name'
            }
        },
        computed: {
            winnersMonths() {
                let dates = [{value: '2016-09-01 00:00:00', label: 'September 2016'}];
                let thisDate =  _.extend({}, dates[0]);
                while (moment(thisDate.value).isBefore(moment().subtract(1, 'months'))) {
                    thisDate.value = moment(thisDate.value).add(1, 'months').startOf('day').format('YYYY-MM-DD HH:mm:ss');
                    thisDate.label = moment(thisDate.value).format('MMMM YYYY');
                    dates.push({ value: thisDate.value, label: thisDate.label });
                }
                return _.initial(dates);
            }
        },
        methods: {
            isLast(index, award){
                return (index + 1) === award.winners.length
            },
            fetchWinners() {
                let self = this;
                this.$http.get('winners', { params: {
                    date_start: self.date,
                    date_end: moment(self.date).endOf('month').format('YYYY-MM-DD HH:mm:ss')
                }}).then((response) => {
                    self.awards = response.data.awards;
                });
            }
        },
        mounted(){
            this.fetchWinners();
        }
    }
</script>