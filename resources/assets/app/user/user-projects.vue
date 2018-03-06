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
					<md-card v-for="video in projects.data" :key="video.id">
						<md-card-header>
							<md-card-header-text>
								<div class="md-title"><a :href="'/'+video.url_id"> {{video.name}}</a></div>
								<div class="md-subhead">
									<span v-if="!video.unlist"><i class="fa fa-check-square-o"></i> published</span>
									<span v-else><i class="fa fa-square-o" style="color: #000;"></i> un-listed</span>
									&nbsp;&middot;&nbsp;
									<span><i class="fa fa-clock-o"></i> {{video.created_at|vmUtc|vmLocal|vmDateFormat('ll')}}</span>
									<!--<div v-if="isUser && checkDownloadable(video)">
										<md-button class="md-raised md-primary md-dense" @click.native="getDownload(video)">
											<md-icon>file_download</md-icon>
											Download File
										</md-button>
									</div>-->
									<md-button v-if="isUser && checkDownloadable(video)" class="video-btn" :href="'/'+video.url_id + '/edit'">
										<md-icon>edit_mode</md-icon>
										Change video URL
									</md-button>
									<md-snackbar md-position="center" :md-duration="9000000" :md-active="showSnackbar" md-persistent>
										<span>Preparing your file - Please Wait! </span>
									</md-snackbar>
									<!--<span><i class="fa fa-eye"></i>1,862K</span>-->
								</div>
							</md-card-header-text>

							<md-card-media md-big>
								<img :src="video.thumbnail_url||'/assets/img/default_video_thumbnail.jpg'"
								     alt="video thumbnail">
							</md-card-media>
						</md-card-header>

						<!--<md-card-content>{{video.description}}</md-card-content>-->

						<md-card-actions v-if="isUser">
							<md-button class="video-btn" :href="'/'+video.url_id + '/edit'">
								<md-icon>edit_mode</md-icon>
								Edit
							</md-button>
							<md-button class="video-btn" @click.native="deleteProject(video.id)">
								<md-icon>delete</md-icon>
								Delete
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
				:md-active.sync="showDeleteDialog"
				md-title="Delete Project"
				md-content="Are you sure you want to delete this project ?"
				md-confirm-text="Confirm"
				md-cancel-text="Cancel"
				@md-confirm="onDeleteClose">
		</md-dialog-confirm>
	</section>
	<!-- End single post description -->
</template>
<style></style>
<script type="text/javascript">
  import FileSaver from 'file-saver';

  export default {
    name: 'user-projects',
    props: ['user'],
    data() {
      return {
        projects: null,
        selectedDelete: null,
        showDeleteDialog: false,
        client: null,
        showSnackbar: false,
        downloadPrepProgress: 0,
      }
    },
    watch: {
      '$root.user'(val) {
        if (this.isUser) {
          this.userData = val;
          // this.client = window.filestack.init('APbjTx44SlSuCI6P58jwvz');

        }
      }
    },
    computed: {
      isUser() {
        return this.$root.user && (this.user.id === this.$root.user.id);
      },
      userData: {
        get() {
          return this.user;
        }, set() {}
      }
    },
    methods: {
      deleteProject(videoId) {
        let self = this;
        if (this.isUser) {
          this.selectedDelete = videoId;
          this.showDeleteDialog = true;
        }
      },
      onDeleteClose() {
        let ID = this.selectedDelete;
        this.$http.delete('projects/' + ID).then(() => {
          this.projects.data = _.reject(this.projects.data, function (response) {
            return response.id === ID;
          });
        });
        this.selectedDelete = null;
      },
      checkDownloadable(video) {
        return video.video_url.includes('filepicker') || video.video_url.includes('filestackcontent');
        // return video.thumbnail_url.includes('filepicker') || video.thumbnail_url.includes('filestackcontent');
      },
      getDownload(video) {
        // let link = video.thumbnail_url;
        let link = video.video_url;
        let newLink = null;
        if (link.includes('filepicker')) {
          newLink = link
            .replace(/cache=true/g, '')
            .replace('https://cdn.filepicker.io/api/file/', '')
            .replace(/policy=([A-Za-z0-9=]+)/, '')
            .replace(/signature=([A-Za-z0-9=]+)/, '')
            .replace(/[\?\&]/g, '');
        } else if (link.includes('filestackcontent')) {
          newLink = link
            .replace(/cache=true/g, '')
            .replace('https://cdn.filestackcontent.com/', '')
            .replace(/policy=([A-Za-z0-9=]+)/, '')
            .replace(/signature=([A-Za-z0-9=]+)/, '')
            .replace(/[\?\&]/g, '');
        }
        if (newLink) {
          // get metadata
          this.client.metadata(newLink)
            .then((meta) => {
              // download blob
              this.showSnackbar = true;
              this.client.retrieve(newLink, {dl: true})
                .then((blob) => {
                  this.showSnackbar = false;
                  FileSaver.saveAs(blob, meta.filename);
                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((meta) => {
              console.log(meta);
              alert('There seems to be an issue locating your file, please contact us to resolve this issue.')
            });
        }
      }
    },
    mounted() {
      if (this.isUser) {
        this.user = this.$root.user;
      } else {
        this.$http.get('users/' + this.user.id).then((response) => {
          this.userData = response.data.data;
        });
      }

      this.$http.get('projects', {params: {owner: this.user.id, sort: 'created_at', per_page: 50}}).then((response) => {
        this.projects = response.data;
      });

      // this.client = window.filestack.init('APbjTx44SlSuCI6P58jwvz');
    }
  }
</script>