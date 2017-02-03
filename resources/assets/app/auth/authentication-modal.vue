<template>
    <md-dialog ref="AuthModal">
        <md-dialog-title>Authentication</md-dialog-title>
        <md-dialog-content>
            <md-layout md-align="center" md-column-medium class="">
                <md-layout md-flex md-flex-large="50" class="">
                    <div class="social-login text-center" style="width: 100%">
                        <h5 class="">Login via Social Profile</h5>
                        <!--<div class="social-login-btn facebook">-->
                        <!--<md-theme md-name="indigo">-->
                            <md-button @click="authenticate('facebook')" class="md-accent">
                                <i class="fa fa-facebook fa-2x md-icon"></i>&nbsp;
                                login via facebook
                            </md-button>
                        </md-theme>
                        <!--</div>-->
                        <!--<div class="social-login-btn g-plus">-->
                            <md-button @click="authenticate('google')" class="md-warn">
                                <i class="fa fa-google-plus fa-2x md-icon"></i>&nbsp;
                                login via google+
                            </md-button>
                        <!--</div>-->
                    </div>
                </md-layout>
                <!--<md-layout md-hide-medium md-flex="50" class="large-2 medium-2 columns show-for-large">-->
                    <!--<div class="middle-text text-center hide-for-small-only" data-equalizer-watch>-->
                        <!--<p>-->
                            <!--<i class="fa fa-arrow-left arrow-left"></i>-->
                            <!--<span>OR</span>-->
                            <!--<i class="fa fa-arrow-right arrow-right"></i>-->
                        <!--</p>-->
                    <!--</div>-->
                <!--</md-layout>-->
                <md-layout md-flex md-flex-large="50" class="">
                    <div class="register-form">
                        <h5 class="text-center">Login via Email</h5>
                        <form id="ModalLoginForm" novalidate @submit.stop.prevent="doLogin()">
                            <div class="alert callout" style="display: none;">
                                <p><i class="fa fa-exclamation-triangle"></i> There are some errors in your form.</p>
                            </div>

                            <md-input-container :class="{'md-input-invalid': errors.has('email')}">
                                <md-icon>account_circle</md-icon>
                                <md-input placeholder="Enter your email" data-vv-name="email" v-model="user.email" required></md-input>
                                <span class="md-error" v-show="errors.has('email')">{{ errors.first('email') }}</span>
                            </md-input-container>

                            <md-input-container md-has-password :class="{'md-input-invalid': errors.has('password')}">
                                <md-icon>lock</md-icon>
                                <md-input placeholder="Enter your password" data-vv-name="password" v-model="user.password" type="password" required></md-input>
                                <span class="md-error" v-show="errors.has('password')">{{ errors.first('password') }}</span>
                            </md-input-container>

                            <md-checkbox id="remember" name="check" value="remember">Remember Me</md-checkbox>

                            <button class="button expanded" type="submit">login Now</button>

                            <md-layout md-gutter>
                                <md-button href="password/reset" @click="cancel()">Forgot Password</md-button>
                                <span style="flex: 1;"></span>
                                <md-button href="register" @click="cancel()">Create a new Account</md-button>
                            </md-layout>

                        </form>
                    </div>
                </md-layout>
            </md-layout>
        </md-dialog-content>
    </md-dialog>
</template>
<style scoped></style>
<script type="text/babel">
    import { social } from 'vue'
    export default {
        name: 'authentication-modal',
        data(){
            return {
                user: {
                    email: '',
                    password: ''
                },
                error: '',
            }
        },
        methods: {
            cancel() {
                this.$refs.AuthModal.close();
            },
            doLogin () {
                let self = this;
                this.$validator.validateAll().then(function(success) {
                    if (! success) {
                        return;
                    }

                    self.$http.post('login', { email: self.user.email, password: self.user.password}).then(function (res) {
                        console.log('Success', res);
                        localStorage.setItem('jwt-token', 'Bearer ' + res.data.token);
                        self.getUserData();
//                        window.location.reload();
                    }, function (res) {
                        self.error = res;
                        console.log('Failed', res);
                    }).then(function () {
                        self.cancel();
                    });
                }, function (error) {
                    self.$root.$emit('toastMessage', 'Please check the form for errors.');
                });
            },

            getUserData(){
                this.$root.getUser().then(function (data) {
                    this.$root.$emit('userHasLoggedIn');
                    this.$root.user = data;
                    this.$root.authenticated = true;
                });
            },

            authenticate (provider) {
                this.error = null;
                social.login(provider)
                    .then(function (a) {
                        console.log(a);
                        this.ok();
                    }, (error) => {
                        console.log(error);
                    });
            }

        },
        created() {
            let self = this;
            this.$root.$on('openAuthModal', function () {
                self.$refs.AuthModal.open();
            })
        },
        mounted(){
            setTimeout(() => {
                jQuery(document).foundation();
                setTimeout(() => {
                    jQuery(document).foundation();
                }, 250);
            }, 0);
        }
    }
</script>