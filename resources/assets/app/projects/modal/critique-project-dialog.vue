<template>
    <md-dialog ref="CritiqueProjectDialog" :md-active.sync="showCritiqueProjectDialog">
        <md-dialog-title>Judge This Project</md-dialog-title>

        <md-dialog-content>
            <form id="CritiqueProjectDialogForm" @submit.stop.prevent="validateCritique">
                <div class="row">
                    <div v-if="critique.type === 'video'">
                        <div class="columns row">
                            <div class="columns small-12 text-center medium-4 medium-text-right">
                                <span class="">Acting</span>
                            </div>
                            <div class="columns small-12 text-center medium-8">
                                <rating :value="critique.performances" :items="starArray" @change="updateStar" name="performances"></rating>
                            </div>
                        </div>
                        <div class="columns row">
                            <div class="columns small-12 text-center medium-4 medium-text-right">
                                <span class="hyphenate">Cinematography</span>
                            </div>
                            <div class="columns small-12 text-center medium-8">
                                <rating :value="critique.cinematography" :items="starArray" @change="updateStar" name="cinematography"></rating>
                            </div>
                        </div>
                        <div class="columns row">
                            <div class="columns small-12 text-center medium-4 medium-text-right">
                                <span class="">Direction</span>
                            </div>
                            <div class="columns small-12 text-center medium-8">
                                <rating :value="critique.direction" :items="starArray" @change="updateStar" name="direction"></rating>
                            </div>
                        </div>
                        <div class="columns row">
                            <div class="columns small-12 text-center medium-4 medium-text-right">
                                <span class="">Editing</span>
                            </div>
                            <div class="columns small-12 text-center medium-8">
                                <rating :value="critique.structure" :items="starArray" @change="updateStar" name="structure"></rating>
                            </div>
                        </div>
                        <div class="columns row">
                            <div class="columns small-12 text-center medium-4 medium-text-right">
                                <span class="">Music</span>
                            </div>
                            <div class="columns small-12 text-center medium-8">
                                <rating :value="critique.music" :items="starArray" @change="updateStar" name="music"></rating>
                            </div>
                        </div>
                        <div class="columns row">
                            <div class="columns small-12 text-center medium-4 medium-text-right">
                                <span class="">Originality</span>
                            </div>
                            <div class="columns small-12 text-center medium-8">
                                <rating :value="critique.originality" :items="starArray" @change="updateStar" name="originality"></rating>
                            </div>
                        </div>
                        <div class="columns row">
                            <div class="columns small-12 text-center medium-4 medium-text-right">
                                <span class="">Pacing</span>
                            </div>
                            <div class="columns small-12 text-center medium-8">
                                <rating :value="critique.pacing" :items="starArray" @change="updateStar" name="pacing"></rating>
                            </div>
                        </div>
                        <div class="columns row">
                            <div class="columns small-12 text-center medium-4 medium-text-right">
                                <span class="">Production Value</span>
                            </div>
                            <div class="columns small-12 text-center medium-8">
                                <rating :value="critique.production" :items="starArray" @change="updateStar" name="production"></rating>
                            </div>
                        </div>
                        <div class="columns row">
                            <div class="columns small-12 text-center medium-4 medium-text-right">
                                <span class="">Sound Quality</span>
                            </div>
                            <div class="columns small-12 text-center medium-8">
                                <rating :value="critique.audio" :items="starArray" @change="updateStar" name="audio"></rating>
                            </div>
                        </div>
                        <div class="columns row">
                            <div class="columns small-12 text-center medium-4 medium-text-right">
                                <span class="">Writing</span>
                            </div>
                            <div class="columns small-12 text-center medium-8">
                                <rating :value="critique.writing" :items="starArray" @change="updateStar" name="writing"></rating>
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        <div class="columns row">
                            <div class="columns small-12 text-center medium-4 medium-text-right">
                                <span class="">Concept</span>
                            </div>
                            <div class="columns small-12 text-center medium-8">
                                <rating :value="critique.concept" :items="starArray" @change="updateStar" name="concept"></rating>
                            </div>
                        </div>
                        <div class="columns row">
                            <div class="columns small-12 text-center medium-4 medium-text-right">
                                <span class="hyphenate">Presentation</span>
                            </div>
                            <div class="columns small-12 text-center medium-8">
                                <rating :value="critique.presentation" :items="starArray" @change="updateStar" name="presentation"></rating>
                            </div>
                        </div>
                        <div class="columns row">
                            <div class="columns small-12 text-center medium-4 medium-text-right">
                                <span class="">Characters</span>
                            </div>
                            <div class="columns small-12 text-center medium-8">
                                <rating :value="critique.characters" :items="starArray" @change="updateStar" name="characters"></rating>
                            </div>
                        </div>
                        <div class="columns row">
                            <div class="columns small-12 text-center medium-4 medium-text-right">
                                <span class="">Structure</span>
                            </div>
                            <div class="columns small-12 text-center medium-8">
                                <rating :value="critique.structure" :items="starArray" @change="updateStar" name="structure"></rating>
                            </div>
                        </div>
                        <div class="columns row">
                            <div class="columns small-12 text-center medium-4 medium-text-right">
                                <span class="">Dialogue</span>
                            </div>
                            <div class="columns small-12 text-center medium-8">
                                <rating :value="critique.dialogue" :items="starArray" @change="updateStar" name="dialogue"></rating>
                            </div>
                        </div>
                        <div class="columns row">
                            <div class="columns small-12 text-center medium-4 medium-text-right">
                                <span class="">Originality</span>
                            </div>
                            <div class="columns small-12 text-center medium-8">
                                <rating :value="critique.originality" :items="starArray" @change="updateStar" name="originality"></rating>
                            </div>
                        </div>
                        <div class="columns row">
                            <div class="columns small-12 text-center medium-4 medium-text-right">
                                <span class="">Pacing</span>
                            </div>
                            <div class="columns small-12 text-center medium-8">
                                <rating :value="critique.pacing" :items="starArray" @change="updateStar" name="pacing"></rating>
                            </div>
                        </div>
                        <div class="columns row">
                            <div class="columns small-12 text-center medium-4 medium-text-right">
                                <span class="">Theme</span>
                            </div>
                            <div class="columns small-12 text-center medium-8">
                                <rating :value="critique.theme" :items="starArray" @change="updateStar" name="theme"></rating>
                            </div>
                        </div>
                        <div class="columns row">
                            <div class="columns small-12 text-center medium-4 medium-text-right">
                                <span class="">Style</span>
                            </div>
                            <div class="columns small-12 text-center medium-8">
                                <rating :value="critique.style" :items="starArray" @change="updateStar" name="style"></rating>
                            </div>
                        </div>
                        <div class="columns row">
                            <div class="columns small-12 text-center medium-4 medium-text-right">
                                <span class="">Plot</span>
                            </div>
                            <div class="columns small-12 text-center medium-8">
                                <rating :value="critique.writing" :items="starArray" @change="updateStar" name="writing"></rating>
                            </div>
                        </div>
                    </div>
                    <hr class="thin">
                    <div class="columns row">
                        <div class="columns small-12 text-center medium-4 text-right">
                            <span class="">Overall Rating</span>
                        </div>
                        <div class="columns small-4">
                            <span class="">{{ critique.overall.toFixed(1) }}/10</span>
                        </div>
                    </div>
                    <hr class="thin">
                    <br>
                    <div class="columns">
                        <md-field>
                            <label>Tell us why</label>
                            <!--<md-input v-model="critique.body" maxlength="3000" required></md-input>-->
                            <md-textarea v-model="critique.body" maxlength="3000" required></md-textarea>
                        </md-field>

                        <md-checkbox v-model="critique.private">Make Private?</md-checkbox>
                        <md-button class="md-icon-button md-primary" @click.native="helpToggle=!helpToggle"><md-icon>info</md-icon></md-button>

                        <p v-show="helpToggle" class="help-text">By choosing this "Make private" Option, individual rating categories, such as "Production Value", "Originality", etc. will not be publicly visible to users other than you and the project author. However, the overall rating generated from these individual results will always be publicly visible.</p>

                        <md-field>
                            <label for="nom">
                                Award Worthy? Nominate it!
                                <md-tooltip md-direction="top">A project needs 5 or more Nominations, for the exact same Award, by different users in order to secure a win for that particular award.</md-tooltip>
                            </label>
                            <md-select id="nom" v-model="award_id" :disabled="!canNominate">
                                <md-option value="">No</md-option>
                                <md-option :value="a.id" v-for="a in awardsList" :key="a.id">{{a.name}}</md-option>
                            </md-select>
                        </md-field>
                        <span class="help-text">In order to Nominate this project, an overall score of at least 6 is required.</span>


                    </div>
                    <div class="columns">
                        <div id="restrictionErrors" class="alert callout" v-if="restrictionErrors.length">
                            <template v-for="e in restrictionErrors">
                                <span>{{e}}</span><br>
                            </template>
                        </div>
                    </div>
                </div>
            </form>
        </md-dialog-content>

        <md-dialog-actions>
            <md-button class="" @click.native="close()">Cancel</md-button>
            <md-button class="md-primary" form="CritiqueProjectDialogForm" type="submit">Submit</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>
