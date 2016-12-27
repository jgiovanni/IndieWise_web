export class StaticSideBarController {
    constructor(){}
}

angular.module('IndieWise.directives')
    .component('staticSideBar', {
        templateUrl: 'common/static-sidebar.html',
        transclude: true,
        controller: StaticSideBarController,
        bindings: {text: '<', direction: '<'}
    });
