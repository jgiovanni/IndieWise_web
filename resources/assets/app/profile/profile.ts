import {IRootScopeService} from "angular";
import {IAuthService} from "../services/authService.service";
import {IUser} from "../user/user";
export interface IProfile extends IUser{

}
export class ProfileController implements IProfile{
    user: Object;
    userStats: Object;
    static $inject = ['$rootScope', 'filepickerService', 'AuthService', 'Upload', '_'];
    constructor(private $rootScope: IRootScopeService, private filepickerService: any, private AuthService: IAuthService, private Upload: any, private _: any) {

    }

    getEmoticonByEmotion (emotion: string) {
        let reactions = this.$rootScope.generateReactions();
        return this._.findWhere(reactions, {emotion: emotion});
    }

    generatePublicId (type: string) {
        return this.user.url_id + '_' + type + '_' + moment().valueOf();
    }

    pickBanner(){
        let self = this;
        this.filepickerService.pick({
                cropRatio: 32/7,
                mimetype: 'image/*',
                services: ['CONVERT', 'COMPUTER', 'FACEBOOK', 'GOOGLE_DRIVE', 'WEBCAM', 'INSTAGRAM'],
                conversions: ['crop', 'rotate', 'filter'],
                customSourcePath: self.user.url_id + '/banners/'
            },
            function (Blob: Object){
                self.user.coverPhoto = Blob.url + '?cache=true';
                self.AuthService.updateUser(self.user).then(function (res) {
                    self.$rootScope.toastMessage('Cover Photo Updated!');
                }, (error) => console.log(error));
            }
        );
    }

    pickAvatar(){
        let self = this;
        this.filepickerService.pick({
                cropRatio: 1/1,
                mimetype: 'image/*',
                services: ['CONVERT', 'COMPUTER', 'FACEBOOK', 'GOOGLE_DRIVE', 'WEBCAM', 'INSTAGRAM'],
                conversions: ['crop', 'rotate', 'filter'],
                customSourcePath: self.user.url_id + '/avatars/'
            },
            function (Blob: Object){
                self.user.avatar = Blob.url + '?cache=true';
                self.AuthService.updateUser(self.user).then(function (res) {
                    self.$rootScope.toastMessage('Avatar Updated!');
                }, (error) => console.log(error));
            }
        );
    }
}

angular.module('IndieWise.profile', [])
    .component('profile', {
        templateUrl: 'profile/profile.html',
        controller: ProfileController,
        controllerAs: 'Profile',
        bindings: {user: '<', userStats: '<'}
    });
