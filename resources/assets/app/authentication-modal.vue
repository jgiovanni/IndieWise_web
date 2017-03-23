<template>
    <md-dialog ref="AuthModal">
        <md-dialog-title>Authentication</md-dialog-title>
        <md-dialog-content>
            <md-layout md-align="center" md-column-medium class="padding-8">
                <md-layout md-flex md-column class="">
                    <div class="social-login text-center" style="width: 100%">
                        <h5 class="">Login via a Social Profile</h5>
                        <!--<div class="social-login-btn facebook">-->
                        <!--<md-theme md-name="indigo">-->
                        <md-button @click.native="authenticate('facebook')" class="md-primary">
                            <md-icon md-iconset="fa fa-facebook"></md-icon>
                            &nbsp;
                            Facebook
                        </md-button>
                        <!--</md-theme>-->
                        <!--</div>-->
                        <!--<div class="social-login-btn g-plus">-->
                        <md-button @click.native="authenticate('google')" class="md-warn">
                            <md-icon md-iconset="fa fa-google-plus"></md-icon>
                            &nbsp;
                            Google+
                        </md-button>
                        <!--</div>-->
                    </div>
                    <template v-if="currentState === 'login'">
                        <div class="register-form">
                            <h5 class="text-center"> Or Login via Email</h5>
                            <form id="ModalLoginForm" novalidate @submit.stop.prevent="doLogin()">
                                <div class="alert callout" style="display: none;">
                                    <p><i class="fa fa-exclamation-triangle"></i> There are some errors in your form.
                                    </p>
                                </div>

                                <md-input-container :class="{'md-input-invalid': errors.has('email')}">
                                    <md-icon>account_circle</md-icon>
                                    <md-input placeholder="Enter your email" v-validate="'required|email'"
                                              data-vv-name="email" v-model="user.email" required></md-input>
                                    <span class="md-error"
                                          v-show="errors.has('email')">{{ errors.first('email') }}</span>
                                </md-input-container>

                                <md-input-container md-has-password
                                                    :class="{'md-input-invalid': errors.has('password')}">
                                    <md-icon>lock</md-icon>
                                    <md-input placeholder="Enter your password" v-validate="'required|alpha_dash'"
                                              data-vv-name="password" v-model="user.password" type="password"
                                              required></md-input>
                                    <span class="md-error" v-show="errors.has('password')">{{ errors.first('password') }}</span>
                                </md-input-container>

                                <md-checkbox id="remember" name="remember">Remember Me</md-checkbox>

                                <button class="button expanded" type="submit">login Now</button>

                                <md-layout md-gutter>
                                    <md-button @click.native="currentState = 'reset'">Forgot Password</md-button>
                                    <span style="flex: 1;"></span>
                                    <md-button @click.native="currentState = 'register'">New Account</md-button>
                                </md-layout>

                            </form>
                        </div>
                    </template>
                    <template v-else-if="currentState === 'reset'">
                        <template v-if="!hasToken" class="register-form">
                            <h5 class="text-center">Request Password Reset</h5>
                            <br>
                            <form @submit.stop.prevent="doPasswordResetRequest" data-abide novalidate>
                                <md-input-container>
                                    <md-icon>email</md-icon>
                                    <md-input type="email" v-model="resetUser.email" placeholder="Enter your email"
                                              required>
                                        <span class="form-error">email is required</span>
                                    </md-input>
                                </md-input-container>
                                <button class="button expanded" type="submit" name="submit">reset Now</button>
                                <md-layout md-gutter>
                                    <md-button @click.native="currentState = 'login'">Login</md-button>
                                    <span style="flex: 1;"></span>
                                    <md-button @click.native="currentState = 'register'">New Account
                                    </md-button>
                                </md-layout>
                            </form>
                        </template>
                        <template v-else class="register-form">
                            <h5 class="text-center">Enter Your New Password</h5>
                            <form @submit="confirmReset()" name="confirmResetForm" novalidate>
                                <small class="help-text">Password must be at least 6 characters.</small>
                                <md-input-container md-has-password>
                                    <md-icon>lock</md-icon>
                                    <md-input type="password" v-model="reseting.newPassword"
                                              placeholder="Enter new password..." minlength="6" required></md-input>
                                </md-input-container>
                                <md-input-container md-has-password>
                                    <md-icon>lock</md-icon>
                                    <md-input type="password" v-model="reseting.newPasswordCheck"
                                              placeholder="Re-type your new password..." minlength="6"
                                              required></md-input>
                                </md-input-container>

                                <button class="button expanded" type="submit" name="submit"
                                        v-disabled="reseting.newPassword !== reseting.newPasswordCheck && !reseting.newPassword.length">
                                    Confirm
                                </button>

                                <md-layout md-gutter>
                                    <md-button @click.native="currentState = 'login'">Login</md-button>
                                    <span style="flex: 1;"></span>
                                    <md-button @click.native="currentState = 'register'">New Account</md-button>
                                </md-layout>
                            </form>
                        </template>
                    </template>
                    <template v-else-if="currentState === 'register'">
                        <div class="register-form">
                            <h5 class="text-center">Create your Account</h5>
                            <form @submit="doRegister" data-abide>
                                <div id="errors" class="alert callout" v-show="errors.gender||authErrors">
                                    <p><i class="fa fa-exclamation-triangle"></i> There are some errors in your form.
                                    </p>
                                    <p v-show="errors.gender">Please select a gender.</p>
                                    <p v-for="(key, value) in authErrors"><b>{{key}}</b>: {{value[0]}}</p>
                                </div>
                                <!--<div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-user"></i></span>
                                    <input class="input-group-field" type="text" placeholder="Enter your username" required>
                                </div>-->

                                <!--<div class="input-group">
                                    <span class="input-group-label">
                                        <i v-if="errors.email===false" class="fa fa-envelope"></i>
                                        <i v-if="errors.email===0" class="fa fa-check" style="color: green;"></i>
                                        <i v-if="errors.email" class="fa fa-exclamation-triangle" style="color: red;"></i>
                                    </span>-->
                                <md-input-container :class="{'has-error': !!errors.email}">
                                    <md-icon v-if="errors.email===false">email</md-icon>
                                    <md-icon v-if="errors.email===0" style="color: green;">check_circle</md-icon>
                                    <md-icon v-if="errors.email" class="md-warn">warning</md-icon>
                                    <md-input type="email" v-model="createUser.email" @change="checkEmailUse"
                                              placeholder="Enter a valid email" required></md-input>
                                </md-input-container>
                                <!--<input class="input-group-field" type="email" placeholder="Enter a valid email"
                                       v-model="createUser.email" @change="checkEmailUse()"
                                       required :class="{'is-invalid-input': !!errors.email}">
                            </div>-->
                                <div class="alert callout" v-show="errors.email">
                                    <p><i class="fa fa-exclamation-triangle"></i> Email address is already in use.
                                        Please try another valid email.</p>
                                </div>

                                <div class="input-group">
                                    <div class="row">
                                        <div class="medium-6 columns ">
                                            <md-input-container>
                                                <md-input v-model="createUser.firstName" placeholder="First Name"
                                                          required></md-input>
                                            </md-input-container>
                                        </div>
                                        <div class="medium-6 columns">
                                            <md-input-container>
                                                <md-input v-model="createUser.lastName" placeholder="Last Name"
                                                          required></md-input>
                                            </md-input-container>
                                        </div>
                                    </div>
                                </div>

                                <small class="help-text">Password must be at least 6 characters.</small>
                                <md-input-container md-has-password>
                                    <md-icon>lock</md-icon>
                                    <md-input type="password" v-model="createUser.password"
                                              placeholder="Enter your password..." minlength="6" required></md-input>
                                </md-input-container>
                                <md-input-container md-has-password>
                                    <md-icon>lock</md-icon>
                                    <md-input type="password" v-model="createUser.passwordCheck"
                                              placeholder="Re-type new password..." minlength="6" required></md-input>
                                </md-input-container>

                                <!--<div class="input-group">
                                    <span class="input-group-label"><i class="fa fa-calendar"></i></span>
                                    <input type="date" placeholder="Date of Birth" ng-model="user.dob" datepicker='' max="today" required>
                                </div>-->

                                <div class="row">
                                    <div class="medium-12 columns">
                                        <date-picker :date="{ time: createUser.dob }"
                                                     :options="{ placeholder: 'Date of Birth'}"
                                                     @change="updateDOB"></date-picker>
                                    </div>
                                    <!--<div class="columns medium-4">
                                        <label for="dob_month">
                                            <select id="dob_month" name="dob_month" ng-model="dobMonth"  required>
                                                <option value="" disabled>Month</option>
                                                <option value="01">January</option>
                                                <option value="02">February</option>
                                                <option value="03">March</option>
                                                <option value="04">April</option>
                                                <option value="05">May</option>
                                                <option value="06">June</option>
                                                <option value="07">July</option>
                                                <option value="08">August</option>
                                                <option value="09">September</option>
                                                <option value="10">October</option>
                                                <option value="11">November</option>
                                                <option value="12">December</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div class="columns medium-4">
                                        <label for="dob_day">
                                            <select id="dob_day" name="dob_day" ng-model="dobDay" required>
                                                <option value="" disabled>Day</option>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                                <option value="6">6</option>
                                                <option value="7">7</option>
                                                <option value="8">8</option>
                                                <option value="9">9</option>
                                                <option value="10">10</option>
                                                <option value="11">11</option>
                                                <option value="12">12</option>
                                                <option value="13">13</option>
                                                <option value="14">14</option>
                                                <option value="15">15</option>
                                                <option value="16">16</option>
                                                <option value="17">17</option>
                                                <option value="18">18</option>
                                                <option value="19">19</option>
                                                <option value="20">20</option>
                                                <option value="21">21</option>
                                                <option value="22">22</option>
                                                <option value="23">23</option>
                                                <option value="24">24</option>
                                                <option value="25">25</option>
                                                <option value="26">26</option>
                                                <option value="27">27</option>
                                                <option value="28">28</option>
                                                <option value="29">29</option>
                                                <option value="30">30</option>
                                                <option value="31">31</option>
                                            </select>
                                        </label>
                                    </div>
                                    <div class="columns medium-4">
                                        <label>
                                            <select ng-model="dobYear" required>
                                                <option value="" disabled>Year</option>
                                                <option ng-value="y" ng-repeat="y in yearsList"
                                                        class="md-accent">
                                                    {{::y}}
                                                </option>
                                            </select>
                                        </label>
                                    </div>-->
                                </div>

                                <div class="row">
                                    <div class="medium-12 columns text-center">
                                        <label>Gender</label>
                                        <md-radio v-model="user.gender" md-value="male">Male</md-radio>
                                        <md-radio v-model="user.gender" md-value="female">Female</md-radio>
                                    </div>
                                </div>

                                <!--<dropdown-toggle close-on-click="true" pane-align="center">
                                    <toggle>
                                        &lt;!&ndash;<a class="dropdown button large">Preferred Genres: (select all that apply)</a>&ndash;&gt;
                                        &lt;!&ndash;<i class="fa fa-heart"></i>&ndash;&gt;
                                        <button type="button" class="button small expanded iw-button">Select all preferred Genres</button>
                                    </toggle>
                                    <pane>
                                        <ul class="menu vertical">
                                            <li class="checkbox" ng-repeat="g in genresList|orderBy:'name'">
                                                <input type="checkbox"
                                                       ng-model="bool" name="genre{{$index}}" id="genre{{$index}}"
                                                       ng-change="syncGenres(bool, g)" ng-checked="isCheckedGenre(g.id)">
                                                <label class="customLabel" for="genre{{$index}}">{{::g.name}}</label>
                                            </li>
                                        </ul>
                                    </pane>
                                </dropdown-toggle>

                                <dropdown-toggle close-on-click="true" pane-align="center">
                                    <toggle>
                                        &lt;!&ndash;<a class="dropdown button large">Preferred Types: (select all that apply)</a>&ndash;&gt;
                                        &lt;!&ndash;<i class="fa fa-heart"></i>&ndash;&gt;
                                        <button type="button" class="button small expanded iw-button">Select all preferred Types</button>
                                    </toggle>
                                    <pane>
                                        <ul class="menu vertical">
                                            <li class="checkbox" ng-repeat="t in typesList|orderBy:'name'">
                                                <input type="checkbox"
                                                       ng-model="bool" name="type{{$index}}" id="type{{$index}}"
                                                       ng-change="syncTypes(bool, t)" ng-checked="isCheckedType(t.id)">
                                                <label class="customLabel" for="type{{$index}}">{{::t.name}}</label>
                                            </li>
                                        </ul>
                                    </pane>
                                </dropdown-toggle>-->

                                <!--<div class="radio" style="margin-bottom: 20px;">
                                    <label>Preferred Genres:</label>
                                    <input type="checkbox" ng-repeat-start="g in $rootScope.genresList|orderBy:'name'"
                                           ng-model="bool" name="genre{{$index}}" id="genre{{$index}}"
                                           ng-change="syncGenres(bool, g)" ng-checked="isCheckedGenre(g.id)">
                                    <label ng-repeat-end class="customLabel" for="genre{{$index}}">{{::g.name}}</label>
                                </div>-->

                                <!--<div class="radio" style="margin-bottom: 20px;">
                                    <label>Preferred Types:</label>
                                    <input type="checkbox" ng-repeat-start="t in $rootScope.typesList|orderBy:'name'"
                                           ng-model="bool" name="type{{$index}}" id="type{{$index}}"
                                           ng-change="syncTypes(bool, t)" ng-checked="isCheckedType(t.id)">
                                    <label ng-repeat-end class="customLabel" for="type{{$index}}">{{::t.name}}</label>
                                </div>-->

                                <md-input-container v-show="countryList.length">
                                    <label for="country">Select Country</label>
                                    <md-select name="country" id="country" v-model="user.country" required>
                                        <md-option value="" selected>Select Country</md-option>
                                        <md-option :value="country.id" v-for="country in countryList">{{ country.name
                                            }}
                                        </md-option>
                                    </md-select>
                                </md-input-container>

                                <small>By registering, you agree to our <a ui-sref="tos">Terms</a> and have read our <a
                                        ui-sref="privacy">Privacy Policy</a></small>

                                <span class="form-error">your email is invalid</span>
                                <button class="button expanded iw-button" type="submit" name="submit">register Now
                                </button>
                                <md-layout md-gutter>
                                    <md-button @click.native="currentState = 'login'">Login here</md-button>
                                    <span style="flex: 1;"></span>
                                    <md-button @click.native="currentState = 'reset'">Forgot password?</md-button>
                                </md-layout>
                            </form>
                        </div>
                    </template>
                </md-layout>
            </md-layout>
        </md-dialog-content>
    </md-dialog>
