import IScope = angular.IScope;
import IQService = angular.IQService;
import {IScope} from "angular";
import {IDataService} from "../services/dataService.service";
CritiqueDialogController.$inject = ['$scope', 'DataService', '$modalInstance', 'critique', 'project', '$q', 'Analytics'];
function CritiqueDialogController($scope: IScope, DataService: IDataService, $modalInstance: any, critique, project, $q, Analytics) {
    // zIndexPlayer();
    $scope.critique = critique;
    $scope.project = project;
    $scope.ratingMax = 10;
    $scope.makePrivateHelp = false;
    $scope.processing = false;
    $scope.canNominate = false;
    $scope.errors = [];

    if ($scope.project.type.id === '39704d3d-2941-11e6-b8db-86ac961c55b2') {
        DataService.collection('awards', {trailer: true}).then(function (result) {
            $scope.awardsList = result.data.Awards;
        });
    } else {
        DataService.collection('awards').then(function (result) {
            $scope.awardsList = result.data.Awards;
        });
    }

    $scope.dialogModel = {
        award_id: null
    };

    $scope.nominated = {
        award_id: $scope.dialogModel.award_id,
        user_id: $rootScope.AppData.User.id,
        project_id: $scope.critique.project_id,
        critique_id: undefined
    };

    $scope.starArray = angular.copy([{"num": 0}, {"num": 1}, {"num": 2}, {"num": 3}, {"num": 4}, {"num": 5}, {"num": 6}, {"num": 7}, {"num": 8}, {"num": 9}, {"num": 10}].reverse());

    $scope.calcOverall = function () {
        switch ($scope.critique.type) {
            case 'script':
                $scope.critique.overall = ($scope.critique.originality + $scope.critique.pacing + $scope.critique.structure +
                    $scope.critique.writing + $scope.critique.style + $scope.critique.theme + $scope.critique.dialogue +
                    $scope.critique.characters + $scope.critique.presentation + $scope.critique.concept) / 10;
                break;
            case 'video':
            default:
                $scope.critique.overall = ($scope.critique.originality + $scope.critique.direction + $scope.critique.writing +
                    $scope.critique.cinematography + $scope.critique.performances + $scope.critique.production +
                    $scope.critique.pacing + $scope.critique.structure + $scope.critique.audio + $scope.critique.music) / 10;
                break;
        }
    };

    $scope.$watchCollection('critique', function () {
        $scope.calcOverall();
    });

    $scope.$watch('critique.overall', function (newValue) {
        $scope.canNominate = newValue >= 6;
    });

    $scope.validateCritique = function () {
        $scope.errors = [];

        let failA = true;
        let failB = true;
        $scope.critique.body.trim();
        failA = $scope.critique.body.length < 1;
        if (failA) {
            $scope.errors.push('Tell us why you gave this critique an overall rating of ' + $scope.critique.overall);
        }
        switch ($scope.critique.type) {
            case 'script':
                failB = $scope.critique.originality < 1 || $scope.critique.pacing < 1 || $scope.critique.writing < 1 ||
                    $scope.critique.structure < 1 || $scope.critique.style < 1 || $scope.critique.theme < 1 ||
                    $scope.critique.dialogue < 1 || $scope.critique.characters < 1 || $scope.critique.presentation < 1 || $scope.critique.concept < 1;
                break;
            case 'video':
            default:
                failB = $scope.critique.originality < 1 || $scope.critique.direction < 1 || $scope.critique.writing < 1 ||
                    $scope.critique.cinematography < 1 || $scope.critique.performances < 1 || $scope.critique.production < 1 ||
                    $scope.critique.pacing < 1 || $scope.critique.structure < 1 || $scope.critique.audio < 1 || $scope.critique.music < 1;
                break;
        }

        if (failB) {
            $scope.errors.push('Be sure to put a minimum of 1-star in every category.')
        }

        if (!failA && !failB) {
            $scope.postCritique();
        }
    };

    $scope.closeDialog = function () {
        zIndexPlayer(true);
        $modalInstance.close(true);
    };

    $scope.cancel = function () {
        zIndexPlayer(true);
        $modalInstance.dismiss('cancel');
    };

    $scope.hoveringOver = function (value) {
        $scope.overStar = value;
        $scope.percent = 100 * (value / $scope.max);
    };

    $scope.postCritique = function () {
        if ($scope.processing) {
            return false;
        }

        $scope.processing = true;
        $scope.critique.url_id = moment().valueOf();
        DataService.save('critiques?include=user,award', $scope.critique).then(function (res) {
            let obj = res.data.data;

            self.critiques.push(obj);
            self.calcIwAverage(self.critiques);
            // Increment project critiques_count
            self.project.critiques_count++;

            // register Action
            Analytics.trackEvent('video', 'critique', self.project.name);

            // if an award has been selected, create a nomination
            if (!!$scope.dialogModel.award_id && angular.isString($scope.dialogModel.award_id)) {
                $scope.nominated.critique_id = obj.id;
                $scope.nominated.award_id = $scope.dialogModel.award_id;
                DataService.save('nominations', $scope.nominated).then(function (nom) {
                    // Increment project commentCount
                    self.project.nominationCount++;
                    self.updateVideoObj();
                    // register Action
                    self.qNominations();
                    nom.critique = obj;
                    Analytics.trackEvent('video', 'nominate', self.project.name);
                }, function (error) {
                    alert('Failed to create new nomination, with error code: ' + error.message);
                })
            } else {

            }

        }, function (error) {
            alert('Failed to create new critique, with error code: ' + error.message);
            $scope.processing = false;
        }).then(function () {
            self.qCritiques();
            self.checkUserActions();
            $scope.closeDialog();
        });
    };
}

/*
export class CritiqueCreateModalController {
    critique: Object;
    project: Object;
    ratingMax: number = 10;
    makePrivateHelp: boolean = false;
    processing: boolean = false;
    canNominate: boolean = false;
    errors: Array = [];
    dialogModel: Object = {
        award_id: null
    };
    nominated: Object = {
        award_id: $scope.dialogModel.award_id,
        user_id: $rootScope.AppData.User.id,
        project_id: $scope.critique.project_id,
        critique_id: undefined
    };
    starArray: Array<Object> = angular.copy([{"num": 0}, {"num": 1}, {"num": 2}, {"num": 3}, {"num": 4}, {"num": 5}, {"num": 6}, {"num": 7}, {"num": 8}, {"num": 9}, {"num": 10}].reverse());

    static $inject = ['$scope', '$modalInstance', 'critique', 'project', '$q', 'Analytics'];
    constructor(private $scope: IScope, private $modalInstance: any, private critique: Object, private project: Object, private $q: IQService, private Analytics: any) {
        let self = this;

        // this.critique = critique;
        // this.project = project;


        if (this.project.type.id === '39704d3d-2941-11e6-b8db-86ac961c55b2') {
            this.DataService.collection('awards', {trailer: true})
                .then(function (result) {
                    self.awardsList = result.data.Awards;
                });
        } else {
            this.DataService.collection('awards')
                .then(function (result) {
                    self.awardsList = result.data.Awards;
                });
        }
    }

}*/
