<template>
    <md-card>
        <md-card-area md-inset>
            <md-card-header>
                <md-avatar class="md-larg" md-flex="20" md-flex-large="10">
                    <img :src="critique.user.avatar||'/assets/img/avatar-1.png'" :alt="critique.user.fullName">
                </md-avatar>

                <div class="md-title">
                    <a :href="'/user/' + critique.user.url_id">{{ critique.user.fullName }}</a>
                </div>
                <div class="md-subhead" :title="critique.created_at|vmUtc|vmLocal|vmDateFormat('lll')">
                    <i class="fa fa-clock-o"></i>&nbsp;{{ critique.created_at|vmTimeAgo }}
                </div>
            </md-card-header>

            <md-card-content>
                <md-layout>
                    <md-layout md-flex="60" md-flex-medium="60">
                        <p v-text="critique.body"></p>
                    </md-layout>
                    <md-layout md-flex="40" md-flex-medium="40">
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
                        <template v-if="!isPrivate() || isOwnerOrAuthor()">
                            <template v-if="expanded">
                                <div v-once class="row columns" v-if="critique.type === 'video'">
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
                                <div v-once class="row columns" v-if="critique.type === 'script'">
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
                            </template>
                            <template v-else>
                                <div class="row columns">
                                    <div class="row columns text-center" style="border-bottom: 1px solid #ddd;">
                                        <md-button class="" @click.native="toggleSize()">
                                            <md-icon>poll</md-icon>
                                            Show Scores
                                        </md-button>
                                    </div>
                                    <div class="row columns" v-once>
                                        <div class="columns medium-8 small-9 text-right">
                                            <span class="md-body-1">Overall Rating</span>
                                        </div>
                                        <div class="columns medium-4 small-3">
                                            <span class="md-body-2">{{critique.overall.toFixed(1)}}</span>
                                        </div>
                                    </div>
                                </div>
                            </template>

                        </template>
                    </md-layout>
                </md-layout>
            </md-card-content>
        </md-card-area>

        <md-card-expand :class="{'md-active': critique.comments && critique.comments.data.length > 0}">
            <md-card-actions>
                <md-button class="md-dense" @click.native="showQuickReply =! showQuickReply">
                    <md-icon>reply</md-icon> Reply critique
                </md-button>
                <md-button class="md-dense" @click.native="view($event)">
                    <md-icon>remove_red_eye</md-icon> View
                </md-button>
                <md-button class="md-dense" :href="'/'+parentUrlId + '/critique/' + critique.url_id">
                    <md-icon>link</md-icon> Permalink
                </md-button>
                <md-button class="md-icon-button has-tip" v-if="isPrivate()" style="margin-right: 0">
                    <md-icon>lock</md-icon>
                    <md-tooltip md-direction="top">Private</md-tooltip>
                </md-button>
                <md-button class="md-dense" v-if="$root.user && critique.user_id === $root.user.id"
                   :href="'/'+parentUrlId + '/critique/' + critique.url_id + '/edit'">
                    <md-icon>mode_edit</md-icon> Edit
                </md-button>
                <span style="flex: 1"></span>
                <template v-if="critique.comments">
                    <md-button class="" md-expand-trigger>
                        <md-icon>keyboard_arrow_down</md-icon>
                        {{critique.comments_count||0}} comments
                    </md-button>
                </template>
            </md-card-actions>

            <template v-if="critique.comments">
                <md-card-content v-show="critique.comments.data.length > 0">
                    <comment v-for="comment in critique.comments.data" :comment="comment" :parent="critique" :child="true"></comment>
                </md-card-content>
            </template>
        </md-card-expand>

        <md-card-content v-show="showQuickReply">
            <!--<div class="media-object stack-for-small reply-comment">-->
                <reply @default-post-reply="toggleReplyInput" :parent="critique"></reply>
            <!--</div>-->
        </md-card-content>

    </md-card>
</template>
<style scoped>
    .md-card {
        box-shadow: none;
    }
</style>
<script type="text/babel">
    import comment from '../comments/comment.vue';
    import reply from '../comments/reply.vue';
    export default {
        name: 'critique-item',
        components: {comment, reply},
        props: {
            critique: {
                type: Object
            },
            parentUrlId: {
                type: String
            },
            parentOwnerId: {
                type: String
            },
        },
        data(){
            return {
                showQuickReply: Foundation.MediaQuery.atLeast('large') || false,
                showReplyInput: false,
                expanded: false
            }
        },
        methods: {
            isPrivate() {
                return this.critique && this.critique.private;
            },

            isOwnerOrAuthor() {
                return this.$root.user && ((this.critique && this.$root.user.id === this.critique.user_id) || this.$root.user.id === this.parentOwnerId);
            },
            toggleSize(){
                this.expanded = !this.expanded;
            },

            view($event) {
                this.$root.$emit('openCritiqueView', this.critique);
            },
            toggleReplyInput($e){
                this.showReplyInput = !this.showReplyInput;
            },

            deleteCritique($event) {
                let self = this;
                this.UserActions.checkAuth().then(function (res) {
                    if (res) {
                        let confirm = this.$mdDialog.confirm()
                            .title('Delete Critique')
                            .textContent('Are you sure you want to delete your critique?')
                            .ariaLabel('Delete Critique')
                            .targetEvent($event)
                            .ok('Yes')
                            .cancel('No');

                        this.$mdDialog.show(confirm).then(function () {
                            if (this.isOwnerOrAuthor) {
                                this.$http.delete('critique', this.critique.id).then(function () {
                                    this.$root.$emit('toastMessage', 'Your critique was deleted.');
                                    // Decrement film critiques_count
                                    this.film.critiques_count--;
                                    this.checkUserActions();
                                    this.critiques = _.reject(this.critiques, function (a) {
                                        return a.id === self.critique.id;
                                    });
                                });
                            }
                        }, function (error) {
                            console.log(error);
                        });
                    }
                })
            },
        },
        mounted(){
            this.critique.replies = [];
            this.critique.showReplies = false;
        }
    }
</script>