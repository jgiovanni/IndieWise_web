import DataService from "../services/dataService.service";
import {IDialogService} from "angular";
interface IComment {
    repliesLoaded: boolean;
    showReplies: boolean;
    showReplyInput: boolean;
    editCommentMode: boolean;
    comment: Object | null;
    parent: Object;
    editComment: Object | undefined;

    toggleEditCommentMode: () => void;
    toggleReplyInput: () => void;
    deleteComment: (event: Object) => void;
    loadReplies: () => void;
}

export class CommentController implements IComment {
    repliesLoaded: boolean = false;
    showReplies: boolean = false;
    showReplyInput: boolean = false;
    editCommentMode: boolean = false;
    comment: Object | null;
    parent: Object;
    editComment: Object | undefined = undefined;

    static $inject = ['$rootScope', '$element', 'DataService', 'UserActions', '$modal', '_'];
    constructor(private $rootScope: ng.IRootScopeService, private $element: any, private DataService: DataService, private UserActions: any, private $modal: IDialogService, private _: any) {
        //this.postComment = this._.throttle(this.postComment.bind(this), 1000);
    }

    $onInit = function () {
        // console.log(this.comment);
        // console.log(this.$element);
        this.comment.replies = this.comment.replies || [];
        // debugger;
    };

    toggleEditCommentMode() {
        this.editCommentMode = !this.editCommentMode;
        this.editComment = this.editCommentMode ? this.comment : undefined;
    }

    toggleReplyInput() {
        this.showReplyInput = !this.showReplyInput;
    }

    deleteComment(event: Object) {
        this.UserActions.checkAuth().then(function (res) {
            if (res) {
                let confirm = this.$modal.confirm()
                    .title('Would you like to delete your comment?')
                    //.content('All of the banks have agreed to <span class="debt-be-gone">forgive</span> you your debts.')
                    //.ariaLabel('Lucky day')
                    .targetEvent(event)
                    .ok('Delete')
                    .cancel('Cancel');
                this.$modal.show(confirm).then(() => {
                    let p = this.comment.parentComment || undefined;

                    this.DataService.delete('comments', this.comment.id).then(function (res) {
                        // Decrement film commentCount
                        this.parent.commentCount--;


                        if (this._.isUndefined(p)) {
                            // normal comment
                            this.comments = this._.reject(this.comments, function (a) {
                                return a.id === this.comment.id;
                            });

                        } else {
                            // reply comment
                            let z = this._.find(this.comments, function (a) {
                                return a.id === p.id;
                            });

                            z.replies = this._.reject(z.replies, function (a) {
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

                        this.$rootScope.toastMessage('Your comment was deleted.');
                    });
                }, function () {
                    //$this.status = 'You decided to keep your debt.';
                });
            }
        })
    }

    loadReplies() {
        let toggleElement = jQuery(this.$element).find('.reply-toggle');
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
            this.DataService.collection('comments', {comment: this.comment.id})
                .then((replies) => {
                    this.comment.replies = replies.body.data;
                    this.showReplies = !this.showReplies;
                }, (error) => {
                    console.log(error);
                });
        } else {
            this.showReplies = !this.showReplies;
        }
    }

    handleReply(reply: Object) {
        debugger;
        this.comment.replies.push(reply);
        // Adjust counters
        this.comment.replies_count++;
        this.parent.comments_count++;

        this.toggleReplyInput();
        // refresh parent data

        this.$rootScope.toastMessage('Reply posted!');
    }


}

angular.module('IndieWise.directives')
/*IndieWise*/.component('comment', {
    templateUrl: 'comments/comment.html',
    controller: CommentController,
    bindings: {comment: '<', disable: '<', parent: '<', child: '<'}
});