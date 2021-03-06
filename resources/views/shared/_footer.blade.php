<!-- Async Social SDKs -->
<div id="fb-root"></div>
<script type="text/javascript">
    (function (doc, script) {
        let js,
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

<!--[if lte IE 9]>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/Base64/0.3.0/base64.min.js"></script>
<![endif]-->
<!-- BeTube script files -->
{{--<script src="/app/bower_components/what-input/what-input.js"></script>--}}
{{--<script src="/app/bower_components/foundation-sites/dist/foundation.js"></script>--}}
<script src="/assets/js/jquery.showmore.src.js" type="text/javascript"></script>
{{--<script src="/assets/js/app.js"></script>--}}
{{--<script src="/assets/js/owl.carousel.min.js"></script>--}}

<script type="text/javascript" src="{{ mix('js/resources.vue.js') }}"></script>
@yield('js')

@if(isActiveRoute('user.*') === 'active' || isActiveMatch('user') === 'active')
    <script type="text/javascript" src="{{ mix('js/users.vue.js') }}"></script>
@elseif(isset($project) || isset($critique))

@else
    <script type="text/javascript" src="{{ mix('js/main.vue.js') }}"></script>
@endif
