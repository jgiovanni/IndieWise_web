import {IScope, IRootScopeService} from "angular";
import {IDataService} from "../services/dataService.service";
interface ICritiqueView {
    critique: Object;
    comments: Object;
    parentUrlId: string;
    sortOrder: string;
    isLoggedIn: Object | null;
    parentOwnerId: boolean;
    hide: () => void;
    cancel: () => void;
    isPrivate: () => boolean;
    isOwnerOrAuthor: () => boolean;
    loadComments: () => void;
}

export class CritiqueViewController implements ICritiqueView {
    critique: Object;
    comments: Object;
    parentUrlId: string;
    sortOrder: string = 'created_at|desc';
    isLoggedIn: Object | null;
    parentOwnerId: boolean;

    static $inject = ['$scope', '$rootScope', '$mdDialog', 'DataService'];
    constructor(private $scope: IScope, private $rootScope: IRootScopeService, private $mdDialog: any, private DataService: IDataService) {
        // console.log(this);
    }

    $onInit = function () {
        this.isLoggedIn = this.$rootScope.AppData.User;
        this.loadComments();
    };

    hide() {
        this.$mdDialog.hide();
    }

    cancel() {
        this.$mdDialog.cancel();
    }

    isPrivate () {
        return this.critique && this.critique.private;
    }

    isOwnerOrAuthor() {
        return this.isLoggedIn && ((this.critique && this.isLoggedIn.id === this.critique.user_id) || this.isLoggedIn.id === this.parentOwnerId);
    }

    loadComments() {
        this.DataService.collection('comments', { include: 'replies', replies: false, critique: this.critique.id, per_page: 50, sort: this.sortOrder})
            .then((response: Object) => {
                this.comments = response.data;
                // console.log(this);
            }, (error: any) => {
                console.log(error);
            });
    }

}

angular.module('IndieWise.directives')
    .component('critiqueView', {
        templateUrl: 'critiques/critique-view.html',
        controller: CritiqueViewController,
        bindings: { critique: '<', parentUrlId: '<', isLoggedIn: '<' }
    });
