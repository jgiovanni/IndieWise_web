interface ICritiqueView {
    critique: Object;
    comments: Object;
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
    sortOrder: string = 'created_at|desc';
    isLoggedIn: Object | null;
    parentOwnerId: boolean;

    static $inject = ['$scope', '$mdDialog', 'DataService'];
    constructor(private $scope: any, private $mdDialog: any, private DataService: any) {
        // console.log(this);
        this.loadComments();
    }

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
            .then((response) => {
                this.comments = response.data;
                // console.log(this);
            }, (error) => {
                console.log(error);
            });
    }

}

/*
angular.module('IndieWise.directives')
    .component('critiqueView', {
        templateUrl: 'critiques/critique-view.html',
        controller: CritiqueViewController,
        bindings: { critique: "<" }
    });*/
