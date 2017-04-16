import {UserCritiquesController} from "../user/user-critiques";
export class ProfileCritiquesController extends UserCritiquesController {}

angular.module('IndieWise.profile')
    .component('profileCritiques', {
        require: {
            ProfileCtrl: '^^profile'
        },
        templateUrl: 'profile/profile-critiques.html',
        controller: ProfileCritiquesController,
        controllerAs: 'ProfileCritiquesCtrl',
        bindings: {user: '<', userStats: '<', critiques: '<', critiqued: '<'}
    });