<head>
    <title>IndieWise</title>
    <base href="//{{ env('APP_URL') }}/">
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    {{--<meta property="og:title" content="Home | IndieWise" />--}}
    {{--<meta name="description" content="You be the judge! IndieWise is a platform that encourages constructive dialog and feedback among viewers, critics, and filmmakers.">--}}
    {{--<meta property="og:description" content="You be the judge! What you always wanted, feedback!" />--}}
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
    {{--<meta property="og:image" content="https://www.filestackapi.com/api/file/BhrXLYZCQ4YQtCPAB8cf?cache=true" />--}}
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="robots" content="ALL">
    {{--<meta property="fb:app_id" content="150687055270744"/>--}}
    <meta name="csrf-token" content="{{ csrf_token() }}">
    {!! SEO::generate() !!}

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

    <script type="text/javascript" src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"></script>
    <script type="text/javascript" src="https://code.jquery.com/jquery-2.2.4.min.js"></script>

    <script>window.BASE = '/';</script>
    <link rel="stylesheet" href="//fonts.googleapis.com/icon?family=Material+Icons">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:400,500,700,400italic">
    <link rel="stylesheet" href="/app/bower_components/foundation-datepicker/css/foundation-datepicker.min.css"/>
    <link rel="stylesheet" href="/app/bower_components/animate.css/animate.min.css"/>

    <!-- Elite Video Player Scripts-->
    <script type="text/javascript" src="/app/eliteplayer/deploy/js/froogaloop.js"></script>
    <script type="text/javascript" src="/app/eliteplayer/deploy/js/jquery.mCustomScrollbar.js"></script>
    <script type="text/javascript" src="/app/eliteplayer/deploy/js/THREEx.FullScreen.js"></script>
    <script type="text/javascript" src="/app/eliteplayer/deploy/js/videoPlayer.js"></script>
    <script type="text/javascript" src="/app/eliteplayer/deploy/js/Playlist.js"></script>
    <script type="text/javascript" src="/app/eliteplayer/deploy/js/ZeroClipboard.js"></script>

    <!-- BeTube Styles-->
    <link rel="stylesheet" href="{{ elixir('css/app.css') }}">
    <link rel="stylesheet" href="/assets/css/font-awesome.min.css">
    <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800" type="text/css">
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
    <link rel="stylesheet" href="{{ elixir('css/all.css') }}"/>

    <script>
        /* Replace 'APP_ID' with your app ID */
        window.intercomSettings = {
            app_id: 'ppp65byn'
        };
        /* Replace 'APP_ID' with your app ID */
        (function(){var w=window;var ic=w.Intercom;if(typeof ic==="function")    {ic('reattach_activator');ic('update',intercomSettings);}else{var    d=document;var i=function(){i.c(arguments)};i.q=[];i.c=function(args)   {i.q.push(args)};w.Intercom=i;function l(){var   s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/ppp65byn';var x=d.getElementsByTagName('script')   [0];x.parentNode.insertBefore(s,x);}if(w.attachEvent)   {w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})()
    </script>
    {{--<script type="text/javascript" src="//cdn.broadstreetads.com/init.js"></script>--}}
    <script src="https://cdn.socket.io/socket.io-1.4.5.js"></script>

    @yield('css')

</head>