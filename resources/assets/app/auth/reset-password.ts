import {IRootScopeService} from "angular";
import {IStateService} from "angular-ui-router";
import {IAuthService} from "../services/authService.service";
export class ForgotPasswordController {
    email: string;
    reseting: Object = {
        newPassword: null,
        newPasswordCheck: null
    };
    hasToken: any = this.$rootScope.$stateParams.token || false;
    static $inject = ['$rootScope', '$state', 'AuthService'];

    constructor(private $rootScope: IRootScopeService, private $state: IStateService, private AuthService: IAuthService) {
        this.$rootScope.metadata.title = 'Password Recovery';

        let self = this;

        if (self.hasToken) {

        }
    }

    doPasswordResetRequest() {
        let self = this;
        self.AuthService.requestPasswordReset(self.email)
            .then(function (res) {
                // console.log(res);
                self.$rootScope.toastMessage('Check your inbox for our email! Should be there soon.');
                self.$state.go('sign_in');
            }, error => self.$rootScope.toastMessage('Error: ' + error.message));
    }

    confirmReset() {
        let self = this;
        if (self.reseting.newPassword === self.reseting.newPasswordCheck && angular.isString(self.hasToken)) {
            self.AuthService.passwordReset(self.$rootScope.$stateParams.email, self.reseting.newPassword, self.reseting.newPasswordCheck, self.hasToken)
                .then(res => self.$rootScope.toastMessage('Password Reset Successfully'),
                    error => self.$rootScope.toastMessage('Error: ' + error.message));
        } else return false;
    }
}

angular.module('IndieWise.auth')
    .component('resetPassword', {
        templateUrl: 'auth/reset-password.html',
        controller: ForgotPasswordController,
        controllerAs: 'FPC',
        bindings: {}
    });