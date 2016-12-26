import {IRootScopeService, ITimeoutService} from "angular";
import {IStateService} from "angular-ui-router";
import DataService from "../services/dataService.service";
interface IPremiumCarousel {
    featuredProjects: Array<Object>;
    isMobile: any;
}

export class PremiumCarouselController implements IPremiumCarousel {
    featuredProjects: Array<Object>;
    isMobile: any;

    static $inject = ['$rootScope', '$state', '$timeout', 'DataService'];

    constructor(private $rootScope: IRootScopeService, private $state: IStateService, private $timeout: ITimeoutService, private DataService: DataService) {
    }

    $onInit = function () {
        let self = this;
        this.isMobile = this.$rootScope.isMobile;
        this.DataService.collection("projects", {random: true, per_page: 3})
            .then(function (result: Object) {
                self.featuredProjects = result.data;
                // console.log("featuredFilms: ", scope.featuredFilms);
            }).then(function () {
            self.$timeout(function () {
                // console.log('run owl');
                //Premium carousel
                var carouselEl = jQuery('#owl-featured');
                carouselEl.each(function () {
                    var owl = jQuery(this);
                    jQuery(".prev").on('click', function () {
                        carouselEl.trigger('prev.owl.carousel');
                    });

                    jQuery(".next").on('click', function () {
                        carouselEl.trigger('next.owl.carousel');
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
                });
            }, 300);
        });
    }
}

angular.module('IndieWise.home')
    .component('premiumCarousel', {
        transclude: true,
        templateUrl: 'home/premium-carousel.html',
        controller: PremiumCarouselController,
        bindings: {}
    });
