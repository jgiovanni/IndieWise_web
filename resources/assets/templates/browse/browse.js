(function () {
    'use strict';

    angular.module('IndieWise.browse', [])
        .controller('BrowseCtrl', BrowseController);

    BrowseController.$inject = ['$scope', '$rootScope', '$state', 'DataService', '$q', '$timeout', '$modal', '$mdSidenav', '_'];
    function BrowseController($scope, $rootScope, $state, DataService, $q, $timeout, $modal, $mdSidenav, _) {
        $rootScope.metadata.title = 'Browse';
        var self = this;
        self.isOpen = false;
        self.loading = false;
        self.selectedGenres = [];
        self.selectedTypes = [];
        self.films = [];
        self.arrs = {
            genres: [],
            types: []
        };
        self.filters = {
            sort: $rootScope.$stateParams.sort || 'created_at',
            genres: $rootScope.$stateParams.genres || undefined,
            type: $rootScope.$stateParams.types || undefined,
            search: $rootScope.$stateParams.q || undefined,
            page: 1
        };
        $rootScope.AppData.searchText = $rootScope.$stateParams.q;

        $rootScope.generateTypes().then(function (types) {
            var d = $q.defer();

            self.arrs.types = angular.isArray(self.selectedTypes) && self.selectedTypes.length ? self.selectedTypes : types;
            return d.promise;
        });

        $rootScope.generateGenres().then(function (genres) {
            var d = $q.defer();
            self.arrs.genres = angular.isArray(self.selectedGenres) && self.selectedGenres.length ? self.selectedGenres : genres;
            return d.promise;
        });

        self.refresh = function () {
            $q.all([$rootScope.generateTypes(), $rootScope.generateGenres()]).then(function (values) {
                self.filters.sort = $rootScope.$stateParams.sort || 'recent';
                self.search();
            });
        };

        self.search = function () {
            self.loading = true;
            var filterField = '';
            switch (self.filters.sort) {
                case 'trending':
                    filterField = 'reactions_count';
                    break;
                case 'rating':
                    filterField = 'iwRating';
                    break;
                case 'awards':
                    filterField = 'wins_count';
                    break;
                case 'recent':
                default:
                    filterField = 'created_at';
                    break;
            }

            $rootScope.AppData.searchText = $rootScope.$stateParams.q = self.filters.search || undefined;
            DataService.collection('projects', {
                sort: filterField,
                order: 'DESC',
                types: _.pluck(self.selectedTypes, 'id').toString(),
                genres: _.pluck(self.selectedGenres, 'id').toString(),
                search: self.filters.search || undefined,
                per_page: 50,
                page: self.filters.page
            }).then(function (res) {
                self.pagination = res.data.meta.pagination;
                return self.films = res.data.data;
            }).then(function () {
                self.loading = false;
            });


            $scope.$broadcast('scroll.refreshComplete');
        };

        self.loadMore = function () {
            if (self.loading) {
                $rootScope.toastMessage('Please wait...');
            }

            self.loading = true;
            var filterField = '';
            switch (self.filters.sort) {
                case 'trending':
                    filterField = 'reactions_count';
                    break;
                case 'rating':
                    filterField = 'iwRating';
                    break;
                case 'awards':
                    filterField = 'wins_count';
                    break;
                case 'recent':
                default:
                    filterField = 'created_at';
                    break;
            }

            DataService.collection('projects', {
                sort: filterField,
                order: 'DESC',
                types: _.pluck(self.selectedTypes, 'id').toString(),
                genres: _.pluck(self.selectedGenres, 'id').toString(),
                search: self.filters.search || undefined,
                per_page: 50,
                page: ++self.filters.page
            }).then(function (res) {
                return self.films = _.union(self.films, res.data.data);
            }).then(function () {
                self.loading = false;
            });
        };

        self.selectGenres = function (genre) {
            var exists = _.findWhere(self.selectedGenres, {id: genre.id});
            !!exists ? self.selectedGenres = _.reject(self.selectedGenres, genre) : self.selectedGenres.push(genre);
            self.search();
        };

        self.selectTypes = function (type) {
            var exists = _.find(self.selectedTypes, {id: type.id});
            !!exists ? self.selectedTypes = _.reject(self.selectedTypes, type) : self.selectedTypes.push(type);
            self.search();
        };

        self.filterBy = function (filter) {
            self.search();
        };

        self.toggleFilterNav = function () {
            $mdSidenav('filterNav')
                .toggle()
                .then(function () {

                });

        };

        /*$scope.$watch('filters.search', function (newValue, oldValue) {
         debugger;
         });*/

        self.refresh();
    }
})();
