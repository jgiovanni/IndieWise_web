import {IRootScopeService, IScope, ITimeoutService, IQService} from "angular";
import {IStateService} from "angular-ui-router";
import {IDataService} from "../services/dataService.service";
interface IBrowse {
    isOpen: boolean;
    loading: boolean;
    selectedGenres: Array<Object>;
    selectedTypes: Array<Object>;
    films: Array<Object>;
    arrs: Object;
    filters: Object;

    refresh: () => void;
    search: () => void;
    loadMore: () => void;
    selectGenres: (genre: Object) => void;
    selectTypes: (type: Object) => void;
    filterBy: () => void;
    toggleFilterNav: () => void;
}

export class BrowseController implements IBrowse {
    isOpen: boolean = false;
    loading: boolean = false;
    selectedGenres: Array<Object> = [];
    selectedTypes: Array<Object> = [];
    films: Array<Object> = [];
    arrs: Object = {
        genres: [],
        types: []
    };
    filters: Object = {
        sort: this.$rootScope.$stateParams.sort || 'created_at',
        genres: this.$rootScope.$stateParams.genres || undefined,
        type: this.$rootScope.$stateParams.types || undefined,
        search: this.$rootScope.$stateParams.q || undefined,
        page: 1
    };

    static $inject = ['$scope', '$rootScope', '$state', 'DataService', '$q', '$timeout', '$modal', '$mdSidenav', '_'];

    constructor(private $scope: IScope, private $rootScope: IRootScopeService, private $state: IStateService, private DataService: IDataService, private $q: IQService, private $timeout: ITimeoutService, private $modal: any, private $mdSidenav: any, private _: any) {
        let self = this;
    }

    $onInit = function () {
        let self = this;
        this.$rootScope.AppData.searchText = this.$rootScope.$stateParams.q;

        this.$rootScope.generateTypes().then(function (types) {
            let d = self.$q.defer();

            self.arrs.types = angular.isArray(self.selectedTypes) && self.selectedTypes.length ? self.selectedTypes : types;
            return d.promise;
        }, (error) => console.log(error));

        this.refresh();
    };

    refresh() {
        let self = this;
        this.$q.all([self.$rootScope.generateTypes(), self.$rootScope.generateGenres()])
            .then(function (values) {
                self.filters.sort = self.$rootScope.$stateParams.sort || 'recent';
                self.search();
            });
    }

    search() {
        let self = this;
        self.loading = true;
        let filterField = '';
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

        self.$rootScope.AppData.searchText = self.$rootScope.$stateParams.q = self.filters.search || undefined;
        self.DataService.collection('projects', {
            sort: filterField,
            order: 'DESC',
            types: self._.pluck(self.selectedTypes, 'id').toString(),
            genres: self._.pluck(self.selectedGenres, 'id').toString(),
            search: self.filters.search || undefined,
            per_page: 50,
            page: self.filters.page
        }).then(res => {
            self.pagination = res.data.meta.pagination;
            return self.films = res.data.data;
        }, (error) => console.log(error)).then(() => self.loading = false);


        self.$scope.$broadcast('scroll.refreshComplete');
    }

    loadMore() {
        let self = this;
        if (self.loading) {
            self.$rootScope.toastMessage('Please wait...');
        }

        self.loading = true;
        let filterField = '';
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

        self.DataService.collection('projects', {
            sort: filterField,
            order: 'DESC',
            types: self._.pluck(self.selectedTypes, 'id').toString(),
            genres: self._.pluck(self.selectedGenres, 'id').toString(),
            search: self.filters.search || undefined,
            per_page: 50,
            page: ++self.filters.page
        })
            .then(res => self.films = self._.union(self.films, res.data.data), (error) => console.log(error))
            .then(() => self.loading = false);
    }

    selectGenres(genre: Object) {
        let self = this;
        let exists = self._.findWhere(self.selectedGenres, {id: genre.id});
        !!exists ? self.selectedGenres = self._.reject(self.selectedGenres, genre) : self.selectedGenres.push(genre);
        self.search();
    }

    selectTypes(type: Object) {
        let self = this;
        let exists = self._.find(self.selectedTypes, {id: type.id});
        !!exists ? self.selectedTypes = self._.reject(self.selectedTypes, type) : self.selectedTypes.push(type);
        self.search();
    }

    filterBy(filter: any) {
        let self = this;
        self.search();
    }

    toggleFilterNav() {
        this.$mdSidenav('filterNav')
            .toggle()
            .then(function () {

            });

    }
}

angular.module('IndieWise.browse', [])
// .controller('BrowseCtrl', BrowseController)
    .component('browse', {
        templateUrl: 'browse/index.html',
        controller: BrowseController,
        controllerAs: 'Browse',
        bindings: {}
    });


