import {IRootScopeService, ITimeoutService} from "angular";
import {IStateService} from "angular-ui-router";
import {IAuthService} from "../app/services/authService.service";
import {IDataService} from "../app/services/dataService.service";

export class RegisterController {
    creating: boolean = false;
    accountCreated: boolean = false;
    genresArr: Array<Object> = [];
    typesArr: Array<Object> = [];
    user: Object = {
        email: '',
        password: '',
        passwordCheck: '',
        firstName: '',
        lastName: '',
        gender: '',
    };
    thisYear: any = moment().year();
    yearsList: Array<any> = [];
    dobDay: any = '';
    dobMonth: any = '';
    dobYear: any = '';
    authErrors: any = null;
    errors: Object = {
        email: false,
        gender: false,
        genres: false,
        types: false
    };

    static $inject = ['$rootScope', '$timeout', '$q', '$state', 'AuthService', 'DataService', 'anchorSmoothScroll', '_'];

    constructor(private $rootScope: IRootScopeService, private $timeout: ITimeoutService, private $q: IQService, private $state: IStateService, private AuthService: IAuthService, private DataService: IDataService, private anchorSmoothScroll: any, private _: any) {
        let self = this;
    }

    $onInit = function () {
        let self = this;

        for (let i = this.thisYear; i > (this.thisYear - 100); i--) {
            this.yearsList.push(i);
        }

        this.$rootScope.metadata.title = 'Register';
        this.$rootScope.generateCountries().then(res => self.$rootScope.countryList = self.countryList = res);

        this.$timeout(function () {
            jQuery(document).foundation();
            self.$timeout(function () {
                jQuery(document).foundation();
            }, 500);
        }, 500);
    };

    checkEmailUse() {
        if (angular.isString(this.user.email) && this.user.email.length) {
            this.DataService.collection('emailCheck', {email: mysql_real_escape_string(this.user.email)})
                .then((res) => {
                    this.errors.email = res.data && res.data.verify === true ? 1 : 0;
                }, (error) => console.log(error));
        } else this.errors.email = false;
    }

    doRegister() {
        if (!this.creating) {
            this.creating = true;
            this.errors.gender = !this.user.gender.length;

            if (this.errors.gender) {
                this.anchorSmoothScroll.scrollTo('errors');
                return false;
            }

            this.user.dob = moment().set({
                'year': this.dobYear,
                'month': parseInt(this.dobMonth) - 1,
                'date': this.dobDay
            }).startOf('day').format('YYYY-MM-DD HH:mm:ss');
            this.AuthService.createUser(this.user).then(function (res) {
                if (!res.status) {
                    this.authErrors = res.errors;
                    this.$rootScope.toastMessage('There is an error, please check your form');
                    // console.log('Failed', res);
                } else {
                    // console.log('Success', res);
                    //window.location.reload();
                    this.$rootScope.toastMessage('Account created!');
                }
                // window.location.reload();
                this.creating = false;
            }.bind(this));
        } else {
            this.$rootScope.toastMessage('Please wait...');
        }
    }

    authenticate(provider: string) {
        this.authErrors = null;
        this.AuthService.socialLogin(provider, true).then(function (a) {
            if (a) {
                this.$state.go('profile.about', {reload: true});
                // console.log(a);
            }
        }.bind(this));
    }
}

angular.module('IndieWise.auth', [])
// .controller('HomeCtrl', HomeController)
    .component('register', {
        templateUrl: 'auth/register.html',
        controller: RegisterController,
        controllerAs: 'RC',
        bindings: {}
    });