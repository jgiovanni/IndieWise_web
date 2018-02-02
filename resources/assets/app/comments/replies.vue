<template>
    <md-list class="md-double-line md-dense" md-flex-offset="5" style="width: 100%">
        <md-list-item>
            <!--<div class="md-layout" md-flex-offset="5" md-flex="20" md-flex-large="10">-->
                <md-avatar>
                    <img :src="reply.author.avatar || '/assets/img/avatar-1.png'" alt="comment">
                </md-avatar>
            <!--</div>-->
            <!--<div class="md-layout" md-flex="75" md-flex-large="85" md-column>-->
            <div class="md-list-text-container">
                <span>
                    <a class="" :href="'/user/' + reply.author.url_id">{{reply.author.fullName}}</a>
                    <span class="md-caption float-right">
                        <i class="fa fa-clock-o"></i>
                        <abbr :title="reply.created_at|vmUtc|vmLocal|vmDateFormat('lll')">
                            {{reply.created_at|vmTimeAgo}}
                        </abbr>
                    </span>
                </span>

                <span v-if="!editCommentMode" v-text="reply.body"></span>
            </div>

            <md-button class="md-icon-button md-list-action" @click.native="toggleReplyInput()">
                <template v-if="!showReplyInput"><md-icon>reply</md-icon></template>
                <template v-else><md-icon>close</md-icon></template>
            </md-button>
        </md-list-item>
        <md-list-item md-flex-offset="5" md-flex="95" v-if="showReplyInput">
            <reply :target-comment="targetComment" :parent="parent" @default-post-reply="forwardReply(reply)"></reply>
        </md-list-item>
    </md-list>
</template>
<style scoped>
</style>
<script type="text/javascript">
    import reply from './reply.vue';
    export default {
        name: 'replies',
        components: {reply},
        props: {
            reply: { type: Object },
            targetComment: { type: Object },
            parent: { type: Object },
        },

        data(){
            return {
                showReplyInput: false,
                editCommentMode: false,
                editComment: null,
            }
        },
        methods: {
            toggleReplyInput() {
                this.showReplyInput = !this.showReplyInput;
                // this.targetComment = this.comment;
            },

            forwardReply(reply) {
                this.toggleReplyInput();
            }
        },
        mounted(){

        }
    }
</script>