import DataService from "../services/dataService.service";
import {IDialogService} from "angular";
interface IComments {
    comments: Object;
    disable: boolean;
    parent: Object | null;
    child: boolean;
    model: Object;
    sortOrder: string;
}

export class CommentsController implements IComments {
    comments: Object;
    disable: boolean;
    parent: Object | null;
    child: boolean;
    model: Object = {
        myComment: null,
        isLoggedIn: null
    };
    sortOrder: string;

    static $inject = ['$rootScope', 'DataService', 'UserActions', '$modal', '_'];
    constructor(private $rootScope: ng.IRootScopeService, private DataService: DataService, private UserActions: any, private $modal: IDialogService, private _: any) {
        this.model.isLoggedIn = this.$rootScope.AppData.User;
        this.postComment = this._.throttle(this._postComment.bind(this), 1000);

        // this.$on('reply:complete', function (event, comment) {
        //     this.toggleReplyInput(undefined);
        // });
    }

    _postComment() {
        if (!this.$rootScope.isAuthenticated()) {
            this.UserActions.loginModal();
            return false;
        }

        if (this.$rootScope.isNotVerified()) {
            this.$rootScope.toastAction('Please verify your account so you can rate videos! Check your spam folder too.', 'Verify Now', this.$rootScope.requestVerificationEmail.bind(this));
            return false;
        }

        this.DataService.save('comments', {
            body: this.model.myComment,
            critique_id: !this.parent.hasOwnProperty('unlist') ? this.parent.id : undefined,
            user_id: this.model.isLoggedIn.id
        })
            .then(function (comment) {
                this.comments.data.push(comment.data.data);
                this.$rootScope.toastMessage('Comment posted!');
                this.model.myComment = null;
                this.clearCommentinput();
                this.parent.comments_count++;
            }, function (error) {
                console.log('Failed to create new comment, with error code: ' + error.message);
            });
    }

    toggleCommentInput() {
        this.showCommentInput = !this.showCommentInput;
    }

    clearCommentinput() {
        this.model.myComment = null;
    }
}

angular.module('IndieWise.directives')
/*IndieWise*/.component('comments', {
    templateUrl: 'comments/comments.html',
    controller: CommentsController,
    bindings: {comments: '=', disable: '<', parent: '<', child: '<'}
});