<!doctype html>
<html ng-app="fuse">
<head>
    <base href="/console/">
    <meta charset="utf-8">
    <meta name="description" content="">
    <meta
            name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1">
    <title>IndieWise: Admin</title>
    <link
            rel="stylesheet" href="/public/admin/styles/vendor-2ca8db2d81.css">
    <link rel="stylesheet" href="/public/admin/styles/app-62ddbd88a7.css">
    <link
            href="//fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700italic,700,900,900italic"
            rel="stylesheet" type="text/css">
</head>
<!--[if lt IE 10]>
<p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade
    your browser</a> to improve your experience.</p>
<![endif]-->
<body md-theme="@{{vm.themes.active.name}}" md-theme-watch ng-controller="IndexController as vm"
      class="@{{state.current.bodyClass || ''}}">
<ms-splash-screen id="splash-screen">
    <div class="center">
        <div class="logo">
            <span>F</span></div>
        <div class="spinner-wrapper">
            <div class="spinner">
                <div class="inner">
                    <div class="gap"></div>
                    <div
                            class="left">
                        <div class="half-circle"></div>
                    </div>
                    <div class="right">
                        <div class="half-circle"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</ms-splash-screen>
<div id="main" class="animate-slide-up" ui-view="main" layout="column"></div>
<ms-theme-options></ms-theme-options>
<script src="/public/admin/scripts/vendor-3df4a11a62.js"></script>
<script src="/public/admin/scripts/app-3f269cc58f.js"></script>
</body>
</html>