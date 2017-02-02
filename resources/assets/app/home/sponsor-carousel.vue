<template>
    <section id="category">
        <div class="row secBg">
            <div class="large-12 columns">
                <div class="column row">
                    <div class="heading category-heading clearfix">
                        <div class="cat-head pull-left">
                            <i class="fa fa-folder-open"></i>
                            <h4 class="has-tip">
                                <a :href="isMobile()?'mailto:sponsor@getindiewise.com':'/contact?email=sponsor@getindiewise.com'">Sponsors</a>
                                <md-tooltip md-direction="right">Click here to find out how you may appear on this list</md-tooltip>
                            </h4>
                        </div>
                        <div>
                            <div class="navText pull-right show-for-large">
                                <a class="prev secondary-button"><i class="fa fa-angle-left"></i></a>
                                <a class="next secondary-button"><i class="fa fa-angle-right"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- category carousel -->
                <div id="owl-sponsor" owl-carousel class="owl-carousel carousel" data-car-length="6" data-items="6" data-loop="true"
                     data-nav="false" data-autoplay="true" data-autoplay-timeout="3000" data-auto-width="true"
                     data-margin="10" data-dots="false">
                    <div class="item-cat item thumb-border">
                        <figure class="premium-img">
                            <img src="https://cdn.filepicker.io/api/file/0LVOS06iQ2e8tnZWyuM9?cache=true" alt="WideScreen Film Festival">
                            <a href="https://filmfreeway.com/festival/widescreenfestival" class="hover-posts">
                                <span><i class="fa fa-search"></i></span>
                            </a>
                        </figure>
                        <h6><a href="https://filmfreeway.com/festival/widescreenfestival">WideScreen Film Festival</a></h6>
                    </div>
                    <div class="item-cat item thumb-border">
                        <figure class="premium-img">
                            <img src="https://cdn.filepicker.io/api/file/48g4bjVSlMOCVRd5lvRw?cache=true" alt="Poprouser">
                            <a href="http://www.poprouser.com/" class="hover-posts">
                                <span><i class="fa fa-search"></i></span>
                            </a>
                        </figure>
                        <h6><a ui-sref="home">Poprouser</a></h6>
                    </div>
                    <div class="item-cat item thumb-border">
                        <figure class="premium-img">
                            <img src="https://cdn.filepicker.io/api/file/DESwwGUBQiSQy8lRUWku?cache=true" alt="Tabletops">
                            <a href="http://tabletops.io" class="hover-posts">
                                <span><i class="fa fa-search"></i></span>
                            </a>
                        </figure>
                        <h6><a href="https://tabletops.io">Tabletops</a></h6>
                    </div>
                    <!--<div class="item-cat item thumb-border">
                        <figure class="premium-img">
                            <img src="https://www.filestackapi.com/api/file/lGlgikWIRCaeHgsWHC9T" alt="Supplements 2 Ur Door">
                            <a href="#" class="hover-posts">
                                <span><i class="fa fa-search"></i></span>
                            </a>
                        </figure>
                        <h6><a href="https://tabletops.io">Supplements 2 Ur Door</a></h6>
                    </div>-->
                    <div class="item-cat item thumb-border">
                        <figure class="premium-img">
                            <img src="https://res.cloudinary.com/indiewise/image/upload/v1475092649/mindie_csrdht.png" alt="Miami Indie Film Fest">
                            <a href="http://miamindiefest.com/" class="hover-posts">
                                <span><i class="fa fa-search"></i></span>
                            </a>
                        </figure>
                        <h6><a href="http://miamindiefest.com/">Miami Indie Film Fest</a></h6>
                    </div>
                    <div class="item-cat item thumb-border">
                        <figure class="premium-img">
                            <img src="https://cdn.filepicker.io/api/file/yiXMlD0dSoGyN04g1xtH?cache=true" alt="FileStack">
                            <a href="https://filestack.com" class="hover-posts">
                                <span><i class="fa fa-search"></i></span>
                            </a>
                        </figure>
                        <h6><a href="https://filestack.com">FileStack</a></h6>
                    </div>
                    <div class="item-cat item thumb-border">
                        <figure class="premium-img">
                            <img src="https://cdn.filepicker.io/api/file/OIcZhS3DQKyPq2W0QvGg" alt="carousel">
                            <a href="https://www.corkynat.com/" class="hover-posts">
                                <span><i class="fa fa-search"></i></span>
                            </a>
                        </figure>
                        <h6><a href="https://www.corkynat.com/">Corky Nat</a></h6>
                    </div>
                    <div class="item-cat item thumb-border">
                        <figure class="premium-img">
                            <img src="https://placehold.it/185x130" alt="carousel">
                            <a ui-sref="home" class="hover-posts">
                                <span><i class="fa fa-search"></i></span>
                            </a>
                        </figure>
                        <h6><a ui-sref="home">Your Logo Here</a></h6>
                    </div>
                </div>
                <!-- end carousel -->
                <div class="row collapse">
                    <div class="large-12 columns text-center row-btn">
                        <!--<a ui-sref="home" class="button radius">View All Categories</a>-->
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
<style scoped></style>
<script type="text/javascript">
    export default {
        name: 'sponsor-carousel',
        data(){
            return {
            }
        },
        methods: {},
        mounted(){
            setTimeout(function () {
                let carouselEl = jQuery('#owl-sponsor');
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
        }
    }
</script>