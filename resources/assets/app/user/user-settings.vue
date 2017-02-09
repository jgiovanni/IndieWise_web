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
											<button class="button expanded" type="button" v-if="!userData.verified" @click="requestVerificationEmail()">
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
											<md-input-container v-show="countries.length">
												<label for="country">Country</label>
												<md-select name="country" id="country" v-model="userData.country_id">
													<md-option :value="country.id" v-for="country in countries">{{ country.name }}</md-option>
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
											     v-if="typesList.length">
												<template v-for="t in typesList">
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
									<div class="row">
										<div class="large-12 columns">
											<h6 class="borderBottom">Social Profile links:</h6>
										</div>
										<div class="medium-6 columns">
											<md-input-container>
												<label>Website URL</label>
												<md-input v-model="userData.website" placeholder="Enter your website url..."></md-input>
											</md-input-container>
											<!--<label>Website URL:
												<input type="url" v-model="userData.website"
												       placeholder="Enter your website url..">
											</label>-->
										</div>
										<div class="medium-6 columns">
											<md-input-container>
												<label>Facebook</label>
												<md-input v-model="userData.urlFacebook" placeholder="Enter your profile link..."></md-input>
											</md-input-container>
											<!--<label>facebook:
												<input type="url" v-model="userData.urlFacebook"
												       placeholder="Enter your profile link..">
											</label>-->
										</div>
										<div class="medium-6 columns">
											<md-input-container>
												<label>Twitter</label>
												<md-input v-model="userData.urlTwitter" placeholder="Enter your profile link..."></md-input>
											</md-input-container>
											<!--<label>twitter:
												<input type="url" v-model="userData.urlTwitter"
												       placeholder="Enter your profile link..">
											</label>-->
										</div>
										<div class="medium-6 columns end">
											<md-input-container>
												<label>Google Plus</label>
												<md-input v-model="userData.urlGoogle" placeholder="Enter your profile link"></md-input>
											</md-input-container>
											<!--<label>Google Plus:
												<input type="url" v-model="userData.urlGoogle"
												       placeholder="Enter your profile link..">
											</label>-->
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
													<!--<div class="checkbox">
														<input type="checkbox" id="emailNotifA" v-model="userData.settings.email_critique"
														       @click="">
														<label class="customLabel" for="emailNotifA">Critiques on your videos.</label>
													</div>
													<div class="checkbox">
														<input type="checkbox" id="emailNotifB" v-model="userData.settings.email_nomination"
														       @click="">
														<label class="customLabel" for="emailNotifB">Nominations of your videos.</label>
													</div>
													<div class="checkbox">
														<input type="checkbox" id="emailNotifC" v-model="userData.settings.email_win"
														       @click="">
														<label class="customLabel" for="emailNotifC">Awards for your videos.</label>
													</div>-->
												</div>
												<div class="medium-6 columns end">
													<md-checkbox v-model="userData.settings.email_comment">Comments to your critiques.</md-checkbox>
													<md-checkbox v-model="userData.settings.email_message">Messages you receive.</md-checkbox>
													<!--<div class="checkbox">
														<input type="checkbox" id="emailNotifX" v-model="userData.settings.email_comment"
														       @click="">
														<label class="customLabel" for="emailNotifX">Comments to your critiques, .</label>
													</div>
													<div class="checkbox">
														<input type="checkbox" id="emailNotifY" v-model="userData.settings.email_message"
														       @click="">
														<label class="customLabel" for="emailNotifY">Messages you receive.</label>
													</div>-->
													<!--<div class="checkbox">
														<input type="checkbox" id="emailNotifZ" v-model="userData.settings.email_like"
															   @click="">
														<label class="customLabel" for="emailNotifZ">Likes for your videos.</label>
													</div>-->
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
											<md-button class="md-warn" @click.stop.prevent="confirmTerminate($event)">
												<span>Deactivate Account</span>
											</md-button>
										</div>
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
                countries: [],
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
                    let user = this.user;
                    this.updating = true;
                    user.genres = this._.pluck(this.genresArr, 'id');
                    user.types = this._.pluck(this.typesArr, 'id');
                    user.settings = JSON.stringify(user.settings);
                    this.$http.get('users/' + user.id, user).then(function (res) {
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
                                id: this.user.id,
                                urlId: this.user.url_id,
                                username: this.user.email,
                                firstName: this.user.firstName,
                                lastName: this.user.lastName
                            }.bind(this));
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
            },

            updateDOB(date) {
                this.userData.dob = date;
            }
        },
        mounted(){
            let self = this;

            this.$http.get('users/' + this.user.id).then(function (response) {
                this.userData = response.data.data;
                this.userData.dob = moment(this.userData.dob).startOf('day').format('YYYY-MM-DD');
                this.userData.settings = _.isObject(this.userData.settings) ? this.userData.settings : JSON.parse(this.userData.settings || '{}');
            });
            /*} else {
                this.$http.get('users/' + this.user.id).then(function (response) {
                    this.userData = response.data.data;
                });
            }*/

            this.updateUser = _.throttle(this._updateUser, 1000);

            let pwSetting = window.localStorage.getItem('pwAllowPushNotifications');
            this.notificationsActive = pwSetting !== 'undefined' && !!JSON.parse(pwSetting);

//            this.genresArr = this.user.genres.data; //Genres.data.data;
//            this.typesArr = this.user.types;// UserTypes.data.data;

            this.generateCountries().then(res => self.countries = res);

            this.generateGenres().then(res => self.genresList = res);

            this.generateTypes().then(res => self.typesList = res);
        }
    }
</script>