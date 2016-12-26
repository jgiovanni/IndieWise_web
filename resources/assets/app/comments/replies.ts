import DataService from "../services/dataService.service";
import IRootScopeService = angular.IRootScopeService;
interface IReplies {
    showReplyInput: boolean;
    editCommentMode: boolean;
    targetComment: Object;
    parent: Object;
    reply: Object;
    isLoggedIn: any;
    toggleReplyInput: () => void;
}

export class RepliesController implements IReplies {
    showReplyInput: boolean;
    editCommentMode: boolean;
    targetComment: Object;
    parent: Object;
    reply: Object;
    isLoggedIn: any;

    static $inject = ['$rootScope', 'DataService'];

    constructor(private $rootScope: IRootScopeService, private DataService: DataService) {
        this.isLoggedIn = this.$rootScope.AppData.User;
    }

    toggleReplyInput() {
        this.showReplyInput = !this.showReplyInput;
        // this.targetComment = this.comment;
    }

    forwardReply(reply: Object) {
        this.onReply(reply);
        this.toggleReplyInput();
    }
}

angular.module('IndieWise.directives')
    .component('replies', {
        require: {
            commentCtrl: '^^comment'
        },
        templateUrl: 'comments/replies.html',
        controller: RepliesController,
        bindings: {reply: '<', targetComment: '<', parent: '<', onReply: '&'}
    });