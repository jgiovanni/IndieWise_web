import DataService from "../services/dataService.service";
import {IDialogService} from "angular";
interface IComments {
    comments: Object;
    disable: boolean;
    parent: Object;
    child: boolean;
    model: Object;
    sortOrder: string;
}

export class CommentsController implements IComments {
    comments: Object;
    disable: boolean;
    parent: Object;
    child: boolean;
    model: Object = {
        myComment: null,
        isLoggedIn: null
    };
    sortOrder: string = 'created_at|desc';

    static $inject = ['$rootScope', 'DataService', 'UserActions', '$modal', '_'];
    constructor(private $rootScope: ng.IRootScopeService, private DataService: DataService, private UserActions: any, private $modal: IDialogService, private _: any) {
        this.model.isLoggedIn = this.$rootScope.AppData.User;
        this.postComment = this._.throttle(this._postComment.bind(this), 1000);

        // this.$on('reply:complete', function (event, comment) {
        //     this.toggleReplyInput(undefined);
        // });
    }

    $onInit = function () {
        // debugger;
    }

    _postComment() {
        let self = this;
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
                self.comments.data.push(comment.body.data);
                self.$rootScope.toastMessage('Comment posted!');
                self.model.myComment = null;
                self.clearCommentinput();
                self.parent.comments_count++;
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

    reSort(order: string) {
        let parentCtrl = this.critiqueItemCtrl || this.critiqueViewCtrl;
        this.parentCtrl.sortOrder = order;
        // this.params.page = 1;
        // this.loading = true;
        this.parentCtrl.loadComments();
    }

}

angular.module('IndieWise.directives')
/*IndieWise*/.component('comments', {
    require: {
        critiqueItemCtrl: '?^^critique-item',
        critiqueViewCtrl: '?^^critique-view',
    },
    templateUrl: 'comments/comments.html',
    controller: CommentsController,
    bindings: {comments: '<', disable: '<', parent: '<', child: '<'}
});