<template>
    <md-card>
        <md-card-area>
            <md-card-header>
                <md-avatar class="md-lrge">
                    <img :src="comment.author.avatar || '/assets/img/avatar-1.png'" alt="comment">
                </md-avatar>
                <div class="md-title"><a :href="'user/' + comment.author.url_id">{{comment.author.fullName}}</a></div>
                <div class="md-subhead">
                    <i class="fa fa-clock-o"></i>
                    <abbr :title="comment.created_at|vmUtc|vmLocal|vmDateFormat('lll')">
                        {{ comment.created_at|vmTimeAgo }}
                    </abbr>
                    &nbsp;&middot;&nbsp;
                    <a class="md-dense" @click.prevent="toggleReplyInput">Reply</a>
                    <template v-if="comment.replies_count">
                        &nbsp;&middot;&nbsp;
                        <a @click.prevent="toggleShowReplies" class=''>
                            <span v-if="!showReplies">Show {{comment.replies_count||0}} replies <i
                                    class="fa fa-angle-down"></i></span>
                            <span v-else>Hide {{comment.replies_count||0}} replies <i class="fa fa-angle-up"></i></span>
                        </a>
                    </template>
                </div>
            </md-card-header>

            <md-card-content>
                {{ comment.body }}
            </md-card-content>

            <md-card-content v-if="showReplies">
                <replies v-for="reply in comment.replies" :reply="reply" :target-comment="comment" :parent="parent"
                         @default-post-reply="handleReply(reply)"></replies>
            </md-card-content>
        </md-card-area>

        <md-card-content v-if="showReplyInput">
            <reply :target-comment="comment" :parent="parent" @default-post-reply="handleReply(reply)"></reply>
        </md-card-content>
    </md-card>
</template>
<style scoped>
    .md-card {
        box-shadow: none;
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        border-radius: 0;
    }

    .replies-list {
        width: 100%;
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

            toggleShowReplies() {
                this.showReplies = !this.showReplies;
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
                            this.comment.replies = replies.body.data;
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