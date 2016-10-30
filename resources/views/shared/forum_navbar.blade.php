<header>
    <!-- Top -->
    <section id="top" class="topBar topBarBlack show-for-large" ng-cloak>
        <div class="row">
            <div class="medium-6 columns">
                <div class="socialLinks">
                    <a href="https://www.facebook.com/getindiewise"><i class="fa fa-facebook-f"></i></a>
                    <a href="https://twitter.com/getindiewise"><i class="fa fa-twitter"></i></a>
                    <a href="https://www.instagram.com/getindiewise/"><i class="fa fa-instagram"></i></a>
                </div>
            </div>
            <div class="medium-6 columns">
                <div class="top-button">
                    <ul class="menu float-right">
                        <!--<li ui-sref-active="active">
                            <a ui-sref="upload">upload Video</a>
                        </li>-->
                        <li class="dropdown-login">
                            <a ng-if="!isAuthenticated()" ng-click="Body.toSignInRedirect()">Login/Register</a>
                            <a ng-if="isAuthenticated()" ng-click="Body.doSignOut();">logout</a>

                            <div class="login-form">
                                <h6 class="text-center">Great to have you back!</h6>

                                <form method="post">
                                    <div class="input-group">
                                        <span class="input-group-label"><i class="fa fa-user"></i></span>
                                        <input class="input-group-field" type="text"
                                               placeholder="Enter username">
                                    </div>
                                    <div class="input-group">
                                        <span class="input-group-label"><i class="fa fa-lock"></i></span>
                                        <input class="input-group-field" type="text"
                                               placeholder="Enter password">
                                    </div>
                                    <div class="checkbox">
                                        <input id="check1" type="checkbox" name="check" value="check">
                                        <label class="customLabel" for="check1">Remember me</label>
                                    </div>
                                    <input type="submit" name="submit" value="Login Now">
                                </form>
                                <p class="text-center">New here? <a class="newaccount" ui-sref="register" data-ui-sref-opts="{reload: true}">Create
                                        a new Account</a></p>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
    <!-- End Top -->

    <!--Navbar-->
    <section id="navBar">
    <nav class="sticky-container navBlack" data-sticky-container>
        <div class="sticky topnav" data-sticky data-top-anchor="navBar"
             data-btm-anchor="footer-bottom:bottom" data-margin-top="0" data-margin-bottom="0" data-top-anchor="1"
             style="width: 100%; background: rgb(68, 68, 68);" data-sticky-on="small">
            <div class="row" style="">
                <md-toolbar class="md-primary md-hue-3 hide-for-large" ng-class="{'md-tall': showMobileSearch}" md-whiteframe="1" ng-init="showMobileSearch = false">
                    <div class="md-toolbar-tools" layout-wrap layout="row">
                        <div flex="100" layout="row">
                            <md-button class="md-icon-button" aria-label="Menu" ng-click="Body.toggleSideNav('left')">
                                <md-icon>menu</md-icon>
                            </md-button>
                            <h2 ui-sref="home" data-ui-sref-opts="{reload: true}">
                                <img src="/assets/img/Logo_alt2_web_87x45.png" alt="logo">
                            </h2>
                            {{--<md-autocomplete flex="80"
                                    ng-disabled="isDisabled"
                                    md-no-cache="noCache"
                                    md-selected-item="selectedItem"
                                    md-search-text-change="searchTextChange(searchText)"
                                    md-search-text="searchText"
                                    md-selected-item-change="selectedItemChange(item)"
                                    md-items="item in querySearch(searchText)"
                                    md-item-text="item.display"
                                    md-min-length="0"
                                    placeholder="Search">
                                <md-item-template>
                                    <span md-highlight-text="searchText" md-highlight-flags="^i">@{{item.display}}</span>
                                </md-item-template>
                                <md-not-found>
                                    No states matching "@{{searchText}}" were found.
                                    <a ng-click="newState(searchText)">Create a new one!</a>
                                </md-not-found>
                            </md-autocomplete>--}}
                            <span flex></span>
                            <md-button class="md-icon-button" aria-label="Profile" ui-sref="profile.about" data-ui-sref-opts="{reload: true}">
                                <md-icon ng-if="!isAuthenticated() || (isAuthenticated() && !AppData.User.avatar)">account_circle</md-icon>
                                <img ng-if="isAuthenticated() && AppData.User.avatar" ng-src="@{{AppData.User.avatar}}" class="md-avatar md-contact-avatar" alt="@{{AppData.User.fullName}}" />
                            </md-button>
                            <md-button class="md-icon-button" aria-label="Notifications" ng-click="Body.toggleSideNav('right')" ng-if="isAuthenticated()">
                                <md-icon>notifications</md-icon>
                            </md-button>
                            <md-button class="md-icon-button" aria-label="Search" ng-click="showMobileSearch=!showMobileSearch">
                                <md-icon ng-hide="showMobileSearch">search</md-icon>
                                <md-icon ng-show="showMobileSearch">close</md-icon>
                            </md-button>
                        </div>
                        <form flex="100" ng-show="showMobileSearch" ng-submit="Body.startSearch(AppData.searchText)" id="NavSearch" name="NavSearch">
                            {{--<md-input-container class="md-block">
                                <input ng-model="AppData.searchText" my-enter="Body.startSearch(AppData.searchText)" type="text" placeholder="Search Anything" md-autofocus="showMobileSearch">
                            </md-input-container>--}}
                            <div class="input-group" style="margin: 10px 0 0">
                                <input class="input-group-field" ng-model="AppData.searchText" my-enter="Body.startSearch(AppData.searchText)" type="text" placeholder="Search Anything">

                                <div class="input-group-button hide">
                                    <button type="submit" name="search"><i class="fa fa-search"></i></button>
                                </div>
                            </div>
                        </form>
                    </div>
                </md-toolbar>
                <div class="large-12 columns">

                    {{--<div class="title-bar" data-responsive-toggle="beNav" data-hide-for="large">
                        <button class="menu-icon" type="button" ng-click="Body.toggleSideNav('left')"></button>
                        <div class="title-bar-title">
                            <img src="/assets/img/Logo_alt2_web_87x45.png" alt="logo">
                        </div>
                        <div class="title-bar-right">
                            <a ng-if="isAuthenticated()" class="fa fa-bell menu-icon"></a>
                        </div>
                    </div>--}}

                    <div class="top-bar show-for-large topbar-light-dark" id="beNav" style="width: 100%;">
                        <div class="top-bar-left  search-btn">
                            <ul class="menu">
                                <li class="menu-text">
                                    <a ui-sref="home" data-ui-sref-opts="{reload: true}">
                                        <img src="/assets/img/Logo_alt2_web_87x45.png" alt="logo">
                                    </a>
                                </li>
                                <li class="search end">
                                    <i class="fa fa-search"></i>
                                </li>
                            </ul>
                        </div>
                        <div class="top-bar-right search-btn" ng-cloak>
                            <ul ng-if="isAuthenticated()" class="menu dropdown" dropdown-menu>
                                <li class="search" ui-sref="profile.about" data-ui-sref-opts="{reload: true}">
                                    <i class="fa fa-user"></i>
                                </li>
                                <li class="search ">
                                    <i class="fa" ng-click="Body.toggleSideNav('right');Body.markAllAsRead();Body.markAllAsSeen()" ng-class="{'fa-bell': AppData.Notifications.unseen, 'fa-bell-o': AppData.Notifications.loaded === 'indeterminate' || !AppData.Notifications.unseen}"></i>
                                    <span ng-show="AppData.Notifications.unseen>0" class="alert badge">@{{AppData.Notifications.unseen}}</span>
                                </li>
                                <li class="search" ui-sref="messages" data-ui-sref-opts="{reload: true}">
                                    <i class="fa fa-envelope"></i>
                                    <span ng-show="AppData.MessageNotifications.unread>0" class="alert badge">@{{AppData.MessageNotifications.unread}}</span>
                                </li>
                                <li class="upl-btn end">
                                    <a ui-sref="profile.upload" data-ui-sref-opts="{reload: true}">Upload Video</a>
                                </li>
                            </ul>
                            <ul ng-if="!isAuthenticated()" class="menu dropdown" dropdown-menu>
                                <li class="upl-btn end">
                                    <a ui-sref="profile.upload" data-ui-sref-opts="{reload: true}">Upload Video</a>
                                </li>
                            </ul>
                        </div>
                        <div class="top-bar-right">
                            <ul class="menu vertical medium-horizontal"
                                data-responsive-menu="drilldown medium-dropdown">
                                <li ui-sref-active="active">
                                    <a ui-sref="home" data-ui-sref-opts="{reload: true}"><i class="fa fa-home"></i>Home</a>
                                </li>
                                <li ui-sref-active="active">
                                    <a ui-sref="browse" data-ui-sref-opts="{reload: true}"><i class="fa fa-th"></i>Browse
                                    </a>
                                </li>
                                <li ui-sref-active="active">
                                    <a ui-sref="latest" data-ui-sref-opts="{reload: true}"><i class="fa fa-bolt"></i>Latest</a>
                                </li>
                                <li ui-sref-active="active">
                                    <a ui-sref="winners" data-ui-sref-opts="{reload: true}"><i class="fa fa-star"></i>Winners</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div id="search-bar" class="clearfix search-bar-light">
                <form ng-submit="Body.startSearch(AppData.searchText)">
                    <div class="search-input float-left">
                        <!--<angucomplete-alt id="members"
                                          placeholder="Search"
                                          pause="400"
                                          selected-object="AppData.searchSelected"
                                          remote-url="https://api.backand.com:443/1/objects/Search?pageSize=20&pageNumber=1&exclude=metadata%2C%20totalRows&search="
                                          remote-url-data-field="data"
                                          title-field="term"
                                          input-class="form-control form-control-small"/>-->
                        <input type="search" ng-model="AppData.searchText" my-enter="Body.startSearch(AppData.searchText)" placeholder="Search Anything">
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
