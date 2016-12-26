import {UserCritiquesController} from "../user/user-critiques";
export class ProfileCritiquesController extends UserCritiquesController {}

angular.module('IndieWise.profile')
    .component('profileCritiques', {
        require: {
            ProfileCtrl: '^^profile'
        },
        templateUrl: 'user/profile-critiques.html',
        controller: ProfileCritiquesController,
        controllerAs: 'ProfileCritiquesCtrl',
        bindings: {user: '<', userStats: '<', critiques: '<', critiqued: '<'}
    });