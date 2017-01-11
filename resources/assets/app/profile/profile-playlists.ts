import {IUser} from "../user/user";
import {IRootScopeService, IHttpService, IIntervalService} from "angular";
import {IUserActionsService} from "../services/userActions.service";
import {IDataService} from "../services/dataService.service";
export class ProfilePlaylistsController implements IUser{
    user: Object;
    userStats: Object;
    selectedPlaylist: Object;
    playlists: Object = {};
    playlistItems: Object = null;
    hasFave: boolean = false;

    static $inject = ['$rootScope', 'DataService', 'UserActions', '_', '$interval', '$http'];
    constructor(private $rootScope: IRootScopeService, private DataService: IDataService, private UserActions: IUserActionsService, private _: any, private $interval: IIntervalService, private $http: IHttpService) {

    }

    $onInit = function () {
        let self = this;
        this.hasFave = this._.findWhere(self.playlists, {name: 'Favorites', private: true});
        this.selectedPlaylist = this.hasFave ? this.hasFave.id : this.playlists.length ? this.playlists[0].id : null;

        // autoload if preselect
        if (angular.isString(this.selectedPlaylist)) {
            this.loadPlaylistItems();
        }
        console.log(this);
    };

    loadPlaylistItems () {
        let self = this;
        this.DataService.collection('playlistItems', {playlist: this.selectedPlaylist, include: 'project.owner'})
            .then(res => self.playlistItems = res.data, (error) => console.log(error));
    }

    removeItem (id) {
        let self = this;
        if (this.$rootScope.isAuthenticated()) {
            this.DataService.delete('PlaylistItem', id)
                .then(() => self.playlists = self._.reject(self.playlists, a => a.id === id), (error) => console.log(error))
        }
    }
}

angular.module('IndieWise.profile')
    .component('profilePlaylists', {
        require: {
            ProfileCtrl: '^^profile'
        },
        templateUrl: 'profile/profile-playlists.html',
        controller: ProfilePlaylistsController,
        // controllerAs: 'ProfilePlaylistsCtrl',
        bindings: {user: '<', userStats: '<', playlists: '<'}
    });