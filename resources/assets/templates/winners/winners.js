(function () {
    'use strict';

    angular.module('IndieWise.winners', [])
        .controller('WinnersCtrl', WinnersController);

    WinnersController.$inject = ['$rootScope', '$scope', 'DataService'];
    function WinnersController($rootScope, $scope, DataService) {
        var self = this;
        self.awards = [];
        self.date = '';
        /*DataService.collection('winners').then(function (response) {
            self.awards = response.data.Awards;
        });*/

    }
})();
