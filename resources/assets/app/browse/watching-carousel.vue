<template>
    <section id="category">
        <div class="row secBg">
            <div class="large-12 columns">
                <div class="column row">
                    <div class="heading category-heading clearfix">
                        <div class="cat-head pull-left">
                            <i class="fa fa-play-circle"></i>
                            <h4>People are Watching</h4>
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
                <div id="owl-demo-cat" class="owl-carousel carousel" data-car-length="6" data-items="6" data-loop="true" data-nav="false" data-autoplay="true" data-autoplay-timeout="3000" data-auto-width="true" data-margin="10" data-dots="false">
                    <div class="item-cat item thumb-borde" v-for="w in watched">
                        <figure class="premium-img">
                            <img :src="w.projectThumbnail || '/assets/img/default_video_thumbnail.jpg'" alt="carousel">
                            <a :href="w.projectUrlId" class="hover-posts">
                                <span><i class="fa fa-play"></i></span>
                            </a>
                        </figure>
                        <h6 style="width: 184px;">
                            <a :href="w.projectUrlId">{{ w.projectName|truncate(50) }}</a>
                        </h6>
                    </div>
                </div>
                <!-- end carousel -->
                <!--<div class="row collapse">
                    <div class="large-12 columns text-center row-btn">
                        <a href="categories.html" class="button radius">View All Categories</a>
                    </div>
                </div>-->
            </div>
        </div>
    </section>
</template>
<style scoped></style>
<script type="text/babel">
    export default {
        name: 'watching-carousel',
        data(){
            return {
                watched: [],
            }
        },
        methods: {},
        mounted(){
            this.$http.get('projects/watched').then(function (result) {
                this.watched = result.data;
                setTimeout(function () {
                    //console.log('run owl');
                    //Premium carousel
                    var owl = jQuery('#category').find('.owl-carousel');
                    jQuery('#category').find(".prev").on('click', function () {
                        jQuery(this).parent().parent().parent().parent().next().trigger('prev.owl.carousel');
                    });

                    jQuery('#category').find(".next").on('click', function () {
                        jQuery(this).parent().parent().parent().parent().next().trigger('next.owl.carousel');
                    });
                    var loopLength = owl.data('car-length');
                    var divLength = jQuery(this).find("div.item").length;
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
                }, 300);
            });
        }
    }
</script>