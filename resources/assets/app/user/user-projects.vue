<template>
	<!-- single post description -->
	<section class="profile-videos">
		<div class="row secBg">
			<div class="large-12 columns">
				<div class="heading">
					<i class="fa fa-video-camera"></i>
					<h4>Projects</h4>
				</div>
				<template v-if="projects">
					<md-card v-for="video in projects.data">
						<md-card-header>
							<md-card-header-text>
								<div class="md-title"><a :href="'/'+video.url_id"> {{video.name}}</a></div>
								<div class="md-subhead">
									<span v-if="!video.unlist"><i class="fa fa-check-square-o"></i> published</span>
									<span v-else><i class="fa fa-square-o" style="color: #000;"></i> un-listed</span>
									&nbsp;&middot;&nbsp;
									<span><i class="fa fa-clock-o"></i> {{video.created_at|vmUtc|vmLocal|vmDateFormat('ll')}}</span>
									<!--<span><i class="fa fa-eye"></i>1,862K</span>-->
								</div>
							</md-card-header-text>

							<md-card-media md-big>
								<img :src="video.thumbnail_url||'/assets/img/default_video_thumbnail.jpg'" alt="video thumbnail">
							</md-card-media>
						</md-card-header>

						<!--<md-card-content>{{video.description}}</md-card-content>-->

						<md-card-actions v-if="isUser">
							<md-button class="video-btn" :href="'/'+video.url_id + '/edit'">
								<md-icon>edit_mode</md-icon> Edit
							</md-button>
							<md-button class="video-btn" @click="deleteProject(video.id)">
								<md-icon>delete</md-icon> Delete
							</md-button>
						</md-card-actions>
					</md-card>
					<br>
				</template>
				<!--<div class="show-more-inner text-center">
					<a href="#" class="show-more-btn">show more</a>
				</div>-->
			</div>
		</div>

		<md-dialog-confirm
				md-title="Delete Project"
				md-content="Are you sure you want to delete this project ?"
				md-ok-text="Confirm"
				md-cancel-text="Cancel"
				@close="onDeleteClose"
				ref="deleteDialog">
		</md-dialog-confirm>
	</section>
	<!-- End single post description -->
</template>
<style></style>
<script type="text/javascript">
    export default{
        name: 'user-projects',
        props: ['user'],
        data(){
            return {
                projects: null,
	            selectedDelete: null,
            }
        },
        computed: {
            isUser(){
                return this.$root.user && (this.user.id === this.$root.user.id);
            },
        },
        methods: {
            deleteProject (videoId) {
                let self = this;
                if (this.isUser) {
                    this.selectedDelete = videoId;
                    this.$refs.deleteDialog.open();
                }
            },
            onDeleteClose(type) {
				if (type === 'ok') {
				    let ID = this.selectedDelete;
                    this.$http.delete('projects/' + ID).then(function () {
                        this.projects.data = _.reject(this.projects.data, function (response) {
                            return response.id === ID;
                        });
                    });
				}
                this.selectedDelete = null;
            }
        },
        mounted(){
            if (this.isUser) {
                this.user = this.$root.user;
            } else {
                this.$http.get('users/' + this.user.id).then(function (response) {
                    this.user = response.data.data;
                });
            }

            this.$http.get('projects', {params: {owner: this.user.id, sort: 'created_at', per_page: 50}}).then(function (response) {
	            this.projects = response.data;
            })

        }
    }
</script>