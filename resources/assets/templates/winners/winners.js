(function () {
    'use strict';

    angular.module('IndieWise.winners', [])
        .controller('WinnersCtrl', WinnersController);

    WinnersController.$inject = ['$rootScope', '$scope', 'DataService'];
    function WinnersController($rootScope, $scope, DataService) {
        var self = this;
        self.awards = [];
        self.date = moment().date(1).startOf('day').format('YYYY-MM-DD HH:mm:ss');

        self.fetchWinners = fetchWinners;

        function fetchWinners() {
            DataService.collection('winners', {
                date_start: self.date,
                date_end: moment(self.date).endOf('month').format('YYYY-MM-DD HH:mm:ss')
            }).then(function (response) {
                self.awards = response.data.Awards;
            });
        }

        // Init
        fetchWinners();
    }
})();
