<template>
	<section class="profile-videos" id="randomMedia" style="padding: 0;">
		<div class="row secBg">

			<section class="content">
				<!-- newest video -->
				<div class="row">
					<div class="large-12 columns">
						<md-tabs md-fixed md-dynamic-height v-if="reactions && reacted">
							<md-tab id="reactions" :md-label="reactions.data.length + ' Reactions Given'">
								<md-list class="">
									<md-list-item v-for="reaction in reactions.data" :href="'/' + reaction.project.data.url_id">
										<md-icon class="emoticon" :md-src="getEmoticonByEmotion(reaction.emotion).src"></md-icon>

										<div class="md-list-text-container">
											<span>
												{{reaction.project.data.name}} made you, {{reaction.user.data.fullName}} feel <b>{{reaction.emotion}}</b>
											</span>
											<span>
												<i class="fa fa-clock-o"></i>&nbsp;<abbr :title="reaction.created_at|vmUtc|vmLocal|vmDateFormat('lll')">{{reaction.created_at|vmTimeAgo}}</abbr>
											</span>
										</div>
									</md-list-item>
								</md-list>
							</md-tab>

							<md-tab id="reacted" :md-label="reacted.data.length + ' Reactions Received'">
								<md-list class="">
									<md-list-item v-for="reaction in reacted.data" :href="'/' + reaction.project.data.url_id">
										<md-icon class="emoticon" :md-src="getEmoticonByEmotion(reaction.emotion).src"></md-icon>

										<div class="md-list-text-container">
											<span>
												{{reaction.project.data.name}} made them feel <b>{{reaction.emotion}}</b>
											</span>
											<span>
												<i class="fa fa-clock-o"></i>&nbsp;<abbr :title="reaction.created_at|vmUtc|vmLocal|vmDateFormat('lll')">{{reaction.created_at|vmTimeAgo}}</abbr>
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
        name: 'user-reactions',
        props: ['user'],
        data(){
            return {
                sortOrder: 'created_at|desc',
                reactions: null,
                reacted: null,
	            projects: null,
            }
        },
        computed: {
            isUser(){
                return this.$root.user && (this.user.id === this.$root.user.id);
            },
        },
        methods: {
            getEmoticonByEmotion (emotion) {
                let reactions = this.generateReactions();
                return _.findWhere(reactions, {emotion: emotion});
            }
        },
        mounted(){
            this.$http.get('reactions', {params: {user: this.user.id, include: 'user,project'}})
                .then(function (response) {
                    this.reactions = response.data
                });

            this.$http.get('reactions', {params: {notUser: this.user.id, include: 'user,project'}})
                .then(function (response) {
                    this.reacted = response.data
                });

            this.$http.get('projects', {params: { include: ''}}).then(function (response) {
	            this.projects = response.data.data;
            });
        }
    }
</script>