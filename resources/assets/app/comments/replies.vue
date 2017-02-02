<template>
    <md-layout md-flex-offset="5">
        <md-layout>
            <md-layout md-flex-offset="5" md-flex="20" md-flex-large="10">
                <md-avatar>
                    <img :src="reply.author.avatar || '/assets/img/avatar-1.png'" alt="comment">
                </md-avatar>
            </md-layout>
            <md-layout md-flex="75" md-flex-large="85" md-column>
                <div class="comment-title">
                    <a class="md-subheading" :href="'user/' + reply.author.url_id">{{reply.author.fullName}}</a>
                    <span class="time float-right"><i class="fa fa-clock-o"></i>
                <abbr :title="reply.created_at|vmUtc|vmLocal|vmDateFormat('lll')">{{reply.created_at|vmTimeAgo}}</abbr>
            </span>
                </div>
                <div class="comment-text">
                    <p v-if="!editCommentMode" v-text="reply.body"></p>
                    <!--<edit-comment-block
                            v-if="reply.author.id === $root.user.id && editCommentMode"></edit-comment-block>-->
                </div>
                <div class="comment-btns">
                    <!--<span>
                        <a href="#"><i class="fa fa-thumbs-o-up"></i></a> | <a href="#"><i class="fa fa-thumbs-o-down"></i></a></span>
                    <span>-->
                    <a @click="toggleReplyInput()"><i class="fa fa-share"></i>Reply</a></span>
                </div>
            </md-layout>
        </md-layout>
        <md-layout md-flex-offset="5" md-flex="95">
            <reply :target-comment="targetComment" :parent="parent" @defaultPostReply="forwardReply(reply)" v-if="showReplyInput"></reply>
        </md-layout>
    </md-layout>
</template>
<style scoped></style>
<script type="text/babel">
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