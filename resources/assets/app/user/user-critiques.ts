import {IRootScopeService} from "angular";
import {IUser} from "./user";
export class UserCritiquesController implements IUser{
    user: Object;
    userStats: Object;
    critiques: Object = null;
    critiqued: Object = null;

    static $inject = ['$rootScope'];
    constructor(private $rootScope: IRootScopeService) {
        let self = this;
    }
}

angular.module('IndieWise.user')
    .component('userCritiques', {
        require: {
            UserCtrl: '^^user'
        },
        templateUrl: 'user/user-critiques.html',
        controller: UserCritiquesController,
        controllerAs: 'UserCritiquesCtrl',
        bindings: {user: '<', userStats: '<', critiques: '<', critiqued: '<'}
    });