import {IRootScopeService} from "angular";
import {IScope} from "angular";
import {IDataService} from "../services/dataService.service";
import {IStateService} from "angular-ui-router";
export class VideoCritiqueEditController {
    critique: Object;
    static $inject = ['$rootScope', '$scope', 'DataService', '$state'];
    constructor(private $rootScope: IRootScopeService, private $scope: IScope, private DataService: IDataService, private $state: IStateService) {

    }

    $onInit = function () {
        let self = this;
        self.$scope.critique = this.critique;
        self.$scope.ratingMax = 10;
        self.$scope.makePrivateHelp = false;

        self.$scope.editedCritique = angular.copy(self.$scope.critique);

        self.DataService.collection('awards')
            .then(function (result) {
                self.$scope.awardsList = result.data.awards;
            });


        self.$scope.update = function () {
            self.$scope.editedCritique.edited_at = moment().toDate();
            // $scope.editedCritique.private = !!$scope.editedCritique.private;
            self.DataService.update('critiques', self.$scope.critique.id, self.$scope.editedCritique).then(function (res) {
                    self.$rootScope.toastMessage('Critique Updated');
                    /*if ($state.is('profile_critique-edit'))
                     $state.go('profile_critiqueselfid: self.critique.id});*/
                    if (self.$state.is('video_critique-edit'))
                        self.$state.go('video_critique', {
                            video_url_id: self.$rootScope.$stateParams.video_url_id, url_id: self.$scope.critique.url_id
                        });
                }, function (err) {
                    // console.log(err);
                    self.$rootScope.toastMessage('Something went wrong...')
                }
            )
        };

        self.$scope.starArray = angular.copy([{"num": 0}, {"num": 1}, {"num": 2}, {"num": 3}, {"num": 4}, {"num": 5}, {"num": 6}, {"num": 7}, {"num": 8}, {"num": 9}, {"num": 10}].reverse());

        self.$scope.hoveringOver = function (value) {
            self.$scope.overStar = value;
            self.$scope.percent = 100 * (value / self.$scope.max);
        };

        self.$scope.calcOverall = function () {
            switch (self.$scope.editedCritique.type) {
                case 'script':
                    self.$scope.editedCritique.overall = (self.$scope.editedCritique.originality + self.$scope.editedCritique.pacing + self.$scope.editedCritique.structure +
                        self.$scope.editedCritique.writing + self.$scope.editedCritique.style + self.$scope.editedCritique.theme + self.$scope.editedCritique.dialogue +
                        self.$scope.editedCritique.characters + self.$scope.editedCritique.presentation + self.$scope.editedCritique.concept) / 10;
                    break;
                case 'video':
                default:
                    self.$scope.editedCritique.overall = (self.$scope.editedCritique.originality + self.$scope.editedCritique.direction + self.$scope.editedCritique.writing +
                        self.$scope.editedCritique.cinematography + self.$scope.editedCritique.performances + self.$scope.editedCritique.production +
                        self.$scope.editedCritique.pacing + self.$scope.editedCritique.structure + self.$scope.editedCritique.audio + self.$scope.editedCritique.music) / 10;
                    break;
            }
        };

        self.$scope.$watchCollection('editedCritique', function () {
            self.$scope.calcOverall();
        });
    }
}


angular.module('IndieWise.directives')
    .component('critiqueEdit', {
        transclude: true,
        templateUrl: 'critiques/critique-edit.html',
        controller: VideoCritiqueEditController,
        // controllerAs: 'VCE',
        bindings: {critique: '<'}
    });