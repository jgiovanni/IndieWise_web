<section id="navBar">
    <nav class="sticky-container" data-sticky-container>
        <div class="sticky topnav" data-sticky data-top-anchor="navBar"
             data-btm-anchor="footer-bottom:bottom" data-margin-top="0" data-margin-bottom="0" data-top-anchor="1"
             style="width: 100%; background: #fff;" data-sticky-on="small">
            <div class="row">
                <md-toolbar class="md-primary md-hue-3 hide-for-large" ng-class="{'md-tall': showMobileSearch}" md-whiteframe="1" ng-init="showMobileSearch = false">
                    <div class="md-toolbar-tools" layout-wrap layout="row">
                        <div flex="100" layout="row">
                            <md-button class="md-icon-button" aria-label="Menu" ng-click="Body.toggleSideNav('left')">
                                <md-icon>menu</md-icon>
                            </md-button>
                            <h2>
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
                            <md-button class="md-icon-button" aria-label="Profile" ui-sref="profile.about">
                                <md-icon>account_circle</md-icon>
                            </md-button>
                            <md-button class="md-icon-button" aria-label="Notifications" ng-click="Body.toggleSideNav('right')" ng-if="isAuthenticated()">
                                <md-icon>notifications</md-icon>
                            </md-button>
                            <md-button class="md-icon-button" aria-label="Search" ng-click="showMobileSearch=!showMobileSearch">
                                <md-icon ng-hide="showMobileSearch">search</md-icon>
                                <md-icon ng-show="showMobileSearch">close</md-icon>
                            </md-button>
                        </div>
                        <form flex="100" ng-show="showMobileSearch" ng-submit="Body.startSearch(AppData.searchText)">
                            {{--<md-input-container class="md-block">
                                <input ng-model="AppData.searchText" my-enter="Body.startSearch(AppData.searchText)" type="text" placeholder="Search Anything" md-autofocus="showMobileSearch">
                            </md-input-container>--}}
                            <div class="input-group" style="margin: 10px 0 0">
                                <input class="input-group-field" ng-model="AppData.searchText" my-enter="Body.startSearch(AppData.searchText)" type="text" placeholder="Search Anything">

                                {{--<div class="input-group-button">
                                    <button type="submit" name="search"><i class="fa fa-search"></i></button>
                                </div>--}}
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

                    <div class="top-bar show-for-large" id="beNav" style="width: 100%;">
                        <div class="top-bar-left  search-btn">
                            <ul class="menu">
                                <li class="menu-text">
                                    <a ui-sref="home">
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
                                <li class="search" ui-sref="profile.about">
                                    <i class="fa fa-user"></i>
                                </li>
                                <li class="search ">
                                    <i class="fa" ng-click="Body.toggleSideNav('right');Body.markAllAsRead();Body.markAllAsSeen()" ng-class="{'fa-bell': AppData.Notifications.unseen, 'fa-bell-o': AppData.Notifications.loaded === 'indeterminate' || !AppData.Notifications.unseen}"></i>
                                    <span ng-show="AppData.Notifications.unseen>0" class="alert badge">@{{AppData.Notifications.unseen}}</span>
                                </li>
                                <li class="search" ui-sref="messages">
                                    <i class="fa fa-envelope"></i>
                                    <span ng-show="AppData.MessageNotifications.unread>0" class="alert badge">@{{AppData.MessageNotifications.unread}}</span>
                                </li>
                                <li class="upl-btn end">
                                    <a ui-sref="profile.upload">Upload Video</a>
                                </li>
                            </ul>
                            <ul ng-if="!isAuthenticated()" class="menu dropdown" dropdown-menu>
                                <li class="upl-btn end">
                                    <a ui-sref="profile.upload">Upload Video</a>
                                </li>
                            </ul>
                        </div>
                        <div class="top-bar-right">
                            <ul class="menu vertical medium-horizontal"
                                data-responsive-menu="drilldown medium-dropdown">
                                <li ui-sref-active="active">
                                    <a ui-sref="home"><i class="fa fa-home"></i>Home</a>
                                </li>
                                <li ui-sref-active="active"><a ui-sref="browse"><i class="fa fa-th"></i>Browse</a>
                                </li>
                                <li ui-sref-active="active"><a ui-sref="latest"><i
                                                class="fa fa-bolt"></i>Latest</a></li>
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
