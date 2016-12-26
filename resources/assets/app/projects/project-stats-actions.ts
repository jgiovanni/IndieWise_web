import IRootScopeService = angular.IRootScopeService;
import {IDataService} from "../services/dataService.service";
import {IUserActionsService} from "../services/userActions.service";
import ITimeoutService = angular.ITimeoutService;
import {IStateService} from "angular-ui-router";
/**
 * Created by jerezb on 2016-12-24.
 */
interface IProjectStatsActions {
    canRate: boolean;
    canReact: boolean;
    canCritique: boolean;
    isFaved: boolean;
    isSaved: boolean;
    rateThrottled: boolean;
    emotions: Array<Object>;
    project: Object;

    checkUserActions: () => void;
    react: (emotion: Object) => void;
    rate: (direction: string) => void;
    openCritiqueDialog: ($event: any) => void;
    openShareDialog: () => void;
    openReactionDialog: () => void;
    openAddToDialog: () => void;
    canReactIcon: () => string|boolean;
    openReportDialog: () => void;
}

export class ProjectStatsActionsController implements IProjectStatsActions {
    canRate: boolean = false;
    canReact: boolean = false;
    canCritique: boolean = false;
    isFaved: boolean = false;
    isSaved: boolean = false;
    rateThrottled: boolean = false;
    emotions: Array<Object> = [];
    project: Object;

    static $inject = ['$rootScope', 'DataService', 'UserActions', '$timeout', '$state', '$modal', '_'];

    constructor(private $rootScope: IRootScopeService, private DataService: IDataService, private UserActions: IUserActionsService, private $timeout: ITimeoutService, private  $state: IStateService, private $modal: any, private _: any) {
        let self = this;
    }

    $onInit = function () {
        this.emotions = this.$rootScope.generateReactions();

        if (!this.$rootScope.isAuthenticated()) {
            let endWatch = this.$rootScope.$watch('AppData.User', function (newValue, oldValue) {
                if (newValue && angular.isString(newValue.id)) {
                    console.log('User Logged In');
                    this.checkUserActions();
                    endWatch();
                }
            });
        }
    };

    checkUserActions() {
        let self = this;
        if (this.$rootScope.isAuthenticated()) {
            this.UserActions.canReact(self.project.id).then(function (res) {
                self.canReact = res;
            }, function (error) {
                self.canReact = error;
            });

            if (self.project.disableCritique || (self.project.owner_id === this.$rootScope.AppData.User.id)) {
                console.log('owner');
                self.canCritique = false;
            } else {
                this.UserActions.canCritique(self.project.id).then(function (res) {
                    self.canCritique = res;
                }, function (error) {
                    self.canCritique = error;
                });
            }

            this.UserActions.canRate(self.project.id).then(function (res) {
                self.canRate = res;
            }, function (error) {
                self.canRate = error;
            });
        } else {
            self.canCritique = true;
        }
    }

    react(emotion: Object) {
        let self = this;
        if (angular.isDefined(emotion)) {
            if (!this.$rootScope.isAuthenticated()) {
                this.UserActions.loginModal();
                return false;
            }

            if (this.$rootScope.isNotVerified()) {
                this.$rootScope.toastAction('Please verify your account and join the conversation! Check your spam folder too.', 'Verify Now', this.$rootScope.requestVerificationEmail);
                return false;
            }

            let actionVerb = 'react';
            if (self.canReact === true) {
                this.DataService.save('reactions', {
                    user_id: this.$rootScope.AppData.User.id,
                    project_id: self.project.id,
                    emotion: emotion.emotion
                }).then(function (resA) {
                    self.project.reactions_count++;
                    // self.updateVideoObj();
                    self.checkUserActions();
                    self.qReactions();
                });
            } else if (angular.isObject(self.canReact)) {
                if (self.canReact.emotion !== emotion.emotion) {
                    this.DataService.update('reactions', self.canReact.id, {
                        emotion: emotion.emotion
                    }).then(function (resA) {
                        self.canReact = resA.data;
                        // self.updateVideoObj();
                        self.checkUserActions();
                        self.qReactions();
                    });
                }
            }
        }
    }

