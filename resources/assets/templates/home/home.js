(function () {
    'use strict';

    angular.module('IndieWise.home', [])
        .controller('HomeCtrl', HomeController);

    HomeController.$inject = ['$rootScope', 'DataService', '$scope', '$window', '$modal', '$interval'];
    function HomeController($rootScope, DataService, $scope, $window, $modal, $interval) {
        var self = this;
        $rootScope.metadata.title = 'Home';

        self.refresh = function () {
            // Trending Videos
            DataService.collection('projects', {sort: 'reactions_count', per_page: 8}).then(function (result) {
                self.trending = result.data;
            });

            // Highest Rated Videos
            DataService.collection('projects', {sort: 'topRating', per_page: 8}).then(function (result) {
                self.highestRated = result.data;
            });

            // Highest Awarded Videos
            DataService.collection('projects', {sort: 'wins_count', per_page: 8}).then(function (result) {
                self.highestAwarded = result.data;
            });

            // Recent Videos
            DataService.collection('projects', {sort: 'created_at', per_page: 8}).then(function (result) {
                self.recentFilms = result.data;
            });
        };
        self.refresh();
        self.refInterval = $interval(self.refresh, 300000);

        $scope.$on('$destroy', function () {
            $interval.cancel(self.refInterval);
        });

        $window.onfocus = function () {
            //do something
        };

        $window.onblur = function () {
            // console.log('Refresh Stopped');
            $interval.cancel(self.refInterval);
        };
    }
})();
