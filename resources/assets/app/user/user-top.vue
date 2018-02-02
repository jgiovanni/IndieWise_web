<template>
	<div>
		<section class="topProfile topProfile-inner" :style="'background-image: url(' + bgImg + ')'">
			<div class="row" v-if="isUser">
				<div class="large-12 columns">
					<div class="upload-bg">
						<form>
							<label class="btn-upload has-tip no-border" @click="pickBanner()">
								<i class="fa fa-camera"></i><span>update cover image</span>
							</label>
							<!--<input type="file" id="topfileupload" class="show-for-sr" ngf-select="Profile.updateCoverPhoto($file)" ngf-accept="'image/png,image/gif,image/jpg,image/jpeg'">-->
						</form>
					</div>
				</div>
				<!--<div class="large-12 columns">
					<h3>World�s Biggest</h3>
					<h1>Powerfull Video Theme</h1>
				</div>-->
			</div>
			<div class="main-text text-center hide" style="padding-top: 20px;padding-bottom: 30px" v-if="isUser">
				<div class="row">
					<div class="large-12 columns">
						<h2 style="color: #414CAB;">Welcome to</h2>
						<img src="/assets/img/Logo_alt2.png" alt="" style="height: 88px;">
						<h4 class="text-center" style="color:#414CAB;">
							<br>
							Here you may <span class="text-black">customize</span> your Profile,<br>
							<span class="text-black">monitor</span> your Personal Activity, <br>and <span
								class="text-white">upload</span>
							your Indie Projects
						</h4>
					</div>
				</div>
			</div>
			<div class="profile-stats">
				<div class="row secBg">
					<div class="large-12 columns">
						<div class="profile-author-img">
							<img :src="avatarImg" alt="profile author img">
							<form v-if="isUser">
								<label class="btn-upload has-tip no-border" @click="pickAvatar()">
									<i class="fa fa-camera"></i><span>update Avatar</span>
								</label>
								<!--<input type="file" id="imgfileupload" class="show-for-sr"
									   ngf-select="Profile.updateAvatar($file)" ngf-accept="'image/png,image/gif,image/jpg,image/jpeg'">-->
							</form>
						</div>
						<!--<div class="profile-subscribe" v-if="user.id !== $root.user.id ">
							<span><i class="fa fa-comment"></i></span>
							<button type="submit" name="subscribe" @click="showMessageDialog()">send message</button>
						</div>-->
						<div class="clearfix">
							<div class="profile-author-name float-left">
								<h4>{{user.fullName}}</h4>
								<p>Join Date : <span>{{user.created_at|vmUtc|vmLocal|vmDateFormat('ll')}}</span></p>
							</div>
							<div class="profile-author-stats float-right">
								<ul class="menu">
									<li>
										<div class="icon float-left">
											<md-icon>videocam</md-icon>
										</div>
										<div class="li-text float-left">
											<p class="number-text">{{stats.projectCount}}</p>
											<span>Projects</span>
										</div>
									</li>
									<li>
										<div class="icon float-left">
											<md-icon>star</md-icon>
										</div>
										<div class="li-text float-left">
											<p class="number-text">{{stats.critiqueCount}}</p>
											<span>Critiques</span>
										</div>
									</li>
									<li>
										<div class="icon float-left">
											<md-icon>face</md-icon>
										</div>
										<div class="li-text float-left">
											<p class="number-text">{{stats.reactionCount}}</p>
											<span>Reactions</span>
										</div>
									</li>
									<li>
										<div class="icon float-left">
											<md-icon md-src="/assets/svg/trophy.svg"></md-icon>
										</div>
										<div class="li-text float-left">
											<p class="number-text">{{stats.winCount}}</p>
											<span>Awards</span>
										</div>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>

		<div class="md-tabs md-theme-default hide-for-large">
			<nav class="md-whiteframe md-tabs-navigation md-whiteframe-0dp md-has-icon md-centered">
				<button type="button" class="md-tab-header" :class="{'md-active': view === ''}" @click="navigateTo('')">
					<div class="md-tab-header-container">
						<md-icon>account_circle</md-icon>
						<!----> <!---->
					</div>

					<span class="md-tab-indicator"></span>
				</button>
				<button type="button" class="md-tab-header" :class="{'md-active': view === 'projects'}" @click="navigateTo('projects')">
					<div class="md-tab-header-container">
						<md-icon>videocam</md-icon>
						<!----> <!---->
					</div>

				</button>
				<button type="button" class="md-tab-header" :class="{'md-active': view === 'critiques'}" @click="navigateTo('critiques')">
					<div class="md-tab-header-container">
						<md-icon>star</md-icon>
						<!----> <!---->
					</div>

				</button>
				<!--<button type="button" class="md-tab-header" @click.native="navigateTo('')">
					<div class="md-tab-header-container">
						<md-icon>face</md-icon>
						&lt;!&ndash;&ndash;&gt; &lt;!&ndash;&ndash;&gt;
					</div>

				</button>-->
				<button type="button" class="md-tab-header" :class="{'md-active': view === 'awards'}" @click="navigateTo('awards')">
					<div class="md-tab-header-container">
						<md-icon md-src="/assets/svg/trophy.svg"></md-icon>
						<!----> <!---->
					</div>

				</button>
				<button v-if="isUser" type="button" class="md-tab-header" :class="{'md-active': view === 'settings'}" @click="navigateTo('settings')">
					<div class="md-tab-header-container">
						<md-icon>settings</md-icon>
						<!----> <!---->
					</div>

				</button>
				<button v-if="isUser" type="button" class="md-tab-header" :class="{'md-active': view === 'upload'}" @click="navigateTo('upload')">
					<div class="md-tab-header-container">
						<md-icon>cloud_upload</md-icon>
						<!----> <!---->
					</div>

				</button>
			</nav>
		</div>
	</div>
