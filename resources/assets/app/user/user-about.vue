<template>
	<div>
		<!-- single post description -->
		<section class="singlePostDescription" v-if="isUser">
			<div class="row secBg">
				<div class="large-12 columns">
					<div class="heading">
						<i class="fa fa-play"></i>
						<h4>View the IndieWise Tutorial Below</h4>
					</div>
					<div class="description">
						<video width="100%" height="100%" controls preload="metadata"
						       poster="/assets/img/default_video_thumbnail.jpg">
							<source src='https://cdn.filepicker.io/api/file/GYr0iXWiTxat7uVwgPjS+.mp4'>
						</video>
					</div>
				</div>
			</div>
		</section>
		<!-- End single post description -->
		<!-- single post description -->
		<section class="singlePostDescription" v-if="userData">
			<div class="row secBg">
				<div class="large-12 columns">
					<div class="heading">
						<i class="fa fa-user"></i>
						<h4>Description</h4>
					</div>
					<div v-if="userData.bio" class="description">
						<p v-text="userData.bio"></p>

						<!--<div class="email profile-margin">
							<button><i class="fa fa-envelope"></i>u</button>
							<span class="inner-btn">support@betube.com</span>
						</div>-->
						<!--<div class="phone profile-margin">
							<button><i class="fa fa-phone"></i>Phone</button>
							<span class="inner-btn">92-568-748</span>
						</div>-->

						<div v-if="userData.website||userData.urlFacebook||userData.urlTwitter||userData.urlGoogle"
						     class="socialLinks profile-margin">
							<button><i class="fa fa-share-alt"></i>Get Social</button>
							<a v-if="userData.website" :href="userData.website" class="inner-btn"><i
									class="fa fa-globe"></i></a>
							<a v-if="userData.urlFacebook" :href="userData.urlFacebook" class="inner-btn"><i
									class="fa fa-facebook"></i></a>
							<a v-if="userData.urlTwitter" :href="userData.urlTwitter" class="inner-btn"><i
									class="fa fa-twitter"></i></a>
							<a v-if="userData.urlGoogle" :href="userData.urlGoogle" class="inner-btn"><i
									class="fa fa-google-plus"></i></a>
						</div>
						<div class="site profile-margin">
							<button><i class="fa fa-user"></i>Profile Link</button>
							<a :href="'/user/' + userData.url_id" class="inner-btn" style="text-transform: lowercase;">https://getindiewise.com/user/{{userData.url_id}}</a>
						</div>

					</div>
				</div>
			</div>
		</section><!-- End single post description -->
		<!-- followers -->
		<!--
		<section class="content content-with-sidebar followers margin-bottom-10">
			<div class="row secBg">
				<div class="large-12 columns">
					<div class="row column head-text clearfix">
						<h4 class="pull-left"><i class="fa fa-users"></i>Followers</h4>
					</div>
					<div class="row collapse">
						<div class="large-2 small-6 medium-3 columns">
							<div class="follower">
								<div class="follower-img">
									<img src="http://placehold.it/115x100" alt="followers">
								</div>
								<span>Frank Wright</span>
								<button type="submit" name="follow">Subscribe</button>
							</div>
						</div>
						<div class="large-2 small-6 medium-3 columns">
							<div class="follower">
								<div class="follower-img">
									<img src="http://placehold.it/115x100" alt="followers">
								</div>
								<span>John Doe</span>
								<button type="submit" name="follow">Subscribe</button>
							</div>
						</div>
						<div class="large-2 small-6 medium-3 columns">
							<div class="follower">
								<div class="follower-img">
									<img src="http://placehold.it/115x100" alt="followers">
								</div>
								<span>Nancy john</span>
								<button type="submit" name="follow">Subscribe</button>
							</div>
						</div>
						<div class="large-2 small-6 medium-3 columns">
							<div class="follower">
								<div class="follower-img">
									<img src="http://placehold.it/115x100" alt="followers">
								</div>
								<span>Frank</span>
								<button type="submit" name="follow">Subscribe</button>
							</div>
						</div>
						<div class="large-2 small-6 medium-3 columns">
							<div class="follower">
								<div class="follower-img">
									<img src="http://placehold.it/115x100" alt="followers">
								</div>
								<span>lucy</span>
								<button type="submit" name="follow">Subscribe</button>
							</div>
						</div>
						<div class="large-2 small-6 medium-3 columns end">
							<div class="follower">
								<div class="follower-img">
									<img src="http://placehold.it/115x100" alt="followers">
								</div>
								<span>daisy</span>
								<button type="submit" name="follow">Subscribe</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>-->


	</div>
</template>
<style></style>
<script type="text/javascript">
  export default {
    name: 'user-about',
    props: ['user'],
    data() {
      return {
        // userData: {} || this.user,
      }
    },
    watch: {
		'$root.user'(val) {
          if (this.isUser) {
            this.userData = val;
          }
		}
    },
    computed: {
      isUser() {
        // return window.location.pathname.includes(this.user.url_id);
        return this.$root.user && (this.userData.id === this.$root.user.id);
      },
      userData: {
        get() {
          return this.user;
        }, set() {}
      }
    },
    methods: {},
    mounted() {
      if (this.isUser) {
        this.userData = this.$root.user;
      } else {
        this.$http.get('users/' + this.userData.id).then((response) => {
          this.userData = response.data.data;
        });
      }

    }
  }
</script>