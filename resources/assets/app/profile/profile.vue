<template>
	<div>
		<!--breadcrumbs-->
		<section id="breadcrumb">
			<div class="row">
				<div class="large-12 columns">
					<nav aria-label="You are here:" role="navigation">
						<ul class="breadcrumbs">
							<li><i class="fa fa-home"></i><a ui-sref="home">Home</a></li>
							<li>
								<span class="show-for-sr">Current: </span> {{user.firstName}}&nbsp;{{user.lastName}} Profile
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</section><!--end breadcrumbs-->

		<!-- profile top section -->
		<section class="topProfile topProfile-inner"
		         style="background-image: url({{user.coverPhoto||'/assets/images/profile-bg_demo.png'}});">
			<div class="row">
				<div class="large-12 columns">
					<div class="upload-bg">
						<form>
							<label class="btn-upload has-tip no-border" ng-click="pickBanner()">
								<i class="fa fa-camera"></i><span>update cover image</span>
							</label>
							<!--<input type="file" id="topfileupload" class="show-for-sr" ngf-select="updateCoverPhoto($file)" ngf-accept="'image/png,image/gif,image/jpg,image/jpeg'">-->
						</form>
					</div>
				</div>
			</div>
			<div class="main-text text-center ng-hide" style="padding-top: 20px;padding-bottom: 30px">
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
							<img ngf-thumbnail="user.avatar || '/assets/img/avatar-1.png'" />

							<form>
								<label class="btn-upload has-tip no-border" ng-click="pickAvatar()">
									<i class="fa fa-camera"></i><span>update Avatar</span>
								</label>
								<!--<input type="file" id="imgfileupload" class="show-for-sr"
									   ngf-select="updateAvatar($file)" ngf-accept="'image/png,image/gif,image/jpg,image/jpeg'">-->
							</form>
						</div>
						<div class="clearfix">
							<div class="profile-author-name float-left">
								<h4>{{::user.firstName+' '+user.lastName}}</h4>

								<p>Join Date : <span>{{::user.created_at|amUtc|amLocal|amDateFormat:'LL'}}</span></p>
							</div>
							<div class="profile-author-stats float-right">
								<ul class="menu">
									<li>
										<div class="icon float-left">
											<i class="fa fa-video-camera"></i>
										</div>
										<div class="li-text float-left">
											<p class="number-text">{{::userStats.projectCount}}</p>
											<span>Projects</span>
										</div>
									</li>
									<li>
										<div class="icon float-left">
											<i class="fa fa-star"></i>
										</div>
										<div class="li-text float-left">
											<p class="number-text">{{::userStats.critiqueCount}}</p>
											<span>Critiques</span>
										</div>
									</li>
									<li>
										<div class="icon float-left">
											<i class="fa fa-smile-o"></i>
										</div>
										<div class="li-text float-left">
											<p class="number-text">{{::userStats.reactionCount}}</p>
											<span>Reactions</span>
										</div>
									</li>
									<!--<li>
										<div class="icon float-left">
											<i class="fa fa-trophy"></i>
										</div>
										<div class="li-text float-left">
											<p class="number-text">{{::userStats.nomCount}}</p>
											<span>Nominations</span>
										</div>
									</li>-->
									<li>
										<div class="icon float-left">
											<i class="fa fa-trophy"></i>
										</div>
										<div class="li-text float-left">
											<p class="number-text">{{::userStats.winCount}}</p>
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
		<!-- End profile top section -->
		<section class="hide-for-large" id="randomMedia" style="padding: 0;">
			<div class="random-media-head text-center">
				<div class="row">
					<div class="large-12 columns">
						<ul class="tabs" data-tabs id="media">
							<li class="tabs-title" ui-sref-active="is-active">
								<a ui-sref="about({id: user.id})"><i class="fa fa-user"></i></a>
							</li>
							<li class="tabs-title" ui-sref-active="is-active">
								<a ui-sref="playlists({id: user.id})"><i class="fa fa-heart"></i></a>
							</li>
							<li class="tabs-title" ui-sref-active="is-active">
								<a ui-sref="videos({id: user.id})"><i class="fa fa-video-camera"></i></a>
							</li>
							<li class="tabs-title" ui-sref-active="is-active">
								<a ui-sref="critiques({id: user.id})"><i class="fa fa-star"></i></a>
							</li>
							<li class="tabs-title" ui-sref-active="is-active">
								<a ui-sref="reactions({id: user.id})"><i class="fa fa-smile-o"></i></a>
							</li>
							<li class="tabs-title" ui-sref-active="is-active">
								<a ui-sref="awards({id: user.id})"><i class="fa fa-trophy"></i></a>
							</li>
							<li class="tabs-title" ui-sref-active="is-active">
								<a ui-sref="settings({id: user.id})"><i class="fa fa-gears"></i></a>
							</li>
							<li class="tabs-title" ui-sref-active="is-active">
								<a ui-sref="upload({id: user.id})"><i class="fa fa-upload"></i></a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</section>

		<div class="row">
			<!-- left sidebar -->
			<div class="large-4 columns show-for-large">
				<aside class="secBg sidebar">
					<div class="row">
						<!-- profile overview -->
						<div class="large-12 columns">
							<div class="widgetBox">
								<div class="widgetTitle">
									<h5>Profile Overview</h5>
								</div>
								<div class="widgetContent">
									<ul class="profile-overview">
										<li class="clearfix">
											<a ui-sref="about({id: user.id})" ui-sref-active="active">
												<i class="fa fa-user"></i>about me
											</a>
										</li>
										<li class="clearfix">
											<a ui-sref="playlists({id: user.id})" ui-sref-active="active">
												<i class="fa fa-heart"></i>Playlists
											</a>
										</li>
										<li class="clearfix">
											<a ui-sref="videos({id: user.id})" ui-sref-active="active">
												<i class="fa fa-video-camera"></i>Projects
												<span class="float-right">{{::userStats.projectCount}}</span>
											</a>
										</li>
										<li class="clearfix">
											<a ui-sref="critiques({id: user.id})" ui-sref-active="active">
												<i class="fa fa-star"></i>Critiques
												<span class="float-right">{{::userStats.critiqueCount}}</span>
											</a>
										</li>
										<li class="clearfix">
											<a ui-sref="reactions({id: user.id})" ui-sref-active="active"><i
													class="fa fa-smile-o"></i>Reactions
												<span class="float-right">{{::userStats.reactionCount}}</span>
											</a>
										</li>
										<li class="clearfix">
											<a ui-sref="awards({id: user.id})" ui-sref-active="active">
												<i class="fa fa-trophy"></i>Awards
												<span class="float-right">{{::userStats.winCount}}</span>
											</a>
										</li>
										<li class="clearfix">
											<a ui-sref="upload({id: user.id})"
											   ui-sref-active="active"><i class="fa fa-upload"></i>Upload Project</a>
										</li>
										<li class="clearfix">
											<a ui-sref="settings({id: user.id})"
											   ui-sref-active="active"><i class="fa fa-gears"></i>Settings</a>
										</li>
										<li class="clearfix">
											<a ng-click="Body.doSignOut()"><i class="fa fa-sign-out"></i>Logout</a>
										</li>
									</ul>
									<!--<a ui-sref="upload" class="button"><i class="fa fa-plus-circle"></i>Upload Video</a>-->
								</div>
							</div>
						</div>
						<!-- End profile overview -->
					</div>
				</aside>
			</div>
			<!-- end sidebar -->
			<!-- right side content area -->
			<div class="ui-view-container small-12 large-8 columns profile-inner">
				<div ui-view class=""></div>
				<!-- end left side content area -->
			</div>


		</div>
	</div>
