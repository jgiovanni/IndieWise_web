import {IUser} from "./user";
export class UserAboutController implements IUser {
    user: Object;
    userStats: Object;

    static $inject = [];

    constructor() {
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