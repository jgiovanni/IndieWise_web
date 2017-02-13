<template>
	<section class="profile-setting">
		<div class="row secBg">
			<div class="large-12 columns">
				<div class="heading">
					<i class="fa fa-gears"></i>
					<h4>Profile Settings</h4>
				</div>
				<div class="row">
					<div class="large-12 columns">
						<div class="setting-form" v-if="userData">
							<form name="settings" @submit.stop.prevent="updateUser()">
								<div class="setting-form-inner">
									<div class="row">
										<div class="large-12 columns">
											<h6 class="borderBottom">Username Setting:</h6>
										</div>
										<div class="medium-6 columns">
											<md-input-container>
												<label>First Name</label>
												<md-input v-model="userData.firstName" placeholder="Enter your first name"></md-input>
											</md-input-container>
											<!--<label>First Name:
												<input type="text" v-model="userData.firstName"
												       placeholder="Enter your first name..">
											</label>-->
										</div>
										<div class="medium-6 columns">
											<md-input-container>
												<label>Last Name</label>
												<md-input v-model="userData.lastName" placeholder="Enter your last name"></md-input>
											</md-input-container>
											<!--<label>Last Name:
												<input type="text" v-model="userData.lastName"
												       placeholder="Enter your last name..">
											</label>-->
										</div>
										<div class="medium-6 columns">
											<md-input-container>
												<label>Username</label>
												<md-input v-model="userData.username" placeholder="Enter your username"></md-input>
											</md-input-container>
											<!--<label>Username:
												<input type="text" v-model="userData.username"
												       placeholder="Enter your username...">
											</label>-->
										</div>
									</div>
									<div class="row">
										<div class="medium-6 columns">
											<button class="button expanded" type="button" v-if="!userData.verified" @click.native="requestVerificationEmail()">
												<i class="fa fa-envelope"></i> Resend Verification Email
											</button>
										</div>
										<div class="medium-6 columns">
											<div class="callout alert-box info" v-if="verificationEmailSentMessage">
												<strong>Okay!</strong> The verification email has been sent. Please also check your spam folder!
											</div>
										</div>
									</div>
								</div>
								<div class="setting-form-inner">
									<div class="row">
										<div class="large-12 columns">
											<h6 class="borderBottom">Update Password:</h6>
										</div>
										<div class="medium-6 columns">
											<md-input-container md-has-password>
												<label>New Password</label>
												<md-input type="password" v-model="userData.password" placeholder="Enter new password..."></md-input>
											</md-input-container>
											<!--<label>New Password:
												<input type="password" v-model="userData.password" placeholder="Enter new password..">
											</label>-->
										</div>
										<div class="medium-6 columns">
											<md-input-container md-has-password>
												<label>Verify Password</label>
												<md-input type="password" v-model="userData.password_confirmation" placeholder="Enter new password again..."></md-input>
											</md-input-container>
											<!--<label>Verify Password:
												<input type="password" v-model="userData.password_confirmation" placeholder="Enter new password again..">
											</label>-->
										</div>
									</div>
								</div>
								<div class="setting-form-inner">
									<div class="row">
										<div class="large-12 columns">
											<h6 class="borderBottom">About Me:</h6>
										</div>
										<div class="medium-6 columns">
											<md-input-container>
												<label>Email ID</label>
												<md-input type="email" v-model="userData.email" placeholder="Enter your email address..."></md-input>
											</md-input-container>
											<!--<label>Email ID:
												<input type="email" v-model="userData.email"
												       placeholder="Enter your email address..">
											</label>-->
										</div>
										<div class="medium-6 columns">
											<!--<md-input-container>
												<label>Date of Birth</label>
												<md-input v-model="userData.dob" placeholder="Enter your date of birth..."></md-input>
											</md-input-container>-->
											<date-picker :date="{ time: userData.dob }" :options="{ placeholder: 'Date of Birth'}" @change="updateDOB"></date-picker>
										</div>
										<div class="medium-6 columns">
											<label for="gender">Gender</label>
											<md-radio v-model="userData.gender" id="gender" name="gender" md-value="male">Male</md-radio>
											<md-radio v-model="userData.gender" id="gender" name="gender" md-value="female">Female</md-radio>
										</div>
										<div class="medium-6 columns">
											<md-input-container v-show="$root.countryList.length">
												<label for="country">Country</label>
												<md-select name="country" id="country" v-model="userData.country_id">
													<md-option :value="country.id" v-for="country in $root.countryList">{{ country.name }}</md-option>
												</md-select>
											</md-input-container>
										</div>
										<!--<div class="medium-12 columns">
											<label class="borderBottom" style="margin-bottom: 10px;">Preferred
												Genres:</label>

											<div class="checkbox-inline" style="margin-bottom: 20px;">
												<template v-for="g in genresList">
													<input type="checkbox"
													       v-model="bool" name="genre{{$index}}" id="genre{{$index}}"
													       @click="syncGenres(bool, g)"
													       ng-checked="isCheckedGenre(g.id)">
													<label class="customLabel"
													       for="genre{{$index}}">{{::g.name}}</label>
												</template>
											</div>
										</div>-->
										<!--<div class="medium-12 columns">
											<label class="borderBottom" style="margin-bottom: 10px;">Preferred
												Types:</label>

											<div class="checkbox-inline" style="margin-bottom: 20px;"
											     v-if="$root.typesList.length">
												<template v-for="t in $root.typesList">
													<input type="checkbox"
													       v-model="bool" name="type{{$index}}" id="type{{$index}}"
													       @click="syncTypes(bool, t)"
													       ng-checked="isCheckedType(t.id)">
													<label class="customLabel"
													       for="type{{$index}}">{{::t.name}}</label>
												</template>

											</div>
										</div>-->
										<div class="medium-12 columns end">
											<md-input-container>
												<label>Bio Description</label>
												<md-textarea v-model="userData.bio"></md-textarea>
											</md-input-container>
										</div>
									</div>
								</div>
								<div class="setting-form-inner">
									<div class="row" v-if="userData">
										<div class="large-12 columns">
											<h6 class="borderBottom">Social Profile Links:</h6>
										</div>
										<div class="medium-6 columns">
											<md-input-container>
												<label>Website URL</label>
												<md-input v-model="userData.website"></md-input>
											</md-input-container>
										</div>
										<div class="medium-6 columns">
											<md-input-container>
												<label>Facebook</label>
												<md-input v-model="userData.urlFacebook"></md-input>
											</md-input-container>
										</div>
										<div class="medium-6 columns">
											<md-input-container>
												<label>Twitter</label>
												<md-input v-model="userData.urlTwitter"></md-input>
											</md-input-container>
										</div>
										<div class="medium-6 columns end">
											<md-input-container>
												<label>Google Plus</label>
												<md-input v-model="userData.urlGoogle"></md-input>
											</md-input-container>
										</div>
									</div>
								</div>
								<div class="setting-form-inner">
									<div class="row">
										<div class="large-12 columns">
											<h6 class="borderBottom">Notification Settings:</h6>
										</div>
										<div class="medium-12 columns">
											<p>
												<b>Email Notifications:</b><br>
												When checked, you will receive email notifications for the following events.
											</p>
											<div class="row">
												<div class="medium-6 columns">
													<md-checkbox v-model="userData.settings.email_critique">Critiques on your videos.</md-checkbox>
													<md-checkbox v-model="userData.settings.email_nomination">Nominations of your videos.</md-checkbox>
													<md-checkbox v-model="userData.settings.email_win">Awards for your videos.</md-checkbox>
												</div>
												<div class="medium-6 columns end">
													<md-checkbox v-model="userData.settings.email_comment">Comments to your critiques.</md-checkbox>
													<md-checkbox v-model="userData.settings.email_message">Messages you receive.</md-checkbox>

												</div>
											</div>
										</div>
										<!--
											<div class="medium-12 columns">
												<div class="checkbox">
													<input type="checkbox" id="notifA" v-model="notificationsActive"
														   @click="toggleNotifications(notificationsActive)">
													<label class="customLabel" for="notifA">Allow Notifications</label>
												</div>
											</div>
										-->
									</div>
								</div>
								<div class="row">
									<div class="medium-6 columns">
										<div class="">
											<md-button class="md-warn" @click.stop.prevent.native="confirmTerminate($event)">
												<span>Deactivate Account</span>
											</md-button>
										</div>

										<md-dialog-confirm
												md-title="Terminate Account"
												md-content="Are you sure you want to terminate your account?"
												md-ok-text="Yes"
												md-cancel-text="No"
												@close="onCloseTerminate"
												ref="terminateAccount">
										</md-dialog-confirm>
									</div>
									<div class="medium-6 columns end">
										<div class="setting-form-inner">
											<button class="button expanded" type="submit">
												<span v-if="!updating">update now</span>
												<span v-if="!!updating"><i class="fa fa-spinner fa-spin"></i>&nbsp;Updating</span>
											</button>
										</div>
									</div>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>
