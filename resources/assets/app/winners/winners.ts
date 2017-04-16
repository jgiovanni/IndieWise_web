import {IDataService} from "../services/dataService.service";
export class WinnersController {
    awards: Array<Object> = [];
    date: any = moment().subtract(1, 'months').date(1).startOf('day').format('YYYY-MM-DD HH:mm:ss');

    static $inject = ['DataService'];
    constructor(private DataService: IDataService) {}

    $onInit = function () {
        this.fetchWinners();
    };

    fetchWinners() {
        let self = this;
        this.DataService.collection('winners', {
            date_start: self.date,
            date_end: moment(self.date).endOf('month').format('YYYY-MM-DD HH:mm:ss')
        }).then(function (response) {
            self.awards = response.body.Awards;
        });
    }
}

angular.module('IndieWise.winners', [])
    .component('winners', {
        templateUrl: 'winners/index.html',
        controller: WinnersController,
        controllerAs: 'WC',
        bindings: {}
    });
