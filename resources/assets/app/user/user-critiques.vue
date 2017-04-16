<template>
	<section class="profile-videos" id="randomMedia" style="padding: 0;">
		<div class="row secBg">

			<section class="content">
				<!-- newest video -->
				<div class="row">
					<div class="large-12 columns">
						<md-tabs md-fixed md-dynamic-height v-if="critiques && critiqued">
							<md-tab id="critiques" :md-label="critiques.data.length + ' Critiques Given'">
								<critique-item v-for="critique in critiques.data" :critique="critique"
								               :parent-url-id="critique.project ? critique.project.data.url_id : ''"
								               :parent-owner-id="critique.project ? critique.project.data.owner_id: ''"></critique-item>
							</md-tab>

							<md-tab id="critiqued" :md-label="critiqued.data.length + ' Critiques Received'">
								<critique-item v-for="critique in critiqued.data" :critique="critique"
								               :parent-url-id="critique.project ? critique.project.data.url_id : ''"
								               :parent-owner-id="critique.project ? critique.project.data.owner_id : ''"></critique-item>
							</md-tab>
						</md-tabs>
					</div>
				</div>
			</section>

			<critique-view :critique="selectedCritique" :parent-url-id="selectedCritique && selectedCritique.project ? selectedCritique.project.data.url_id : ''" :parent-owner-id="selectedCritique && selectedCritique.project ? selectedCritique.project.data.owner_id : ''"></critique-view>
		</div>
	</section>
</template>
<style></style>
<script type="text/javascript">
    import critiqueItem from '../critiques/critique-item.vue';
    import critiqueView from '../critiques/critique-view.vue';
    export default{
        name: 'user-critiques',
        components: {critiqueItem, critiqueView},
        props: ['user'],
        data(){
            return {
                sortOrder: 'created_at|desc',
                critiques: null,
                critiqued: null,
                selectedCritique: null
            }
        },
        computed: {
            isUser(){
                return this.$root.user && (this.user.id === this.$root.user.id);
            },
        },
        methods: {},
        mounted(){
			/*if (this.isUser) {
			 this.user = this.$root.user;
			 } else {
			 this.$http.get('users/' + this.user.id).then(function (response) {
			 this.user = response.body.data;
			 });
			 }*/
			let self = this;
            this.$root.$on('openCritiqueView', function (critique) {
                self.selectedCritique = critique;
            });

            this.$http.get('critiques', {params: {user: this.user.id, include: 'project'}})
                .then(function (response) {
                    this.critiques = response.body
                });

            this.$http.get('critiques', {params: {notUser: this.user.id, include: 'project'}})
                .then(function (response) {
                    this.critiqued = response.body
                });

        }
    }
</script>