import {IRootScopeService, ITimeoutService, IQService} from "angular";
import {IDataService} from "../services/dataService.service";
interface ILayerSlider {
    BASE: string;
    projects: Array<Object>;
}

export class LayerSliderController implements ILayerSlider {
    BASE: string = window.BASE || '/';
    projects: Array<Object> = [];

    static $inject = ['$rootScope', '$timeout', 'DataService', '$q'];
    constructor(private $rootScope: IRootScopeService, private $timeout: ITimeoutService, private DataService: IDataService, private $q: IQService){}

    $onInit = function() {
        let self = this;
        var b = this.DataService.collection('projects', { random: true, per_page: 3}).then(function (response: Object) {
            self.projects = response.body;
        });

        this.$q.all([b]).then(() => {
            self.$timeout(function () {
                // jQuery('#slippry').slippry();
                jQuery("#layerslider").layerSlider({
                    responsive: true,
                    // responsiveUnder: 950,
                    slideDelay: 5000,
                    layersContainer: 950,
                    skin: 'noskin',
                    hoverPrevNext: false,
                    skinsPath: self.BASE + 'assets/layerslider/skins/'
                });
            }, 0);
        });
    }

}

angular.module('IndieWise.home')
    .component('layerSlider', {
        transclude: true,
        templateUrl: 'home/layer-slider.html',
        controller: LayerSliderController,
        bindings: {}
    });
