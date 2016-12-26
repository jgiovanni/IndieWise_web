interface IScriptViewer {
    project: Object;
    script: string;
}

export class ScriptViewerController implements IScriptViewer {
    project: Object;
    script: string = '';

    static $inject = [];
    constructor() {}

    $onInit = function () {
        this.script = this.project.video_url + '?cache=true&css=https://www.filestackapi.com/api/file/5dYvfXsLTqiri3YfMd1e'
    }
}

angular.module('IndieWise.directives')
    .component('scriptViewer', {
        transclude: true,
        templateUrl: 'projects/script-viewer.html',
        controller: ScriptViewerController,
        bindings: {project: '<'}
    });