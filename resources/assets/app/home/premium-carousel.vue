<template>
    <md-layout id="premium" style="background-color: transparent;">
        <md-layout md-flex="100">
            <div class="row md-layout">
                <div class="main-heading">
                    <div class="row padding-14">
                        <div class="large-11 columns">
                            <div class="head-title">
                                <i class="fa fa-play-circle-o" style="display: inline-block;color: #e96969;margin-right: 11px;"></i>
                                <h4 class="has-tip">
                                    <a :href="isMobile()?'mailto:marketing@getindiewise.com':'/contact?email=marketing@getindiewise.com'">Featured</a>
                                    <md-tooltip md-direction="right">Click here to find out how you may appear on this list</md-tooltip>
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
        </md-layout>
        <md-layout md-flex="100" class="padding-14" style="background-color: rgba(65, 76, 171, .2)">
            <div class="row">
                <div id="owl-featured" class="owl-carousel carousel" data-car-length="3" data-items="3" data-loop="true" data-nav="false" data-autoplay="true" data-autoplay-timeout="5000" data-dots="false" data-auto-width="false" data-responsive-small="1" data-responsive-medium="3" data-responsive-xlarge="3">
                    <div class="item" v-for="f in featuredProjects.data">
                        <figure class="premium-img">
                            <img :src="f.thumbnail_url||'/assets/img/default_video_thumbnail.jpg'" alt="carousel">
                            <figcaption>
                                <h5>{{ f.name | truncate('40') }}</h5>
                                <p v-text="f.owner.fullName"></p>
                            </figcaption>
                        </figure>
                        <a :href="f.url_id" class="hover-posts">
                            <span><i class="fa fa-play"></i>Watch Video</span>
                        </a>
                    </div>
                </div>
            </div>
        </md-layout>
    </md-layout>
</template>
<style>
    #premium .owl-item {
        padding:8px;
    }
    #premium .owl-carousel .item figure.premium-img figcaption {
        background: rgba(0, 0, 0, 0.6) none;
    }
</style>
<script type="text/javascript">
    export default {
        name: 'premium-carousel',
        data(){
            return {
                featuredProjects: [],
            }
        },
        methods: {},
        mounted(){
            this.$http.get("projects", { params: {random: true, per_page: 3}})
                .then(function (result) {
                    this.featuredProjects = result.data;
                }).then(function () {
                //Premium carousel
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

            });
        }
    }
</script>