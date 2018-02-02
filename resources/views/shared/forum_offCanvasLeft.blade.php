<md-drawer md-component-id="left" class="md-drawer-left" ng-cloak md-whiteframe="4">
    <md-toolbar class="md-accent">
        <div class="md-toolbar-tools">
            <h1 class="md-toolbar-tools text-white">Menu</h1>
            <span flex></span>
            <md-button class="md-icon-button" aria-label="Close menu" ng-click="Body.closeSideNav('left')">
                <md-icon>close</md-icon>
            </md-button>
        </div>
    </md-toolbar>
    <md-content>
        {{--<md-subheader>
            <md-input-container>
                <label for="leftMenuSearch">Search Anything</label>
                <input id="leftMenuSearch" type="text" ng-model="AppData.searchText" my-enter="Body.startSearch(AppData.searchText)" placeholder="Search Anything">
            </md-input-container>
        </md-subheader>--}}
        <md-list>
            <md-list-item ui-sref="home" ui-sref-active="active" data-target="_self" target="_self" ng-click="Body.closeSideNav('left')">
                <md-icon>home</md-icon>
                <p>Home</p>
            </md-list-item>
            <md-list-item ui-sref="browse" ui-sref-active="active" data-target="_self" target="_self" ng-click="Body.closeSideNav('left')">
                <md-icon>view_list</md-icon>
                <p>Browse</p>
            </md-list-item>
            <md-list-item ui-sref="latest" ui-sref-active="active" data-target="_self" target="_self" ng-click="Body.closeSideNav('left')">
                <md-icon>new_releases</md-icon>
                <p>Latest</p>
            </md-list-item>
            <md-list-item ui-sref="winners" ui-sref-active="active" data-target="_self" target="_self" ng-click="Body.closeSideNav('left')">
                <md-icon>grade</md-icon>
                <p>Winners</p>
            </md-list-item>
            <md-list-item ng-if="!isAuthenticated()" ui-sref="sign_in" data-target="_self" target="_self" ng-click="Body.closeSideNav('left')">
                <p>Login/Register</p>
            </md-list-item>
            <md-list-item ui-sref="profile.about" ui-sref-active="active" data-target="_self" target="_self" ng-if="isAuthenticated()" ng-click="Body.closeSideNav('left')">
                <md-icon>account_circle</md-icon>
                <p>Profile</p>
            </md-list-item>
            <md-list-item ui-sref="messages" ui-sref-active="active" data-target="_self" target="_self" ng-if="isAuthenticated()" ng-click="Body.closeSideNav('left')">
                <md-icon>email</md-icon>
                <p>
                    Messages
                    <span ng-show="AppData.MessageNotifications.unread>0" class="alert badge">@{{AppData.MessageNotifications.unread}}</span>
                </p>
            </md-list-item>
            <md-list-item ui-sref="profile.upload" ui-sref-active="active" data-target="_self" target="_self" ng-click="Body.closeSideNav('left')">
                <md-icon>cloud_upload</md-icon>
                <p>Upload</p>
            </md-list-item>
            <md-list-item ng-if="isAuthenticated()" ng-click="Body.doSignOut();Body.closeSideNav('left')">
                <md-icon>exit_to_app</md-icon>
                <p>Logout</p>
            </md-list-item>
        </md-list>
        {{--<div class="responsive-search">
            <form ng-submit="Body.startSearch(AppData.searchText)">
                <div class="input-group">
                    <input class="input-group-field" ng-model="AppData.searchText" my-enter="Body.startSearch(AppData.searchText)" type="text" placeholder="Search Anything">

                    <div class="input-group-button">
                        <button type="submit" name="search"><i class="fa fa-search"></i></button>
                    </div>
                </div>
            </form>
        </div>--}}
        <div class="off-social" layout-padding>
            <h6>Get Social</h6>
            <a class="secondary-button" href="https://facebook.com/getindiewise" target="_blank"><i class="fa fa-facebook"></i></a>
            <a class="secondary-button" href="https://twitter.com/getindiewise" target="_blank"><i class="fa fa-twitter"></i></a>
            <a class="secondary-button" href="https://instagram.com/getindiewise/" target="_blank"><i class="fa fa-instagram"></i></a>
        </div>
    </md-content>
</md-drawer>