</template>
<style scoped></style>
<script type="text/babel">
    export default {
        name: 'authentication-modal',
        data(){
            function generateYearsList() {
                let arr = [];
                let thisYear = moment().year();
                for (let i = thisYear; i > (thisYear - 100); i--) {
                    arr.push(i);
                }
                return arr
            }

            return {
                urlParams: {
                    token: false,
                    email: false
                },
                user: {
                    email: '',
                    password: ''
                },
                error: '',
                currentState: 'login',

                // register vars
                createUser: {
                    email: '',
                    password: '',
                    passwordCheck: '',
                    firstName: '',
                    lastName: '',
                    gender: '',
                    dob: ''
                },
                genresArr: [],
                typesArr: [],
                thisYear: moment().year(),
                yearsList: generateYearsList(),
                /*errors: {
                 email: false,
                 gender: false,
                 genres: false,
                 types: false
                 },*/
                creating: false,

                //reset vars
                hasToken: false,
                reseting: {
                    newPassword: null,
                    newPasswordCheck: null
                },
                resetUser: {
                    email: ''
                },

            }
        },
        watch: {
            'currentState'(val){
                this.handleCurrentState(val);
            }
        },
        methods: {
            getParams() {
                let filters = decodeURIComponent(location.search).substr(1).split('&');
                let filtersArray = {};
                _.each(filters, function (filter, key, list) {
                    let arr = filter.split('=');
                    filtersArray[arr[0]] = arr[1];
                });
                return this.urlParams = filtersArray;
            },
            handleCurrentState(val){
                this.getParams();
                switch (val) {
                    case 'login':
                        break;
                    case 'reset':
                        break;
                    case 'register':
                        this.generateCountries();
                        break;
                }
            },
            cancel() {
                this.$refs.AuthModal.close();
            },

            // Login Functions
            doLogin () {
                let self = this;
                this.$validator.validateAll().then(function (success) {
                    if (!success) {
                        return;
                    }

                    self.loginRequest();
                }, function (error) {
                    self.$root.$emit('toastMessage', 'Please check the form for errors.');
                });
            },
            loginRequest(){
                let self = this;
                this.$http.post('login', {email: this.user.email, password: this.user.password}).then(function (res) {
                    console.log('Success', res);
                    localStorage.setItem('jwt-token', 'Bearer ' + res.data.token);
                    self.getUserData();
                }, function (res) {
                    self.error = res;
                    console.log('Failed', res);
                }).then(function () {
                    self.cancel();
                });
            },
            getUserData(){
                return this.$root.getUser().then(function (data) {
                    this.$root.user = data;
                    this.$root.authenticated = true;
                    this.$root.$emit('userHasLoggedIn', data);
                    this.$root.$emit('toastMessage', 'Login Successful!');
                    return data;
                });
            },
            authenticate (provider) {
                let self = this;
                let params;
                this.error = null;
                switch (provider) {
                    case 'facebook':
                        let facebookAuth = this.$root.authProviders.facebook;
                        params = {
                            client_id: facebookAuth.clientId,
                            redirect_uri: facebookAuth.redirectUri,
                            scope: facebookAuth.scope
                        };
                        this.oauthpopup({
                            windowName: 'LoginViaFacebook',
                            path: facebookAuth.authorizationEndpoint + '?' + $.param(params),
                            callback: function (response) {
                                let token = JSON.parse(response).token;
                                localStorage.setItem('jwt-token', 'Bearer ' + token);
                                self.getUserData().then(function () {
                                    self.$refs.AuthModal.close();
                                });
                            }
                        });
                        break;
                    case 'google':
                        let googleAuth = this.$root.authProviders.google;
                        params = {
                            client_id: googleAuth.clientId,
                            redirect_uri: googleAuth.redirectUri,
                            scope: googleAuth.scope[0] + ' ' + googleAuth.scope[1],
                            response_type: 'code',
                            state: 'profile'
                        };
                        this.oauthpopup({
                            windowName: 'LoginViaGoogle',
                            path: googleAuth.authorizationEndpoint + '?' + $.param(params),
                            callback: function (response) {
                                let token = JSON.parse(response).token;
                                localStorage.setItem('jwt-token', 'Bearer ' + token);
                                self.getUserData().then(function () {
                                    self.$refs.AuthModal.close();
                                });
                            }
                        });
                        break;
                }
            },
            oauthpopup(options) {
                if (!options || !options.path) {
                    throw new Error("options.path must not be empty");
                }

                options = _.extend({
                    windowName: 'ConnectWithOAuth', // should not include space for IE
                    windowOptions: 'location=0,status=0,width=580,height=400',
                    callback: options.callback || function () {
                        window.location.reload();
                    }
                }, options);

                let that = this;
                that._oauthWindow = window.open(options.path, options.windowName, options.windowOptions);
                that._oauthInterval = window.setInterval(function () {
                    if (!that._oauthWindow.closed) {
                        if (that._oauthWindow.location.hostname === location.hostname && $(that._oauthWindow.document).find('pre').html().trim().indexOf('token') !== -1) {
                            window.clearInterval(that._oauthInterval);
                            options.callback($(that._oauthWindow.document).find('pre').html().trim());
                            that._oauthWindow.close();
                        } else if ($(that._oauthWindow.document).find('pre').html().trim().indexOf('Client error') !== -1){
                            window.clearInterval(that._oauthInterval);
                            self.$root.$emit('toastMessage', 'Authentication Error: Please report this to IndieWise support.');
                        }
                    } else {
                        window.clearInterval(that._oauthInterval);
                        options.callback();
                    }
                }, 150);
            },

            // Register Functions
            mysql_real_escape_string(str) {
                return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
                    switch (char) {
                        case "\0":
                            return "\\0";
                        case "\x08":
                            return "\\b";
                        case "\x09":
                            return "\\t";
                        case "\x1a":
                            return "\\z";
                        case "\n":
                            return "\\n";
                        case "\r":
                            return "\\r";
                        case "\"":
                        case "'":
                        case "\\":
                        case "%":
                            return "\\" + char; // prepends a backslash to backslash, percent,
                                                // and double/single quotes
                    }
                });
            },
            checkEmailUse() {
                if (_.isString(this.createUser.email) && this.createUser.email.length) {
                    this.$http.get('emailCheck', {params: {email: this.mysql_real_escape_string(this.createUser.email)}})
                        .then((res) => {
                            this.errors.email = res.data && res.data.verify === true ? 1 : 0;
                        }, (error) => console.log(error));
                } else this.errors.email = false;
            },
            doRegister() {
                if (!this.creating) {
                    this.creating = true;
                    this.errors.gender = !this.user.gender.length;

                    if (this.errors.gender) {
                        this.anchorSmoothScroll.scrollTo('errors');
                        return false;
                    }

                    this.createUser.dob = moment(this.createUser.dob).startOf('day').format('YYYY-MM-DD HH:mm:ss');
                    this.$http.post('users', this.createUser).then(function (res) {
                        if (!res.status) {
                            this.authErrors = res.errors;
                            this.$root.$emit('toastMessage', 'There is an error, please check your form');
                            // console.log('Failed', res);
                        } else {
                            // console.log('Success', res);
                            //window.location.reload();
                            this.$root.$emit('toastMessage', 'Account created!');
                        }
                        // window.location.reload();
                        this.creating = false;
                    }.bind(this));
                } else {
                    this.$root.$emit('toastMessage', 'Please wait...');
                }
            },
            updateDOB(date) {
                this.createUser.dob = date;
            },
            // Password Reset Functions
            doPasswordResetRequest() {
                let self = this;
                self.$http.post('requestPasswordReset', {email: this.resetUser.email})
                    .then(function (res) {
                        // console.log(res);
                        self.$root.$emit('toastMessage', 'Check your inbox for our email! Should be there soon.');
                        self.$state.go('sign_in');
                    }, error => self.$root.$emit('toastMessage', 'Error: ' + error.message));
            },
            confirmReset() {
                let self = this;
                this.hasToken = this.urlParams.token;
                if (this.reseting.newPassword === this.reseting.newPasswordCheck && _.isString(this.hasToken)) {
                    self.$http.post('passwordReset', {
                        email: self.urlParams.email,
                        password: self.reseting.newPassword,
                        password_confirmation: self.reseting.newPasswordCheck,
                        token: self.hasToken
                    })
                        .then(res => {
                                self.$root.$emit('toastMessage', 'Password Reset Successfully');
                                //Login user
                                self.user.email = self.urlParams.email;
                                self.user.password = self.reseting.newPassword;
                                self.loginRequest();
                            },
                            error => self.$root.$emit('toastMessage', 'Error: ' + error.message));
                } else return false;
            },

        },
        created() {
            let self = this;
            this.$root.$on('openAuthModal', function (state) {
                self.currentState = state || 'login';
                self.$refs.AuthModal.open();
            })
        },
        mounted(){
//            this.handleCurrentState(this.currentState);

            setTimeout(function () {
                jQuery(document).foundation();
                setTimeout(function () {
                    jQuery(document).foundation();
                }, 250);
            }, 0);
        }
    }
</script>