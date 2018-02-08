<template>
    <md-dialog :md-active.sync="showCritiqueView">
        <template v-if="critique">
            <md-toolbar class="md-transparent" md-elevation="0">
                <md-avatar class="md-icon-button" aria-label="Avatar">
                    <img :src="critique.user.avatar||'/assets/img/avatar-1.png'" :alt="critique.user.fullName" />
                </md-avatar>
                &nbsp;
                <a :href="'user/' + critique.user.url_id + '/about'">{{critique.user.fullName}}</a>
                <span style="flex: 1;"></span>
                <span class="md-subhead" :title="critique.created_at|vmUtc|vmLocal|vmDateFormat('lll')">
                    <i class="fa fa-clock-o"></i>&nbsp;{{ critique.created_at|vmUtc|vmLocal|vmTimeAgo }}
                </span>

                <md-button class="md-icon-button" @click.native="cancel">
                    <md-icon>close</md-icon>
                </md-button>

                    <!-- on
                    <abbr title="{{critique.created_at|amUtc|amLocal|amDateFormat:'lll'}}" class=""
                          v-text="critique.created_at|amUtc|amLocal|amDateFormat:'lll'"></abbr>
                    <span class="grey-text" v-if="critique.edited_at && !Body.isSame(critique.created_at, critique.edited_at)">
                    Edited:
                    <abbr title="{{critique.edited_at|amUtc|amLocal|amDateFormat:'lll'}}" class=""
                          v-text="critique.edited_at|amUtc|amLocal|amDateFormat:'lll'"></abbr>
                    </span>-->
            </md-toolbar>
            <md-dialog-content>
                <div class="md-layout">
                    <div class="md-layout" md-flex="60" md-flex-medium="60">
                        <p v-text="critique.body"></p>
                    </div>
                    <div class="md-layout" md-flex="40" md-flex-medium="40">
                        <div class="row" v-if="isPrivate() && !isOwnerOrAuthor()">
                            <h3 class="text-center">Private</h3>

                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Overall Rating</span>
                                </div>
                                <div class="columns medium-4 small-3">
                                    <span class="md-body-2">{{critique.overall.toFixed(1)}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row columns"
                             v-if="(!isPrivate() || isOwnerOrAuthor()) && critique.type === 'video'">
                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Acting</span>
                                </div>
                                <span class="columns medium-4 small-3">{{critique.performances}}</span>
                            </div>
                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Cinematography</span>
                                </div>
                                <span class="columns medium-4 small-3">{{critique.cinematography}}</span>
                            </div>
                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Direction</span>
                                </div>
                                <span class="columns medium-4 small-3">{{critique.direction}}</span>
                            </div>
                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Editing</span>
                                </div>
                                <span class="columns medium-4 small-3">{{critique.structure}}</span>
                            </div>
                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Music</span>
                                </div>
                                <span class="columns medium-4 small-3">{{critique.music}}</span>
                            </div>
                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Originality</span>
                                </div>
                                <span class="columns medium-4 small-3">{{critique.originality}}</span>
                            </div>
                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Pacing</span>
                                </div>
                                <span class="columns medium-4 small-3">{{critique.pacing}}</span>
                            </div>
                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Production Value</span>
                                </div>
                                <span class="columns medium-4 small-3">{{critique.production}}</span>
                            </div>
                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Sound Quality</span>
                                </div>
                                <span class="columns medium-4 small-3">{{critique.audio}}</span>
                            </div>
                            <div class="row columns" style="border-bottom: 1px solid #ddd;">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Writing</span>
                                </div>
                                <span class="columns medium-4 small-3">{{critique.writing}}</span>
                            </div>
                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Overall Rating</span>
                                </div>
                                <div class="columns medium-4 small-3">
                                    <span class="md-body-2">{{critique.overall.toFixed(1)}}</span>
                                </div>
                            </div>
                        </div>
                        <div class="row columns"
                             v-if="(!isPrivate() || isOwnerOrAuthor()) && critique.type === 'script'">
                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Concept</span>
                                </div>
                                <span class="columns medium-4 small-3">{{critique.concept}}</span>
                            </div>
                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Presentation</span>
                                </div>
                                <span class="columns medium-4 small-3">{{critique.presentation}}</span>
                            </div>
                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Characters</span>
                                </div>
                                <span class="columns medium-4 small-3">{{critique.characters}}</span>
                            </div>
                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Structure</span>
                                </div>
                                <span class="columns medium-4 small-3">{{critique.structure}}</span>
                            </div>
                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Dialogue</span>
                                </div>
                                <span class="columns medium-4 small-3">{{critique.dialogue}}</span>
                            </div>
                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Originality</span>
                                </div>
                                <span class="columns medium-4 small-3">{{critique.originality}}</span>
                            </div>
                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Pacing</span>
                                </div>
                                <span class="columns medium-4 small-3">{{critique.pacing}}</span>
                            </div>
                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Theme</span>
                                </div>
                                <span class="columns medium-4 small-3">{{critique.theme}}</span>
                            </div>
                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Style</span>
                                </div>
                                <span class="columns medium-4 small-3">{{critique.style}}</span>
                            </div>
                            <div class="row columns" style="border-bottom: 1px solid #ddd;">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Plot</span>
                                </div>
                                <span class="columns medium-4 small-3">{{critique.writing}}</span>
                            </div>
                            <div class="row columns">
                                <div class="columns medium-8 small-9 text-right">
                                    <span class="md-body-1">Overall Rating</span>
                                </div>
                                <div class="columns medium-4 small-3">
                                    <span class="md-body-2">{{critique.overall.toFixed(1)}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="md-layout">
                    <md-dialog-actions>
                        <md-button>
                            {{critique.comments_count||0}} comments
                        </md-button>
                        <md-button :href="parentUrlId + '/critique/' + critique.url_id">
                            <md-icon>link</md-icon>
                            Permalink
                        </md-button>
                        <md-button class="md-icon-button has-tip" v-if="isPrivate()" style="margin-right: 0">
                            <md-icon>lock</md-icon>
                            <md-tooltip md-direction="top">Private</md-tooltip>
                        </md-button>
                        <md-button v-if="$root.user && critique.user_id === $root.user.id"
                                   :href="parentUrlId + '/critique/' + critique.url_id + '/edit'">
                            <md-icon>mode_edit</md-icon> Edit
                        </md-button>
                    </md-dialog-actions>
                </div>
                <div class="md-layout">
                    <comments :disable="false" :critique-id="critique.id" :parent="critique" :child="false"></comments>
                    <!--<md-progress-bar v-else md-mode="indeterminate"></md-progress-bar>-->
                </div>
            </md-dialog-content>

            <md-dialog-actions>
                <md-button class="md-primary" @click.native="cancel">close</md-button>
            </md-dialog-actions>
        </template>
    </md-dialog>
</template>
<style scoped></style>
<script type="text/javascript">
    import comments from '../comments/comments.vue';
    export default {
        name: 'critique-view',
        components: {comments},
        props: ['parentUrlId', 'parentOwnerId'],
        data(){
            return {
                showCritiqueView: false,
                showQuickReply: false,
                comments: null,
                sortOrder: 'created_at|desc',
                critique: false
            }
        },
        watch: {
            'critique'(val){
                if (val && val.hasOwnProperty('id'))
                    this.loadComments();
                else this.comments = null
            }
        },
        methods: {
            cancel() {
                this.showCritiqueView = false;
                setTimeout(this.$parent.selectedCritique = null, 200)
            },

            isPrivate () {
                return this.critique && this.critique.private;
            },

            isOwnerOrAuthor() {
                return this.$root.user && ((this.critique && this.$root.user.id === this.critique.user_id) || this.$root.user.id === this.parentOwnerId);
            },

            loadComments() {
                this.$http.get('comments', {params: { include: 'replies', replies: false, critique: this.critique.id, per_page: 50, sort: this.sortOrder}})
                    .then((response) => this.comments = response.data, (error) => console.log(error));
            },
        },
        created(){
            let self = this;
            this.$root.$on('openCritiqueView', (critique) => {
                self.critique = critique;
                self.$nextTick(function () {
                    self.showCritiqueView = true;
                });
            });

            this.$root.$on('reSortComments', function (order) {
                self.sortOrder = order;
                self.loadComments();
            });

        },
        mounted(){}
    }
</script>