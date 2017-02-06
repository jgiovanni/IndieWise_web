<template>
    <md-sidenav ref="leftSidenav" class="md-left" v-cloak>
        <md-toolbar class="md-primary">
            <h2 class="md-title text-white" style="flex: 1">Menu</h2>

            <md-button class="md-icon-button" @click="closeLeftSideNav()">
                <md-icon>close</md-icon>
            </md-button>
        </md-toolbar>

        <md-list class="md-transparent">
            <md-list-item v-if="isAuthenticated">
                <md-avatar aria-label="Profile">
                    <md-icon v-if="!$root.user.avatar">
                        account_circle
                    </md-icon>
                    <img v-if="$root.user.avatar" :src="$root.user.avatar" :alt="$root.user.fullName"/>
                </md-avatar>

                <div class="md-list-text-container">
                    <span>{{ $root.user.fullName}}</span>
                    <span>{{ $root.user.email }}</span>
                </div>

                <md-list-expand>
                    <md-list class="md-dense">
                        <md-list-item class="md-inset" href="profile">My Profile</md-list-item>
                        <md-list-item class="md-inset" href="profile/projects">My Projects</md-list-item>
                        <md-list-item class="md-inset" href="profile/critiques">My Critiques</md-list-item>
                        <md-list-item class="md-inset" href="profile/reactions">My Reactions</md-list-item>
                        <md-list-item class="md-inset" href="profile/awards">My Awards</md-list-item>
                        <md-list-item class="md-inset" href="profile/settings">My Settings</md-list-item>
                    </md-list>
                </md-list-expand>
            </md-list-item>
        </md-list>

        <md-layout md-column>
            <!--{{&#45;&#45;<md-subheader>
            <md-input-container>
                <label for="leftMenuSearch">Search Anything</label>
                <input id="leftMenuSearch" type="text" ng-model="AppData.searchText" my-enter="Body.startSearch(AppData.searchText)" placeholder="Search Anything">
            </md-input-container>
        </md-subheader>&#45;&#45;}}-->
            <md-list class="md-dense">
                <md-list-item href="/" @click="closeLeftSideNav()">
                    <md-icon>home</md-icon>
                    <span>Home</span>
                </md-list-item>
                <md-list-item href="browse" @click="closeLeftSideNav()">
                    <md-icon>view_list</md-icon>
                    <span>Browse</span>
                </md-list-item>
                <md-list-item href="latest" @click="closeLeftSideNav()">
                    <md-icon>new_releases</md-icon>
                    <span>Latest</span>
                </md-list-item>
                <md-list-item href="winners" @click="closeLeftSideNav()">
                    <md-icon>grade</md-icon>
                    <span>Winners</span>
                </md-list-item>
                <md-list-item v-if="!isAuthenticated" href="sign-in" @click="closeLeftSideNav()">
                    <span>Login/Register</span>
                </md-list-item>
                <md-list-item href="profile/about" v-if="isAuthenticated" @click="closeLeftSideNav()">
                    <md-icon>account_circle</md-icon>
                    <span>Profile</span>
                </md-list-item>
                <md-list-item href="messages" v-if="isAuthenticated" @click="closeLeftSideNav()">
                    <md-icon>email</md-icon>
                    <span>
                        Messages
                        <!--<span v-show="$root.MessageNotifications.unread>0" class="alert badge">{{AppData.MessageNotifications.unread}}</span>-->
                    </span>
                </md-list-item>
                <md-list-item href="profile/upload" @click="closeLeftSideNav()">
                    <md-icon>cloud_upload</md-icon>
                    <span>Upload</span>
                </md-list-item>
                <md-list-item v-if="isAuthenticated" @click="doSignOut();closeLeftSideNav()">
                    <md-icon>exit_to_app</md-icon>
                    <span>Logout</span>
                </md-list-item>
            </md-list>

            <md-layout class="off-social" md-column>
                <h6 class="text-center">Get Social</h6>
                <md-layout md-align="center" md-flex>
                    <a class="secondary-button" href="https://facebook.com/getindiewise" target="_blank"><i class="fa fa-facebook"></i></a>
                    <a class="secondary-button" href="https://twitter.com/getindiewise" target="_blank"><i class="fa fa-twitter"></i></a>
                    <a class="secondary-button" href="https://instagram.com/getindiewise/" target="_blank"><i class="fa fa-instagram"></i></a>
                </md-layout>
            </md-layout>
        </md-layout>
    </md-sidenav>
</template>
<style scoped></style>
<script type="text/javascript">
    export default {
        name: 'nav-mobile',
        data(){
            return {
                // msg: 'hello',
            }
        },
        methods: {
            closeLeftSideNav() {
                this.$refs.leftSidenav.close();
                this.$root.$emit('overVideoPlayer', false);
            },
        },
        mounted(){
            this.$root.$on('toggleLeftSidenav', this.$refs.leftSidenav.open);
            this.$root.$on('closeLeftSideNav', this.$refs.leftSidenav.close);
        }
    }
</script>