import {IRootScopeService, IScope, IWindowService, ITimeoutService} from "angular";
import {IUserActionsService} from "../services/userActions.service";
import {IDataService} from "../services/dataService.service";
import {IStateService} from "angular-ui-router";
interface IProject {
    loaded: boolean;
    displayShare: boolean;
    toggleReactionsList: boolean;
    activeTab: string;
    playerResponsiveMode: boolean;
    tagsArray: Array<string>;
    lightsOff: boolean;
    project: Object;
    projectStats: Object;
    projectCritiques: Object;
    projectReactions: Object;
    critiquesParams: Object;
    wins: Array<Object>;
    nominations: Array<Object>;

    init: (project: Object) => void
    qNominations: () => void;
    qWins: () => void;
    toggleWidthMode: () => void;
    updateVideoObj: () => void;
    handleActions: (action: string, data: Object) => void;
    toggleLights: () => void;
    zIndexPlayer: (remove: boolean) => void;
}

export class ProjectController implements IProject {
    loaded: boolean = false;
    displayShare: boolean = false;
    toggleReactionsList: boolean = false;
    activeTab: string = 'critiques';
    playerResponsiveMode: boolean = this.$window.localStorage.playerResponsiveMode ? JSON.parse(this.$window.localStorage.playerResponsiveMode) : this._.contains(['small', 'medium', 'large'], this.$window.Foundation.MediaQuery.current);
    tagsArray: Array<string> = [];
    lightsOff: boolean = false;
    project: Object;
    projectStats: Object;
    projectCritiques: Object;
    projectReactions: Object;
    critiquesParams: Object;
    wins: Array<Object> = [];
    nominations: Array<Object> = [];

    static $inject = ['$rootScope', '$scope', '$modal', 'UserActions', 'DataService', '$state', 'Analytics', '$window', '$timeout', '_'];
    constructor(private $rootScope: IRootScopeService, private $scope: IScope, private $modal: any, private UserActions: IUserActionsService, private DataService: IDataService, private $state: IStateService, private Analytics: any, private $window: IWindowService, private $timeout: ITimeoutService, private _: any) {}

    $onInit = () => {
        this.init(this.project);
        this.critiquesParams = {include: 'comments:limit(1|0)', project: this.project.id, sort: 'comments_count'}
    };

    init(project: Object) {
        let self = this;
        this.$rootScope.currentTitle = project.name;

        this.loaded = true;

        this.$rootScope.metadata = {
            title: project.name,
            description: angular.isString(project.description) ? project.description.substr(0, 150) : '',
            image: project.thumbnail_url,
            url: window.location.href
        };


        this.qNominations();

        this.qWins();
        
        this.$rootScope.initWatch = function () {
            self.Analytics.trackEvent('video', 'play', self.project.name);
            self.UserActions.markAsWatched(self.project)
        };

        this.$scope.$on('$destroy', function () {
            self.$rootScope.initWatch = undefined;
        });

        this.$scope.$on('overVideoPlayer', function (state) {
            self.zIndexPlayer(state);
        });
        //UserActions.cancelWatched(self.activeWatch);

        //Populate tags array
        if (angular.isString(project.tags) && project.tags.length) {
            if (project.tags.indexOf(',') > -1) {
                self.tagsArray = project.tags.split(',');
            }
        }

        // Get related video
        this.DataService.collection('projects', {
            notVideo: project.id,
            notOwner: this.$rootScope.AppData.User ? this.$rootScope.AppData.User.id : undefined,
            per_page: 1,
            random: true,
        })
            .then((res) => {
                if (res) {
                    self.relatedvideo = res.data.data[0];
                }
            }, (error) => console.log(error));
    }

    qNominations () {
        let self = this;
        this.DataService.collection('nominations', {include: 'user,award', project: this.project.id, sort: 'created_at', per_page: 200, page: this.nominationsPage})
            .then((result) => {
                self.nominations = result.data.data;
                //// console.log('Nomination: ', result.data);
            }, (error) => console.log(error));
    }

    qWins () {
        let self = this;
        this.DataService.collection('wins', {project: this.project.id, sort: 'created_at'})
            .then((result) => {
                self.wins = result.data.data;
                // console.log('AwardWin: ', result.data);
            }, (error) => console.log(error));
    }

    handleActions(action: string, data: Object) {
        let self = this;
        switch (action) {
            case 'reaction':
                // communicate with child to refresh reaction
                console.log('refresh reactions');
                console.log(data);
                this.projectReactions.refresh();
                break;
            case 'rate':
                console.log('refresh rates');
                console.log(data);
                break;
            case 'critique':
                console.log('refresh critiques');
                console.log(data);
                this.projectCritiques.load();
                break;
        }
    }

    /*showMessageDialog () {
        if (this.$rootScope.isAuthenticated()) {
            let params = {
                templateUrl: 'templates/common/contactUserDialog.html',
                resolve: {
                    recipient: () => {
                        return this.project.owner.id;
                    }
                },
                controller: ContactUserDialogController
            };
            let msgModal = this.$modal.open(params);
        } else this.UserActions.loginModal();

    }*/

    toggleWidthMode () {
        let self = this;
        this.$window.localStorage.playerResponsiveMode = this.playerResponsiveMode = !this.playerResponsiveMode;
        this.$timeout(() => {
            self.$window.player.resize();
            //fail-safe
            self.$timeout( () => self.$window.player.resize(), 500);
        }, 100);
    }

    updateVideoObj () {
        let self = this;
        return this.DataService.item('projects', this.project.id)
            .then(function (response) {
                console.log('Project Updated: ', response);
                self.project = response.data.data;
            }, (error) => console.log(error));
    }

    toggleLights () {
        this.lightsOff = !this.lightsOff;
        let overlay = jQuery('#overlay');
        let body = jQuery('body');
        overlay.fadeToggle(1000);
        /* Choose desired delay */
        if (!this.lightsOff) {
            this.$timeout(function () {
                overlay.removeClass('highlight');
                body.removeClass('cinema-mode');
            }, 1000);
            /* Same delay */
        } else {
            overlay.addClass('highlight');
            body.addClass('cinema-mode');
        }
    }

    zIndexPlayer(remove: boolean) {
        let vidDiv = jQuery('.flex-video');
        !!remove ? vidDiv.css('z-index', '') : vidDiv.css('z-index', 0);
    }

}


angular.module('IndieWise.project', [])
    .component('project', {
        // transclude: true,
        templateUrl: 'projects/project.html',
        controller: ProjectController,
        controllerAs: 'VC',
        bindings: {project: '<'}
    });