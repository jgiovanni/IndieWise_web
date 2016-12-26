import {DataService} from  '../services/dataService.service';
interface ProjectListInterface {
    sort: string;
    perPage: number;
    type: string;
    icon: string;
    title: string;
    tip: string;
    field: string;
    projects: any[];
    refInterval: any;
}

export class ProjectsListController implements ProjectListInterface {
    sort: string;
    perPage: number;
    type: string = 'grid-default';
    icon: string;
    title: string;
    tip: string;
    field: string;
    projects: any[];
    refInterval: any;

    static $inject = ['DataService', '$window', '$interval'];
    constructor(private DataService: DataService, private $window: ng.IWindowService, private $interval: ng.IIntervalService) {}

    $onInit = function () {
        let self = this;
        switch (this.sort) {
            case 'rating':
                this.icon = 'fa fa-star';
                this.title = 'Highest Rated';
                this.tip = 'Top videos ranked according to IndieWise Average';
                this.field = 'topRating';
                break;
            case 'trending':
                this.icon = 'fa fa-line-chart';
                this.title = 'Trending';
                this.tip = 'Top videos ranked according to number of Reactions received';
                this.field = 'reactions_count';
                break;
            case 'awards':
                this.icon = 'fa fa-trophy';
                this.title = 'Award-Winning';
                this.tip = 'Top videos ranked according to number of Award Wins';
                this.field = 'wins_count';
                break;
            case 'recent':
                this.icon = 'fa fa-plus';
                this.title = 'Recently Added';
                this.tip = '';
                this.field = 'created_at';
                break;
        }

        this.refresh();
        this.refInterval = this.$interval(self.refresh.bind(this), 300000);

        this.$window.onfocus = function () {
            //do something
        };

        this.$window.onblur = function () {
            // console.log('Refresh Stopped');
            self.$interval.cancel(self.refInterval);
        };

    };

    refresh() {
        let self = this;
        this.DataService.collection('projects', {sort: this.field, per_page: this.perPage}).then(function (result) {
            self.projects = result.data;
        });
    };
}

angular.module('IndieWise.home')
/*IndieWise*/.component('homeProjectsList', {
    templateUrl: 'home/home-projects-list.html',
    controller: ProjectsListController,
    bindings: {sort: '@', perPage: '=', type: '='}
});