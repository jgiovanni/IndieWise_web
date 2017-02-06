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
							<span class="text-black">monitor</span> your Personal Activity, <br>and <span class="text-white">upload</span>
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

		<section class="hide-for-large" id="randomMedia" style="padding: 0;">
			<div class="random-media-head text-center">
				<div class="row">
					<div class="large-12 columns">
						<ul class="tabs" data-tabs id="media">
							<li class="tabs-title" :class="{'is-active': isCurrentUrlChild('user', '')}">
								<a :href="'/user/' + user.url_id"><i class="fa fa-user"></i></a>
							</li>
							<!--<li v-if="isUser" class="tabs-title" :class="{'is-active': isCurrentUrlChild('user', 'playlists')}">
								<a :href="'user/' + user.url_id + '/playlists'"><i class="fa fa-heart"></i></a>
							</li>-->
							<li class="tabs-title" :class="{'is-active': isCurrentUrlChild('user', 'projects')}">
								<a :href="'/user/' + user.url_id + '/videos'"><i class="fa fa-video-camera"></i></a>
							</li>
							<li class="tabs-title" :class="{'is-active': isCurrentUrlChild('user', 'critiques')}">
								<a :href="'/user/' + user.url_id + '/critiques'"><i class="fa fa-star"></i></a>
							</li>
							<li class="tabs-title" :class="{'is-active': isCurrentUrlChild('user', 'reactions')}">
								<a :href="'/user/' + user.url_id + '/reactions'"><i class="fa fa-smile-o"></i></a>
							</li>
							<li class="tabs-title" :class="{'is-active': isCurrentUrlChild('user', 'awards')}">
								<a :href="'/user/' + user.url_id + '/awards'"><i class="fa fa-trophy"></i></a>
							</li>
							<li v-if="isUser" class="tabs-title" :class="{'is-active': isCurrentUrlChild('user', 'settings')}">
								<a :href="'/user/' + user.url_id + '/settings'"><i class="fa fa-gears"></i></a>
							</li>
							<li v-if="isUser" class="tabs-title" :class="{'is-active': isFirstUrlSegment('upload')}">
								<a href="/upload"><i class="fa fa-upload"></i></a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>
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
<script type="text/babel">
    export default{
        name: 'user-top',
	    props: {
            user: {
                type: Object,
            },
            stats: {
                type: Object,
	            required: false
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
            pickBanner(){
                let self = this;
                filepicker.pick({
                        cropRatio: 32/7,
                        mimetype: 'image/*',
                        services: ['CONVERT', 'COMPUTER', 'FACEBOOK', 'GOOGLE_DRIVE', 'WEBCAM', 'INSTAGRAM'],
                        conversions: ['crop', 'rotate', 'filter'],
                        customSourcePath: self.user.url_id + '/banners/'
                    },
                    function (Blob){
                        self.user.coverPhoto = Blob.url + '?cache=true';
                        self.$http.put('user/me/' + self.user.id, self.user).then(function (res) {
                            self.$root.$emit('toastMessage', 'Cover Photo Updated!');
                        }, (error) => console.log(error));
                    }
                );
            },

            pickAvatar(){
                let self = this;
                filepicker.pick({
                        cropRatio: [1/1],
                        cropForce: true,
                        mimetype: 'image/*',
                        services: ['CONVERT', 'COMPUTER', 'FACEBOOK', 'GOOGLE_DRIVE', 'WEBCAM', 'INSTAGRAM'],
                        conversions: ['crop', 'rotate', 'filter'],
                        customSourcePath: self.user.url_id + '/avatars/'
                    },
                    function (Blob){
                        self.user.avatar = Blob.url + '?cache=true';
                        self.$http.put('user/me/' + self.user.id, self.user).then(function (res) {
                            self.$root.$emit('toastMessage', 'Avatar Updated!');
                        }, (error) => console.log(error));
                    }
                );
            }
        },
        created(){

        },
        mounted(){

        }
    }
</script>