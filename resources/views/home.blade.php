@extends('master')

@section('css')
    <style>
        #premium .owl-item {
            padding: 8px;
        }

        #premium .owl-carousel .item figure.premium-img figcaption {
            background: rgba(0, 0, 0, 0.6) none;
        }
        .content .grid-system a.current {
            background: rgb(105, 105, 233);
        }
        .content .grid-system a.current .fa {
            color: #ffffff;
        }
    </style>
@endsection

@section('layout')
    <!-- layerslider -->
    <layer-slider></layer-slider>
    <!--end slider-->

    <div class="md-layout">
        <!-- Premium Videos -->
        <div class="md-layout-item" id="premium" style="background-color: transparent;">
            <div class="md-layout md-flex-100">
                <div class="row md-layout">
                    <div class="main-heading">
                        <div class="row padding-14">
                            <div class="large-11 columns">
                                <div class="head-title">
                                    <i class="fa fa-play-circle-o"
                                       style="display: inline-block;color: #e96969;margin-right: 11px;"></i>
                                    <h4 class="has-tip">
                                        <a :href="isMobile()?'mailto:marketing@getindiewise.com':'/contact?email=marketing@getindiewise.com'">Featured</a>
                                        <md-tooltip md-direction="right">Click here to find out how you may appear on
                                            this list
                                        </md-tooltip>
                                    </h4>
                                </div>
                            </div>
                            <div class="large-1 columns">
                                <!--<div class="navText show-for-large">
                                    <a class="prev secondary-button"><i class="fa fa-angle-left"></i></a>
                                    <a class="next secondary-button"><i class="fa fa-angle-right"></i></a>
                                </div>-->
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="md-layout md-flex-100 padding-14" style="background-color: rgba(65, 76, 171, .2)">
                <div class="row md-layout md-flex-100">
                    <div id="owl-featured" class="owl-carousel carousel" data-car-length="3" data-items="3"
                         data-loop="true" data-nav="false" data-autoplay="true" data-autoplay-timeout="5000"
                         data-dots="false" data-auto-width="false" data-responsive-small="1" data-responsive-medium="3"
                         data-responsive-xlarge="3">
                        @foreach($featured as $item)
                            <div class="item">
                                <figure class="premium-img">
                                    <img src="{{ $item->thumbnail_url or '/assets/img/default_video_thumbnail.jpg' }}" alt="{{ $item->name }}"/>
                                    <figcaption>
                                        <h5>{{ str_limit($item->name, 40) }}</h5>
                                        <p>{{ $item->owner->fullName }}</p>
                                    </figcaption>
                                </figure>
                                <a href="{{ $item->url_id }}" class="hover-posts">
                                    <span><i class="fa fa-play"></i>Watch Video</span>
                                </a>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>
        <!-- End Premium Videos -->
    </div>

    <div class="">
        <div class="row">
            <!-- Trending Videos -->
            <section class="content">
                <div class="main-heading">
                    <div class="md-layout row padding-14">
                        <div class="medium-8 small-8 columns">
                            <div class="head-title">
                                <i class="fa fa-line-chart"></i>
                                <h4 class="has-tip">
                                    Trending
                                    <md-tooltip md-direction="right">Top videos ranked according to number of Reactions received</md-tooltip>
                                </h4>
                            </div>
                        </div>
                        <div class="medium-4 small-4 columns">
                            <div class="grid-system pull-right show-for-large">
                                <a class="secondary-button grid-default" v-on:click="toggleType('grid-default')"
                                :class="{'current': layoutType === 'grid-default'}"><i class="fa fa-th"></i></a>
                                <a class="secondary-button grid-medium" v-on:click="toggleType('grid-medium')"
                                :class="{'current': layoutType === 'grid-medium'}"><i class="fa fa-th-large"></i></a>
                                <a class="secondary-button list" v-on:click="toggleType('list')" :class="{'current':layoutType === 'list'}"><i
                                        class="fa fa-th-list"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="large-12 columns">
                        <div>
                            <div class="tabs-panel is-active" style="display: block;" id="popular-all">
                                <div class="row list-group">
                                    @foreach($trending as $item)
                                    <project-card key="{{ $item->id }}" :index="{{ $loop->index }}"
                                                  :video="{{ json_encode([ 'id' => $item->id, 'url_id' => $item->url_id, 'thumbnail_url' => $item->thumbnail_url, 'iwRating' => $item->iwRating, 'wins_count' => $item->wins_count, 'watches_count' => $item->watches_count, 'reactions_count' => $item->reactions_count, 'runTime' => $item->runTime, 'name' => $item->name, 'description' => str_limit($item->description, 40), 'owner' => ['fullName' => $item->owner->fullName, 'url_id' => $item->owner->url_id,]]) }}" :type="layoutType"
                                                  :queried="true"></project-card>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                        <div class="text-center row-btn">
                            <a class="button radius" href="browse?sort=trending">View More Videos</a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ad Section -->
            <div class="googleAdv text-center">
                <!--<broadstreet-zone zone="51348" width="728" height="90"></broadstreet-zone>-->
                <!--<script>window.broadstreet.zone(51348);</script>-->
                <!--<a href="#"><img src="/assets/images/goodleadv.png" alt="googel ads"></a>-->
            </div><!-- End ad Section -->

        </div>
    </div>

    <div class="">
        <div class="row">
            <!-- Highest Rated  video -->
            <section class="content">
                <div class="main-heading">
                    <div class="md-layout row padding-14">
                        <div class="medium-8 small-8 columns">
                            <div class="head-title">
                                <i class="fa fa-star"></i>
                                <h4 class="has-tip">
                                    Highest Rated
                                    <md-tooltip md-direction="right">Top videos ranked according to IndieWise Average</md-tooltip>
                                </h4>
                            </div>
                        </div>
                        <div class="medium-4 small-4 columns">
                            <div class="grid-system pull-right show-for-large">
                                <a class="secondary-button grid-default" v-on:click="toggleType('grid-default')"
                                   :class="{'current': layoutType === 'grid-default'}"><i class="fa fa-th"></i></a>
                                <a class="secondary-button grid-medium" v-on:click="toggleType('grid-medium')"
                                   :class="{'current': layoutType === 'grid-medium'}"><i class="fa fa-th-large"></i></a>
                                <a class="secondary-button list" v-on:click="toggleType('list')" :class="{'current':layoutType === 'list'}"><i
                                            class="fa fa-th-list"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="large-12 columns">
                        <div>
                            <div class="tabs-panel is-active" style="display: block;" id="popular-all">
                                <div class="row list-group">
                                    @foreach($highestRated as $item)
                                        <project-card key="{{ $item->id }}" :index="{{ $loop->index }}"
                                                      :video="{{ json_encode([ 'id' => $item->id, 'url_id' => $item->url_id, 'thumbnail_url' => $item->thumbnail_url, 'iwRating' => $item->iwRating, 'wins_count' => $item->wins_count, 'watches_count' => $item->watches_count, 'reactions_count' => $item->reactions_count, 'runTime' => $item->runTime, 'name' => $item->name, 'description' => str_limit($item->description, 40), 'owner' => ['fullName' => $item->owner->fullName, 'url_id' => $item->owner->url_id,]]) }}" :type="layoutType"
                                                      :queried="true"></project-card>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                        <div class="text-center row-btn">
                            <a class="button radius" href="browse?sort=rating">View More Videos</a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ad Section -->
            <div class="googleAdv text-center">
                <!--<broadstreet-zone zone="51348" width="728" height="90"></broadstreet-zone>-->
                <!--<script>window.broadstreet.zone(51348);</script>-->
                <!--<a href="#"><img src="/assets/images/goodleadv.png" alt="googel ads"></a>-->
            </div><!-- End ad Section -->
        </div>
    </div>

    <div class="">
        <div class="row">
            <!-- Highest Awarded video -->
            <section class="content">
                <div class="main-heading">
                    <div class="md-layout row padding-14">
                        <div class="medium-8 small-8 columns">
                            <div class="head-title">
                                <i class="fa fa-trophy"></i>
                                <h4 class="has-tip">
                                    Award-Winning
                                    <md-tooltip md-direction="right">Top videos ranked according to number of Award Wins</md-tooltip>
                                </h4>
                            </div>
                        </div>
                        <div class="medium-4 small-4 columns">
                            <div class="grid-system pull-right show-for-large">
                                <a class="secondary-button grid-default" v-on:click="toggleType('grid-default')"
                                   :class="{'current': layoutType === 'grid-default'}"><i class="fa fa-th"></i></a>
                                <a class="secondary-button grid-medium" v-on:click="toggleType('grid-medium')"
                                   :class="{'current': layoutType === 'grid-medium'}"><i class="fa fa-th-large"></i></a>
                                <a class="secondary-button list" v-on:click="toggleType('list')" :class="{'current':layoutType === 'list'}"><i
                                            class="fa fa-th-list"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="large-12 columns">
                        <div>
                            <div class="tabs-panel is-active" style="display: block;" id="popular-all">
                                <div class="row list-group">
                                    @foreach($awardWinning as $item)
                                        <project-card key="{{ $item->id }}" :index="{{ $loop->index }}"
                                                      :video="{{ json_encode([ 'id' => $item->id, 'url_id' => $item->url_id, 'thumbnail_url' => $item->thumbnail_url, 'iwRating' => $item->iwRating, 'wins_count' => $item->wins_count, 'watches_count' => $item->watches_count, 'reactions_count' => $item->reactions_count, 'runTime' => $item->runTime, 'name' => $item->name, 'description' => str_limit($item->description, 40), 'owner' => ['fullName' => $item->owner->fullName, 'url_id' => $item->owner->url_id,]]) }}" :type="layoutType"
                                                      :queried="true"></project-card>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                        <div class="text-center row-btn">
                            <a class="button radius" href="browse?sort=awards">View More Videos</a>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ad Section -->
            <div class="googleAdv text-center">
                <!--<broadstreet-zone zone="51348" width="728" height="90"></broadstreet-zone>-->
                <!--<script>window.broadstreet.zone(51348);</script>-->
                <!--<a href="#"><img src="/assets/images/goodleadv.png" alt="googel ads"></a>-->
            </div><!-- End ad Section -->
        </div>
    </div>

    <div class="">
        <div class="row">
            <!-- Recently Added video -->
            <home-projects-list sort="recent" :per-page="8"></home-projects-list>

            <div class="googleAdv text-center">
                <!--<broadstreet-zone zone="51348" width="728" height="90"></broadstreet-zone>-->
                <!--<script>window.broadstreet.zone(51348);</script>-->
                <!--<a href="#"><img src="/assets/images/goodleadv.png" alt="googel ads"></a>-->
            </div><!-- End ad Section -->
            <!-- End main content -->
        </div>
    </div>

    <div class="">
        <div class="row">
            <!-- Trending Videos -->
            <section class="content">
                <div class="main-heading">
                    <div class="md-layout row padding-14">
                        <div class="medium-8 small-8 columns">
                            <div class="head-title">
                                <i class="fa fa-folder-open"></i>
                                <h4 class="has-tip">
                                    <a :href="isMobile()?'mailto:sponsor@getindiewise.com':'/contact?email=sponsor@getindiewise.com'">Sponsors</a>
                                    <md-tooltip md-direction="right">Click here to find out how you may appear on this list</md-tooltip>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="large-12 columns text-center">
                        <div>
                            <div class="sponsor">
                                <figure class="premium-img">
                                    <a href="https://filmfreeway.com/festival/widescreenfestival" target="_blank" class="">
                                        <img src="https://cdn.filepicker.io/api/file/0LVOS06iQ2e8tnZWyuM9?cache=true" alt="WideScreen Film Festival">
                                        <!--<span><i class="fa fa-search"></i></span>-->
                                    </a>
                                </figure>
                                <!--<h6><a href="https://filmfreeway.com/festival/widescreenfestival">WideScreen Film Festival</a></h6>-->
                            </div>
                            <div class="sponsor">
                                <figure class="premium-img">
                                    <a href="http://www.poprouser.com/" target="_blank" class="">
                                        <img src="https://cdn.filepicker.io/api/file/48g4bjVSlMOCVRd5lvRw?cache=true" alt="Poprouser">
                                        <!--<span><i class="fa fa-search"></i></span>-->
                                    </a>
                                </figure>
                                <!--<h6><a ui-sref="home">Poprouser</a></h6>-->
                            </div>
                            {{--<div class="sponsor">
                                <figure class="premium-img">
                                    <a href="http://tabletops.io" target="_blank" class="">
                                        <img src="https://cdn.filepicker.io/api/file/DESwwGUBQiSQy8lRUWku?cache=true" alt="Tabletops">
                                        <!--<span><i class="fa fa-search"></i></span>-->
                                    </a>
                                </figure>
                                <!--<h6><a href="https://tabletops.io">Tabletops</a></h6>-->
                            </div>--}}
                            <div class="sponsor">
                                <figure class="premium-img">
                                    <a href="http://miamindiefest.com/" target="_blank" class="">
                                        <img src="https://res.cloudinary.com/indiewise/image/upload/v1475092649/mindie_csrdht.png" alt="Miami Indie Film Fest">
                                        <!--<span><i class="fa fa-search"></i></span>-->
                                    </a>
                                </figure>
                                <!--<h6><a href="http://miamindiefest.com/">Miami Indie Film Fest</a></h6>-->
                            </div>
                            {{--<div class="sponsor">
                                <figure class="premium-img">
                                    <a href="https://filestack.com" target="_blank" class="">
                                        <img src="https://cdn.filepicker.io/api/file/yiXMlD0dSoGyN04g1xtH?cache=true" alt="FileStack">
                                        <!--<span><i class="fa fa-search"></i></span>-->
                                    </a>
                                </figure>
                                <!--<h6><a href="https://filestack.com">FileStack</a></h6>-->
                            </div>--}}
                            <div class="sponsor">
                                <figure class="premium-img">
                                    <a href="https://www.corkynat.com/" target="_blank" class="">
                                        <img src="https://cdn.filepicker.io/api/file/OIcZhS3DQKyPq2W0QvGg" alt="carousel">
                                        <!--<span><i class="fa fa-search"></i></span>-->
                                    </a>
                                </figure>
                                <!--<h6><a href="https://www.corkynat.com/">Corky Nat</a></h6>-->
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- ad Section -->
            <div class="googleAdv text-center">
                <!--<broadstreet-zone zone="51348" width="728" height="90"></broadstreet-zone>-->
                <!--<script>window.broadstreet.zone(51348);</script>-->
                <!--<a href="#"><img src="/assets/images/goodleadv.png" alt="googel ads"></a>-->
            </div><!-- End ad Section -->

        </div>
    </div>
