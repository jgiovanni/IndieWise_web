import {IUser} from "./user";
import {IRootScopeService} from "angular";
export class UserReactionsController implements IUser{
    user: Object;
    userStats: Object;
    reactions: Array<Object> = [];
    reacted: Array<Object> = [];
    static $inject = ['$rootScope', '_'];
    constructor(private $rootScope: IRootScopeService, private _: any) {
        let self = this;
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