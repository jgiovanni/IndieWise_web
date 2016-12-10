(function () {
    'use strict';

    /*interface ProjectListInterface {
     sort: string;
     perPage: number;
     type: string;
     icon: string;
     title: string;
     tip: string;
     field: string;
     projects: any[];
     refInterval: any;
     }*/

    class ProjectsListController {
        sort: string;
        perPage: number;
        type: string;
        icon: string;
        title: string;
        tip: string;
        field: string;
        projects: any[];
        refInterval: any;

        // static $inject = ['DataService', '$window', '$interval'];
        /* @ngInject */
        constructor(DataService: any, $window: any, $interval: any) {
            this.type = 'grid-default';

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

            this.refresh(DataService);
            this.refInterval = $interval(this.refresh, 300000);

            $window.onfocus = function () {
                //do something
            };

            $window.onblur = function () {
                // console.log('Refresh Stopped');
                $interval.cancel(this.refInterval);
            };
        }

        refresh(DataService: any) {
            let self = this;
            DataService.collection('projects', {sort: this.field, per_page: this.perPage}).then(function (result) {
                self.projects = result.data;
            });
        };
    }

    ProjectsListController.$inject = ['DataService', '$window', '$interval'];

    angular.module('IndieWise.home')
        .component('homeProjectsList', {
            templateUrl: 'home/view/home-projects-list.html',
            controller: ProjectsListController,
            bindings: {sort: '@', perPage: '<', type: '='}
        });

})();