</template>
<style></style>
<script type="text/javascript">
    export default{
        name: 'profile',
        data(){
            return {
                user: this.$root.user,
                userStats: null
            }
        },
        methods: {
            getEmoticonByEmotion (emotion) {
                let reactions = this.$rootScope.generateReactions();
                return _.findWhere(reactions, {emotion: emotion});
            },

            generatePublicId (type) {
                return this.user.url_id + '_' + type + '_' + moment().valueOf();
            },

            pickBanner(){
                let self = this;
                this.filepickerService.pick({
                        cropRatio: 32/7,
                        mimetype: 'image/*',
                        services: ['CONVERT', 'COMPUTER', 'FACEBOOK', 'GOOGLE_DRIVE', 'WEBCAM', 'INSTAGRAM'],
                        conversions: ['crop', 'rotate', 'filter'],
                        customSourcePath: self.user.url_id + '/banners/'
                    },
                    function (Blob){
                        self.user.coverPhoto = Blob.url + '?cache=true';
                        self.$http.put('user/me/' + self.user.id, self.user).then((res) => {
                            self.$root.$emit('toastMessage', 'Cover Photo Updated!');
                        }, (error) => console.log(error));
                    }
                );
            },

            pickAvatar(){
                let self = this;
                this.filepickerService.pick({
                        cropRatio: 1/1,
                        mimetype: 'image/*',
                        services: ['CONVERT', 'COMPUTER', 'FACEBOOK', 'GOOGLE_DRIVE', 'WEBCAM', 'INSTAGRAM'],
                        conversions: ['crop', 'rotate', 'filter'],
                        customSourcePath: self.user.url_id + '/avatars/'
                    },
                    function (Blob){
                        self.user.avatar = Blob.url + '?cache=true';
                        self.$http.put('user/me/' + self.user.id, self.user).then((res) => {
                            self.$root.$emit('toastMessage', 'Avatar Updated!');
                        }, (error) => console.log(error));
                    }
                );
            }
        },
        created(){

            this.$http.get('users/countUserStats')
                .then(response => this.userStats = response.data, (error) => console.log(error))
        },
        mounted(){

        }
    }
</script>