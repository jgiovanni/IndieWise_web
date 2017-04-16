import {IUser} from "./user";
import {IRootScopeService} from "angular";
export class UserAboutController implements IUser {
    user: Object;
    userStats: Object;

    static $inject = ['$rootScope'];

    constructor(private $rootScope: IRootScopeService) {
        let self = this;
    }
}

angular.module('IndieWise.user')
    .component('userAbout', {
        require: {
            UserCtrl: '^^user'
        },
        templateUrl: 'user/user-about.html',
        controller: UserAboutController,
        controllerAs: 'UserAboutCtrl',
        bindings: {user: '<', userStats: '<'}
    });