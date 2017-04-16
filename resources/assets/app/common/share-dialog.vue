-<template>
    <md-dialog :ref="'dialog-' + id">
        <md-dialog-title>Share</md-dialog-title>

        <md-dialog-content>
            <div class="input-group">
                <input class="input-group-field" type="text" @click.native="selectShareUrl()" :value="shareLink" readonly/>
            </div>
            <social-sharing :url="shareLink" :title="name" :description="description"
                            hashtags="#indiewise,#getindiewise" twitter-user="indiewise" inline-template>
                <div>
                    <ul class="md-list">
                        <li class="md-list-item">
                            <facebook class="md-button md-button md-list-item-container md-theme-default">
                                    <span class="md-list-item-holder">
                                        <i class="fa fa-facebook md-icon material-icons md-theme-default"></i> <span>Facebook</span>
                                    </span>
                            </facebook>
                        </li>
                        <li class="md-list-item">
                            <twitter class="md-button md-button md-list-item-container md-theme-default">
                                    <span class="md-list-item-holder">
                                        <i class="fa fa-twitter md-icon material-icons md-theme-default"></i> <span>Twitter</span>
                                    </span>
                            </twitter>
                        </li>
                        <li class="md-list-item">
                            <googleplus class="md-button md-button md-list-item-container md-theme-default">
                                    <span class="md-list-item-holder">
                                        <i class="fa fa-google-plus md-icon material-icons md-theme-default"></i> <span>Google +</span>
                                    </span>
                            </googleplus>
                        </li>
                        <li class="md-list-item">
                            <pinterest class="md-button md-button md-list-item-container md-theme-default">
                                    <span class="md-list-item-holder">
                                        <i class="fa fa-pinterest md-icon material-icons md-theme-default"></i> <span>Pinterest</span>
                                    </span>
                            </pinterest>
                        </li>
                        <li class="md-list-item">
                            <reddit class="md-button md-button md-list-item-container md-theme-default">
                                    <span class="md-list-item-holder">
                                        <i class="fa fa-reddit md-icon material-icons md-theme-default"></i> <span>Reddit</span>
                                    </span>
                            </reddit>
                        </li>
                        <li class="md-list-item">
                            <linkedin class="md-button md-button md-list-item-container md-theme-default">
                                    <span class="md-list-item-holder">
                                        <i class="fa fa-linkedin md-icon material-icons md-theme-default"></i> <span>LinkedIn</span>
                                    </span>
                            </linkedin>
                        </li>
                        <li class="md-list-item">
                            <whatsapp class="md-button md-button md-list-item-container md-theme-default">
                                    <span class="md-list-item-holder">
                                        <i class="fa fa-whatsapp md-icon material-icons md-theme-default"></i> <span>Whatsapp</span>
                                    </span>
                            </whatsapp>
                        </li>
                    </ul>
                </div>
            </social-sharing>
        </md-dialog-content>
        <md-dialog-actions>
            <md-button class="md-primary" @click.native="closeShareDialog">Close</md-button>
        </md-dialog-actions>
    </md-dialog>
</template>
<style scoped></style>
<script type="text/babel">
    export default {
        name: 'share-dialog',
        props: ['id', 'name', 'description', 'url'],
        data(){
            return {
                shareLink: location.origin + '/' + this.url
            }
        },
        methods: {
            closeShareDialog() {
                this.$refs['dialog-' + this.id].close();
            },
            selectShareUrl(){

            }
        },
        created(){
            let self = this;
            this.$root.$on('openShareDialog-' + this.id, function () {
                self.$refs['dialog-' + self.id].open();
            });
        }
    }
</script>