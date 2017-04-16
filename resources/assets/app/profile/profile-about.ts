import {IProfile} from "./profile";
import {UserAboutController} from "../user/user-about";
export class ProfileAboutController extends UserAboutController implements IProfile {}

angular.module('IndieWise.profile')
    .component('profileAbout', {
        require: {
            ProfileCtrl: '^^profile'
        },
        templateUrl: 'profile/profile-about.html',
        controller: ProfileAboutController,
        controllerAs: 'ProfileAboutCtrl',
        bindings: {user: '<', userStats: '<'}
    });
