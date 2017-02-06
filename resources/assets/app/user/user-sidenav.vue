<template>
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
									<a :class="{'active': isCurrentUrlChild('user', '')}" :href="'/user/' + user.url_id">
										<i class="fa fa-user"></i>about me
									</a>
								</li>
								<!--<li v-if="isUser" class="clearfix">
									<a :class="{'active': isCurrentUrlChild('user', 'playlists')}" :href="'user/' + user.url_id + '/playlists'">
										<i class="fa fa-heart"></i>Playlists
									</a>
								</li>-->
								<li class="clearfix">
									<a :class="{'active': isCurrentUrlChild('user', 'projects')}" :href="'/user/' + user.url_id + '/videos'">
										<i class="fa fa-video-camera"></i>Projects
										<span class="float-right">{{stats.projectCount}}</span>
									</a>
								</li>
								<li class="clearfix">
									<a :class="{'active': isCurrentUrlChild('user', 'critiques')}" :href="'/user/' + user.url_id + '/critiques'">
										<i class="fa fa-star"></i>Critiques
										<span class="float-right">{{stats.critiqueCount}}</span>
									</a>
								</li>
								<li class="clearfix">
									<a :class="{'active': isCurrentUrlChild('user', 'reactions')}" :href="'/user/' + user.url_id + '/reactions'">
										<i class="fa fa-smile-o"></i>Reactions
										<span class="float-right">{{stats.reactionCount}}</span>
									</a>
								</li>
								<li class="clearfix">
									<a :class="{'active': isCurrentUrlChild('user', 'awards')}" :href="'/user/' + user.url_id + '/awards'">
										<i class="fa fa-trophy"></i>Awards
										<span class="float-right">{{stats.winCount}}</span>
									</a>
								</li>
								<li v-if="isUser" class="clearfix">
									<a :class="{'active': isCurrentUrlChild('user', 'settings')}" :href="'/user/' + user.url_id + '/settings'">
										<i class="fa fa-gears"></i>Settings
									</a>
								</li>
								<li v-if="isUser" class="clearfix">
									<a :class="{'active': isFirstUrlSegment('upload')}" href="/upload">
										<i class="fa fa-upload"></i>Upload Project
									</a>
								</li>
								<li v-if="isUser" class="clearfix">
									<a @click="doSignOut()">
										<i class="fa fa-sign-out"></i>Logout
									</a>
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
</template>
<style></style>
<script type="text/javascript">
    export default{
        name: 'user-sidenav',
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
        },
        mounted(){

        }
    }
</script>