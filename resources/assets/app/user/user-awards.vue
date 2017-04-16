<template>
	<section class="profile-videos" id="randomMedia" style="padding: 0;">
		<div class="row secBg">

			<section class="content" >
				<!-- newest video -->
				<div class="row">
					<div class="large-12 columns" v-if="nominations && nominated && awards">
						<md-tabs md-fixed md-dynamic-height >
							<md-tab id="allnominations" :md-label="(nominations.data.length + nominated.data.length) +  ' Nominations'">
								<md-tabs md-fixed md-dynamic-height>
									<md-tab id="nominations" :md-label="nominations.data.length + ' Nominations Given'">
										<md-list class="">
											<md-list-item v-for="nom in nominations.data" :href="'/user/' + nom.user.data.url_id">
												<md-avatar>
													<img src="/assets/img/award_win_small.png" alt="award">
												</md-avatar>

												<div class="md-list-text-container">
													<span>
														{{nom.user.data.fullName}} nominated {{ nom.project.data.name }}
													</span>
													<span>{{nom.award.data.name||nom.award.name}}</span>
													<span>
														<i class="fa fa-clock-o"></i>&nbsp;<abbr :title="nom.created_at|vmUtc|vmLocal|vmDateFormat('lll')">{{nom.created_at|vmTimeAgo}}</abbr>
													</span>
												</div>
											</md-list-item>
										</md-list>
									</md-tab>
									<md-tab id="nominated" :md-label="nominated.data.length + ' Nominations Given'">
										<md-list class="">
											<md-list-item v-for="nom in nominated.data" :href="'/user/' + nom.user.data.url_id">
												<md-avatar>
													<img src="/assets/img/award_win_small.png" alt="award">
												</md-avatar>

												<div class="md-list-text-container">
													<span>
														{{nom.user.data.fullName}} nominated {{ nom.project.data.name }}
													</span>
													<span>{{nom.award.data.name||nom.award.name}}</span>
													<span>
														<i class="fa fa-clock-o"></i>&nbsp;<abbr :title="nom.created_at|vmUtc|vmLocal|vmDateFormat('lll')">{{nom.created_at|vmTimeAgo}}</abbr>
													</span>
												</div>
											</md-list-item>
										</md-list>
									</md-tab>
								</md-tabs>
							</md-tab>
							<md-tab id="awards" :md-label="awards.data.length + ' Awards'">
								<md-list class="">
									<md-list-item v-for="win in awards.data" :href="'/' + win.project.data.url_id">
										<md-icon md-src="/assets/svg/trophy.svg"></md-icon>

										<div class="md-list-text-container">
											<span>
												{{win.project.data.name}} won:
											</span>
											<span>{{win.award.data.name||win.award.name}}</span>
											<span>
												<i class="fa fa-clock-o"></i>&nbsp;<abbr :title="win.created_at|vmUtc|vmLocal|vmDateFormat('lll')">{{win.created_at|vmTimeAgo}}</abbr>
											</span>
										</div>
									</md-list-item>
								</md-list>
							</md-tab>
						</md-tabs>

					</div>
				</div>
			</section>

		</div>
	</section>
</template>
<style></style>
<script type="text/javascript">
    export default{
        name: 'user-awards',
        props: ['user'],
        data(){
            return {
                awards: null,
                nominations: null,
                nominated: null,
            }
        },
        computed: {
            isUser(){
                return this.$root.user && (this.user.id === this.$root.user.id);
            },
        },
        methods: {},
        mounted(){
            this.$http.get('wins', {params:{user: this.user.id}})
                .then(result => this.awards = result.data, (error) => console.log(error));

            this.$http.get('nominations', {params:{
                user: this.user.id,
                include: 'user,project,award'
            }})
                .then(result => this.nominations = result.data, (error) => console.log(error));

            this.$http.get('nominations', {params:{
                notUser: this.user.id,
                include: 'user,project,award'
            }})
                .then(result => this.nominated = result.data, (error) => console.log(error));

        }
    }
</script>