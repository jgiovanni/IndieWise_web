import DataService from "./dataService.service";
let moment = window.momentTimeZone;
export interface IAuthService {
    error: Object | string;
    currentUser: any;
    throttledVerificationCheck: any;
    checkedVerification: boolean;
    lastCheckedVerification: any;
    createUser: (_userParams: Object) => any;
    updateUser: (_userParams: Object) => any;
    deleteUser: (_userParams: Object) => any;
    requestVerification: () => any;
    getCurrentUser: () => any;
    login: (_user: string, _password: string) => any;
    socialLogin: (provider: string, isModal: boolean) => any;
    logout: () => any;
    requestPasswordReset: (email: string) => any;
    passwordReset: (email: string, password: string, password_confirmation: string, token: string) => any;
    isAuthenticated: () => boolean;
    isVerified: () => boolean;
}

export default class AuthService implements IAuthService {
    error: Object | string;
    currentUser: Object = null;
    throttledVerificationCheck: any;
    checkedVerification: boolean = false;
    lastCheckedVerification: any = null;

    static $inject = ['$rootScope', '$q', '$state', '$http', 'DataService', '$auth', 'API', '$cookies', '_'];

    constructor(private $rootScope: ng.IRootScopeService, private $q: ng.IQService, private $state: any, private $http: ng.IHttpService, private DataService: DataService, private $auth: any, private API: string, private $cookies: any, private _: any) {
        this.currentUser = this.getCurrentUser();
        this.throttledVerificationCheck = this._.throttle(function () {
            let self = this;
            return this.$http.get(this.API + 'check_verification').then((response) => {
                self.lastCheckedVerification = moment();
                return response.body.check;
            });
        }.bind(this), 30000);
    }

    createUser(_userParams: any) {

        let user = {
            email: _userParams.email,
            password: _userParams.password,
             password_confirmation: _userParams.passwordCheck,
            username: _userParams.email,
            firstName: _userParams.firstName,
            lastName: _userParams.lastName,
            fullName: _userParams.firstName + ' ' + _userParams.lastName,
            country_id: _userParams.country,
            dob: _userParams.dob,
            gender: _userParams.gender,
        };

        return this.$auth.signup(user)
            .then(function (userData) {
                this.error = '';
                console.log('User ' + userData.username + ' created successfully!');
                return this.login(_userParams.email, _userParams.password)
                    .then((res) => {
                        console.log(res);
                        this.getCurrentUser()
                            .then((res) => {
                                console.log(res);
                                this.$state.go('profile.about');
                            }, (error) => {
                                return {status: false, errors: error || 'Something went wrong.'}
                            });
                    }, (error) => {
                        return {status: false, errors: error || 'Something went wrong.'}
                    });
            })
            .catch(function (error) {
                return {
                    status: false,
                    errors: this.error = error.data.errors || 'Unknown error from server'
                };
            });
    }

    updateUser(_userParams: any) {
        return this.DataService.update('users/me', _userParams.id, _userParams, null)
            .then((response) => {
                return response;
            }).catch(function (error) {
                console.log(error);
                return error;
            });
    }

    deleteUser(_userParams: any) {
        return this.DataService.delete('users/me', _userParams.id)
            .then((response) => {
                return response;
            }).catch(function (error) {
                console.log(error);
                return error;
            });
    }

    requestVerification() {
        return this.DataService.collection('request_verification', null)
            .then((response) => {
                return response;
            }, (error) => {
                return error;
            });
    }

    getCurrentUser() {
        console.log('getting user');
        let deferred = this.$q.defer();
        if (this.isAuthenticated()) {
            if (!angular.isObject(this.currentUser)) {
                this.$http.get(this.API + 'authenticate')
                    .then((response) => {
                        this.$cookies.put('iw_token', this.$auth.getToken(), {secure: true});
                        // console.log(response.body.user);
                        deferred.resolve(this.$rootScope.AppData.User = this.currentUser = response.body.user);
                    }, (error) => {
                        deferred.reject(error);
                    });
            } else {
                // console.log(this.currentUser);
                deferred.resolve(this.currentUser);
            }
        } else {
            deferred.reject(false);
        }
        return deferred.promise;

    }

