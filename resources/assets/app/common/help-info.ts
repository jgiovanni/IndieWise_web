export class HelpInfoController {
    text: string;
    direction: string;

    constructor(){}
}

angular.module('IndieWise.directives')
    .component('helpInfo', {
        templateUrl: 'common/help-info.html',
        transclude: true,
        controller: HelpInfoController,
        bindings: {text: '<', direction: '<'}
    });
