interface ICritiqueView {

}

export class CritiqueViewController implements ICritiqueView {

    static $inject = [];
    constructor() {}
}

angular.module('IndieWise.directives')
    .component('critiqueView', {
        templateUrl: 'critiques/critique-view.html',
        controller: CritiqueViewController,
    });