<style scoped>
    .md-dialog {
        min-width: 80%;
    }
    #CritiqueProjectDialogForm .md-icon-button {
        margin-right: 0;
    }
    @media (max-width: 600px)  {
        #CritiqueProjectDialogForm .md-button.md-icon-button.md-dense {
            padding: 0 !important;
            font-size: 10px;
            min-width: 22px;
            height: 22px;
            width: 22px;
            min-height: 24px;
            line-height: 24px;
        }
        #CritiqueProjectDialogForm i.md-icon.md-theme-default.material-icons {
            font-size: 24px;
        }
    }
</style>
<script type="text/javascript">
    import rating from '../../rating.vue';
    export default {
        name: 'critique-project-dialog',
        components: {rating},
        props: ['project'],
        data(){
            return {
              showCritiqueProjectDialog: false,
                helpToggle: false,
                canNominate: false,
                makePrivateHelp: false,
                processing: false,
                restrictionErrors: [],
                awardsList: [],
                starArray : _.clone([{title: '0 stars', value: 0}, {title: '1 stars', value: 1}, {title: '2 stars', value: 2}, {title: '3 stars', value: 3}, {title: '4 stars', value: 4}, {title: '5 stars', value: 5}, {title: '6 stars', value: 6}, {title: '7 stars', value: 7}, {title: '8 stars', value: 8}, {title: '9 stars', value: 9}, {title: '1 stars', value: 10}]),
                ratingMax: 10,
                award_id: null,
                nominated: {
                    award_id: this.award_id,
                    user_id: this.$root.user.id,
                    project_id: this.project.id,
                    critique_id: undefined
                },
                critique: {
                    originality: 0,
                    direction: 0,
                    writing: 0,
                    cinematography: 0,
                    performances: 0,
                    production: 0,
                    pacing: 0,
                    structure: 0,
                    audio: 0,
                    music: 0,
                    overall: 0,
                    private: false,
                    user_id: this.$root.user.id,
                    body: '',
                    project_id: this.project.id,
                    type: this.project.hosting_type === 'script' ? 'script' : 'video',
                    style: 0,
                    theme: 0,
                    dialogue: 0,
                    characters: 0,
                    presentation: 0,
                    concept: 0,
                }
            }
        },
        computed: {
            sortedAwardsList() {
                return _.sortBy(this.awardsList, '-name');
            }
        },
        watch: {
            'critique': {
                handler: function(val){
                    this.calcOverall();
                    this.canNominate = val.overall >= 6;
                },
                deep: true
            },
            'canNominate'(val) {
                if (!val) {
                    this.award_id = null;
                }
            }
        },
        methods: {
            close() {
                this.showCritiqueProjectDialog = false;
            },
            updateStar(val, name) {
                this.critique[name] = val;
            },
            calcOverall () {
                switch (this.critique.type) {
                    case 'script':
                        this.critique.overall = (this.critique.originality + this.critique.pacing + this.critique.structure +
                            this.critique.writing + this.critique.style + this.critique.theme + this.critique.dialogue +
                            this.critique.characters + this.critique.presentation + this.critique.concept) / 10;
                        break;
                    case 'video':
                    default:
                        this.critique.overall = (this.critique.originality + this.critique.direction + this.critique.writing +
                            this.critique.cinematography + this.critique.performances + this.critique.production +
                            this.critique.pacing + this.critique.structure + this.critique.audio + this.critique.music) / 10;
                        break;
                }
            },
            validateCritique () {
                this.restrictionErrors = [];

                let failA = true;
                let failB = true;

                this.critique.body.trim();
                failA = this.critique.body.length < 1;
                if (failA) {
                    this.restrictionErrors.push('Tell us why you gave this critique an overall rating of ' + this.critique.overall);
                }
                switch (this.critique.type) {
                    case 'script':
                        failB = this.critique.originality < 1 || this.critique.pacing < 1 || this.critique.writing < 1 ||
                            this.critique.structure < 1 || this.critique.style < 1 || this.critique.theme < 1 ||
                            this.critique.dialogue < 1 || this.critique.characters < 1 || this.critique.presentation < 1 || this.critique.concept < 1;
                        break;
                    case 'video':
                    default:
                        failB = this.critique.originality < 1 || this.critique.direction < 1 || this.critique.writing < 1 ||
                            this.critique.cinematography < 1 || this.critique.performances < 1 || this.critique.production < 1 ||
                            this.critique.pacing < 1 || this.critique.structure < 1 || this.critique.audio < 1 || this.critique.music < 1;
                        break;
                }

                if (failB) {
                    this.restrictionErrors.push('Be sure to put a minimum of 1-star in every category.')
                }

                if (!failA && !failB) {
                    this.postCritique();
                }
            },
            postCritique () {
                let self = this;
                if (this.processing) {
                    return false;
                }

                this.processing = true;
                this.critique.url_id = moment().valueOf();
                self.$http.post('critiques?include=user,award', this.critique).then((res) => {
                    let obj = res.data.data;

                    self.critiques.push(obj);
//                    self.calcIwAverage(self.critiques);
                    // Increment project critiques_count
                    self.project.critiques_count++;

                    // register Action
//                    Analytics.trackEvent('video', 'critique', self.project.name);
                    self.$ua.trackEvent('project', 'critique', self.project.name);
                    // if an award has been selected, create a nomination
                    if (!!this.dialogModel.award_id && _.isString(this.dialogModel.award_id)) {
                        this.nominated.critique_id = obj.id;
                        this.nominated.award_id = this.dialogModel.award_id;
                        self.$http.post('nominations', this.nominated).then((nom) => {
                            // Increment project commentCount
                            self.project.nominationCount++;
                            // self.updateVideoObj();
                            // register Action
                            // self.qNominations();
                            nom.critique = obj;
//                            Analytics.trackEvent('video', 'nominate', self.project.name);
                            self.$ua.trackEvent('project', 'nominate', self.project.name);
                        }, function (error) {
                            alert('Failed to create new nomination, with error code: ' + error.message);
                        })
                    } else {

                    }
                    self.projectCtrl.handleActions('rate', critique.data.data);

                }, function (error) {
                    alert('Failed to create new critique, with error code: ' + error.message);
                    this.processing = false;
                }).then(() => {
                    // self.qCritiques();
                    self.checkUserActions();
                    this.closeDialog();
                });
            }
        },
        created() {
            let self = this;
            this.$root.$on('openCritiqueDialog', function () {
                self.$nextTick(() => {
                    self.showCritiqueProjectDialog = true;
                });
            });
        },
        mounted(){
            if (this.project.type.id === '39704d3d-2941-11e6-b8db-86ac961c55b2') {
                this.$http.get('awards', { params: {trailer: true}}).then((result) => {
                    this.awardsList = result.data.Awards;
                });
            } else {
                this.$http.get('awards').then((result) => {
                    this.awardsList = result.data.Awards;
                });
            }
        }
    }
</script>