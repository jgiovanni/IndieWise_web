@extends('master')

@section('layout')
    <!-- layerslider -->
    <layer-slider></layer-slider>
    <!--end slider-->
    <div class="row">
        <!-- Premium Videos -->
        <premium-carousel></premium-carousel>
        <!-- End Premium Videos -->

        <!-- Trending Videos -->
        <home-projects-list sort="trending" :per-page="8" ></home-projects-list>

        <!-- ad Section -->
        <div class="googleAdv text-center">
            <!--<broadstreet-zone zone="51348" width="728" height="90"></broadstreet-zone>-->
            <!--<script>window.broadstreet.zone(51348);</script>-->
            <!--<a href="#"><img src="/assets/images/goodleadv.png" alt="googel ads"></a>-->
        </div><!-- End ad Section -->

        <!-- Highest Rated  video -->
        <home-projects-list sort="rating" :per-page="8" ></home-projects-list>

        <!-- ad Section -->
        <div class="googleAdv text-center">
            <!--<broadstreet-zone zone="51348" width="728" height="90"></broadstreet-zone>-->
            <!--<script>window.broadstreet.zone(51348);</script>-->
            <!--<a href="#"><img src="/assets/images/goodleadv.png" alt="googel ads"></a>-->
        </div><!-- End ad Section -->

        <!-- Highest Awarded video -->
        <home-projects-list sort="awards" :per-page="8" ></home-projects-list>

        <!-- ad Section -->
        <div class="googleAdv text-center">
            <!--<broadstreet-zone zone="51348" width="728" height="90"></broadstreet-zone>-->
            <!--<script>window.broadstreet.zone(51348);</script>-->
            <!--<a href="#"><img src="/assets/images/goodleadv.png" alt="googel ads"></a>-->
        </div><!-- End ad Section -->

        <!-- Recently Added video -->
        <home-projects-list sort="recent" :per-page="8" ></home-projects-list>

        <div class="googleAdv text-center">
            <!--<broadstreet-zone zone="51348" width="728" height="90"></broadstreet-zone>-->
            <!--<script>window.broadstreet.zone(51348);</script>-->
            <!--<a href="#"><img src="/assets/images/goodleadv.png" alt="googel ads"></a>-->
        </div><!-- End ad Section -->
        <!-- End main content -->


        <!-- Category -->
        <sponsor-carousel v-once></sponsor-carousel>
        <!-- End Category -->
    </div>
@endsection

@section('js')
    <script src="/assets/layerslider/js/greensock.js" type="text/javascript"></script>
    <!-- LayerSlider script files -->
    <script src="/assets/layerslider/js/layerslider.transitions.js" type="text/javascript"></script>
    <script src="/assets/layerslider/js/layerslider.kreaturamedia.jquery.js" type="text/javascript"></script>
    <script src="/assets/js/owl.carousel.min.js"></script>
@endsection