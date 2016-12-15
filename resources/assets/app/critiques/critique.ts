import DataService from "../services/dataService.service";
import {IDialogService} from "angular";

interface ICritique {
    critique: Object;
    parentUrlId: Object | null;
    parentOwnerId: boolean;
    showQuickReply: boolean;
    isPrivate: () => boolean;
    isOwnerOrAuthor: () => boolean;
    view: () => void;
    // deleteCritique: () => void;

}

export class CritiqueController implements ICritique {
    critique: Object;
    parentUrlId: Object | null;
    parentOwnerId: boolean;
    showQuickReply: boolean = window.Foundation.MediaQuery.atLeast('large') || false;

    static $inject = ['$rootScope', 'DataService', 'UserActions', '$modal', '_'];
    constructor(private $rootScope: ng.IRootScopeService, private DataService: DataService, private UserActions: any, private $modal: IDialogService, private _: any) {}

    $onInit = function () {
        this.critique.replies = [];
        this.critique.showReplies = false;
    };

    isPrivate () {
        return this.critique && this.critique.private;
    };

    isOwnerOrAuthor() {
        return this.isLoggedIn && ((this.critique && this.isLoggedIn.id == this.critique.user_id) || this.isLoggedIn.id == this.parentOwnerId);
    };

    view() {

    }

    /*deleteCritique() {
        let self = this;
        this.UserActions.checkAuth().then(function (res) {
            if (res) {
                let modalInstance = this.$modal.open({
                    templateUrl: 'templates/common/confirmDialog.html',
                    controller: ['$scope', '$modalInstance', function ($scope, $modalInstance) {
                        $scope.ok = function () {
                            $modalInstance.close(true);
                        };

                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };
                    }],
                    size: window.Foundation.MediaQuery.atLeast('large') ? 'tiny' : 'small',
                    keyboard: true
                });
                modalInstance.result.then(function () {
                    if (this.isOwnerOrAuthor) {
                        this.DataService.delete('Critique', this.critique.id).then(function () {
                            this.$rootScope.toastMessage('Your critique was deleted.');
                            // Decrement film critiques_count
                            self.film.critiques_count--;
                            this.updateVideoObj();
                            self.checkUserActions();
                            this.critiques = this._.reject(this.critiques, function (a) {
                                return a.id === critique.id;
                            });
                        });
                    }
                }, function () {
                    // console.info('Modal dismissed at: ' + new Date());
                });
            }
        })
    };*/

}

angular.module('IndieWise.directives')
/*IndieWise*/.component('critiqueItem', {
    transclude:true,
    templateUrl: 'critiques/critique-item.html',
    controller: CritiqueController,
    bindings: {critique: '=', parentUrlId: '<', parentOwnerId: '<'}
});