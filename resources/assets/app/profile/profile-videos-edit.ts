import {IProfile} from "./profile";
import {IRootScopeService, IHttpService, IWindowService} from "angular";
import {IStateService} from "angular-ui-router";
import {IDataService} from "../services/dataService.service";
import {IUserActionsService} from "../services/userActions.service";
// import moment = require("moment");
export class ProfileVideosEditController implements IProfile{
    project: Object;
    editedProject: Object = angular.copy(this.project);
    uploadType: number = 2;
    saveComplete: boolean = false;
    genresArr: Array<any> = this.project.genres;

    static $inject = ['$rootScope', '$state', '$modal', 'UserActions', 'DataService', 'anchorSmoothScroll', 'filepickerService', 'Upload', '_'];
    constructor(private $rootScope: IRootScopeService, private $state: IStateService, private $modal: any, private UserActions: IUserActionsService, private DataService: IDataService, private anchorSmoothScroll: any, private filepickerService: any, private Upload: any, private _: any) {
        let self = this;
        /*self.deleteProject = function (ev) {
         if ($rootScope.AppData.User && ($rootScope.AppData.User.id === self.project.owner.id)) {
         let confirm = $modal.confirm()
         .title('Would you like to delete your project?')
         //.content('All of the banks have agreed to <span class="debt-be-gone">forgive</span> you your debts.')
         //.ariaLabel('Lucky day')
         .targetEvent(ev)
         .ok('Delete it!')
         .cancel('Never mind');
         $modal.show(confirm).then(() => {
         //self.project.set('disableProject', true);
         self.project.destroy({
         success: function (myObject) {
         // The object was deleted from the Parse Cloud.
         $state.go('profile');
         },
         error: function (myObject, error) {
         // The delete failed.
         // error is a Parse.Error with an error code and message.
         }
         });
         $state.go('profile');
         }, function () {
         //$scope.status = 'You decided to keep your debt.';
         });
         }
         }*/
    }

    $onInit = function () {
        let self = this;

        angular.extend(self.editedProject, {
            type_id: self.project.type_id,
            language_id: self.project.language_id,
            filmingCountry_id: self.project.filmingCountry_id,
            completionDate: moment(self.project.completionDate).year()
        });
        // console.log(self.editedProject);

        if (self.project.runTime) {
            let totalSeconds = self.project.runTime;
            self.runtime = {};
            self.runtime.hours = Math.floor(totalSeconds / 3600);
            totalSeconds %= 3600;
            self.runtime.mins = Math.floor(totalSeconds / 60);
            self.runtime.secs = totalSeconds % 60;
        }

        if (angular.isString(self.project.video_url)) {
            self.uploadType = 2;
        }

        this.$rootScope.generateGenres().then(res => self.$rootScope.genresList = self.genresList = res);
        this.$rootScope.generateTypes().then(res => self.$rootScope.typesList = self.typesList = res);
        this.$rootScope.generateCountries().then(res => self.$rootScope.countryList = self.countryList = res);
        this.$rootScope.generateLanguages().then(res => self.$rootScope.languageList = self.languageList = res);
    };


    syncGenres (bool: boolean, item: Object) {
        if (bool) {
            // add item
            this.genresArr.push(item);
            /*DataService.save('Genres', {project: self.editedProject.id, genre: item.id}, true, true)
             .then(function (res) {
             self.genresArr.push(res.data);
             });*/
        } else {
            // remove item
            for (let i = 0; i < this.genresArr.length; i++) {
                if (this.genresArr[i].id == item.id) {
                    this.DataService.delete('Genres', this.genresArr[i].id);
                    this.genresArr.splice(i, 1);
                }
            }
        }
    }

    isCheckedGenre (id: string) {
        let match = false;
        for (let i = 0; i < this.genresArr.length; i++) {
            if (this.genresArr[i].id == id) {
                match = true;
            }
        }
        return match;
    }

    runtimeToSeconds () {
        this.editedProject.runTime = this.project.runTime = (this.runtime.hours * 3600) + (this.runtime.mins * 60) + this.runtime.secs;
    }

