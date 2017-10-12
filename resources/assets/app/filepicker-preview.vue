<template>
    <div style="height: 500px;">

    </div>
</template>
<style scoped></style>
<script type="text/javascript">
    export default {
        name: 'filepicker-preview',
        props: {
            url: {
                type: String,
                required: true
            },
            css: {
                type: String
            }
        },
        data(){
            return {
                iframe: null
            }
        },
        watch:{
            'url'(url){
                this.setUrl(url);
            }
        },
        methods: {
            setUrl(url){
                if (!url) {
                    return;
                } else {
                    url = url.replace('api/file/', 'api/preview/');
                }
                this.iframe.src = url;
            }
        },
        mounted(){
            this.iframe = document.createElement('iframe');
            this.iframe.src = this.url;
            this.iframe.className = 'md-image md-loaded';

            /* Set full size so it gets size from parrent element  */

            this.iframe.width = '100%';
            this.iframe.height = '100%';
            this.$el.append(this.iframe);

//            scope.$watch('url', setUrl);
        }
    }
</script>