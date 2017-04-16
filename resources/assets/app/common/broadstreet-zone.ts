import {IWindowService, ISCEService} from "angular";
export class BroadstreetZoneController {
    zone: string;
    width: string;
    height: string;
    link: string;

    static $inject = ['$window', '$sce'];
    constructor(private $window: IWindowService, private $sce: ISCEService){}

    $onInit = function () {
        this.link = this.$sce.trustAsResourceUrl('https://ad.broadstreetads.com/zdisplay/' + this.zone + '.html');
    }
}
angular.module('IndieWise.directives')
    .component('broadstreetZone', {
        templateUrl: 'common/broadstreet-zone.html',
        transclude: true,
        controller: BroadstreetZoneController,
        bindings: {zone: '<', width: '<', height: '<'}
    });
