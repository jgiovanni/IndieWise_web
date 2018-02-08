<template>
    <header>
        <!-- Top -->
        <section id="top" class="topBar show-for-large" v-cloak>
            <div class="row">
                <div class="medium-6 columns">
                    <div class="socialLinks">
                        <a href="https://www.facebook.com/getindiewise" target="_blank"><i class="fa fa-facebook-f"></i></a>
                        <a href="https://twitter.com/getindiewise" target="_blank"><i class="fa fa-twitter"></i></a>
                        <a href="https://www.instagram.com/getindiewise/" target="_blank"><i class="fa fa-instagram"></i></a>
                        <a href="https://convention.getindiewise.com" target="_blank" style="width: auto;padding-left: 7px;padding-right: 7px;"><i>IndieWise Convention</i></a>
                    </div>
                </div>
                <div class="medium-6 columns">
                    <div class="top-button">
                        <ul class="menu float-right">
                            <!--<li :class="{active :isCurrentUrlChild('profile', 'upload')}">
                                <a href="upload">upload Project</a>
                            </li>-->
                            <li class="dropdown-login">
                                <a v-if="!isAuthenticated" @click="loginModal">Login/Register</a>
                                <a v-else @click="doSignOut()">logout</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
        <!-- End Top -->

        <!--Navbar-->
        <section id="navBar">
            <nav class="sticky-container" data-sticky-container>
                <div class="sticky topnav" data-sticky data-top-anchor="navBar" data-check-every="1"
                     data-btm-anchor="footer-bottom:bottom" data-margin-top="0" data-margin-bottom="0"
                     style="width: 100%; background: rgb(255, 255, 255);" data-sticky-on="small">
                    <div class="row" style="">
                        <md-toolbar md-theme="white hide-for-large" :class="{'md-tall': showSearchBar}">
                            <md-button class="md-icon-button" aria-label="Menu" @click.native="toggleLeftSidenav()">
                                <md-icon>menu</md-icon>
                            </md-button>
                            <md-image href="/" md-src="/assets/img/Logo_alt2_web_87x45.png"></md-image>
                            <span style="flex: 1;"></span>
                            <md-avatar class="md-icon-button" aria-label="Profile" :href="isAuthenticated ? ('/user/' + $root.user) : '/login'">
                                <md-icon v-if="!isAuthenticated || (isAuthenticated && !$root.user.avatar)">
                                    account_circle
                                </md-icon>
                                <img v-if="isAuthenticated && $root.user.avatar" :src="$root.user.avatar"
                                     class="md-avatar md-contact-avatar" :alt="$root.user.fullName"/>
                            </md-avatar>
                            <md-button class="md-icon-button" aria-label="Notifications"
                                       @click.native="toggleRightSidenav()" v-if="isAuthenticated">
                                <md-icon>notifications</md-icon>
                            </md-button>
                            <md-button class="md-icon-button" aria-label="Search"
                                       @click.native="showSearchBar=!showSearchBar">
                                <md-icon v-if="showSearchBar">close</md-icon>
                                <md-icon v-else>search</md-icon>
                            </md-button>
                                <!--<form flex="100" v-show="showSearchBar" @submit.prevent="Body.startSearch($root.searchText)" id="NavSearch" name="NavSearch">
                                    {{&#45;&#45;<md-field class="md-block">
                                    <input ng-model="$root.searchText" my-enter="Body.startSearch($root.searchText)" type="text" placeholder="Search Anything" md-autofocus="showSearchBar">
                                </md-field>&#45;&#45;}}
                                    <div class="input-group" style="margin: 10px 0 0">
                                        <input class="input-group-field" ng-model="$root.searchText" my-enter="Body.startSearch($root.searchText)" type="text" placeholder="Search Anything">

                                        <div class="input-group-button hide">
                                            <button type="submit" name="search"><i class="fa fa-search"></i></button>
                                        </div>
                                    </div>
                                </form>-->
                        </md-toolbar>
                        <div class="large-12 columns">

                            <div class="top-bar show-for-large" id="beNav" style="width: 100%;">
                                <div class="top-bar-left search-btn">
                                    <ul class="menu">
                                        <li class="menu-text">
                                            <a href="/">
                                                <img src="/assets/img/Logo_alt2_web_87x45.png" alt="logo">
                                            </a>
                                        </li>
                                        <li class="search end" @click="showSearchBar = !showSearchBar">
                                            <i class="fa fa-search"></i>
                                        </li>
                                    </ul>
                                </div>
                                <div class="top-bar-right search-btn" v-cloak>
                                    <ul v-if="isAuthenticated" class="" dropdown-menu>
                                        <a :href="'/user/' + $root.user.url_id">
                                            <md-avatar class="md-icon-button" aria-label="Profile" >
                                                <img v-if="$root.user.avatar" :src="$root.user.avatar"
                                                     class="md-avatar md-contact-avatar" :alt="$root.user.fullName"/>
                                                <md-icon v-else>account_circle</md-icon>
                                            </md-avatar>
                                        </a>
                                        <md-menu md-size="huge" md-direction="bottom-start" @open="notificationsMenuOpened" id="notificationsMenu" ref="notificationsMenu">
                                            <md-button class="md-icon-button" md-menu-trigger>
                                                <md-icon v-if="!$root.notifications.loaded">notifications_none</md-icon>
                                                <template v-else>
                                                    <md-icon v-if="$root.notifications.unseen>0">notifications_none</md-icon>
                                                    <md-icon v-else>notifications</md-icon>
                                                </template>
                                            </md-button>
                                            <md-menu-content id="notificationsMenuContent">
                                                <md-toolbar class="md-dense md-primary">
                                                    <div class="md-title" style="flex: 1;">Notifications</div>
                                                    <md-button class="md-dense md-icon-button" @click.native="markAllAsRead">
                                                        <md-icon>check_circle</md-icon>
                                                        <md-tooltip>Mark All As Read</md-tooltip>
                                                    </md-button>
                                                </md-toolbar>
                                                <md-list class="notification-list">
                                                    <notification-item v-for="notice in $root.notifications.list" :key="notice.id" :notification="notice" :verb="notice.verb" :class="{'unread': !notice.is_read}"></notification-item>
                                                </md-list>
                                            </md-menu-content>
                                        </md-menu>
                                        <!--<md-button class="md-icon-button" href="/messages"><md-icon>email</md-icon></md-button>-->
                                        <md-button class="md-icon-button md-raised md-primary" href="/upload">
                                            <md-icon>cloud_upload</md-icon>
                                            <md-tooltip md-direction="left">Upload Project</md-tooltip>
                                        </md-button>
                                        <!--<li class="search">-->
                                        <!--</li>-->
                                        <!--<li class="search">-->
                                            <!--<i class="fa" @click="Body.toggleSideNav('right');Body.markAllAsRead();Body.markAllAsSeen()" :class="{'fa-bell': $root.Notifications.unseen, 'fa-bell-o': $root.Notifications.loaded === 'indeterminate' || !$root.Notifications.unseen}"></i>-->
                                            <!--<span v-show="$root.Notifications.unseen>0" class="alert badge">{{$root.Notifications.unseen}}</span>-->
                                        <!--</li>-->
                                        <!--<li class="search">-->
                                            <!--<a href="messages"><i class="fa fa-envelope"></i></a>-->
                                            <!--<span v-show="$root.MessageNotifications.unread>0" class="alert badge">{{$root.MessageNotifications.unread}}</span>-->
                                        <!--</li>-->
                                        <!--<li class="upl-btn end">
                                            <a href="profile/upload">Upload Project</a>
                                        </li>-->
                                    </ul>
                                    <ul v-else class="menu dropdown" dropdown-menu>
                                        <md-button class="md-icon-button md-raised md-primary" href="/upload">
                                            <md-icon>cloud_upload</md-icon>
                                            <md-tooltip md-direction="left">Upload Project</md-tooltip>
                                        </md-button>
                                    </ul>
                                </div>
                                <div class="top-bar-right">
                                    <ul class="menu vertical medium-horizontal"
                                        data-responsive-menu="drilldown medium-dropdown">
                                        <li :class="{active: isFirstUrlSegment('')}">
                                            <a href="/"><i class="fa fa-home"></i>Home</a>
                                        </li>

                                        <li :class="{active: isFirstUrlSegment('browse')}">
                                            <a href="/browse"><i class="fa fa-th"></i>Browse</a>
                                            <ul class="menu submenu is-dropdown-submenu first-sub vertical" data-submenu="" aria-hidden="true" role="menu">
                                                <li v-for="type in $root.typesList" :key="type.id" class="menu-item is-submenu-item is-dropdown-submenu-item" role="menuitem"><a :href="'/browse?types='+type.slug"><i class="fa fa-play"></i><span class="fontawesome-text"> {{type.name}}</span></a></li>
                                            </ul>
                                        </li>
                                        <li :class="{active: isFirstUrlSegment('latest')}">
                                            <a href="/latest"><i class="fa fa-bolt"></i>Latest</a>
                                        </li>
                                        <li :class="{active: isFirstUrlSegment('winners')}">
                                            <a href="/winners"><i class="fa fa-star"></i>Winners</a>
                                        </li>
                                        <!--<li class="">
                                            <a href="https://convention.getindiewise.com" style="background-color: rgba(105,105,233, .8);color: #fff;border-radius: 5px;padding: 32px 15px;"><i class="fa fa-group"></i>Convention</a>
                                        </li>-->
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="search-bar" class="clearfix search-bar-light" :class="{ 'search-bar-active': showSearchBar }">
                        <form class="md-layout md-layout-item md-alignment-center-center" @submit.prevent="searchTerms">
                            <div class="md-layout-item">
                                <!--<md-input v-model="searchText" :fetch="startSearch"></md-input>-->
                                <md-autocomplete v-model="searchText" :md-options="searchResults"
                                                 @md-changed="startSearch" @md-selected="handleSelectedResult"
                                                 @keydown.enter="window.location = '/browse?q=' + searchText">
                                    <label>Search Projects</label>
                                    <template slot="md-autocomplete-item" slot-scope="{ item }">{{ item.name }}</template>
                                </md-autocomplete>
                            </div>
                            <div class="md-layout-item md-size-15">
                                <md-button :href="'/browse?q=' + searchText" class="md-primary">Search</md-button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
        </section>
    </header>
</template>
<style scoped>
    .upload-btn {
        position: absolute;
        right: 10px;
    }
    .md-menu[id='notificationsMenu'] {
        top: -6px;
        position: relative;
    }
    .menu>li>a i,.menu>li>a img,.menu>li>a svg {
        margin-right: .625rem;
        display: inline-block
    }
    .search-bar-light.search-bar-active {
        display: block !important;
    }
</style>
<script type="text/javascript">
    import notificationItem from './notification-item.vue';
    export default {
        name: 'nav-header',
        components: {notificationItem},
        data() {
            return {
                showSearchBar: false,
                searchText: '',
                searchResults: [],
                lastSearchRequest: null,
            }
        },
        computed: {},
        methods: {
            toggleLeftSidenav() {
                this.$root.$emit('toggleLeftSidenav', true);
            },
            toggleRightSidenav() {
                this.$root.$emit('overVideoPlayer', false);
            },
            closeLeftSideNav() {
                this.$root.$emit('closeLeftSideNav', false);
            },
            closeRightSideNav() {
                this.$root.$emit('overVideoPlayer', false);
            },
            notificationsMenuOpened() {
                this.markAllAsRead();
                this.markAllAsSeen()
            },
            markAllAsRead(){
                let self = this;
                this.$root.getNotificationToken('notification', this.$root.user.id).then(function (token) {
                    let feed = self.$root.StreamClient.feed('notification', self.$root.user.id, token);
                    feed.get({limit: 20, mark_read: true}, function (a) {
                        _.each(self.$root.notifications.list, function (n) {
                            n.is_read = true;
                        });
                        self.$root.notifications.unread = 0;
                    })
                });
            },
            markAllAsSeen(){},
            startSearch(params){
                return this.$http.get('projects', { params: {
                    order: 'DESC',
                    search: params.q,
                    per_page: 10,
                    page: 1
                }, before: function(xhr) {
                    if (this.lastSearchRequest) {
                        this.lastSearchRequest.abort();
                    }
                    this.lastSearchRequest = xhr;
                }}).then((response) => {
                    return this.searchResults = response.data.data;
                }, function (error) {
                    // console.log(error);
                });
            },
            searchTerms(){
                window.location = '/browse?q=' + this.searchText;
            },
            handleSelectedResult(project) {
                console.log(project);
                window.location = '/' + project.url_id;

            }
        },
        mounted(){
            this.generateTypes();
            let self = this;
            this.$root.$on('search-bar:toggle', function (val) {
                self.showSearchBar = val || !self.showSearchBar;
            });
        }
    }
</script>