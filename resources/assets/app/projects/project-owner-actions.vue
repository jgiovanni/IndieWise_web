<template>
	<md-layout md-flex="100" class="SinglePostStats" id="SinglePostStats">
		<md-layout md-flex class="secBg padding-8">
			<md-button class="video-btn" :href="'/'+project.url_id + '/edit'">
				<md-icon>edit_mode</md-icon> Edit Project
			</md-button>
		</md-layout>
	</md-layout>
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