import {UserReactionsController} from "../user/user-reactions";
export class ProfileReactionsController extends UserReactionsController {}

angular.module('IndieWise.profile')
    .component('profileReactions', {
        require: {
            ProfileCtrl: '^^profile'
        },
        templateUrl: 'profile/profile-reactions.html',
        controller: ProfileReactionsController,
        controllerAs: 'ProfileReactionsCtrl',
        bindings: {user: '<', userStats: '<', reactions: '<', reacted: '<'}
    });