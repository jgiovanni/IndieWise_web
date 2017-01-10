import {IUser} from "./user";
import {IRootScopeService} from "angular";
export class UserReactionsController implements IUser{
    user: Object;
    userStats: Object;
    reactions: Object = null;
    reacted: Object = null;
    static $inject = ['$rootScope', '_'];
    constructor(private $rootScope: IRootScopeService, private _: any) {
        let self = this;
    }

    $onInit = function () {

    }

    getEmoticonByEmotion (emotion: string) {
        let reactions = this.$rootScope.generateReactions();
        return this._.findWhere(reactions, {emotion: emotion});
    };
}

angular.module('IndieWise.user')
    .component('userReactions', {
        require: {
            UserCtrl: '^^user'
        },
        templateUrl: 'user/user-reactions.html',
        controller: UserReactionsController,
        controllerAs: 'UserReactionsCtrl',
        bindings: {user: '<', userStats: '<', reactions: '<', reacted: '<'}
    });