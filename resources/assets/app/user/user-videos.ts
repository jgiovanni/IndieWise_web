import {IUser} from "./user";
import {IUserActionsService} from "../services/userActions.service";
import {IDataService} from "../services/dataService.service";
import {IRootScopeService} from "angular";
export class UserVideosController implements IUser{
    user: Object;
    userStats: Object;
    projects: Object = null;

    static $inject = ['$rootScope', 'DataService', '$modal', 'UserActions', '_'];
    constructor(private $rootScope: IRootScopeService, private DataService: IDataService, private $modal: any, private UserActions: IUserActionsService, private _: any) {
        let self = this;
    }

    deleteProject (videoId: string) {
        let self = this;
        if (this.$rootScope.isAuthenticated()) {
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
                self.DataService.delete('projects', videoId).then(function () {
                    self.projects.data = self._.reject(self.projects.data, function (response) {
                        return response.id === videoId;
                    });
                });
            }, function () {
                // console.info('Modal dismissed at: ' + new Date());
            });
        }
    }
}

angular.module('IndieWise.user')
    .component('userVideos', {
        require: {
            UserCtrl: '^^user'
        },
        templateUrl: 'user/user-videos.html',
        controller: UserVideosController,
        controllerAs: 'UserVideosCtrl',
        bindings: {user: '<', userStats: '<', projects: '<'}
    });