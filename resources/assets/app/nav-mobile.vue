<template>
    <md-drawer :md-active.sync="showleftSidenav" class="md-left" v-cloak>
        <md-toolbar class="md-primary">
            <h2 class="md-title text-white" style="flex: 1">Menu</h2>

            <md-button class="md-icon-button" @click.native="closeLeftSideNav()">
                <md-icon>close</md-icon>
            </md-button>
        </md-toolbar>

        <md-list class="md-transparent">
            <md-list-item md-expand v-if="isAuthenticated">
                <md-avatar aria-label="Profile">
                    <md-icon v-if="!$root.user.avatar">
                        account_circle
                    </md-icon>
                    <img v-if="$root.user.avatar" :src="$root.user.avatar" :alt="$root.user.fullName"/>
                </md-avatar>

                <div class="md-list-text-container">
                    <span>{{ $root.user.fullName}}</span>
                    <!--<span>({{ $root.user.email }})</span>-->
                </div>

                <md-list slot="md-expand">
                    <md-list class="md-dense">
                        <md-list-item class="md-inset" :href="'/user/'+ $root.user.url_id">My Profile</md-list-item>
                        <md-list-item class="md-inset" :href="'/user/'+ $root.user.url_id + '/projects'">My Projects</md-list-item>
                        <md-list-item class="md-inset" :href="'/user/'+ $root.user.url_id + '/critiques'">My Critiques</md-list-item>
                        <!--<md-list-item class="md-inset" :href="'/user/'+ $root.user.url_id + '/reactions'">My Reactions</md-list-item>-->
                        <md-list-item class="md-inset" :href="'/user/'+ $root.user.url_id + '/awards'">My Awards</md-list-item>
                        <md-list-item class="md-inset" :href="'/user/'+ $root.user.url_id + '/settings'">My Settings</md-list-item>
                    </md-list>
                </md-list>
            </md-list-item>
        </md-list>

        <div class="md-layout">
            <div class="md-layout-item md-size-100">
                <md-list class="md-dense">
                    <md-list-item href="/" @click.native="closeLeftSideNav()">
                        <md-icon>home</md-icon>
                        <span>Home</span>
                    </md-list-item>
                    <md-list-item href="browse" @click.native="closeLeftSideNav()">
                        <md-icon>view_list</md-icon>
                        <span>Browse</span>
                    </md-list-item>
                    <md-list-item href="latest" @click.native="closeLeftSideNav()">
                        <md-icon>new_releases</md-icon>
                        <span>Latest</span>
                    </md-list-item>
                    <md-list-item href="winners" @click.native="closeLeftSideNav()">
                        <md-icon>grade</md-icon>
                        <span>Winners</span>
                    </md-list-item>
                    <md-list-item href="https://convention.getindiewise.com" target="_blank" @click.native="closeLeftSideNav()">
                        <md-icon>group</md-icon>
                        <span>Convention</span>
                    </md-list-item>
                    <md-list-item v-if="!isAuthenticated" @click.native="loginModal();closeLeftSideNav()">
                        <span>Login/Register</span>
                    </md-list-item>
                    <md-list-item :href="'/user/' + $root.user.url_id" v-if="isAuthenticated" @click.native="closeLeftSideNav()">
                        <md-icon>account_circle</md-icon>
                        <span>Profile</span>
                    </md-list-item>
                    <md-list-item href="messages" v-if="isAuthenticated" @click.native="closeLeftSideNav()">
                        <md-icon>email</md-icon>
                        <span>
                        Messages
                            <!--<span v-show="$root.MessageNotifications.unread>0" class="alert badge">{{AppData.MessageNotifications.unread}}</span>-->
                    </span>
                    </md-list-item>
                    <md-list-item href="upload" @click.native="closeLeftSideNav()">
                        <md-icon>cloud_upload</md-icon>
                        <span>Upload</span>
                    </md-list-item>
                    <md-divider class=""></md-divider>
                    <md-list-item v-if="isAuthenticated" href="#" @click.native="doSignOut();closeLeftSideNav()">
                        <md-icon>exit_to_app</md-icon>
                        <span>Logout</span>
                    </md-list-item>
                </md-list>
            </div>

            <div class="md-layout-item md-size-100 off-social">
                <h6 class="text-center">Get Social</h6>
                <div class="md-layout md-layout-item md-alignment-center-center" md-flex>
                    <a class="secondary-button" href="https://facebook.com/getindiewise" target="_blank"><i class="fa fa-facebook"></i></a>
                    <a class="secondary-button" href="https://twitter.com/getindiewise" target="_blank"><i class="fa fa-twitter"></i></a>
                    <a class="secondary-button" href="https://instagram.com/getindiewise/" target="_blank"><i class="fa fa-instagram"></i></a>
                </div>
            </div>
        </div>
    </md-drawer>
</template>
<style scoped></style>
<script type="text/javascript">
    export default {
        name: 'nav-mobile',
        data(){
            return {
              showleftSidenav: false,
            }
        },
        methods: {
            closeLeftSideNav() {
                this.showleftSidenav = false;
                this.$root.$emit('overVideoPlayer', false);
            },
        },
        mounted(){
            this.$root.$on('toggleLeftSidenav', () => this.showleftSidenav = true);
            this.$root.$on('closeLeftSideNav', () => this.showleftSidenav = false);
        }
    }
</script>