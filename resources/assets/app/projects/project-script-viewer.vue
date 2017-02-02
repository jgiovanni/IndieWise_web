<template>
    <filepicker-preview :url="script"></filepicker-preview>
</template>
<style scoped></style>
<script type="text/babel">
    import filepickerPreview from '../filepicker-preview.vue';
    export default {
        name: 'project-script-viewer',
        components: {filepickerPreview},
        props: {
            project: {
                type: Object,
                required: true
            }
        },
        data(){
            return {
                script: '',
                css: 'https://www.filestackapi.com/api/file/5dYvfXsLTqiri3YfMd1e'
            }
        },
        methods: {},
        mounted(){
            this.script = this.project.video_url + '?cache=true&css=https://www.filestackapi.com/api/file/5dYvfXsLTqiri3YfMd1e'
        }
    }
</script>