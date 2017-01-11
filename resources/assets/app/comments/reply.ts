import {IDataService} from "../services/dataService.service";
import {IUserActionsService} from "../services/userActions.service";
interface IReply {
    targetComment: Object | null;
    isLoggedIn: Object | null;
    parent: Object
    myReply: string;
    postReply: any;
    _postReply: () => void;
}

export class ReplyController implements IReply {
    targetComment: Object | null;
    isLoggedIn: Object | null;
    parent: Object;
    myReply: string;
    postReply: any;

    static $inject = ['$rootScope', 'UserActions', 'DataService', '_'];

    constructor(private $rootScope: ng.IRootScopeService, private UserActions: IUserActionsService, private DataService: IDataService, private _: any) {
        this.postReply = this._.throttle(this._postReply.bind(this), 5000);
    }

    $onInit = function () {
        this.isLoggedIn = this.$rootScope.AppData.User;
        // debugger;
    };

    _postReply() {
        let self = this;
        if (!this.$rootScope.isAuthenticated()) {
            this.UserActions.loginModal();
            return false;
        }

        if (this.$rootScope.isNotVerified()) {
            this.$rootScope.toastAction('Please verify your account so comment! Check your spam folder too.', 'Verify Now', this.$rootScope.requestVerificationEmail);
            return false;
        }

        this.DataService.save('comments', {
            body: this.myReply,
            critique_id: this.parent.id,
            comment_id: this.targetComment.id,
            user_id: this.isLoggedIn.id
        }).then(function (comment) {
            self.onReply({ reply: comment.data.data });
            self.myReply = null;
        }, function (error) {
            console.log('Failed to create new reply, with error code: ' + error.message);
        });
    }
}

angular.module('IndieWise.directives')
    .component('reply', {
        templateUrl: 'comments/reply.html',
        controller: ReplyController,
        bindings: {targetComment: '<', parent: '<', onReply: '&'}
    });