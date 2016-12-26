import {UserVideosController} from "../user/user-videos";
export class ProfileVideosController extends UserVideosController {}

angular.module('IndieWise.profile')
    .component('profileVideos', {
        require: {
            ProfileCtrl: '^^profile'
        },
        templateUrl: 'profile/profile-videos.html',
        controller: ProfileVideosController,
        controllerAs: 'ProfileVideosCtrl',
        bindings: {user: '<', userStats: '<', projects: '<'}
    });