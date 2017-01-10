import {IUser} from "./user";
import {IRootScopeService} from "angular";
import {IDataService} from "../services/dataService.service";
export class UserAwardsController implements IUser {
    user: Object;
    userStats: Object;
    awards: Object;
    nominations: Object;
    nominated: Object;

    static $inject = ['$rootScope', 'DataService'];
    constructor(private $rootScope: IRootScopeService, private DataService: IDataService) {
        let self = this;
    }
}

angular.module('IndieWise.user')
    .component('userAwards', {
        require: {
            UserCtrl: '^^user'
        },
        templateUrl: 'user/user-awards.html',
        controller: UserAwardsController,
        controllerAs: 'UserAwardsCtrl',
        bindings: {user: '<', userStats: '<', awards: '<', nominations: '<', nominated: '<'}
    });