import {UserAwardsController} from "../user/user-awards";
export class ProfileAwardsController extends UserAwardsController {}
angular.module('IndieWise.profile')
    .component('profileAwards', {
        require: {
            ProfileCtrl: '^^profile'
        },
        templateUrl: 'profile/profile-videos.html',
        controller: ProfileAwardsController,
        controllerAs: 'ProfileAwardsCtrl',
        bindings: {user: '<', userStats: '<', awards: '<', nominations: '<', nominated: '<'}
    });