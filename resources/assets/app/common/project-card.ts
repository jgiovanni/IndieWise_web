import {IMedia, IDialogService} from "angular";
import {IState} from "angular-ui-router";
// import {IndieWise} from '../../js/app';
// import {DataService} from  '../services/dataService.service';
interface IProjectCard {
    queried: boolean;
    isQueried: boolean;
    video: Object | null;
    type: any | null;
    related: any | null;
    isLoggedIn: any | null;
}

export class ProjectCardController implements IProjectCard {
    queried: boolean;
    isQueried: boolean = this.queried;
    video: Object | null;
    type: any | null;
    related: any | null;
    isLoggedIn: any | null;

    static $inject = ['$rootScope', '$state', '$modal', '$mdMedia', 'UserActions'];
    constructor(private $rootScope: ng.IRootScopeService, private $state: IState, private $modal: IDialogService, private $mdMedia: IMedia, private UserActions: any) {
        this.isLoggedIn = this.$rootScope.AppData.User;
    }

    openShareDialog(video) {
        this.$modal.open({
            templateUrl: 'templates/common/shareDialog.html',
            resolve: {
                Video: function () {
                    return video;
                }
            },
            controller: ['$scope', '$modalInstance', 'Video', function ($scope, $modalInstance, Video) {
                $scope.video = Video;
                $scope.shareLink = window.location.origin + '/' + Video.url_id;
                $scope.cancel = function () {
                    $modalInstance.close();
                };
            }]
        })
    };
}

// ProjectCardController.$inject = ['$rootScope', '$state', '$modal', '$mdMedia', 'UserActions'];

angular.module('IndieWise.directives')
/*IndieWise*/.component('projectCard', {
    templateUrl: 'components/project-card.html',
    // transclude: true,
    controller: ProjectCardController,
    bindings: {queried: '=', isLoggedIn: '=', type: '=', video: '='}
});