    login(_user: string, _password: string) {
        return this.$auth.login({email: _user, password: _password})
            .then((response) => {
                if (response.status === 200) {
                    this.$http.defaults.headers.common.Authorization = 'Bearer ' + response.body.token;
                    this.$auth.setToken(response.body.token);
                    this.$cookies.put('iw_token', response.body.token, {secure: true});
                    this.getCurrentUser();
                    return true;
                    // return { status: true };
                } else {
                    return {
                        status: false,
                        errors: this.error = {credentials: ['Invalid email or password']}
                    };
                }
            })
            .catch(function (response) {
                // Handle errors here, such as displaying a notification
                // for invalid email and/or password.
                console.log(response);
                return {
                    status: false,
                    errors: this.error = response.body ? response.body.errors : 'Unknown error from server'
                };
            });
    }

    socialLogin(provider: string, isModal: boolean) {
        let self = this;
        isModal = isModal || false;
        return this.$auth.authenticate(provider)
            .then((response) => {
                // console.log(response.body);
                self.getCurrentUser().then(function (user) {
                    self.error = '';
                    if (!isModal) {
                        if (moment(user.created_at).isSame(moment(), 'hour')) {
                            console.log('User ' + user.fullName + ' created successfully!');
                            self.$state.go('profile.about');
                        } else {
                            if (self.$rootScope.this.$stateParams.redirect) {
                                return window.location.href = self.$rootScope.this.$stateParams.redirect;
                            }
                            self.$state.go('home');
                        }
                    } else {
                        return user;
                    }
                }, (error) => {
                    return error;
                });
            })
            .catch(function (response) {
                console.log(response);
                return {
                    status: false,
                    errors: self.error = response || 'Unknown error from server'
                };
            });
    }

    logout() {
        //let deferred = this.$q.defer();
        return this.$http.post(this.API + 'logout', null)
            .then((response) => {
                this.$auth.removeToken();
                this.$cookies.remove('iw_token');
                this.$auth.logout();
                this.$rootScope.toastMessage(response.message);
                // localStorage.removeItem('User');
                // this.$rootScope.AppData.User = undefined;
                //deferred.resolve(true);
            }, (error) => {
                return error;
            });
        //return deferred.promise;
    }

    requestPasswordReset(email: string) {
        return this.$http.post(this.API + 'requestPasswordReset', {email: email})
            .then(function (res) {
                console.log(res);
                return res;
            }, function (error) {
                //console.log(error);
                return error;
            });
    }

    passwordReset(email: string, password: string, password_confirmation: string, token: string) {
        return this.$http.post(this.API + 'resetPassword', {
            email: email,
            password: password,
            password_confirmation: password_confirmation,
            token: token
        })
            .then(function (res) {
                console.log(res);
                this.$state.go('sign_in');
                return res;
            }, function (error) {
                //console.log(error);
                return error;
            });
    }

    parseJwt(token) {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(atob(base64));
    }

    isAuthenticated() {
        //let params = this.$auth.getPayload();
        //console.log(params);
        return this.$auth.isAuthenticated();
    }

    isVerified() {
        // if user is authenticated and currentUser is an object
        if (this.isAuthenticated && angular.isObject(this.currentUser)) {
            // if currentUser.verified is true
            if (this.currentUser.verified === 1 || this.currentUser.verified === true) {
                return true;
            } else {
                // restrict continuous checking. If 30 seconds since the last check has passed, try again
                if (this.lastCheckedVerification === null || moment().isAfter(this.lastCheckedVerification.add(30, 's'))) {
                    let test = this.throttledVerificationCheck();
                    return this.currentUser.verified = this.$rootScope.AppData.User.verified = !!test.$$state.status ? test.$$state.value : false;
                } else {
                    return false;
                }
            }
        } else {
            // not logged in
            return false;
        }
    }

}
// AuthService.$inject = ['$rootScope', '$q', '$state', '$http', 'DataService', '$auth', 'API', '$cookies', '_'];

angular.module('IndieWise.services')
    .service('AuthService', AuthService);
