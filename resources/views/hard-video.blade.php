<!DOCTYPE html>
<html lang="en" ng-app="IndieWise" class="no-js" ng-strict-di>
<head>
    <title>IndieWise</title>
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

    <!--Favicon - http://realfavicongenerator.net/ -->
    <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png?v=dLL8Gal3KG">
    <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png?v=dLL8Gal3KG">
    <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png?v=dLL8Gal3KG">
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png?v=dLL8Gal3KG">
    <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png?v=dLL8Gal3KG">
    <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png?v=dLL8Gal3KG">
    <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png?v=dLL8Gal3KG">
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png?v=dLL8Gal3KG">
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png?v=dLL8Gal3KG">
    <link rel="icon" type="image/png" href="/favicon-32x32.png?v=dLL8Gal3KG" sizes="32x32">
    <link rel="icon" type="image/png" href="/android-chrome-192x192.png?v=dLL8Gal3KG" sizes="192x192">
    <link rel="icon" type="image/png" href="/favicon-96x96.png?v=dLL8Gal3KG" sizes="96x96">
    <link rel="icon" type="image/png" href="/favicon-16x16.png?v=dLL8Gal3KG" sizes="16x16">
    <link rel="manifest" href="/manifest.json?v=dLL8Gal3KG">
    <link rel="mask-icon" href="/safari-pinned-tab.svg?v=dLL8Gal3KG" color="#5bbad5">
    <link rel="shortcut icon" href="/favicon.ico?v=dLL8Gal3KG">
    <meta name="msapplication-TileColor" content="#00aba9">
    <meta name="msapplication-TileImage" content="/mstile-144x144.png?v=dLL8Gal3KG">
    <meta name="theme-color" content="#ffffff">

    <!-- Twitter summary card metadata -->
    <meta property="twitter:card" content="summary"/>
    <meta property="twitter:site" content="@indiewise"/>
    <meta property="twitter:title" content="{{ $project->name }}"/>
    <meta property="twitter:description" content="{{ $project->description }}"/>
    <meta property="twitter:image" content="{{ $project->thumbnail_url }}"/>
    <meta property="twitter:url" content="{{ url()->current() }}"/>

    <!-- Facebook, Pinterest, Google Plus and others make use of open graph metadata -->
    <meta property="fb:app_id" content="150687055270744" />
    <meta property="og:site_name" content="IndieWise"/>
    <meta property="og:locale" content="en_US">
    <meta property="og:title" content="{{ $project->name }}"/>
    <meta property="og:type" content="video.other"/>
    <meta property="og:description" content="{{ $project->description }}"/>
    <meta property="og:image" content="{{ $project->thumbnail_url }}"/>
    <meta property="og:url" content="{{ url()->current() }}"/>

    {{--<script src="https://cdn.jsdelivr.net/g/underscorejs@1.8.3,jquery@1.11.2,momentjs@2.13.0,momentjs.timezone@0.5.4(moment-timezone-with-data.min.js),fastclick@1.0.6"></script>--}}
    <script type="text/javascript" src="/js/main.js"></script>

    <script>window.BASE = '/';</script>
    <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href='//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic'>
    <link rel="stylesheet" href="/app/bower_components/foundation-datepicker/css/foundation-datepicker.min.css"/>
    <link rel="stylesheet" href="/app/bower_components/angular-loading-bar/build/loading-bar.css"/>
    <link rel="stylesheet" href="/app/bower_components/animate.css/animate.min.css"/>

    <!-- Elite Video Player Scripts-->
    <script type="text/javascript" src="/app/eliteplayer/deploy/js/froogaloop.js"></script>
    <script type="text/javascript" src="/app/eliteplayer/deploy/js/jquery.mCustomScrollbar.js"></script>
    <script type="text/javascript" src="/app/eliteplayer/deploy/js/THREEx.FullScreen.js"></script>
    <script type="text/javascript" src="/app/eliteplayer/deploy/js/videoPlayer.js"></script>
    <script type="text/javascript" src="/app/eliteplayer/deploy/js/Playlist.js"></script>
    <script type="text/javascript" src="/app/eliteplayer/deploy/js/ZeroClipboard.js"></script>

    <!-- BeTube Styles-->
    <link rel="stylesheet" href="/assets/css/app.css">
    <link rel="stylesheet" href="/assets/css/theme.css">
    <link rel="stylesheet" href="/assets/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" type="text/css">
    <link rel="stylesheet" href="/assets/layerslider/css/layerslider.css" type="text/css">
    <link rel="stylesheet" href="/assets/css/owl.carousel.min.css">
    <link rel="stylesheet" href="/assets/css/owl.theme.default.min.css">
    <link rel="stylesheet" href="/assets/css/jquery.kyco.easyshare.css">
    <link rel="stylesheet" href="/assets/css/responsive.css">
    <!-- Elite Video Player Styles-->
    <link rel="stylesheet" href="/app/eliteplayer/deploy/css/elite.css" type="text/css" media="screen"/>
    <link rel="stylesheet" href="/app/eliteplayer/deploy/css/elite-font-awesome.css" type="text/css">
    <link rel="stylesheet" href="/app/eliteplayer/deploy/css/jquery.mCustomScrollbar.css" type="text/css">
    <!-- Custom Styles  -->
    <link rel="stylesheet" href="/assets/app.css"/>

    <script>
        /* Replace 'APP_ID' with your app ID */
        window.intercomSettings = {
            app_id: 'ppp65byn'
        };
        /* Replace 'APP_ID' with your app ID */
        (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function")    {ic('reattach_activator');ic('update',intercomSettings);}else{var    d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args)   {i.q.push(args)};w.Intercom=i;function l(){var   s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/ppp65byn';var x=d.getElementsByTagName('script')   [0];x.parentNode.insertBefore(s,x);}if(w.attachEvent)   {w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()
    </script>
    <script type="text/javascript" src="//cdn.broadstreetads.com/init.js"></script>
</head>

<body id="body" ng-controller="BodyCtrl as Body">

<div class="off-canvas-wrapper">
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
            <!--<div class="callout alert-box warning" data-closable>
                <strong>Yo!</strong> We are experiencing technical difficulties, check back later!
                <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>-->

            <div class="ui-view-container">
                <!--breadcrumbs-->
                <section id="breadcrumb">
                    <div class="row">
                        <div class="large-12 columns">
                            <nav aria-label="You are here:" role="navigation">
                                <ul class="breadcrumbs">
                                    <li><i class="fa fa-home"></i><a ui-sref="home">Home</a></li>
                                    <!--<li><a href="#">Animation</a></li>-->
                                    <li>
                                        <a ui-sref="user.about({url_id: VC.film.owner.url_id})">{{ $project->owner->fullName}}</a>
                                    </li>
                                    <li>
                                        <span class="show-for-sr">Current: </span> {{ $project->name }}
                                    </li>
                                    <span class="pull-right" style="position: relative;z-index: 11;font-size: 13px;">
                        <a class="lights-toggle-button" ng-click="VC.toggleLights()" style="color: #ffffff;">
                            <i class="fa fa-lightbulb-o" ng-class="{ 'light-on': VC.lightsOff }"></i>
                            <span ng-if="!VC.lightsOff">Lights Off</span>
                            <span ng-if="VC.lightsOff">Lights On</span>
                        </a>
                        <span class="show-for-large">&nbsp;|&nbsp;</span>
                        <a class="show-for-large" ng-click="VC.toggleWidthMode()"
                           style="position: relative;z-index: 11;font-size: 13px;color: #ffffff;">
                            <i ng-show="!VC.playerResponsiveMode" class="fa fa-expand"></i>
                            <i ng-show="VC.playerResponsiveMode" class="fa fa-compress"></i>
                            <span ng-show="!VC.playerResponsiveMode">Widescreen</span>
                            <span ng-show="VC.playerResponsiveMode">Center</span>
                        </a>
                    </span>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </section><!--end breadcrumbs-->
                <!-- full width Video -->
                <section class="fullwidth-single-video" ng-class="{'no-padding': VC.playerResponsiveMode}">
                    <div class="row" ng-class="{'no-max-width': VC.playerResponsiveMode}">
                        <div class="large-12" ng-class="{'columns': !VC.playerResponsiveMode}">
                            <div class="flex-video widescreen">
                                <img src="{{ $project->thumbnail_url }}">

                                <elite-player ng-if="VC.film" film="VC.film" type="VC.film.hosting_type" lights-off="VC.lightsOff"></elite-player>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="row">
                    <!-- left side content area -->
                    <div class="large-8 columns">
                        <!-- single post stats -->
                        <section class="SinglePostStats" id="SinglePostStats">
                            <!-- newest video -->
                            <div class="row secBg">
                                <div class="large-12 columns">
                                    <div class="media-object stack-for-small">
                                        <div class="media-object-section">
                                            <div class="author-img-sec">
                                                <div class="thumbnail author-single-post">
                                                    <a ui-sref="user.about({url_id: VC.film.owner.url_id})"><img
                                                                src="{{$project->owner->avatar}}" alt="post"></a>
                                                </div>
                                                <p class="text-center">
                                                    <a ui-sref="user.about({url_id: VC.film.owner.url_id})">
                                                        {{ $project->owner->fullName}}
                                                    </a>
                                                </p>
                                            </div>
                                        </div>
                                        <div class="media-object-section object-second">
                                            <div class="author-des clearfix">
                                                <div class="post-title">
                                                    <h4>{{ $project->name }} <span ng-if="::VC.film.nsfw" style="padding: 5px;cursor: default;color: #CC181E;border-color: #CC181E" class="button tiny alert hollow">Mature</span></h4>
                                                    <p>
                                        <span>
                                            <i class="fa fa-clock-o"></i>
                                            <i class="md-caption" am-time-ago="VC.film.created_at"></i>
                                        </span>
                                                        <span><i class="fa fa-smile-o"></i>{{ $project->reactions_count}}</span>
                                                        <span class="double-thumbs"><i class="fa fa-thumbs-o-up"></i><i
                                                                    class="fa fa-thumbs-o-up"></i>{{$project->up_ratings_count}}</span>
                                                        <span class="double-thumbs"><i class="fa fa-thumbs-o-down"></i><i
                                                                    class="fa fa-thumbs-o-down"></i>{{$project->down_ratings_count}}</span>
                                                    <!--<span><i class="fa fa-commenting"></i>{{$project->commentCount}}</span>-->
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="social-share show-for-small-only">
                                            <div class="post-like-btn clearfix">
                                                <form>
                                                    <a class="double-thumbs primary button tiny" ng-click="VC.throttledRate('up')"
                                                       ng-class="{'active':VC.canRate.up}">
                                                        <i class="fa fa-thumbs-o-up"></i><i class="fa fa-thumbs-o-up"></i>
                                                    </a>
                                                    <a class="double-thumbs primary button tiny" ng-click="VC.throttledRate('down')"
                                                       ng-class="{'active':VC.canRate.down}">
                                                        <i class="fa fa-thumbs-o-down"></i><i class="fa fa-thumbs-o-down"></i>
                                                    </a>
                                                    <playlists project="VC.film"></playlists>
                                                    <!--<a class="button tiny" ng-click="VC.openShareDialog()"><i
                                                            class="fa fa-share"></i>Share
                                                    </a>-->
                                                    <a class="button tiny alert" ng-click="VC.reportDialog()">
                                                        <i class="fa fa-flag"></i> Report
                                                    </a>
                                                </form>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section>
                        <!-- End single post stats -->

                        <!-- single post description -->
                        <section class="singlePostDescription">
                            <div class="row secBg">
                                <div class="large-12 columns">
                                    <div class="heading">
                                        <h5>Description</h5>
                                    </div>
                                    <div class="description showmore_one" toggle-show-more>
                                        <p>{{ $project->description }}</p>

                                        <div class="row" ng-if="::VC.film.keyCast">
                                            <div class="columns small-6">
                                <span>
                                    <b>Key Cast</b><br>
                                    <span ng-bind="::VC.film.keyCast"></span>
                                </span><br>
                                            </div>
                                        </div>

                                        <div class="categories">
                                            <button><i class="fa fa-chevron-right"></i>Director</button>
                                            <a ui-sref="browse({q: VC.film.director})" class="inner-btn" ng-bind="::VC.film.director">{{ $project->director or '' }}</a>
                                        </div>
                                        <div class="categories">
                                            <button><i class="fa fa-chevron-right"></i>Writer</button>
                                            <a ui-sref="browse({q: VC.film.writer})" class="inner-btn" ng-bind="::VC.film.writer">{{ $project->writer or '' }}</a>
                                        </div>
                                        <div class="categories">
                                            <button><i class="fa fa-chevron-right"></i>Producer(s)</button>
                                            <a ui-sref="browse({q: VC.film.producers})" class="inner-btn" ng-bind="::VC.film.producers">{{ $project->producers or '' }}</a>
                                        </div>
                                        <div class="categories">
                                            <button><i class="fa fa-chevron-right"></i>Country of Filming</button>
                                            <a ui-sref="browse({q: VC.film.filming_country.name})" class="inner-btn" ng-bind="::VC.film.filming_country.name">{{ $project->filming_country->name or '' }}</a>
                                        </div>
                                        <div class="categories">
                                            <button><i class="fa fa-chevron-right"></i>Year of Completion</button>
                                            <a ui-sref="browse({q: (VC.film.completionDate)})" class="inner-btn" ng-bind="::(VC.film.completionDate)||'N/A'">{{ $project->completionDate or '' }}</a>
                                        </div>
                                        <div class="categories">
                                            <button><i class="fa fa-chevron-right"></i>Type</button>
                                            <a ui-sref="browse({types: VC.film.type.name})" class="inner-btn" ng-bind="::VC.film.type.name">{{ $project->type->name }}</a>
                                        </div>
                                        <div class="categories">
                                            <button><i class="fa fa-chevron-right"></i>Genres</button>
                                            @foreach($project->genres as $genre)
                                            <a ng-repeat="g in VC.film.genres" ui-sref="browse({genres: g.name})" style="margin-right: 2px;" class="inner-btn">
                                                {{ $genre->name}}
                                            </a>
                                            @endforeach
                                        </div>
                                        <div class="categories">
                                            <button><i class="fa fa-chevron-right"></i>Running Time</button>
                                            <a href="#" class="inner-btn"
                                               ng-bind="::VC.film.runTime|secondsToDateTime|date:'HH:mm:ss'"></a>
                                        </div>
                                        <div class="tags">
                                            <button><i class="fa fa-tags"></i>Tags</button>
                                            @foreach(explode(',', $project->tags) as $tag)
                                                <a class="inner-btn" ui-sref="browse({q: tag})" ng-repeat="tag in VC.tagsArray" style="margin-right: 2px;">
                                                    {{ $tag }}
                                                </a>
                                            @endforeach
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                        <!-- End single post description -->
                    </div>
                    <!-- end left side content area -->
                    <!-- sidebar -->
                    <!-- end sidebar -->
                </div>
            </div>

            @include('shared.footer')
        </div>
        <!--end off canvas content-->
    </div>
    <!--end off canvas wrapper inner-->
</div>
<!--end off canvas wrapper-->
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
</body>
</html>
