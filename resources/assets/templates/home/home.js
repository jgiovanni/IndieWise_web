(function () {
    'use strict';
    var HomeController = (function () {
        function HomeController($rootScope) {
            $rootScope.metadata.title = 'Home';
            this.type = 'grid-default';
        }
        return HomeController;
    }());
    HomeController.$inject = ['$rootScope'];
    angular.module('IndieWise.home', [])
        .controller('HomeCtrl', HomeController);
})();
//# sourceMappingURL=home.js.map