@endsection

@section('js')
    <script src="/assets/layerslider/js/greensock.js" type="text/javascript"></script>
    <!-- LayerSlider script files -->
    <script src="/assets/layerslider/js/layerslider.transitions.js" type="text/javascript"></script>
    <script src="/assets/layerslider/js/layerslider.kreaturamedia.jquery.js" type="text/javascript"></script>
    <script src="/assets/js/owl.carousel.min.js"></script>

    <script type="text/javascript">
        setTimeout(function () {
            let carouselEl = jQuery('#owl-featured');
            carouselEl.each(function () {
                let owl = jQuery(this);
                jQuery(".prev").on('click', function () {
                    carouselEl.trigger('prev.owl.carousel');
                });

                jQuery(".next").on('click', function () {
                    carouselEl.trigger('next.owl.carousel');
                });
                let loopLength = owl.data('car-length');
                let divLength = jQuery(this).find("div.item").length;
                if (divLength > loopLength) {
                    owl.owlCarousel({
                        dots: owl.data("dots"),
                        items: owl.data("items"),
                        slideBy: owl.data("slideby"),
                        center: owl.data("center"),
                        loop: owl.data("loop"),
                        margin: owl.data("margin"),
                        nav: owl.data("nav"),
                        autoplay: owl.data("autoplay"),
                        autoplayTimeout: owl.data("autoplay-timeout"),
                        autoWidth: owl.data("auto-width"),
                        autoHeight: owl.data("auto-Height"),
                        merge: owl.data("merge"),
                        responsive: {
                            0: {
                                items: owl.data("responsive-small"),
                                nav: false
                            },
                            600: {
                                items: owl.data("responsive-medium"),
                                nav: false
                            },
                            1000: {
                                items: owl.data("responsive-large"),
                                nav: false
                            },
                            1900: {
                                items: owl.data("responsive-xlarge"),
                                nav: false
                            }
                        }
                    });

                } else {
                    owl.owlCarousel({
                        dots: false,
                        items: owl.data("items"),
                        loop: false,
                        margin: owl.data("margin"),
                        autoplay: false,
                        autoplayHoverPause: true,
                        responsiveClass: true,
                        autoWidth: owl.data("auto-width"),
                        autoHeight: owl.data("auto-Height"),
                    });
                }
            });
        }, 300)

    </script>
@endsection