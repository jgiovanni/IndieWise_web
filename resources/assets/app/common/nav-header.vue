<template>
    <header>
        <!-- Top -->
        <section id="top" class="topBar show-for-large" v-cloak>
            <div class="row">
                <div class="medium-6 columns">
                    <div class="socialLinks">
                        <a href="https://www.facebook.com/getindiewise" target="_blank"><i class="fa fa-facebook-f"></i></a>
                        <a href="https://twitter.com/getindiewise" target="_blank"><i class="fa fa-twitter"></i></a>
                        <a href="https://www.instagram.com/getindiewise/" target="_blank"><i
                                class="fa fa-instagram"></i></a>
                    </div>
                </div>
                <div class="medium-6 columns">
                    <div class="top-button">
                        <ul class="menu float-right">
                            <!--<li :class="{active :isCurrentUrlChild('profile', 'upload')}">
                                <a href="upload">upload Project</a>
                            </li>-->
                            <li class="dropdown-login">
                                <a v-if="!isAuthenticated" href="sign-in">Login/Register</a>
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
                <div class="sticky topnav" data-sticky data-top-anchor="navBar"
                     data-btm-anchor="footer-bottom:bottom" data-margin-top="0" data-margin-bottom="0"
                     style="width: 100%; background: rgb(255, 255, 255);" data-sticky-on="small">
                    <div class="row" style="">
                        <md-toolbar md-theme="white hide-for-large" :class="{'md-tall': showMobileSearch}">
                            <md-button class="md-icon-button" aria-label="Menu" @click="toggleLeftSidenav()">
                                <md-icon>menu</md-icon>
                            </md-button>
                            <md-image href="/" md-src="/assets/img/Logo_alt2_web_87x45.png"></md-image>
                            <span style="flex: 1;"></span>
                            <md-avatar class="md-icon-button" aria-label="Profile" href="profile">
                                <md-icon v-if="!isAuthenticated || (isAuthenticated && !$root.user.avatar)">
                                    account_circle
                                </md-icon>
                                <img v-if="isAuthenticated && $root.user.avatar" :src="$root.user.avatar"
                                     class="md-avatar md-contact-avatar" :alt="$root.user.fullName"/>
                            </md-avatar>
                            <md-button class="md-icon-button" aria-label="Notifications"
                                       @click="toggleRightSidenav()" v-if="isAuthenticated">
                                <md-icon>notifications</md-icon>
                            </md-button>
                            <md-button class="md-icon-button" aria-label="Search"
                                       @click="showMobileSearch=!showMobileSearch">
                                <md-icon v-if="showMobileSearch">close</md-icon>
                                <md-icon v-else>search</md-icon>
                            </md-button>
                                <!--<form flex="100" v-show="showMobileSearch" @submit.prevent="Body.startSearch($root.searchText)" id="NavSearch" name="NavSearch">
                                    {{&#45;&#45;<md-input-container class="md-block">
                                    <input ng-model="$root.searchText" my-enter="Body.startSearch($root.searchText)" type="text" placeholder="Search Anything" md-autofocus="showMobileSearch">
                                </md-input-container>&#45;&#45;}}
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
                                <div class="top-bar-left  search-btn">
                                    <ul class="menu">
                                        <li class="menu-text">
                                            <a href="/">
                                                <img src="/assets/img/Logo_alt2_web_87x45.png" alt="logo">
                                            </a>
                                        </li>
                                        <li class="search end">
                                            <i class="fa fa-search"></i>
                                        </li>
                                    </ul>
                                </div>
                                <div class="top-bar-right search-btn" v-cloak>
                                    <ul v-if="isAuthenticated" class="menu dropdown" dropdown-menu>
                                        <li class="search" href="profile">
                                            <i class="fa fa-user"></i>
                                        </li>
                                        <li class="search ">
                                            <!--<i class="fa" @click="Body.toggleSideNav('right');Body.markAllAsRead();Body.markAllAsSeen()" :class="{'fa-bell': $root.Notifications.unseen, 'fa-bell-o': $root.Notifications.loaded === 'indeterminate' || !$root.Notifications.unseen}"></i>-->
                                            <!--<span v-show="$root.Notifications.unseen>0" class="alert badge">{{$root.Notifications.unseen}}</span>-->
                                        </li>
                                        <li class="search" href="messages">
                                            <i class="fa fa-envelope"></i>
                                            <!--<span v-show="$root.MessageNotifications.unread>0" class="alert badge">{{$root.MessageNotifications.unread}}</span>-->
                                        </li>
                                        <li class="upl-btn end">
                                            <a href="profile/upload">Upload Project</a>
                                        </li>
                                    </ul>
                                    <ul v-else class="menu dropdown" dropdown-menu>
                                        <li class="upl-btn end">
                                            <a href="profile/upload">Upload Project</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="top-bar-right">
                                    <ul class="menu vertical medium-horizontal"
                                        data-responsive-menu="drilldown medium-dropdown">
                                        <li :class="{active: isFirstUrlSegment('')}">
                                            <a href=""><i class="fa fa-home"></i>Home</a>
                                        </li>
                                        <li :class="{active: isFirstUrlSegment('browse')}">
                                            <a href="browse"><i class="fa fa-th"></i>Browse
                                            </a>
                                        </li>
                                        <li :class="{active: isFirstUrlSegment('latest')}">
                                            <a href="latest"><i class="fa fa-bolt"></i>Latest</a>
                                        </li>
                                        <li :class="{active: isFirstUrlSegment('winners')}">
                                            <a href="winners"><i class="fa fa-star"></i>Winners</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="search-bar" class="clearfix search-bar-light">
                        <form @submit.prevent="Body.startSearch($root.searchText)">
                            <div class="search-input float-left">
                                <!--<angucomplete-alt id="members"
                                                  placeholder="Search"
                                                  pause="400"
                                                  selected-object="$root.searchSelected"
                                                  remote-url="https://api.backand.com:443/1/objects/Search?pageSize=20&pageNumber=1&exclude=metadata%2C%20totalRows&search="
                                                  remote-url-data-field="data"
                                                  title-field="term"
                                                  input-class="form-control form-control-small"/>-->
                                <input type="search" v-model="searchText" my-enter="Body.startSearch($root.searchText)"
                                       placeholder="Search Anything">
                            </div>
                            <div class="search-btn float-right text-right">
                                <button class="button" type="submit">search now</button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
        </section>
    </header>
</template>
<style scoped></style>
<script type="text/babel">
    export default {
        name: 'nav-header',
        data() {
            return {
                showMobileSearch: false,
                searchText: ''
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
            }
        },
        mounted(){

        }
    }
</script>