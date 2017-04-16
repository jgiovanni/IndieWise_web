import {IDataService} from "../services/dataService.service";
import IRootScopeService = angular.IRootScopeService;
interface IProjectReactions {
    project: Object;
    reactions: Array<Object>;
    reactionCountMax: number;
    chartedReactions: Array<Object>;

    getEmoticonByEmotion: (emotion: string) => Object;
}

export class ProjectReactionsController implements IProjectReactions {
    project: Object;
    reactions: Array<Object> = [];
    reactionCountMax: number = 0;
    chartedReactions: Array<Object> = [];

    static $inject = ['$rootScope', 'DataService', '_'];
    constructor(private $rootScope: IRootScopeService, private DataService: IDataService, private _: any) {
        let self = this;
    }

    $onInit = function () {
        this.reactions = this.$rootScope.generateReactions();
        this.projectCtrl.projectReactions = this;
        this.refresh();
    };

    refresh() {
        let self = this;
        this.DataService.collection('projects/reactions', {project: this.project.id})
            .then(function (response: Object) {
                self.chartedReactions = response.body.data;
            });
    }

    getEmoticonByEmotion(emotion: string) {
        return this._.findWhere(this.reactions, {emotion: emotion});
    }
}

angular.module('IndieWise.project')
    .component('projectReactions', {
        require: {
            projectCtrl: '^^project'
        },
        templateUrl: 'projects/project-reactions.html',
        controller: ProjectReactionsController,
        bindings: { project: '<' }
    });