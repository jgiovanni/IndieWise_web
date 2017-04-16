import {IMedia, IDialogService} from "angular";
import {IState} from "angular-ui-router";
// import {IndieWise} from '../../js/app';
// import {DataService} from  '../services/dataService.service';
interface IProjectCard {
    queried: boolean;
    isQueried: boolean;
    video: Object;
    type: any;
    related: any;
    isLoggedIn: any;
}

export class ProjectCardController implements IProjectCard {
    queried: boolean;
    isQueried: boolean = this.queried;
    video: Object;
    type: any;
    related: any;
    isLoggedIn: any;

    static $inject = ['$rootScope', '$state', '$modal', '$mdMedia', 'UserActions'];
    constructor(private $rootScope: ng.IRootScopeService, private $state: IState, private $modal: IDialogService, private $mdMedia: IMedia, private UserActions: any) {
        this.isLoggedIn = this.$rootScope.AppData.User;
    }

    $onInit = function () {
        if (this.video.thumbnail_url.indexOf('cloudinary') !== -1) {
            let str = this.video.thumbnail_url.split('upload/');
            this.video.thumbnail_url = str[0] + 'upload/c_scale,f_auto,h_275,q_80/' + str[1];
        }
    };

    openShareDialog() {
        let self = this;
        this.$modal.open({
            templateUrl: 'common/share-dialog.html',
            resolve: {
                Video: function () {
                    return self.video;
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

angular.module('IndieWise.directives')
    .component('projectCard', {
    templateUrl: 'common/project-card.html',
    // transclude: true,
    controller: ProjectCardController,
    bindings: {queried: '=', isLoggedIn: '=', type: '=', video: '<'}
});