    isURL (str: string) {
        let urlRegex = '[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)';
        let url = new RegExp(urlRegex, 'i');
        return str.length < 2083 && url.test(str);
    }

    getDefaultImage () {
        return this.editedProject.hosting_type === 'script' ? 'https://cdn.filepicker.io/api/file/XFaspYLQTreMc63hx9ng' : 'https://getindiewise.com/assets/img/default_video_thumbnail.jpg'
    }

    getThumbnailUrl (url: string) {
        let self = this;
        if (url != null && url != '') {
            if (url.indexOf('youtu') != -1) {
                let video_id = url.split('v=')[1].split('&')[0];
                return self.editedProject.thumbnail_url = self.project.thumbnail_url = 'http://img.youtube.com/vi/' + video_id + '/mqdefault.jpg';
            } else if (url.indexOf('vimeo') != -1) {
                let video_id = url.split('.com/')[1];
                this.$http.jsonp('http://www.vimeo.com/api/v2/video/' + video_id + '.json?callback=JSON_CALLBACK').then(function (res) {
                    return self.editedProject.thumbnail_url = self.project.thumbnail_url = res.data[0].thumbnail_large;
                });
            } else if (url.indexOf('dailymotion') != -1) {
                let video_id = url.split('video/')[1].split('_')[0];
                this.$http.get('https://api.dailymotion.com/video/' + video_id + '?fields=thumbnail_large_url').then(function (res) {
                    return self.editedProject.thumbnail_url = self.project.thumbnail_url = res.data.thumbnail_large_url;
                });
            } else if (url.indexOf('youku') != -1) {

            } else if (url.indexOf('vine') != -1) {
                this.$http.get('api/utils/get-vine-data?url=' + url).then(function (res) {
                    return self.editedProject.thumbnail_url = self.project.thumbnail_url = res.data;
                });
            }
        }
    }

    pickArtwork (){
        let self = this;
        this.filepickerService.pick(
            {
                cropRatio: 4/3,
                mimetype: 'image/*',
                services: ['CONVERT', 'COMPUTER', 'FACEBOOK', 'GOOGLE_DRIVE', 'INSTAGRAM', 'URL'],
                conversions: ['crop', 'rotate', 'filter'],
                customSourcePath: this.$rootScope.AppData.User.url_id + '/films/'
            },
            function (Blob: Object){
                self.editedProject.thumbnail_url = Blob.url + '?cache=true';
                this.$rootScope.$digest();
            }
        ).bind(this);
    }

    uploadArtwork (file: any) {
        let self = this;
        this.Upload.upload({
            url: 'https://api.cloudinary.com/v1_1/indiewise/upload',
            params: {upload_preset: 'dzachn6p'},
            data: {file: file},
            skipAuthorization: true  // `Authorization: Bearer <token>` will not be sent on this request.
        }).then((response) => {
            console.log('Success ' + response.config.data.file.name + 'uploaded. Response: ' + response.body);
            self.editedProject.thumbnail_url = response.body.secure_url;
            self.DataService.update('projects', self.editedProject.id, self.editedProject);
        }, function (response) {
            console.log('Error status: ' + response.status);
        }, function (evt) {
            console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% ' + evt.config.data.file.name);
        });
    }

    updateProject () {
        let self = this;
        this.editedProject.genres = this._.pluck(self.genresArr, 'id');
        this.editedProject.completionDate = moment({year: self.editedProject.completionDate}).startOf('year').format('YYYY-MM-DD HH:mm:ss');
        this.DataService.update('projects', this.editedProject.id, this.editedProject)
            .then(function (res) {
                // console.log(res);
                self.saveComplete = true;
                // anchorSmoothScroll.scrollTo('success');
                self.$rootScope.toastMessage('Project Updated');
                self.$state.go('profile.videos');
            });
    }
}

angular.module('IndieWise.profile')
    .component('profileVideosEdit', {
        require: {
            ProfileCtrl: '^^profile'
        },
        templateUrl: 'profile/profile-videos-edit.html',
        controller: ProfileVideosEditController,
        controllerAs: 'VEC',
        bindings: {user: '<', userStats: '<', projects: '<'}
    });