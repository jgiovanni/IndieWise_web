import DataService from "../services/dataService.service";
import {IDialogService} from "angular";
interface IComment {
    showReplyInput: boolean;
    editCommentMode: boolean;
    comment: Object | null;
    editComment: Object | undefined;
    targetComment: Object | null;
    toggleEditCommentMode: (comment: Object) => void;
    toggleReplyInput: (comment: Object) => void;
}

export class CommentController implements IComment {
    showReplyInput: boolean = false;
    editCommentMode: boolean = false;
    comment: Object | null;
    editComment: Object | undefined = undefined;
    targetComment: Object | null;

    static $inject = ['$rootScope', 'DataService', 'UserActions', '$modal', '_'];
    constructor(private $rootScope: ng.IRootScopeService, private DataService: DataService, private UserActions: any, private $modal: IDialogService, private _: any) {
        //this.postComment = this._.throttle(this.postComment.bind(this), 1000);
    }

    $onInit = function () {
        // console.log(this.comment);
        this.comment.replies=[];
        this.comment.showReplies=false;
    };

    toggleEditCommentMode(comment) {
        this.editCommentMode = !this.editCommentMode;
        this.editComment = this.editCommentMode ? comment : undefined;
    }

    toggleReplyInput(comment) {
        this.showReplyInput = !this.showReplyInput;
        this.targetComment = comment;
    }

    deleteComment(c, ev) {
        this.UserActions.checkAuth().then(function (res) {
            if (res) {
                let confirm = this.$modal.confirm()
                    .title('Would you like to delete your comment?')
                    //.content('All of the banks have agreed to <span class="debt-be-gone">forgive</span> you your debts.')
                    //.ariaLabel('Lucky day')
                    .targetEvent(ev)
                    .ok('Delete')
                    .cancel('Cancel');
                this.$modal.show(confirm).then(function () {
                    let p = c.parentComment || undefined;

                    this.DataService.delete('comments', c.id).then(function (res) {
                        // Decrement film commentCount
                        this.parent.commentCount--;


                        if (angular.isUndefined(p)) {
                            // normal comment
                            this.comments = this._.reject(this.comments, function (a) {
                                return a.id === c.id;
                            });

                        } else {
                            // reply comment
                            let z = this._.find(this.comments, function (a) {
                                return a.id === p.id;
                            });

                            z.replies = this._.reject(z.replies, function (a) {
                                return a.id === c.id;
                            });
                            // Increment film commentCount
                            // let pcQuery = new Parse.Query("Comment");
                            // pcQuery.get(p.id).then(function (res) {
                            //     res.increment('replyCount', -1);
                            //     res.save();
                            // });

                            return c = undefined;
                        }

                        this.$rootScope.toastMessage('Your comment was deleted.');
                    });
                }, function () {
                    //$this.status = 'You decided to keep your debt.';
                });
            }
        })
    }

    loadReplies(comment) {
        // Fetch Replies
        if (!comment.repliesLoaded) {
            this.DataService.collection('comments', {comment: comment.id}).then(function (replies) {
                comment.replies = replies.data.data;
                comment.repliesLoaded = true;
                comment.showReplies = !comment.showReplies;
                return comment;
            });
        } else {
            comment.showReplies = !comment.showReplies;
            return comment;
        }
    }


}

angular.module('IndieWise.directives')
/*IndieWise*/.component('comment', {
    templateUrl: 'comments/comment.html',
    controller: CommentController,
    bindings: {comment: '=', disable: '<', parent: '<', child: '<'}
});