import {IRootScopeService} from "angular";
import {IScope} from "angular";
import {IDataService} from "../services/dataService.service";
import {IStateService} from "angular-ui-router";
export class VideoCritiqueEditController {
    critique: Object;
    static $inject = ['$rootScope', '$scope', 'DataService', '$state', 'Critique'];
    constructor($rootScope: IRootScopeService, $scope: IScope, DataService: IDataService, $state: IStateService) {
        $scope.critique = this.critique;
        $scope.ratingMax = 10;
        $scope.makePrivateHelp = false;

        $scope.editedCritique = angular.copy($scope.critique);

        DataService.collection('awards')
            .then(function (result) {
                $scope.awardsList = result.data.awards;
            });


        $scope.update = function () {
            $scope.editedCritique.edited_at = moment().toDate();
            // $scope.editedCritique.private = !!$scope.editedCritique.private;
            DataService.update('critiques', $scope.critique.id, $scope.editedCritique).then(function (res) {
                    $rootScope.toastMessage('Critique Updated');
                    /*if ($state.is('profile_critique-edit'))
                     $state.go('profile_critiqueselfid: self.critique.id});*/
                    if ($state.is('video_critique-edit'))
                        $state.go('video_critique', {
                            video_url_id: $rootScope.$stateParams.video_url_id, url_id: $scope.critique.url_id
                        });
                }, function (err) {
                    // console.log(err);
                    $rootScope.toastMessage('Something went wrong...')
                }
            )
        };

        $scope.starArray = angular.copy([{"num": 0}, {"num": 1}, {"num": 2}, {"num": 3}, {"num": 4}, {"num": 5}, {"num": 6}, {"num": 7}, {"num": 8}, {"num": 9}, {"num": 10}].reverse());

        $scope.hoveringOver = function (value) {
            $scope.overStar = value;
            $scope.percent = 100 * (value / $scope.max);
        };

        $scope.calcOverall = function () {
            switch ($scope.editedCritique.type) {
                case 'script':
                    $scope.editedCritique.overall = ($scope.editedCritique.originality + $scope.editedCritique.pacing + $scope.editedCritique.structure +
                        $scope.editedCritique.writing + $scope.editedCritique.style + $scope.editedCritique.theme + $scope.editedCritique.dialogue +
                        $scope.editedCritique.characters + $scope.editedCritique.presentation + $scope.editedCritique.concept) / 10;
                    break;
                case 'video':
                default:
                    $scope.editedCritique.overall = ($scope.editedCritique.originality + $scope.editedCritique.direction + $scope.editedCritique.writing +
                        $scope.editedCritique.cinematography + $scope.editedCritique.performances + $scope.editedCritique.production +
                        $scope.editedCritique.pacing + $scope.editedCritique.structure + $scope.editedCritique.audio + $scope.editedCritique.music) / 10;
                    break;
            }
        };

        $scope.$watchCollection('editedCritique', function () {
            $scope.calcOverall();
        });
    }
}


angular.module('IndieWise.directives')
    .component('critiqueEdit', {
        transclude: true,
        templateUrl: 'critiques/critique-edit.html',
        controller: VideoCritiqueEditController,
        controllerAs: 'VCC',
        bindings: {critique: '<'}
    });