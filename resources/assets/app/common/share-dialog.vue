-<template>
    <md-dialog :md-active.sync="showDialog">
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
                            <network network="facebook" class="md-button md-button md-list-item-container md-theme-default">
                                    <span class="md-list-item-holder">
                                        <i class="fa fa-facebook md-icon material-icons md-theme-default"></i> <span>Facebook</span>
                                    </span>
                            </network>
                        </li>
                        <li class="md-list-item">
                            <network network="twitter" class="md-button md-button md-list-item-container md-theme-default">
                                    <span class="md-list-item-holder">
                                        <i class="fa fa-twitter md-icon material-icons md-theme-default"></i> <span>Twitter</span>
                                    </span>
                            </network>
                        </li>
                        <li class="md-list-item">
                            <network network="googleplus" class="md-button md-button md-list-item-container md-theme-default">
                                    <span class="md-list-item-holder">
                                        <i class="fa fa-google-plus md-icon material-icons md-theme-default"></i> <span>Google +</span>
                                    </span>
                            </network>
                        </li>
                        <li class="md-list-item">
                            <network network="pinterest" class="md-button md-button md-list-item-container md-theme-default">
                                    <span class="md-list-item-holder">
                                        <i class="fa fa-pinterest md-icon material-icons md-theme-default"></i> <span>Pinterest</span>
                                    </span>
                            </network>
                        </li>
                        <li class="md-list-item">
                            <network network="reddit" class="md-button md-button md-list-item-container md-theme-default">
                                    <span class="md-list-item-holder">
                                        <i class="fa fa-reddit md-icon material-icons md-theme-default"></i> <span>Reddit</span>
                                    </span>
                            </network>
                        </li>
                        <li class="md-list-item">
                            <network network="linkedin" class="md-button md-button md-list-item-container md-theme-default">
                                    <span class="md-list-item-holder">
                                        <i class="fa fa-linkedin md-icon material-icons md-theme-default"></i> <span>LinkedIn</span>
                                    </span>
                            </network>
                        </li>
                        <li class="md-list-item">
                            <network network="whatsapp" class="md-button md-button md-list-item-container md-theme-default">
                                    <span class="md-list-item-holder">
                                        <i class="fa fa-whatsapp md-icon material-icons md-theme-default"></i> <span>WhatsApp</span>
                                    </span>
                            </network>
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
<script type="text/javascript">
    import network from 'vue-social-sharing'
    export default {
        name: 'share-dialog',
        props: ['id', 'name', 'description', 'url'],
        data(){
            return {
              showDialog: false,
                shareLink: location.origin + '/' + this.url
            }
        },
        methods: {
            closeShareDialog() {
                this.showDialog = false;
            },
            selectShareUrl(){

            }
        },
        created(){
            this.$root.$on(`openShareDialog-${this.id}`, () => {
                this.showDialog = true;
            });
        }
    }
</script>