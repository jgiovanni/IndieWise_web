// import {IndieWise} from '../../js/app';
import IRootScopeService = angular.IRootScopeService;
import IQService = angular.IQService;
import ITimeoutService = angular.ITimeoutService;
import {IAuthService} from "./authService.service";
import {IDataService} from "./dataService.service";

export interface IUserActionsService {
    checkAuth: () => Object;
    markAsWatched: (video: Object) => any;
    cancelWatched: (promise: any) => void;
    canCritique: (filmId: string) => any;
    canReact: (filmId: string) => any;
    canRate: (filmId: string) => any;
    loginModal: () => void;
    zIndexPlayer: (remove: boolean) => void;
}

export default class UserActionsService implements IUserActionsService {


    static $inject = ['$rootScope', '$q', 'AuthService', 'DataService', 'UtilsService', '$timeout', '$modal', '$mdMedia'];
    constructor(private $rootScope: IRootScopeService, private $q: IQService, private AuthService: IAuthService, private DataService: IDataService, private UtilsService, private $timeout: ITimeoutService, private $modal: any, private $mdMedia: any) {}

    checkAuth () {
        let deferred = this.$q.defer();
        this.AuthService.isAuthenticated() ? deferred.resolve(true) : deferred.reject(false);
        return deferred.promise;
    }
    markAsWatched (video: Object) {

    }
    cancelWatched (promise: any) {
        this.$timeout.cancel(promise);
    }
    canCritique (filmId: string) {
        let deferred = this.$q.defer();
        if (this.AuthService.isAuthenticated()) {
            this.DataService.collection('critiques', {project: filmId, user: this.AuthService.currentUser.id})
                .then(function (res) {
                    res.data.data.length
                        // critique exists already from this user
                        ? deferred.reject(res.data.data[0])
                        // user hasn't critiqued yet
                        : deferred.resolve(true);
                });
        } else {
            deferred.reject(false);
        }
        return deferred.promise;
    }
    canReact (filmId: string) {
        let deferred = this.$q.defer();
        if (this.AuthService.currentUser) {
            this.DataService.collection('reactions', {project: filmId, user: this.AuthService.currentUser.id})
                .then(function (res) {
                    res.data.data.length
                        // critique exists already from this user
                        ? deferred.reject(res.data.data[0])
                        // user hasn't critiqued yet
                        : deferred.resolve(true);
                });
        } else {
            deferred.reject(false);
        }
        return deferred.promise;
    }
    canRate (filmId: string) {
        let deferred = this.$q.defer();
        if (this.AuthService.currentUser) {
            this.DataService.collection('ratings', {project: filmId, user: this.AuthService.currentUser.id})
                .then(function (res) {
                    res.data.ratings.length
                        // critique exists already from this user
                        ? deferred.reject(res.data.ratings[0])
                        // user hasn't critiqued yet
                        : deferred.resolve(true);
                });
        } else {
            deferred.reject(false);
        }
        return deferred.promise;
    }
    loginModal () {
        let self = this;
        if (!this.$rootScope.authModalOpen) {
            let options = {
                controller: SignInModalController,
                // controller: SignInModalCtrl,
                controllerAs: 'SIC',
                templateUrl: 'auth/sign-in-dialog.html',
                size: window.Foundation.MediaQuery.atLeast('medium') ? 'large' : 'full'
            };

            let modalInstance = this.$modal.open(options);
            modalInstance.result.then(function (answer) {
                console.log(answer);
                this.$rootScope.authModalOpen = false;
                // this.zIndexPlayer(true);
            }, function () {
                console.log('You cancelled the dialog.');
                this.$rootScope.authModalOpen = false;
                // this.zIndexPlayer(true);
            });
            this.$rootScope.authModalOpen = true;
        }
    }
    zIndexPlayer(remove: boolean) {
        let vidDiv = jQuery('.flex-video');
        if (vidDiv) {
            !!remove ? vidDiv.css('z-index', '') : vidDiv.css('z-index', 0);
        }
    }
}

angular.module('IndieWise.services')
    .service('UserActions', UserActionsService);

class SignInModalController {
    user: Object = {
        email: '',
        password: ''
    };
    error: string | boolean = '';

    static $inject = ['$rootScope', '$timeout', 'AuthService', '$modalInstance'];
    constructor(private $rootScope: IRootScopeService, private $timeout: ITimeoutService, private AuthService: IAuthService, private $modalInstance: any){
        let self = this;
        
        this.$rootScope.metadata.title = 'Sign In';

        this.$timeout(() => {
            jQuery(document).foundation();
            self.$timeout(() => {
                jQuery(document).foundation();
            }, 500);
        }, 0);
    }

    doLogin () {
        this.error = false;
        this.AuthService.login(this.user.email, this.user.password).then(function (res) {
            console.log('Success', res);
                window.location.reload();
        }, function (res) {
            this.error = res;
            console.log('Failed', res);
        }).then(function () {
            this.ok();
        });
    }

    authenticate (provider: string) {
        this.error = null;
        this.AuthService.socialLogin(provider, true)
            .then(function (a) {
                console.log(a);
                this.ok();
            }, (error) => {
                console.log(error);
            });
    }

    ok () {
        this.$modalInstance.close();
    }

    cancel () {
        this.$modalInstance.dismiss('cancel');
    }

}

SignInModalCtrl.$inject = ['$rootScope', '$timeout', 'AuthService', '$modalInstance'];
function SignInModalCtrl($rootScope, $timeout, AuthService, $modalInstance) {
    // zIndexPlayer();
    $rootScope.metadata.title = 'Sign In';
    let self = this;
    this.user = {
        email: '',
        password: ''
    };

    this.doLogin = function (redirect) {
        let self = this;
        redirect = redirect || true;
        this.error = false;
        AuthService.login(this.user.email, this.user.password).then(function (res) {
            console.log('Success', res);
            self.ok();
            if (redirect) {
                //$state.go('home');
                //window.location.reload();
            }
        }, function (res) {
            self.error = res;
            console.log('Failed', res);
        }).then(function () {
            self.ok();
        });
    };


    this.authenticate = function (provider) {
        this.error = null;
        AuthService.socialLogin(provider, true).then(function (a) {
            console.log(a);
            this.ok();
        });
    };

    this.ok = function () {
        $modalInstance.close();
    };

    this.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $timeout(function () {
        jQuery(document).foundation();
        $timeout(function () {
            jQuery(document).foundation();
        }, 500);
    }, 0);
}
