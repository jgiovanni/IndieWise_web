import {IProfile} from "./profile";
import {IRootScopeService, IWindowService} from "angular";
import {IAuthService} from "../services/authService.service";
import {IDataService} from "../services/dataService.service";
// import moment = require("moment");
export class ProfileSettingsController implements IProfile {
    user: Object;
    userStats: Object;
    genres: Array<Object> = [];
    UserTypes: Array<Object> = [];
    countries: Array<Object> = [];
    genresArr: Array<Object> = [];
    typesArr: Array<Object> = [];
    saveComplete: boolean = false;
    updating: boolean = false;
    verificationEmailSentMessage: boolean = false;
    updateUser: any = this._.throttle(this._updateUser, 1000);
    notificationsActive: any;

    static $inject = ['$rootScope', 'AuthService', 'DataService', 'anchorSmoothScroll', '_', '$window', '$intercom', '$mdDialog'];

    constructor(private $rootScope: IRootScopeService, private AuthService: IAuthService, private DataService: IDataService, private anchorSmoothScroll: any, private _: any, private $window: IWindowService, private $intercom: any, private $mdDialog: any) {
        let self = this;
    }

    $onInit = function () {
        let self = this;
        // this.updateUser = this._.throttle(this._updateUser, 1000);
        let pwSetting = this.$window.localStorage.getItem('pwAllowPushNotifications');
        this.notificationsActive = pwSetting !== 'undefined' && !!JSON.parse(pwSetting);

        this.genresArr = this.user.genres.data; //Genres.data.data;
        this.typesArr = this.user.types;// UserTypes.data.data;

        this.user.dob = moment(this.user.dob).startOf('day').toDate();
        this.user.settings = angular.isObject(this.user.settings) ? this.user.settings : JSON.parse(this.user.settings || '{}');

        this.$rootScope.generateCountries().then(res => self.countries = res);

        this.$rootScope.generateGenres().then(res => self.genresList = res);

        this.$rootScope.generateTypes().then(res => self.typesList = res);

    };

    _updateUser() {
        if (!this.updating) {
            let user = this.user;
            this.updating = true;
            user.genres = this._.pluck(this.genresArr, 'id');
            user.types = this._.pluck(this.typesArr, 'id');
            user.settings = JSON.stringify(user.settings);
            this.AuthService.updateUser(user).then(function (res) {
                // console.log(res);
                res.data.data.dob = moment(res.data.data.dob).toDate();
                res.data.data.settings = JSON.parse(res.data.data.settings);
                this.AuthService.currentUser = self.user = res.data.data;
                res.data.data.name = res.data.data.fullName;
                this.$intercom.update(res.data.data);
                this.saveComplete = true;
                this.updating = false;
                this.anchorSmoothScroll.scrollTo('success');
                this.$rootScope.toastMessage('Profile Updated');
            }.bind(this));
        } else {
            this.$rootScope.toastMessage('Please wait...');
        }
    }

    syncGenres (bool: boolean, item: Object) {
        let self = this;
        if (bool) {
            // add item
            self.genresArr.push(item);
        } else {
            // remove item
            for (let i = 0; i < self.genresArr.length; i++) {
                if (self.genresArr[i].id == item.id) {
                    self.DataService.delete('Genres', self.genresArr[i].id);
                    self.genresArr.splice(i, 1);
                }
            }
        }
    }

    isCheckedGenre (id: string) {
        let self = this;
        let match = false;
        for (let i = 0; i < self.genresArr.length; i++) {
            if (self.genresArr[i].id == id) {
                match = true;
            }
        }
        return match;
    }

    syncTypes (bool: boolean, item: Object) {
        let self = this;
        if (bool) {
            // add item
            self.typesArr.push(item);
        } else {
            // remove item
            for (let i = 0; i < self.typesArr.length; i++) {
                if (self.typesArr[i].id == item.id) {
                    self.DataService.delete('UserTypes', self.typesArr[i].id);
                    self.typesArr.splice(i, 1);
                }
            }
        }
    }

    isCheckedType (id: string) {
        let self = this;
        let match = false;
        for (let i = 0; i < self.typesArr.length; i++) {
            if (self.typesArr[i].id == id) {
                match = true;
            }
        }
        return match;
    }

    toggleNotifications() {
        this.$window.localStorage.setItem('pwAllowPushNotifications', this.notificationsActive);

        if (!!this.notificationsActive) {
            // subscribe device push notifications
            if (this.$window.pwCanUseServiceWorkers() || angular.isDefined(window.safari)) {
                if (this.$window.chrome && this.$window.pushwoosh.isBrowserChrome()) {
                    this.$window.pushwoosh.subscribeAtStart();
                } else {
                    this.$window.pushwooshSubscribe();

                    this.$window.pushwooshSetTags({
                        id: this.user.id,
                        urlId: this.user.url_id,
                        username: this.user.email,
                        firstName: this.user.firstName,
                        lastName: this.user.lastName
                    }.bind(this));
                }

            }
        }
    }

    requestVerificationEmail() {
        let self = this;
        this.AuthService.requestVerification()
            .then(() => self.verificationEmailSentMessage = true);
    }

    confirmTerminate(ev: any) {
        let confirm = this.$mdDialog.confirm()
            .title('Terminate Account')
            .textContent('Are you sure you want to terminate your account?')
            .ariaLabel('Terminate Account')
            .targetEvent(ev)
            .ok('Yes')
            .cancel('No');

        this.$mdDialog.show(confirm)
            .then(function () {
                this.AuthService.deleteUser(this.user)
                    .then(function (res) {
                        if (res.data.status) {
                            this.AuthService.logout().then( res => window.location.reload() );
                        }
                    }.bind(this));
            }.bind(this), function () {

            });
    }
}

angular.module('IndieWise.profile')
    .component('profileSettings', {
        require: {
            ProfileCtrl: '^^profile'
        },
        templateUrl: 'profile/profile-settings.html',
        controller: ProfileSettingsController,
        controllerAs: 'PSC',
        bindings: {user: '<', userStats: '<', genres: '<', userTypes: '<'}
    });