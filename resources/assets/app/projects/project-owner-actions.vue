<template>
	<div class="md-layout SinglePostStats" id="SinglePostStats">
		<div class="md-layout-item secBg padding-8">
			<md-button class="video-btn" :href="'/'+project.url_id + '/edit'">
				<md-icon>edit_mode</md-icon> Edit Project
			</md-button>
		</div>
	</div>
</template>
<style></style>
<script type="text/javascript">
    export default{
        name: 'project-owner-actions',
        props: {
            project: {
                type: Object,
                required: true
            },
        },
        data(){
            return {
                msg: null
            }
        },
        methods: {},
        ready(){

        }
    }
</script>