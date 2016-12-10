(function () {
    'use strict';
    class HomeController {
        type: string;

        constructor($rootScope) {
            $rootScope.metadata.title = 'Home';
            this.type = 'grid-default';
        }
    }
    HomeController.$inject = ['$rootScope'];

    angular.module('IndieWise.home', [])
        .controller('HomeCtrl', HomeController);

})();