</template>
<style>
	.topProfile .profile-stats .profile-author-stats ul li div.icon i {
		font-size: 24px;
	}

	.topProfile .profile-stats .profile-author-stats ul li div.icon i svg {
		vertical-align: top !important;
	}
</style>
<script type="text/javascript">
    export default{
        name: 'user-top',
        props: {
            user: {
                type: Object,
            },
            stats: {
                type: Object,
                required: false
            },
	        view: {
                type: String,
		        required: true
	        }
        },
        data(){
            return {}
        },
        computed: {
            isUser(){
                return this.$root.user && (this.user.id === this.$root.user.id);
            },
            bgImg() {
                return this.user ? this.user.coverPhoto : '/assets/images/profile-bg.png';
            },
            avatarImg() {
                return this.user ? this.user.avatar : '/assets/img/avatar-1.png';
            },
        },
        methods: {
            navigateTo(view){
                return window.location = '/user/' + this.user.url_id + '/' + view;
            },
            pickBanner(){
                let self = this;
                filepicker.pick({
                        cropRatio: 32 / 7,
                        mimetype: 'image/*',
                        services: ['CONVERT', 'COMPUTER', 'FACEBOOK', 'GOOGLE_DRIVE', 'WEBCAM', 'INSTAGRAM'],
                        conversions: ['crop', 'rotate', 'filter'],
                        customSourcePath: self.user.url_id + '/banners/'
                    },
                    function (Blob) {
                        self.user.coverPhoto = Blob.url + '?cache=true';
                        self.$http.put('user/me/' + self.user.id, self.user).then((res) => {
                            self.$root.$emit('toastMessage', 'Cover Photo Updated!');
                        }, (error) => console.log(error));
                    }
                );
            },

            pickAvatar(){
                let self = this;
                filepicker.pick({
                        cropRatio: [1 / 1],
                        cropForce: true,
                        mimetype: 'image/*',
                        services: ['CONVERT', 'COMPUTER', 'FACEBOOK', 'GOOGLE_DRIVE', 'WEBCAM', 'INSTAGRAM'],
                        conversions: ['crop', 'rotate', 'filter'],
                        customSourcePath: self.user.url_id + '/avatars/'
                    },
                    function (Blob) {
                        self.user.avatar = Blob.url + '?cache=true';
                        self.$http.put('user/me/' + self.user.id, self.user).then((res) => {
                            self.$root.$emit('toastMessage', 'Avatar Updated!');
                        }, (error) => console.log(error));
                    }
                );
            }
        },
        created(){
            // Init Filepicker
            window.filepicker.setKey('APbjTx44SlSuCI6P58jwvz');

        },
        mounted(){

        }
    }
</script>