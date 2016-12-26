import {IRootScopeService, ITimeoutService, IIntervalService} from "angular";
import {IDataService} from "../services/dataService.service";
interface IWatchingCarousel {
    watched: Array<Object>;
    getWatchedList: () => void;
}
export class WatchingCarouselController implements IWatchingCarousel {
    watched: Array<Object>;

    static $inject = ['$rootScope', '$timeout', '$interval', 'DataService', '$element'];
    constructor(private $rootScope: IRootScopeService, private $timeout: ITimeoutService, private $interval: IIntervalService, private DataService: IDataService, private $element: any) {}

    $onInit = function () {
        this.getWatchedList();
    };

    getWatchedList() {
        let self = this;
        this.DataService.collection('projects/watched')
            .then(function (result) {
                self.watched = result.data;
                self.$timeout(function () {
                    //console.log('run owl');
                    //Premium carousel
                        var owl = jQuery(self.$element).find('.owl-carousel');
                        jQuery(self.$element).find(".prev").on('click', function () {
                            jQuery(this).parent().parent().parent().parent().next().trigger('prev.owl.carousel');
                        });

                        jQuery(self.$element).find(".next").on('click', function () {
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
                }, 0);
            });
    }
}

angular.module('IndieWise.browse')
    .component('watchingCarousel', {
        transclude: true,
        templateUrl: 'browse/watching-carousel.html',
        controller: WatchingCarouselController,
        // bindings: {}
    });
