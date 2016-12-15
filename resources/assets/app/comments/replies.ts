interface IReplies {

}

export class RepliesController implements IReplies {

    constructor() {

    }
}

angular.module('IndieWise.directives')
/*IndieWise*/.component('replies', {
    templateUrl: 'comments/replies.html',
    controller: RepliesController,
    bindings: {}
});