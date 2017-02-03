<template>
    <md-layout>
        <md-layout md-flex="20" md-flex-large="10">
            <md-list>
                <md-list-item :href="$root.user ? 'user/' + $root.user.id + '/about' : '#'">
                    <md-avatar md-flex="20" md-flex-large="10">
                        <img v-if="$root.user" :src="$root.user.avatar || '/assets/img/avatar-1.png'" alt="comment">
                        <img v-else src="/assets/img/avatar-1.png" alt="comment">
                    </md-avatar>
                </md-list-item>
            </md-list>
        </md-layout>
        <md-layout md-flex="80" md-flex-large="90" md-column>
            <form novalidate @submit.stop.prevent="postReply()" style="flex: 1">
                <md-input-container md-inline>
                    <md-textarea name="commentText" :placeholder="'Reply to ' + author"
                                 v-model="myReply" minlength="1"></md-textarea>
                    <md-button type="submit">Send</md-button>
                </md-input-container>
            </form>
        </md-layout>
    </md-layout>
</template>
<style scoped></style>
<script type="text/babel">
    export default {
        name: 'reply',
        props: {
            targetComment: {
                type: Object
            },
            parent: {
                type: Object,
                required: true
            }
        },
        data(){
            return {
                myReply: '',
                postReply: _.throttle(this.defaultPostReply, 5000),
            }
        },
        computed: {
            author(){
                return this.targetComment ? this.targetComment.author.firstName : this.parent.user.fullName;
            }
        },
        methods: {
            defaultPostReply() {
                let self = this;
                if (!this.isAuthenticated) {
                    this.loginModal();
                    return false;
                }

                if (this.isNotVerified) {
                    this.$root.$emit('toastAction', 'Please verify your account so comment! Check your spam folder too.', 'Verify Now', this.requestVerificationEmail);
                    return false;
                }

                this.$http.post('comments', {
                    body: this.myReply,
                    critique_id: this.parent.id,
                    comment_id: this.targetComment ? this.targetComment.id : null,
                    user_id: this.$root.user.id
                }).then(function (comment) {
                    // self.onReply({ reply: comment.data.data });
                    self.myReply = null;
                }, function (error) {
                    console.log('Failed to create new reply, with error code: ' + error.message);
                });
            }
        },
        mounted(){

        }
    }
</script>