<style></style>
<script type="text/babel">
    import datePicker from '../date-picker';
    export default{
        name: 'user-settings',
        components: { datePicker },
        props: ['user'],
        data(){
            return {
                userData: false,
                genres: [],
                UserTypes: [],
                genresArr: [],
                typesArr: [],
                saveComplete: false,
                updating: false,
                verificationEmailSentMessage: false,
                updateUser: false,
                notificationsActive: null,
            }
        },
	    computed: {
            isUser(){
                return this.$root.user && (this.user.id === this.$root.user.id);
            },
        },
        methods: {
            _updateUser() {
                let self = this;
                if (!this.updating) {
                    let user = this.userData;
                    this.updating = true;
                    user.genres = _.pluck(this.genresArr, 'id');
                    user.types = _.pluck(this.typesArr, 'id');
                    user.settings = JSON.stringify(user.settings);
                    this.$http.put('users/' + user.id, user).then(function (res) {
                        // console.log(res);
                        res.data.data.dob = moment(res.data.data.dob).toDate();
                        res.data.data.settings = JSON.parse(res.data.data.settings);
                        this.$root.user = self.user = res.data.data;
                        res.data.data.name = res.data.data.fullName;
                        window.Intercom('update', res.data.data);
                        this.saveComplete = true;
                        this.updating = false;
//                        this.anchorSmoothScroll.scrollTo('success');
                        this.$root.$emit('toastMessage', 'Profile Updated');
                    }.bind(this));
                } else {
                    this.$root.$emit('toastMessage', 'Please wait...');
                }
            },

            toggleNotifications() {
                window.localStorage.setItem('pwAllowPushNotifications', this.notificationsActive);

                if (!!this.notificationsActive) {
                    // subscribe device push notifications
                    if (window.pwCanUseServiceWorkers() || _.isDefined(window.safari)) {
                        if (window.chrome && window.pushwoosh.isBrowserChrome()) {
                            window.pushwoosh.subscribeAtStart();
                        } else {
                            window.pushwooshSubscribe();

                            window.pushwooshSetTags({
                                id: this.userData.id,
                                urlId: this.userData.url_id,
                                username: this.userData.email,
                                firstName: this.userData.firstName,
                                lastName: this.userData.lastName
                            });
                        }

                    }
                }
            },

            requestVerificationEmail() {
                let self = this;
                this.requestVerificationEmailn()
                    .then(() => self.verificationEmailSentMessage = true);
            },

            confirmTerminate(ev) {
                this.$refs.terminateAccount.open();
            },

            onCloseTerminate(type) {
                let self = this;
                console.log('Closed', type);
                if (type === 'ok'){
                    this.$http.delete('users/me', this.userData.id).then(function (res) {
						if (res.data.status) {
							self.$http.post('logout').then( function (res) {
								self.$root.logout();
							});
                        }
                	});
                }
            },

            updateDOB(date) {
                this.userData.dob = date;
            }
        },
        mounted(){
            let self = this;

            this.$root.$on('userHasLoggedOut', function (user) {
				if (self.user.id === user.id) {
                    window.location = '/user/' + this.user.url_id;
				}
            });

            if (this.isAuthenticated && this.user.id === this.$root.user.id) {
                this.$http.get('users/' + this.user.id).then(function (response) {
                    this.userData = response.data.data;
                    this.userData.dob = moment(this.userData.dob).startOf('day').format('YYYY-MM-DD');
                    this.userData.settings = _.isObject(this.userData.settings) ? this.userData.settings : JSON.parse(this.userData.settings || '{}');
                });
                this.updateUser = _.throttle(this._updateUser, 1000);

                let pwSetting = window.localStorage.getItem('pwAllowPushNotifications');
                this.notificationsActive = pwSetting !== 'undefined' && !!JSON.parse(pwSetting);

//            this.genresArr = this.user.genres.data; //Genres.data.data;
//            this.typesArr = this.user.types;// UserTypes.data.data;

                this.generateCountries();

                this.generateGenres();

                this.generateTypes();
            } else {
                window.location = '/user/' + this.user.url_id;
            }
        }
    }
</script>