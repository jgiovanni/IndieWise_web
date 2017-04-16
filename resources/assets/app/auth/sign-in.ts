import {IRootScopeService, ITimeoutService, IWindowService} from "angular";
import {IStateService} from "angular-ui-router";
import {IAuthService} from "../services/authService.service";

export class SignInController {
    authErrors: any = null;
    user: Object = {
        email: '',
        password: ''
    };
    static $inject = ['$rootScope', '$timeout', '$q', '$state', 'AuthService', '$window', '$modal', 'cfpLoadingBar'];

    constructor(private $rootScope: IRootScopeService, private $timeout: ITimeoutService, private $q: IQService, private $state: IStateService, private AuthService: IAuthService, private $window: IWindowService, private $modal: any, private cfpLoadingBar: any) {
        this.$rootScope.metadata.title = 'Sign In';
        let self = this;

    }

    $onInit = function () {
        this.$timeout(function () {
            jQuery(document).foundation();
            this.$timeout(function () {
                jQuery(document).foundation();
            }.bind(this), 500);
        }.bind(this), 500);
    };

    doLogin(redirect: boolean) {
        redirect = redirect || true;
        this.authErrors = false;
        this.AuthService.login(this.user.email, this.user.password)
            .then(function (res) {
                if (res.status === false) {
                    this.authErrors = res.errors;
                    return false;
                } else {
                    if (redirect && angular.isDefined(res)) {
                        if (this.$rootScope.$stateParams.redirect) {
                            return this.$window.location.href = this.$rootScope.$stateParams.redirect;
                        }
                        this.$state.go('home');
                    }
                }
                this.cfpLoadingBar.complete();
            }.bind(this), function (res) {
                this.authErrors = res;
            }.bind(this));
    }

    authenticate(provider: string) {
        this.authErrors = null;
        this.AuthService.socialLogin(provider, false).then(function (res) {
            if (res && res.hasOwnProperty('status') && res.status === false) {
                this.authErrors = res.errors;
                this.$rootScope.toastMessage('There is an error, please check your form');
                // console.log('Failed', res);
            } else {
                this.$rootScope.toastMessage('There is an error, please try again');
            }
        }.bind(this));
    }
}


angular.module('IndieWise.auth')
    .component('signIn', {
        templateUrl: 'auth/sign-in.html',
        controller: SignInController,
        controllerAs: 'SIC',
        bindings: {}
    });