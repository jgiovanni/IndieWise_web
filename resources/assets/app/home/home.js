"use strict";
var HomeController = (function () {
    function HomeController($rootScope) {
        this.$rootScope = $rootScope;
        this.type = 'grid-default';
        this.$rootScope.metadata.title = 'Home';
    }
    HomeController.$inject = ['$rootScope'];
    return HomeController;
}());
exports.HomeController = HomeController;
angular.module('IndieWise.home', [])
    .component('home', {
    templateUrl: 'home/index.html',
    controller: HomeController,
    controllerAs: 'Home',
    bindings: {}
});
//# sourceMappingURL=home.js.map