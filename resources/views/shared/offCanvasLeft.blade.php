<div class="off-canvas position-left light-off-menu" id="offCanvas-responsive" data-off-canvas data-close-on-click="false" data-force-top="true">
    <div class="off-menu-close">
        <h3>Menu</h3>
        <span data-toggle="offCanvas-responsive"><i class="fa fa-times fa-2x"></i></span>
    </div>
    <ul class="vertical menu off-menu" off-canvas-nav off-canvas-list>
        <li><a ui-sref="home" ui-sref-active="active"><i class="fa fa-home"></i>Home</a></li>
        <li><a ui-sref="browse" ui-sref-active="active"><i class="fa fa-th"></i>Browse</a></li>
        <li><a ui-sref="latest" ui-sref-active="active"><i class="fa fa-bolt"></i>Latest</a></li>
        <li ng-if="isAuthenticated()"><a ui-sref="profile.about" ui-sref-active="active"><i class="fa fa-user"></i>Profile</a></li>
        <li ng-if="isAuthenticated()"><a ui-sref="messages" ui-sref-active="active"><i class="fa fa-envelope"></i>Messages</a></li>
        <li><a ui-sref="profile.upload" ui-sref-active="active"><i class="fa fa-upload"></i>Upload</a></li>
    </ul>
    <div class="responsive-search">
        <form ng-submit="Body.startSearch(AppData.searchText)">
            <div class="input-group">
                <input class="input-group-field" ng-model="AppData.searchText" my-enter="Body.startSearch(AppData.searchText)" type="text" placeholder="Search Anything">

                <div class="input-group-button">
                    <button type="submit" name="search"><i class="fa fa-search"></i></button>
                </div>
            </div>
        </form>
    </div>
    <div class="off-social">
        <h6>Get Social</h6>
        <a class="secondary-button" href="https://www.facebook.com/getindiewise"><i class="fa fa-facebook"></i></a>
        <a class="secondary-button" href="https://twitter.com/getindiewise"><i class="fa fa-twitter"></i></a>
        <a class="secondary-button" href="https://www.instagram.com/getindiewise/"><i class="fa fa-instagram"></i></a>
    </div>
    <div class="top-button">
        <ul class="menu" off-canvas-nav>
            <li class="dropdown-login" ng-if="!isAuthenticated()">
                <a ui-sref="sign_in">login/Register</a>
            </li>
            <li class="dropdown-login" ng-if="isAuthenticated()">
                <a ng-click="Body.doSignOut();">logout</a>
            </li>
        </ul>
    </div>
</div>
