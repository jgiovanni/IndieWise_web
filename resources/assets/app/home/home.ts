import {IRootScopeService} from "angular";
export class HomeController {
    type: string = 'grid-default';

    static $inject = ['$rootScope'];
    constructor(private $rootScope: IRootScopeService) {
        this.$rootScope.metadata.title = 'Home';
    }
}

angular.module('IndieWise.home', [])
    // .controller('HomeCtrl', HomeController)
    .component('home', {
        templateUrl: 'home/index.html',
        controller: HomeController,
        controllerAs: 'Home',
        bindings: {}
    });