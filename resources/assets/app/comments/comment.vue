<template>
    <md-card>
        <md-layout md-column>
            <md-layout>
                <md-layout md-flex-offset="5" md-flex="20" md-flex-large="10">
                    <md-avatar class="">
                        <img :src="comment.author.avatar || '/assets/img/avatar-1.png'" alt="comment">
                    </md-avatar>
                </md-layout>
                <md-layout md-flex="75" md-flex-large="85" md-column>
                    <div class="comment-title">
                        <a class="md-subheading" :href="'user/' + comment.author.url_id">
                            {{comment.author.fullName}}</a>

                        <span class="time float-right">
                        <i class="fa fa-clock-o"></i>
                        <abbr :title="comment.created_at|vmUtc|vmLocal|vmDateFormat('lll')">
                            {{ comment.created_at|vmTimeAgo }}
                        </abbr>
                    </span>
                    </div>
                    <div class="comment-text">
                        <p v-text="comment.body"></p>
                    </div>
                    <div class="comment-btns">
                    <span>
                        <!--<a href="#"><i class="fa fa-thumbs-o-up"></i></a> |-->
                        <!--<a href="#"><i class="fa fa-thumbs-o-down"></i></a> |-->
                        {{comment.replies_count||0}}&nbsp;<i class="fa fa-comments"></i>
                    </span>
                        <!--<span><a @click="toggleReplyInput(comment)"><i class="fa fa-share"></i>Reply</a></span>-->
                        <span toggle-replies v-if="comment.replies_count" class='reply float-right'>
                        Show replies <i class="fa fa-angle-down"></i>
                    </span>
                    </div>
                </md-layout>
            </md-layout>
            <md-layout md-column>
                <reply :target-comment="comment" :parent="parent" @defaultPostReply="handleReply(reply)"
                       v-if="showReplyInput"></reply>
                <!--sub comments-->
                <replies v-for="reply in comment.replies" :reply="reply" :target-comment="comment" :parent="parent"
                         @defaultPostReply="handleReply(reply)"></replies>
                <!-- end sub comment -->

            </md-layout>
        </md-layout>
    </md-card>
</template>
<style scoped>
    .md-card {
        box-shadow: none;
        border-bottom: 1px solid rgba(0,0,0,0.1);
        border-radius: 0;
    }
</style>
<script type="text/babel">
    import reply from './reply.vue';
    import replies from './replies.vue';
    export default {
        name: 'comment',
        components: {reply, replies},
        props: {
            comment: {
                type: Object,
            },
            disable: {
                type: Boolean,
                defulat: false
            },
            parent: {
                type: Object
            },
            child: {
                type: Boolean
            }
        },
        data(){
            return {
                repliesLoaded: false,
                showReplies: false,
                showReplyInput: false,
                editCommentMode: false,
                editComment: null
            }
        },
        methods: {
            toggleEditCommentMode() {
                this.editCommentMode = !this.editCommentMode;
                this.editComment = this.editCommentMode ? this.comment : undefined;
            },

            toggleReplyInput() {
                this.showReplyInput = !this.showReplyInput;
            },

            deleteComment(event) {
                this.checkAuth().then(function (res) {
                    if (res) {
                        let confirm = this.$modal.confirm()
                            .title('Would you like to delete your comment?')
                            //.content('All of the banks have agreed to <span class="debt-be-gone">forgive</span> you your debts.')
                            //.ariaLabel('Lucky day')
                            .targetEvent(event)
                            .ok('Delete')
                            .cancel('Cancel');
                        this.$modal.show(confirm).then(function () {
                            let p = this.comment.parentComment || undefined;

                            this.$http.delete('comments', this.comment.id).then(function (res) {
                                // Decrement film commentCount
                                this.parent.commentCount--;


                                if (_.isUndefined(p)) {
                                    // normal comment
                                    this.comments = _.reject(this.comments, function (a) {
                                        return a.id === this.comment.id;
                                    });

                                } else {
                                    // reply comment
                                    let z = _.find(this.comments, function (a) {
                                        return a.id === p.id;
                                    });

                                    z.replies = _.reject(z.replies, function (a) {
                                        return a.id === this.comment.id;
                                    });
                                    // Increment film commentCount
                                    // let pcQuery = new Parse.Query("Comment");
                                    // pcQuery.get(p.id).then(function (res) {
                                    //     res.increment('replyCount', -1);
                                    //     res.save();
                                    // });

                                    return this.comment = undefined;
                                }

                                this.$root.$emit('toastMessage', 'Your comment was deleted.');
                            });
                        }, function () {
                            //$this.status = 'You decided to keep your debt.';
                        });
                    }
                })
            },

            loadReplies() {
                let toggleElement = jQuery(this.$el).find('.reply-toggle');
                toggleElement.parent().nextAll().slideToggle();
                if (toggleElement.hasClass('hide-reply')) {
                    toggleElement.removeClass('hide-reply');
                    toggleElement.html('Show replies <i class="fa fa-angle-down"></i>');
                } else {
                    toggleElement.addClass('hide-reply');
                    toggleElement.html('Hide replies <i class="fa fa-angle-up"></i>');
                }

                // Fetch Replies
                if (this.comment.replies.length < this.comment.replies_count) {
                    this.$http.get('comments', {params: {comment: this.comment.id}})
                        .then((replies) => {
                            this.comment.replies = replies.data.data;
                            this.showReplies = !this.showReplies;
                        }, (error) => {
                            console.log(error);
                        });
                } else {
                    this.showReplies = !this.showReplies;
                }
            },

            handleReply(reply) {
                debugger;
                this.comment.replies.push(reply);
                // Adjust counters
                this.comment.replies_count++;
                this.$parent.critique.comments_count++;

                this.toggleReplyInput();
                // refresh parent data

                this.$root.$emit('toastMessage', 'Reply posted!');
            }
        },
        mounted(){
            this.comment.replies = this.comment.replies || [];
        }
    }
</script>