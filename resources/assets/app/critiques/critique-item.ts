import DataService from "../services/dataService.service";
import {CritiqueViewController} from "./critique-view";

interface ICritique {
    critique: Object;
    parentUrlId: Object;
    isLoggedIn: Object;
    parentOwnerId: boolean;
    showQuickReply: boolean;

    isPrivate: () => boolean;
    isOwnerOrAuthor: () => boolean;
    view: () => void;
    deleteCritique: (event: Object) => void;

}

export class CritiqueController implements ICritique {
    critique: Object;
    parentUrlId: Object;
    isLoggedIn: Object;
    parentOwnerId: boolean;
    showQuickReply: boolean = window.Foundation.MediaQuery.atLeast('large') || false;

    static $inject = ['$rootScope', 'DataService', 'UserActions', '$mdDialog', '_'];
    constructor(private $rootScope: ng.IRootScopeService, private DataService: DataService, private UserActions: any, private $mdDialog: any, private _: any) {}

    $onInit = function () {
        this.critique.replies = [];
        this.critique.showReplies = false;
        this.isLoggedIn = this.$rootScope.AppData.User;
    };

    isPrivate () {
        return this.critique && this.critique.private;
    };

    isOwnerOrAuthor() {
        return this.isLoggedIn && ((this.critique && this.isLoggedIn.id === this.critique.user_id) || this.isLoggedIn.id === this.parentOwnerId);
    };

    view() {
        let self = this;
        this.$mdDialog.show({
            autoWrap: true,
            templateUrl: 'critiques/critique-view.html',
            bindToController: true,
            controllerAs: '$ctrl',
            locals: {
                critique: self.critique,
                parentUrlId: self.parentUrlId,
                isLoggedIn: self.isLoggedIn
            },
            controller: CritiqueViewController,
            clickOutsideToClose:true,
        });

    }

    deleteCritique(event: Object) {
        let self = this;
        this.UserActions.checkAuth().then(function (res) {
            if (res) {
                let confirm = this.$mdDialog.confirm()
                    .title('Delete Critique')
                    .textContent('Are you sure you want to delete your critique?')
                    .ariaLabel('Delete Critique')
                    .targetEvent(event)
                    .ok('Yes')
                    .cancel('No');

                this.$mdDialog.show(confirm).then(function() {
                    if (this.isOwnerOrAuthor) {
                        this.DataService.delete('Critique', this.critique.id).then(function () {
                            this.$rootScope.toastMessage('Your critique was deleted.');
                            // Decrement film critiques_count
                            this.film.critiques_count--;
                            this.updateVideoObj();
                            this.checkUserActions();
                            this.critiques = this._.reject(this.critiques, function (a) {
                                return a.id === self.critique.id;
                            });
                        });
                    }
                }, function(error) {
                    console.log(error);
                });
            }
        })
    };

}

angular.module('IndieWise.directives')
/*IndieWise*/.component('critiqueItem', {
    transclude:true,
    templateUrl: 'critiques/critique-item.html',
    controller: CritiqueController,
    bindings: {critique: '=', parentUrlId: '<', parentOwnerId: '<'}
});