    rate(direction: string) {
        let self = this;
        if (this.rateThrottled) {
            return false;
        }

        if (!this.$rootScope.isAuthenticated()) {
            this.UserActions.loginModal();
            return false;
        }

        if (this.$rootScope.isNotVerified()) {
            this.$rootScope.toastAction('Please verify your account so you can rate videos! Check your spam folder too.', 'Verify Now', this.$rootScope.requestVerificationEmail);
            return false;
        }

        this.rateThrottled = true;
        let actionVerb = 'like';
        if (this.canRate === true) {
            this.DataService.save('ratings', {
                author_id: this.$rootScope.AppData.User.id,
                project_id: this.project.id,
                up: direction === 'up',
                down: direction === 'down'
            }).then(function (res) {
                // console.log(res);
                switch (direction) {
                    case 'up':
                        // Increment project up_ratings_count
                        self.project.up_ratings_count++;
                        break;
                    case 'down':
                        // Increment project down_ratings_count
                        self.project.down_ratings_count++;
                        actionVerb = 'unlike';
                        break;
                }

                // self.updateVideoObj();
                angular.extend(res.data, {projectOwner: self.project.owner_id});
                self.checkUserActions();
            });

        } else if (angular.isObject(self.canRate)) {
            //up is false && down is false
            if (!self.canRate.up && !self.canRate.down) {
                this.DataService.update('ratings', self.canRate.id, {
                    up: direction === 'up',
                    down: direction === 'down',
                })
                    .then(function (res) {
                        switch (direction) {
                            case 'up':
                                // Increment project up_ratings_count
                                self.project.up_ratings_count++;
                                break;
                            case 'down':
                                // Increment project down_ratings_count
                                self.project.down_ratings_count++;
                                actionVerb = 'unlike';
                                break;
                        }
                        angular.extend(self.canRate, {up: direction === 'up', down: direction === 'down'});
                        //self.updateVideoObj();
                        angular.extend(res.data, {projectOwner: self.project.owner_id});
                        //self.checkUserActions();
                    });

                // up is already true && direction is up
            } else if (!!self.canRate.up && direction === 'up') {
                //DataService.delete('Rating', self.canRate.id)
                angular.extend(self.canRate, {up: false});
                this.DataService.update('ratings', self.canRate.id, {up: false, down: false})
                    .then(function (res) {
                        self.project.up_ratings_count--;
                        //self.updateVideoObj();
                        angular.extend(res.data, {projectOwner: self.project.owner_id});
                        //self.checkUserActions();
                    });

                // down is already true && direction is down
            } else if (!!self.canRate.down && direction === 'down') {
                //DataService.delete('Rating', self.canRate.id)
                angular.extend(self.canRate, {down: false});
                this.DataService.update('ratings', self.canRate.id, {up: false, down: false})
                    .then(function (res) {
                        self.project.down_ratings_count--;
                        //self.updateVideoObj();
                        angular.extend(res.data, {projectOwner: self.project.owner_id});
                        //self.checkUserActions();
                    });

                // down is true && direction is up || up is true && direction is down -> reversal
            } else if ((!!self.canRate.down && direction === 'up') || (!!self.canRate.up && direction === 'down')) {
                let up = false, down = false;
                switch (direction) {
                    case 'up':
                        up = true;
                        self.project.up_ratings_count++;
                        self.project.down_ratings_count--;
                        angular.extend(self.canRate, {up: up, down: down});
                        break;
                    case 'down':
                        down = true;
                        self.project.up_ratings_count--;
                        self.project.down_ratings_count++;
                        angular.extend(self.canRate, {up: up, down: down});
                        actionVerb = 'unlike';
                        break;
                }
                this.DataService.update('ratings', self.canRate.id, {up: up, down: down}).then(function (res) {
                    //self.updateVideoObj();
                    //self.checkUserActions();
                    angular.extend(res.data, {projectOwner: self.project.owner_id});
                });
            }
        }
        this.$timeout(function () {
            self.rateThrottled = false;
        }, 1000);
    }

