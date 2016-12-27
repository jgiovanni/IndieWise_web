import {IRootScopeService, IScope} from "angular";
import {IUserActionsService} from "../services/userActions.service";
import {IDataService} from "../services/dataService.service";
export class VideoCritiqueController {
    critique: Object;
    commentsPage: number = 1;
    comments: any;
    static $inject = ['$rootScope', '$scope', 'UserActions', 'DataService', '_'];

    constructor(private $rootScope: IRootScopeService, private $scope: IScope, private UserActions: IUserActionsService, private DataService: IDataService, private _: any) {
        let self = this;
    }

    $onInit = function () {
        this.init();
    };

    init() {
        let self = this;
        this.$scope.commentsParent = self.critique;

        // Fetch Comments
        this.DataService.collection('comments', {
            critique: self.critique.id,
            per_page: 10,
            page: self.commentsPage,
            replies: false
        }).then(result => self.comments = result.data, (error) => console.log(error));

    };
}


angular.module('IndieWise.directives')
    .component('critique', {
        transclude: true,
        templateUrl: 'critiques/critique.html',
        controller: VideoCritiqueController,
        controllerAs: 'VCC',
        bindings: {critique: '<'}
    });