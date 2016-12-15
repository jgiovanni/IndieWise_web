import DataService from "../services/dataService.service";
interface IReply {
    targetComment: any;
    parent: any;
    postReply: any;
}

export class ReplyController implements IReply {
    targetComment: any;
    parent: any;
    postReply: any;

    static $inject = ['$rootScope', 'UserActions', 'DataService', '_'];

    constructor(private $rootScope: ng.IRootScopeService, private UserActions: any, private DataService: DataService, private _: any) {
        this.postReply = _.throttle(this._postReply.bind(this), 1000);
    }

    _postReply() {
        if (!this.$rootScope.isAuthenticated()) {
            this.UserActions.loginModal();
            return false;
        }

        if (this.$rootScope.isNotVerified()) {
            this.$rootScope.toastAction('Please verify your account so you can rate videos! Check your spam folder too.', 'Verify Now', this.$rootScope.requestVerificationEmail);
            return false;
        }

        let repliedTo = angular.isString(this.targetComment.comment_id) ? this.targetComment.comment_id : this.targetComment;
        if (angular.isString(repliedTo)) {
            repliedTo = this._.findWhere(this.comments.data, {id: this.targetComment.comment_id})
        }
        this.DataService.save('comments', {
            body: this.myReply,
            critique_id: this.parent.id,
            comment_id: repliedTo.id,
            user_id: this.model.isLoggedIn.id
        }).then(function (comment) {

            if (!!repliedTo.repliesLoaded) {
                let repliesLoaded = true;
                let oldReplies = repliedTo.replies || [];
            }
            if (!repliedTo.replies) {
                repliedTo.replies = [];
            }

            repliedTo.replies.push(comment.data.data);
            repliedTo.replies_count++;
            this.toggleReplyInput();
            // refresh parent data
            this.parent.comments_count++;
            if (this.parent.hasOwnProperty('unlist')) {
                DataService.item('projects', this.parent.id).then(function (a) {
                    angular.extend(this.parent, a.data.data);
                    /*if (this.targetComment.repliesLoaded) {
                        repliedTo.repliesLoaded = true;
                        oldReplies.push(comment.data.data);
                        repliedTo.replies = oldReplies;
                    }*/
                });
            } else {
                DataService.item('critiques', this.parent.id).then(function (a) {
                    angular.extend(this.parent, a.data.data);
                    /*if (this.targetComment.repliesLoaded) {
                        repliedTo.repliesLoaded = true;
                        oldReplies.push(comment.data.data);
                        repliedTo.replies = oldReplies;
                    }*/
                });
            }
            this.$rootScope.toastMessage('Reply posted!');
            this.myReply = null;

        }, function (error) {
            console.log('Failed to create new reply, with error code: ' + error.message);
        });
    }
}

angular.module('IndieWise.directives')
    .component('reply', {
        templateUrl: 'comments/reply.html',
        controller: ReplyController,
        bindings: {targetComment: '=', parent: '<'}
    })