    openCritiqueDialog($event: any) {
        let self = this;
        if (self.canCritique !== true && self.canCritique !== false) {
            return this.$state.go('video_critique', {
                video_url_id: self.project.url_id,
                url_id: self.canCritique.url_id
            });
        }

        CritiqueDialogController.$inject = ['$scope', '$modalInstance', 'critique', 'project', '$q', 'Analytics'];
        function CritiqueDialogController($scope, $modalInstance, critique, project, $q, Analytics) {
            // zIndexPlayer();
            $scope.critique = critique;
            $scope.project = project;
            $scope.ratingMax = 10;
            $scope.makePrivateHelp = false;
            $scope.processing = false;
            $scope.canNominate = false;
            $scope.errors = [];

            if ($scope.project.type.id === '39704d3d-2941-11e6-b8db-86ac961c55b2') {
                self.DataService.collection('awards', {trailer: true}).then(function (result) {
                    $scope.awardsList = result.data.Awards;
                });
            } else {
                self.DataService.collection('awards').then(function (result) {
                    $scope.awardsList = result.data.Awards;
                });
            }

            $scope.dialogModel = {
                award_id: null
            };

            $scope.nominated = {
                award_id: $scope.dialogModel.award_id,
                user_id: self.$rootScope.AppData.User.id,
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
                // zIndexPlayer(true);
                $modalInstance.close(true);
            };

            $scope.cancel = function () {
                // zIndexPlayer(true);
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
                self.DataService.save('critiques?include=user,award', $scope.critique).then(function (res) {
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
                        self.DataService.save('nominations', $scope.nominated).then(function (nom) {
                            // Increment project commentCount
                            self.project.nominationCount++;
                            // self.updateVideoObj();
                            // register Action
                            // self.qNominations();
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
                    // self.qCritiques();
                    self.checkUserActions();
                    $scope.closeDialog();
                });
            };
        }

        this.UserActions.canCritique(self.project.id).then(function (res) {
            // is logged in
            if (res) {

                if (self.$rootScope.isNotVerified()) {
                    this.$rootScope.toastAction('Please verify your account and join the conversation! Check your spam folder too.', 'Verify Now', this.$rootScope.requestVerificationEmail);
                    return false;
                }

                if (self.project.owner_id === this.$rootScope.AppData.User.id) {
                    this.$rootScope.toastMessage('You cannot critique your own content.');
                    return false;
                }

                self.$modal.open({
                    templateUrl: 'templates/common/critique-dialog.html',
                    resolve: {
                        critique: function () {
                            return {
                                originality: 0,
                                direction: 0,
                                writing: 0,
                                cinematography: 0,
                                performances: 0,
                                production: 0,
                                pacing: 0,
                                structure: 0,
                                audio: 0,
                                music: 0,
                                overall: 0,
                                private: false,
                                user_id: this.$rootScope.AppData.User.id,
                                body: '',
                                project_id: self.project.id,
                                type: self.project.hosting_type === 'script' ? 'script' : 'video',
                                style: 0,
                                theme: 0,
                                dialogue: 0,
                                characters: 0,
                                presentation: 0,
                                concept: 0,
                            };
                        },
                        project: function () {
                            return self.project;
                        }
                    },
                    controller: CritiqueDialogController,
                    keyboard: true
                });
            }
        }, function (err) {
            if (angular.isObject(err)) {
                return false;
            } else self.UserActions.loginModal();
        });
    }

    openShareDialog() {
        let self = this;
        this.$modal.open({
            templateUrl: 'common/share-dialog.html',
            resolve: {
                Video: function () {
                    return self.project;
                }
            },
            size: window.Foundation.MediaQuery.atLeast('large') ? 'tiny' : 'small',
            controller: ['$rootScope', '$scope', '$modalInstance', 'Video', function ($rootScope, $scope, $modalInstance, Video) {
                // zIndexPlayer();
                $scope.video = Video;
                $scope.shareLink = window.location.origin + '/' + Video.url_id;
                $scope.cancel = function () {
                    // zIndexPlayer(true);
                    $modalInstance.close();
                };
            }]
        });
    }

    openReactionDialog() {
        let self = this;
        // is logged in
        if (this.$rootScope.isAuthenticated()) {

            if (this.$rootScope.isNotVerified()) {
                this.$rootScope.toastAction('Please verify your account and join the conversation! Check your spam folder too.', 'Verify Now', this.$rootScope.requestVerificationEmail);
                return false;
            }

            let modalInstance = this.$modal.open({
                templateUrl: 'projects/modal/reaction-dialog.html',
                resolve: {
                    Video: function () {
                        return self.project;
                    },
                    Reaction: function () {
                        return self.canReact || null;
                    },
                    Emotions: function () {
                        return self.emotions;
                    }
                },
                size: window.Foundation.MediaQuery.atLeast('medium') ? 'tiny' : 'full',
                controller: ['$scope', '$modalInstance', 'Video', 'Reaction', 'Emotions', '_', function ($scope, $modalInstance, Video, Reaction, Emotions, _) {
                    // zIndexPlayer();
                    $scope.video = Video;
                    $scope.emotions = Emotions;

                    $scope.getEmoticonByEmotion = function (emotion) {
                        return _.findWhere($scope.emotions, {emotion: emotion});
                    };

                    $scope.selectedEmotion = function (e) {
                        // zIndexPlayer(true);
                        //$modalInstance.dismiss('cancel');
                        $modalInstance.close(e);
                    };

                    $scope.cancel = function () {
                        // zIndexPlayer(true);
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.closeDialog = function () {
                        // zIndexPlayer(true);
                        $modalInstance.dismiss('cancel');
                    };

                }]
            });

            modalInstance.result.then(function (reaction) {
                self.react(reaction);
            }, function () {
                // console.info('Modal dismissed at: ' + new Date());
            }).then(function () {
                self.$timeout(function () {
                    // console.log('remove is-reveal-open');
                    jQuery('body').removeClass('is-reveal-open')
                }, 500);
            });
        } else {
            self.UserActions.loginModal()
        }

    }

    canReactIcon () {
        if (angular.isObject(this.canReact)) {
            let emoticon = this._.findWhere(this.emotions, {'emotion': this.canReact.emotion});
            return angular.isObject(emoticon) ? emoticon.icon : false;
        } else return false;
    }

    openAddToDialog () {
        this.$modal.open({
            templateUrl: 'common/share-dialog.html',
            resolve: {
                Video: function () {
                    return self.project;
                }
            },
            size: window.Foundation.MediaQuery.atLeast('large') ? 'tiny' : 'small',
            controller: ['$scope', '$modalInstance', 'Video', function ($scope, $modalInstance, Video) {
                // zIndexPlayer();
                $scope.video = Video;
                $scope.shareLink = window.location.origin + '/' + Video.url_id;
                $scope.cancel = function () {
                    // zIndexPlayer(true);
                    $modalInstance.close();
                };
            }]
        })
    }

    openReportDialog () {
        let self = this;
        let modalInstance = this.$modal.open({
            templateUrl: 'projects/modal/report-video-dialog.html',
            resolve: {
                Video: function () {
                    return self.project;
                }
            },
            closeOnClick: false,
            size: window.Foundation.MediaQuery.atLeast('medium') ? 'small' : 'full',
            controller: ['$scope', '$modalInstance', 'DataService', 'Video', function ($scope, $modalInstance, DataService, Video) {
                // zIndexPlayer();
                $scope.video = Video;
                $scope.report = {
                    name: '',
                    email: '',
                    body: '',
                    project_id: $scope.video.id,
                    video: $scope.video.url_id
                };

                $scope.cancel = function () {
                    // zIndexPlayer(true);
                    $modalInstance.dismiss('cancel');
                };

                $scope.closeDialog = function () {
                    // zIndexPlayer(true);
                    $modalInstance.close($scope.report);
                };
            }]
        });

        modalInstance.result.then(function (report) {
            self.DataService.mail('report', report).then(function () {
                self.$rootScope.toastMessage('Your Report has been Sent');
            });
        }, function () {
            // console.info('Modal dismissed at: ' + new Date());
        }).then(function () {
            self.$timeout(function () {
                // console.log('remove is-reveal-open');
                jQuery('body').removeClass('is-reveal-open')
            }, 500);
        });
    }
}

angular.module('IndieWise.directives')
    .component('projectStatsActions', {
        templateUrl: 'projects/project-stats-actions.html',
        controller: ProjectStatsActionsController,
        bindings: {project: '<'}
    });