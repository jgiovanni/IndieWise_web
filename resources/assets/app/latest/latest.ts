import {IRootScopeService, IScope, ITimeoutService, IIntervalService} from "angular";
import {IDataService} from "../services/dataService.service";

export class LatestController {
    refInterval: any;

    static $inject = ['$rootScope', '$scope', 'DataService', '$timeout', '$interval'];

    constructor(private $rootScope: IRootScopeService, private $scope: IScope, private DataService: IDataService, private $timeout: ITimeoutService, private $interval: IIntervalService) {
    }

    $onInit = function () {
        let self = this;
        this.init();
        this.refInterval = this.$interval(self.init.bind(self), 10000);

        this.$timeout(jQuery(document).foundation(), 0);
    };

    $onDestroy = function () {
        let self = this;
        this.$interval.cancel(self.refInterval);
    };

    init() {
        let self = this;
        self.DataService.collection('reactions/latest')
            .then(function (res) {
                self.reactions = res.data;
            }, (error) => {
                console.log(error);
            });
        self.DataService.collection('nominations/latest')
            .then(function (res) {
                self.nominations = res.data;
            }, (error) => {
                console.log(error);
            });
        self.DataService.collection('critiques/latest')
            .then(function (res) {
                self.critiques = res.data;
            }, (error) => {
                console.log(error);
            });
    }
}

angular.module('IndieWise.latest', [])
    .component('latest', {
        templateUrl: 'latest/index.html',
        controller: LatestController,
        controllerAs: 'LC',
        bindginds: {}
    });