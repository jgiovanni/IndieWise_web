<!DOCTYPE html>
<html lang="en" ng-app="IndieWise" class="no-js" ng-strict-di>
<head>
    <title>IndieWise</title>
    <base href="http://indiewise.dev/">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta property="og:title" content="IndieWise" />
    <meta name="description" content="You be the judge! IndieWise is a platform that encourages constructive dialog and feedback among viewers, critics, and filmmakers.">
    <meta property="og:description" content="You be the judge! What you always wanted, feedback!" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    <meta property="og:image" content="https://www.filestackapi.com/api/file/BhrXLYZCQ4YQtCPAB8cf" />
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="robots" content="NONE">
    <meta property="fb:app_id" content="150687055270744"/>

    <!--Favicon - http://realfavicongenerator.net/ -->
    <link rel="apple-touch-icon" sizes="57x57" href="/public/apple-touch-icon-57x57.png?v=dLL8Gal3KG">
    <link rel="apple-touch-icon" sizes="60x60" href="/public/apple-touch-icon-60x60.png?v=dLL8Gal3KG">
    <link rel="apple-touch-icon" sizes="72x72" href="/public/apple-touch-icon-72x72.png?v=dLL8Gal3KG">
    <link rel="apple-touch-icon" sizes="76x76" href="/public/apple-touch-icon-76x76.png?v=dLL8Gal3KG">
    <link rel="apple-touch-icon" sizes="114x114" href="/public/apple-touch-icon-114x114.png?v=dLL8Gal3KG">
    <link rel="apple-touch-icon" sizes="120x120" href="/public/apple-touch-icon-120x120.png?v=dLL8Gal3KG">
    <link rel="apple-touch-icon" sizes="144x144" href="/public/apple-touch-icon-144x144.png?v=dLL8Gal3KG">
    <link rel="apple-touch-icon" sizes="152x152" href="/public/apple-touch-icon-152x152.png?v=dLL8Gal3KG">
    <link rel="apple-touch-icon" sizes="180x180" href="/public/apple-touch-icon-180x180.png?v=dLL8Gal3KG">
    <link rel="icon" type="image/png" href="/public/favicon-32x32.png?v=dLL8Gal3KG" sizes="32x32">
    <link rel="icon" type="image/png" href="/public/android-chrome-192x192.png?v=dLL8Gal3KG" sizes="192x192">
    <link rel="icon" type="image/png" href="/public/favicon-96x96.png?v=dLL8Gal3KG" sizes="96x96">
    <link rel="icon" type="image/png" href="/public/favicon-16x16.png?v=dLL8Gal3KG" sizes="16x16">
    <link rel="manifest" href="/public/manifest.json?v=dLL8Gal3KG">
    <link rel="mask-icon" href="/public/safari-pinned-tab.svg?v=dLL8Gal3KG" color="#5bbad5">
    <link rel="shortcut icon" href="/public/favicon.ico?v=dLL8Gal3KG">
    <meta name="msapplication-TileColor" content="#00aba9">
    <meta name="msapplication-TileImage" content="/public/mstile-144x144.png?v=dLL8Gal3KG">
    <meta name="theme-color" content="#ffffff">

    {{--<script src="https://cdn.jsdelivr.net/g/underscorejs@1.8.3,jquery@1.11.2,momentjs@2.13.0,momentjs.timezone@0.5.4(moment-timezone-with-data.min.js),fastclick@1.0.6"></script>--}}
    <script type="text/javascript" src="/public/js/main.js"></script>
    {{--<script src="https://cdn.jsdelivr.net/g/momentjs.timezone@0.5.4(moment-timezone-with-data.min.js)"></script>--}}
    <script>window.BASE = '/public/';</script>

    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.css">
    <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href='//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic'>
    <link rel="stylesheet" href="/public/app/bower_components/foundation-datepicker/css/foundation-datepicker.min.css"/>
    <link rel="stylesheet" href="/public/app/bower_components/angular-loading-bar/build/loading-bar.css"/>
    <link rel="stylesheet" href="/public/app/bower_components/animate.css/animate.min.css"/>

    <!-- Elite Video Player Scripts-->
    <script type="text/javascript" src="/public/app/eliteplayer/deploy/js/froogaloop.js"></script>
    <script type="text/javascript" src="/public/app/eliteplayer/deploy/js/jquery.mCustomScrollbar.js"></script>
    <script type="text/javascript" src="/public/app/eliteplayer/deploy/js/THREEx.FullScreen.js"></script>
    <script type="text/javascript" src="/public/app/eliteplayer/deploy/js/videoPlayer.js"></script>
    <script type="text/javascript" src="/public/app/eliteplayer/deploy/js/Playlist.js"></script>
    <script type="text/javascript" src="/public/app/eliteplayer/deploy/js/ZeroClipboard.js"></script>

    <!-- BeTube Styles-->
    <link rel="stylesheet" href="/public/assets/css/app.css">
    <link rel="stylesheet" href="/public/assets/css/theme.css">
    <link rel="stylesheet" href="/public/assets/css/font-awesome.min.css">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" type="text/css">
    <link rel="stylesheet" href="/public/assets/layerslider/css/layerslider.css" type="text/css">
    <link rel="stylesheet" href="/public/assets/css/owl.carousel.min.css">
    <link rel="stylesheet" href="/public/assets/css/owl.theme.default.min.css">
    <link rel="stylesheet" href="/public/assets/css/jquery.kyco.easyshare.css">
    <link rel="stylesheet" href="/public/assets/css/responsive.css">
    <!-- Elite Video Player Styles-->
    <link rel="stylesheet" href="/public/app/eliteplayer/deploy/css/elite.css" type="text/css" media="screen"/>
    <link rel="stylesheet" href="/public/app/eliteplayer/deploy/css/elite-font-awesome.css" type="text/css">
    <link rel="stylesheet" href="/public/app/eliteplayer/deploy/css/jquery.mCustomScrollbar.css" type="text/css">
    <!-- Custom Styles  -->
    <link rel="stylesheet" href="/public/assets/app.css"/>

    <script>
        /* Replace 'APP_ID' with your app ID */
        window.intercomSettings = {
            app_id: 'ppp65byn'
        };
        /* Replace 'APP_ID' with your app ID */
        (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function")    {ic('reattach_activator');ic('update',intercomSettings);}else{var    d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args)   {i.q.push(args)};w.Intercom=i;function l(){var   s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/ppp65byn';var x=d.getElementsByTagName('script')   [0];x.parentNode.insertBefore(s,x);}if(w.attachEvent)   {w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()
    </script>
    <script src="//cdn.broadstreetads.com/init.js"></script>
    <script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>
</head>

<body id="body" layout="row" ng-controller="BodyCtrl as Body" ng-cloak>
    <md-sidenav md-component-id="left" class="md-sidenav-left" md-whiteframe="4">
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
            <md-list class="" >
                <md-list-item ui-sref="home" ui-sref-active="active" ng-click="Body.closeSideNav('left')">
                    <md-icon>home</md-icon>
                    <p>Home</p>
                </md-list-item>
                <md-list-item ui-sref="browse" ui-sref-active="active" ng-click="Body.closeSideNav('left')">
                    <md-icon>view_list</md-icon>
                    <p>Browse</p>
                </md-list-item>
                <md-list-item ui-sref="latest" ui-sref-active="active" ng-click="Body.closeSideNav('left')">
                    <md-icon>new_releases</md-icon>
                    <p>Latest</p>
                </md-list-item>
                <md-list-item ng-if="!isAuthenticated()" ui-sref="sign_in">
                    <p>Login/Register</p>
                </md-list-item>
                <md-list-item ui-sref="profile.about" ui-sref-active="active" ng-if="isAuthenticated()" ng-click="Body.closeSideNav('left')">
                    <md-icon>account_circle</md-icon>
                    <p>Profile</p>
                </md-list-item>
                <md-list-item ui-sref="messages" ui-sref-active="active" ng-if="isAuthenticated()" ng-click="Body.closeSideNav('left')">
                    <md-icon>email</md-icon>
                    <p>
                        Messages
                        <span ng-show="AppData.MessageNotifications.unread>0" class="alert badge">@{{AppData.MessageNotifications.unread}}</span>
                    </p>
                </md-list-item>
                <md-list-item ui-sref="profile.upload" ui-sref-active="active" ng-click="Body.closeSideNav('left')">
                    <md-icon>cloud_upload</md-icon>
                    <p>Upload</p>
                </md-list-item>
                <md-list-item ng-if="isAuthenticated()" ng-click="Body.doSignOut();">
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
                <a class="secondary-button" href="https://facebook.com/getindiewise"><i class="fa fa-facebook"></i></a>
                <a class="secondary-button" href="https://twitter.com/getindiewise"><i class="fa fa-twitter"></i></a>
                <a class="secondary-button" href="https://instagram.com/getindiewise/"><i class="fa fa-instagram"></i></a>
            </div>
        </md-content>
    </md-sidenav>

    <md-content flex layout="column">
        <header>
            <!-- Top -->
            <section id="top" class="topBar show-for-large" ng-cloak>
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
                                    <a ng-if="!isAuthenticated()" ui-sref="sign_in">Login/Register</a>
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
                                        <p class="text-center">New here? <a class="newaccount" ui-sref="register">Create
                                                a new Account</a></p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            <!-- End Top -->
            <!--Navber-->
            @include('shared.navbar')
        </header>
        <!-- End Header -->
        <div ng-if="isNotVerified()" class="callout alert-box warning" data-closable>
            Please check your e-mail and <a ng-click="requestVerificationEmail()" data-close>Verify Your Account</a> to get involved! Check your spam folder just in case.
            <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                <span aria-hidden="true">&times;</span>
            </button>
        </div>

        <div class="ui-view-container">
            <ui-view class="" ng-cloak></ui-view>
        </div>

        @include('shared.footer')
    </md-content>
    <md-sidenav md-component-id="right" class="md-sidenav-right">
        <md-toolbar class="md-accent">
            <div class="md-toolbar-tools">
                <h1 class="md-toolbar-tools text-white">Notifications</h1>
                <span flex></span>
                <md-button class="md-icon-button" aria-label="Close menu" ng-click="Body.closeSideNav('right')">
                    <md-icon>close</md-icon>
                </md-button>
            </div>
        </md-toolbar>
        <md-content>
            <md-list class=" notification-list" >
                <md-list-item ng-repeat-start="notice in AppData.Notifications.list" ng-click="Body.markAsRead(notice);Body.closeSideNav('right')" ng-class="{'unread': !notice.is_read}">
                    <a ng-if="::notice.verb === 'win'" ui-sref="video({url_id: notice.project.url_id})">
                        <i class="notificon fa fa-trophy"></i>&nbsp;Your video <b>@{{::notice.project.name}}</b> won an award!.
                    </a>
                    <a ng-if="::notice.verb === 'nominate'" ui-sref="video({url_id: notice.project.url_id})">
                        <i class="notificon fa fa-trophy"></i>&nbsp;@{{::notice.actors[0].fullName}} nominated <b>@{{::notice.project.name}}</b> for <b>@{{::notice.activities[0].object.award.name}}</b>.
                    </a>
                    <a ng-if="::notice.verb === 'critique'" ui-sref="video({url_id: notice.project.url_id})">
                        <i class="notificon fa fa-star"></i>&nbsp;@{{::notice.actors[0].fullName}} gave <b>@{{::notice.project.name}}</b> a <b>@{{::notice.activities[0].object.overall}}</b>.
                    </a>
                    <a ng-if="::notice.verb === 'react'" ui-sref="video({url_id: notice.project.url_id})">
                        <i class="notificon fa fa-smile-o"></i>&nbsp;Your video made <b>@{{::notice.activities[0].actor.fullName}}</b> feel <b>@{{::notice.activities[0].object.emotion}}</b>.
                    </a>
                    <a ng-if="::notice.verb === 'rate'" ui-sref="video({url_id: notice.project.url_id})">
                        <i class="notificon fa fa-thumbs-o-up"></i>&nbsp;@{{::notice.actors[0].fullName}} gave <b>@{{::notice.project.name}}</b> a <b>@{{::notice.activities[0].object.overall}}</b>.
                    </a>
                    <a ng-if="::notice.verb === 'comment'" ui-sref="video_critique({video_url_id: notice.project.url_id, url_id:notice.object})">
                        <i class="notificon fa fa-comment"></i>&nbsp;<b>@{{::notice.actors[0].fullName}}</b> posted a comment on your critique.
                    </a>
                    <a ng-if="::notice.verb === 'message'" ui-sref="messages">
                        <i class="notificon fa fa-envelope"></i>&nbsp;
                        <ng-pluralize count="notice.activity_count" when="{'one': 'You have 1 new message.', 'other': 'You have {} new messages.'}"></ng-pluralize>
                    </a>
                    <a ng-if="::notice.verb === 'reply'" ui-sref="video_critique({video_url_id: notice.projectUrlId, url_id:notice.critiqueUrlId})">
                        <i class="notificon fa fa-comment"></i>&nbsp;<b>@{{::notice.actorFullName}}</b> replied to your comment.
                    </a>
                </md-list-item>
                <md-list-item ng-repeat-end ng-click="Body.markAsRead(notice);Body.closeSideNav('right')" ng-class="{'unread': !notice.is_read}" >

                </md-list-item>
            </md-list>
        </md-content>
    </md-sidenav>

{{--<div class="off-canvas-wrapper">
    <div class="off-canvas-wrapper-inner" data-off-canvas-wrapper>
        <!--header-->
        @include('shared.offCanvasLeft')

        @include('shared.offCanvasRight')

        <div class="off-canvas-content" data-off-canvas-content>
            <header>
                <!-- Top -->
                <section id="top" class="topBar show-for-large" ng-cloak>
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
                                        <a ng-if="!isAuthenticated()" ui-sref="sign_in">login/Register</a>
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
                                            <p class="text-center">New here? <a class="newaccount" ui-sref="register">Create
                                                    a new Account</a></p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
                <!-- End Top -->
                <!--Navber-->
                @include('shared.navbar')
            </header>
            <!-- End Header -->
            <div ng-if="isNotVerified()" class="callout alert-box warning" data-closable>
                Please check your e-mail and <a ng-click="requestVerificationEmail()" data-close>Verify Your Account</a> to get involved! Check your spam folder just in case.
                <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>

            <div class="ui-view-container">
                <ui-view class="" ng-cloak></ui-view>
            </div>

            @include('shared.footer')
        </div>
        <!--end off canvas content-->
    </div>
    <!--end off canvas wrapper inner-->
</div>--}}
<!--end off canvas wrapper-->

<div id="alerts" ng-cloak>
    <!--<div class="callout alert-box success">
        <strong>Yo!</strong> Alert Success
        <a href="#" class="close">?</a>
    </div>
    <div class="callout alert-box alert">
        <strong>Yo!</strong> Alert Alert
        <a href="#" class="close">?</a>
    </div>
    <div class="callout alert-box info">
        <strong>Yo!</strong> Alert Info
        <a href="#" class="close">?</a>
    </div>
    <div class="callout alert-box warning">
        <strong>Yo!</strong> Alert Warning
        <a href="#" class="close">?</a>
    </div>
    <div class="callout alert-box large">
        <strong>Yo!</strong> Large Alert
        <a href="#" class="close">?</a>
    </div>
    <div class="callout alert-box small">
        <strong>Yo!</strong> Small Alert
        <a href="#" class="close">?</a>
    </div>


    -->
</div>

<!-- Async Social SDKs -->
<div id="fb-root"></div>
<script type="text/javascript">
    (function (doc, script) {
        var js,
                fjs = doc.getElementsByTagName(script)[0],
                add = function (url, id) {
                    if (doc.getElementById(id)) {
                        return;
                    }
                    js = doc.createElement(script);
                    js.src = url;
                    id && (js.id = id);
                    fjs.parentNode.insertBefore(js, fjs);
                };
        // Facebook SDK
        add('//connect.facebook.net/en_US/sdk.js', 'facebook-jssdk');
    }(document, 'script'));
</script>

<!-- AngularJs Components -->
{{--<script src="https://cdn.jsdelivr.net/g/angularjs@1.5.5(angular.js+angular-animate.js+angular-aria.js+angular-messages.js),angular.moment@1.0.0-beta.6,localforage@1.4.0,angular.translate@2.11.0"></script>--}}
<script type="text/javascript" src="/public/js/angular.js"></script>
<script src="/public/js/templates.js"></script>
<script src="//cdn.rawgit.com/gdi2290/angular-intercom/master/angular-intercom.min.js"></script>
{{--<script src="/public/app/bower_components/lodash/lodash.js"></script>--}}
{{--<script src="/public/app/bower_components/getstream/dist/js_min/getstream.js"></script>--}}
{{--<script src="/public/app/bower_components/foundation-datepicker/js/foundation-datepicker.min.js"></script>--}}
{{--<script src="/public/app/bower_components/angular-loading-bar/build/loading-bar.js"></script>--}}
{{--<script src="/public/app/bower_components/angular-ui-scroll/dist/ui-scroll.js"></script>--}}
{{--<script src="/public/app/bower_components/angular-ui-scroll/dist/ui-scroll-jqlite.js"></script>--}}
{{--<script src="/public/app/bower_components/satellizer/dist/satellizer.js"></script>--}}
<script type="text/javascript" src="/public/app/bower_components/angular-filepicker/dist/angular_filepicker.min.js"></script>
{{--<script src="/public/app/bower_components/ng-flow/dist/ng-flow-standalone.js"></script>--}}
<script type="text/javascript" src="/public/app/bower_components/ngAnimate-animate.css/animate.js"></script>
<script src="/public/app/bower_components/angular-foundation-6/dist/angular-foundation.js"></script>
{{--<script src="/public/app/bower_components/angucomplete-alt/dist/angucomplete-alt.min.js"></script>--}}
{{--<script src="/public/app/bower_components/cloudinary-core/cloudinary-core.min.js" type="text/javascript"></script>--}}
{{--<script src="/public/app/bower_components/angular-material/angular-material.min.js"></script>--}}
{{--<script src="/public/app/bower_components/cloudinary_ng/js/angular.cloudinary.min.js" type="text/javascript"></script>--}}
{{--<script src="/public/app/bower_components/angular-localforage/dist/angular-localForage.min.js"></script>--}}
<script type="text/javascript" src="/public/app/bower_components/ng-videosharing-embed/build/ng-videosharing-embed.min.js"></script>
{{--<script src="/public/app/bower_components/angular-google-analytics/dist/angular-google-analytics.min.js"></script>--}}
{{--<script src="https://cdnjs.cloudflare.com/ajax/libs/angular-ui-router/1.0.0-alpha.5/angular-ui-router.min.js"></script>--}}
<!--[if lte IE 9]>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/Base64/0.3.0/base64.min.js"></script>
<![endif]-->
<!-- BeTube script files -->
{{--<script src="/public/app/bower_components/what-input/what-input.js"></script>--}}
{{--<script src="/public/app/bower_components/foundation-sites/dist/foundation.js"></script>--}}
<script type="text/javascript" src="/public/assets/js/jquery.showmore.src.js" ></script>
{{--<script src="/public/assets/js/app.js"></script>--}}
<script src="/public/assets/layerslider/js/greensock.js" type="text/javascript"></script>
<!-- LayerSlider script files -->
<script type="text/javascript" src="/public/assets/layerslider/js/layerslider.transitions.js" ></script>
<script type="text/javascript" src="/public/assets/layerslider/js/layerslider.kreaturamedia.jquery.js"></script>
<script type="text/javascript" src="/public/assets/js/owl.carousel.min.js"></script>
<!--<script src="/public/assets/js/inewsticker.js" type="text/javascript"></script>-->
<!--<script src="/public/assets/js/jquery.kyco.easyshare.js" type="text/javascript"></script>-->

{{--<script src="/public/app/bower_components/angular-socialshare/dist/angular-socialshare.min.js"></script>--}}
<script type="text/javascript" src="/public/js/all.js"></script>
{{--<script src="/public/src/utils.js"></script>--}}

{{--<script src="/public/src/directives.js"></script>--}}
{{--<script src="/public/src/services.js"></script>--}}
{{--<script src="/public/src/controllers.js"></script>--}}
{{--<script src="/public/src/app.js"></script>--}}

</body>
</html>
