(function () {
    'use strict';

    angular.module('IndieWise.latest', [])
        .controller('LatestCtrl', LatestController);

    LatestController.$inject = ['$rootScope', '$scope', 'DataService', '$timeout', '$interval'];
    function LatestController($rootScope, $scope, DataService, $timeout, $interval) {
        $rootScope.metadata.title = 'Latest';
        var self = this;

        self.init = function () {
            DataService.collection('reactions/latest').then(function (res) {
                self.reactions = res.data;
            });
            DataService.collection('nominations/latest').then(function (res) {
                self.nominations = res.data;
            });
            DataService.collection('critiques/latest').then(function (res) {
                self.critiques = res.data;
            });
        };

        self.init();
        self.refInterval = $interval(self.init, 10000);

        $scope.$on('$destroy', function () {
            $interval.cancel(self.refInterval);
        });

        $timeout(jQuery(document).foundation(), 0);
    }

})();
