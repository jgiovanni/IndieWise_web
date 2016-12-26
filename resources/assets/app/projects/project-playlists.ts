import IRootScopeService = angular.IRootScopeService;
import {IDataService} from "../services/dataService.service";
import {IUserActionsService} from "../services/userActions.service";
interface IProjectPlaylists {
    project: Object;
    model: Object;
    playlists: Array<Object>;
    newPlInput: boolean;

    toggleNewPlInput: (clear: boolean) => void;
    newPlaylist: () => void;
    syncPlaylists: (bool: boolean, item: Object) => void;
    isCheckedPlaylist: (id: string) => boolean;
}
export class ProjectPlaylistsController implements IProjectPlaylists {
    project: Object;
    model: Object = {
        newName: null,
        playlistArr: [],
    };
    playlists: Array<Object> = [];
    newPlInput: boolean = false;

    static $inject = ['$rootScope', 'DataService', 'UserActions', '_'];

    constructor(private $rootScope: IRootScopeService, private DataService: IDataService, private UserActions: IUserActionsService, private _: any) {}

    $onInit = function () {
        let self = this;
        // Get playlists
        if (this.$rootScope.AppData.User) {
            this.DataService.collection('playlists')
                .then(function (res) {
                    // Check playlist items for this video
                    self.DataService.collection('playlistItems', {
                        project: self.project.id,
                        playlists: _.pluck(res.data.playlists, 'id').toString()
                    })
                        .then(function (resA) {
                            // console.log(resA);
                            self.model.playlistArr = resA.data.data;

                            // list playlists
                            self.playlists = res.data.playlists;
                            // console.log(scope.playlists);
                        });
                });
        }
    };

    toggleNewPlInput(clear) {
        this.newPlInput = !this.newPlInput;
        if (clear) {
            this.model.newName = null;
        }
    }

    newPlaylist() {
        let self = this;
        this.UserActions.checkAuth()
            .then(function (res) {
                self.DataService.save('playlists', {name: self.model.newName, user_id: self.$rootScope.AppData.User.id})
                    .then(function (pl) {
                        self.toggleNewPlInput(false);
                        self.model.newName = null;
                        self.playlists.push(pl.data.data);
                    }, function (error) {
                        console.log(error);
                    });
            }, function (err) {
                self.UserActions.loginModal()
                    .then(function (res) {
                        debugger;
                    }, function (error) {
                        console.log(error);
                    });
            });
    }

    syncPlaylists(bool: boolean, item: Object) {
        if (bool) {
            // add item
            this.model.playlistArr.push(item);
            this.DataService.save('playlistItems', {playlist: item.id, project: this.project.id});
            this.$rootScope.toastMessage('Added to playlist');
            // console.log('Added to playlist: ', item);
        } else {
            // remove item
            for (let i = 0; i < this.model.playlistArr.length; i++) {
                if (this.model.playlistArr[i].id == item.id) {
                    let genreSetting = _.findWhere(this.model.playlistArr, {
                        project: this.project.id, playlist_id: item.id
                    });
                    // console.log(genreSetting);
                    if (genreSetting) {
                        this.DataService.delete('PlaylistItem', genreSetting.id);
                    }
                    this.model.playlistArr.splice(i, 1);
                    this.$rootScope.toastMessage('Removed from playlist');
                    // console.log('Removed from playlist: ', item);
                }
            }
        }
    }

    isCheckedPlaylist(id: string) {
        let match = false;
        for (let i = 0; i < this.model.playlistArr.length; i++) {
            if (this.model.playlistArr[i].playlist_id == id) {
                match = true;
            }
        }
        return match;
    }
}

angular.module('IndieWise.directives')
    .component('projectPlaylists', {
        templateUrl: 'projects/project-playlists.html',
        controller: ProjectPlaylistsController,
        bindings: {project: '<'}
    });