<template>
    <section class="content comments" v-if="!child">
        <div class="row secBg">
            <div class="large-12 columns">
                <template v-if="!disable">
                    <div class="main-heading borderBottom">
                        <div class="row padding-14">
                            <div class="medium-12 small-12 columns">
                                <div class="head-title">
                                    <i class="fa fa-comments"></i>
                                    <h4>Comments <span>({{comments.data.length}})</span></h4>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="comment-box thumb-border">
                        <div class="media-object stack-for-small">
                            <div class="media-object-section comment-img text-center">
                                <div class="comment-box-img">
                                    <img :src="$root.user ? $root.user.avatar : '/assets/img/avatar-1.png'" alt="comment">
                                </div>
                                <h6 v-if="$root.user"><a href="'user/' + $root.user.id">{{$root.user.fullName}}</a></h6>
                            </div>
                            <div class="media-object-section comment-textarea">
                                <form name="commentForm" id="commentForm" @submit="postComment()">
                                    <textarea name="commentText" placeholder="Add a comment here.."
                                              v-model="myComment" minlength="1"></textarea>
                                    <input type="submit" name="submit" value="send">
                                </form>
                            </div>
                        </div>
                    </div>

                    <div class="comment-sort text-right">
                        <a :class="{'active':sortOrder === 'created_at|desc'}" @click="reSort('created_at|desc')">newest</a> |
                        <a :class="{'active':sortOrder === 'created_at|asc'}" @click="reSort('created_at|asc')">oldest</a>
                    </div>

                </template>
                <template v-else>
                    <div class="main-heading borderBottom">
                        <div class="row padding-14">
                            <div class="medium-12 small-12 columns">
                                <div class="head-title">
                                    <i class="fa fa-comments"></i>
                                    <h4>Comments disabled by Uploader</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                </template>

                <!-- main comment -->
                <div class="main-comment showmore_one">
                    <comment v-for="comment in comments.data" :comment="comment" :parent="parent"></comment>
                </div>
                <!-- End main comment -->

            </div>

        </div>
    </section>
</template>
<style scoped></style>
<script type="text/babel">
    import comment from './comment.vue';
    export default {
        name: 'comments',
        components: {comment},
        props: {
            comments: {
                type: Object,
            },
            disable: {
                type: Boolean
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
                sortOrder: this.$parent.sortOrder,
                myComment: null
            }
        },
        methods: {
            _postComment() {
                let self = this;
                if (!this.isAuthenticated()) {
                    this.loginModal();
                    return false;
                }

                if (this.isNotVerified()) {
                    this.toastAction('Please verify your account so you can rate videos! Check your spam folder too.', 'Verify Now', this.requestVerificationEmail);
                    return false;
                }

                this.$http.post('comments', {
                    body: this.myComment,
                    critique_id: !this.parent.hasOwnProperty('unlist') ? this.parent.id : undefined,
                    user_id: this.$root.user.id
                })
                    .then(function (comment) {
                        self.comments.data.push(comment.data.data);
                        self.$root.$emit('toastMessage', 'Comment posted!');
                        self.myComment = null;
                        self.clearCommentinput();
                        self.parent.comments_count++;
                    }, function (error) {
                        console.log('Failed to create new comment, with error code: ' + error.message);
                    });
            },

            toggleCommentInput() {
                this.showCommentInput = !this.showCommentInput;
            },

            clearCommentinput() {
                this.myComment = null;
            },

            reSort(order) {
                this.$parent.sortOrder = order;
                // this.params.page = 1;
                // this.loading = true;
                this.$parent.loadComments();
            }
        },
        mounted(){

        }
    }
</script>