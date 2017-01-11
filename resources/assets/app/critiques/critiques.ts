import DataService from "../services/dataService.service";
import {IDialogService} from "angular";
interface ICritiques {
    critiques: Array<Object>;
    pagination: Object;
    params: Object;
    disable: boolean;
    parentUrlId: Object;
    parentOwnerId: boolean;
    sortOrder: string;
    isLoggedIn: Object;
    showQuickReply: boolean;
    loading: boolean;
    load: () => void;
    loadMore: () => void;
    reSort: (order: string) => void;
}

export class CritiquesController implements ICritiques {
    critiques: Array<Object> = [];
    pagination: Object;
    params: Object;
    disable: boolean;
    parentUrlId: Object;
    parentOwnerId: boolean;
    sortOrder: string = 'created_at|desc';
    isLoggedIn: Object;
    showQuickReply: boolean = window.Foundation.MediaQuery.atLeast('large');
    loading: boolean = true;

    static $inject = ['$rootScope', 'DataService', 'UserActions', '$modal', '_'];

    constructor(private $rootScope: ng.IRootScopeService, private DataService: DataService, private UserActions: any, private $modal: IDialogService, private _: any) {}

    $onInit = function () {
        this.projectCtrl.projectCritiques = this;
        this.load();
    };

    load() {
        let self = this;
        this.params.sort = this.sortOrder || 'created_at|desc';
        this.DataService.collection('critiques', this.params)
            .then((result) => {
                self.critiques = result.data.data;
                self.pagination = result.data.meta.pagination;
                // self.calcIwAverage(self.critiques);
            }, (error) => {
                console.log(error);
            })
            .then(() => {
                this.loading = false;
            });
    };

    loadMore() {
        let self = this;
        this.params.page = this.pagination.current_page + 1;
        this.loading = true;
        this.DataService.collection('critiques', this.params)
            .then((result) => {
                self.critiques = this._.union(self.critiques, result.data.data);
                self.pagination = result.data.meta.pagination;
                // self.calcIwAverage(self.critiques);
            }, (error) => {
                console.log(error);
            })
            .then(() => {
                this.loading = false;
            });
    }

    reSort(order: string) {
        this.sortOrder = order;
        this.params.page = 1;
        this.loading = true;
        this.load();
    }
}

angular.module('IndieWise.directives')
/*IndieWise*/.component('critiques', {
    require: {
        projectCtrl: '^^project'
    },
    transclude: true,
    templateUrl: 'critiques/critiques.html',
    controller: CritiquesController,
    bindings: {params: '=', disable: '<', parentUrlId: '<', parentOwnerId: '<'}
});