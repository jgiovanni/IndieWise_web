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

    <script type="text/javascript" src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"></script>
    {{--<script src="https://cdn.jsdelivr.net/g/underscorejs@1.8.3,jquery@1.11.2,momentjs@2.13.0,momentjs.timezone@0.5.4(moment-timezone-with-data.min.js),fastclick@1.0.6"></script>--}}
    <script type="text/javascript" src="/public/{{ mix('js/main.js') }}"></script>
    {{--<script src="https://cdn.jsdelivr.net/g/momentjs.timezone@0.5.4(moment-timezone-with-data.min.js)"></script>--}}
    <script>window.BASE = '/public/';</script>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossorigin="anonymous">
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
    <link rel="stylesheet" href="/public/{{ mix('css/app.css') }}">
    {{--<link rel="stylesheet" href="/public/assets/css/theme.css">--}}
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
    <link rel="stylesheet" href="/public/{{ mix('css/all.css') }}">

    @yield('css')

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

<body id="body" ng-controller="BodyCtrl as Body" ng-cloak>
@include('shared.offCanvasLeft')

<md-content flex layout="column">
@include('shared.navbar')
<!-- End Header -->

    <div ng-if="isNotVerified()" class="callout alert-box warning" data-closable>
        Please check your e-mail and <a ng-click="requestVerificationEmail()" data-close>Verify Your Account</a> to get involved! Check your spam folder just in case.
        <button class="close-button" aria-label="Dismiss alert" type="button" data-close>
            <span aria-hidden="true">&times;</span>
        </button>
    </div>

    <div class="ui-view-container">
        @yield('content')
    </div>

    @include('shared.footer')
</md-content>

@include('shared.offCanvasRight')

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
<script type="text/javascript" src="/public/{{ mix('js/angular.js') }}"></script>
<script type="text/javascript" src="/public/{{ mix('js/templates.js') }}"></script>

<script src="//cdn.rawgit.com/gdi2290/angular-intercom/master/angular-intercom.min.js"></script>
<script src="https://cdn.rawgit.com/gdi2290/angular-websocket/v1.0.9/angular-websocket.min.js"></script>
<script type="text/javascript" src="/public/app/bower_components/angular-filepicker/dist/angular_filepicker.min.js"></script>
<script type="text/javascript" src="/public/app/bower_components/ngAnimate-animate.css/animate.js"></script>
<script src="/public/app/bower_components/angular-foundation-6/dist/angular-foundation.js"></script>
<script type="text/javascript" src="/public/app/bower_components/ng-videosharing-embed/build/ng-videosharing-embed.min.js"></script>
<!--[if lte IE 9]>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/Base64/0.3.0/base64.min.js"></script>
<![endif]-->
<!-- BeTube script files -->
{{--<script src="/public/app/bower_components/what-input/what-input.js"></script>--}}
{{--<script src="/public/app/bower_components/foundation-sites/dist/foundation.js"></script>--}}
<script type="text/javascript" src="/public/assets/js/jquery.showmore.src.js" ></script>
<script src="/public/assets/layerslider/js/greensock.js" type="text/javascript"></script>
<!-- LayerSlider script files -->
<script type="text/javascript" src="/public/assets/layerslider/js/layerslider.transitions.js" ></script>
<script type="text/javascript" src="/public/assets/layerslider/js/layerslider.kreaturamedia.jquery.js"></script>
<script type="text/javascript" src="/public/assets/js/owl.carousel.min.js"></script>
<!--<script src="/public/assets/js/inewsticker.js" type="text/javascript"></script>-->
<!--<script src="/public/assets/js/jquery.kyco.easyshare.js" type="text/javascript"></script>-->

<script type="text/javascript" src="/public/{{ mix('js/all.js') }}"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossorigin="anonymous"></script>

@yield('js')

</body>
</html>
