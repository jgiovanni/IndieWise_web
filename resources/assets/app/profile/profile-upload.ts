import {IProfile} from "./profile";
import {IRootScopeService, IHttpService, IWindowService} from "angular";
import {IStateService} from "angular-ui-router";
import {IDataService} from "../services/dataService.service";
// import moment = require("moment");

export class ProfileUploadController implements IProfile {
    user: Object;
    userStats: Object;
    selectedGenre: any = null;
    uploadType: number = 2;
    genresArr:Array<any> = [];
    files:Array<any> = []; //JSON.parse($window.localStorage.getItem('files') || '[]');
    maxDate: any = moment().toDate();
    newVideo: Object = {
        name: '',
        description: '',
        director: '',
        writer: '',
        producers: '',
        keyCast: '',
        language: '00000000-0000-6b6e-4371-305344643451',
        completionDate: '',
        filmingCountry: undefined,
        originCountry: undefined,
        owner: this.$rootScope.AppData.User.id,
        genres: [],
        type: undefined,
        runTime: 0,
        thumbnail_url: '',
        hosting_type: 'youtube',
        video_url: '',
        tags: '',
        unlist: false,
        disableComments: false,
        disableCritique: false,
        nsfw: false,
        copyrightOwner: false
    };
    runtime: Object = {
        hours: 0,
        mins: 0,
        secs: 0
    };

    static $inject = ['$rootScope', '$state', '$http', 'DataService', '$window', 'Upload', 'filepickerService', '_'];
    constructor(private $rootScope: IRootScopeService, private $state: IStateService, private $http: IHttpService, private DataService: IDataService, private $window: IWindowService, private Upload: any, private filepickerService: any, private _: any) {
        let self = this;
    }

    $onInit = function () {
        let self = this;
        this.$rootScope.generateGenres().then(res => self.$rootScope.genresList = self.genresList = res);
        this.$rootScope.generateTypes().then(res => self.$rootScope.typesList = self.typesList = res);
        this.$rootScope.generateCountries().then(res => self.$rootScope.countryList = self.countryList = res);
        this.$rootScope.generateLanguages().then(res => self.$rootScope.languageList = self.languageList = res);
    };

    runtimeToSeconds () {
        this.newVideo.runTime = (this.runtime.hours * 3600) + (this.runtime.mins * 60) + this.runtime.secs;
    }

    getUserFilmPath () {
        return this.newVideo.hosting_type === 'script' ? this.user.url_id + '/scripts/' : this.user.url_id + '/films/';
    }

    isURL (str: string) {
        let urlRegex = '[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)';
        let url = new RegExp(urlRegex, 'i');
        return str.length < 2083 && url.test(str);
    }

    getThumbnailUrl (url: string) {
        let self = this;
        if (url != null && url != '') {
            if (url.indexOf('youtu') != -1) {
                let video_id = url.indexOf('v=') != -1 ? url.split('v=')[1].split('&')[0] : url.split('be/')[1];
                self.newVideo.hosting_type = 'youtube';
                self.newVideo.hosting_id = video_id;
                return self.newVideo.thumbnail_url = 'https://img.youtube.com/vi/' + video_id + '/hqdefault.jpg';
            } else if (url.indexOf('vimeo') != -1) {
                let video_id = url.split('.com/')[1];
                self.newVideo.hosting_type = 'vimeo';
                self.newVideo.hosting_id = video_id;
                this.$http.jsonp('https://api.vimeo.com/videos/' + video_id + '/pictures.json?callback=JSON_CALLBACK')
                    .then(res => {
                        //$http.jsonp('http://www.vimeo.com/api/v2/video/' + video_id + '.json?callback=JSON_CALLBACK').then(function (res) {
                        return self.newVideo.thumbnail_url = angular.isDefined(res.data[0].sizes[6])
                            ? res.data[0].sizes[6] : angular.isDefined(res.data[0].sizes[5])
                            ? res.data[0].sizes[5] : angular.isDefined(res.data[0].sizes[4])
                            ? res.data[0].sizes[4] : res.data[0].sizes[3];
                    });
            } else if (url.indexOf('dailymotion') != -1) {
                let video_id = url.split('video/')[1].split('_')[0];
                self.newVideo.hosting_type = 'dailymotion';
                self.newVideo.hosting_id = video_id;
                this.$http.get('https://api.dailymotion.com/video/' + video_id + '?fields=thumbnail_large_url')
                    .then(res => self.newVideo.thumbnail_url = res.data.thumbnail_large_url);
            }
            /* else if (url.indexOf('youku') != -1) {
                self.newVideo.hosting_type = 'youku';
                self.newVideo.hosting_id = undefined;

            } else if (url.indexOf('vine') != -1) {
                self.newVideo.hosting_type = 'vine';
                self.newVideo.hosting_id = undefined;
                $http.get('/utils/get-vine-data.php?url=' + url).then(function (res) {
                    return self.newVideo.thumbnail_url = res.data;
                });
            }*/
        }
    }

    validateNewVideoForm () {
        let test = true;
        let msg = 'Your project is missing:';
        if (!this.newVideo.name.length) {
            msg += 'Project Title, ';
            this.$rootScope.toastMessage();
            test = false;
        }
        if (this.uploadType == 2 && !this.newVideo.video_url.length) {
            msg += 'Video URL, ';
            test = false;
        }
        if (angular.isUndefined(this.genresArr) || (angular.isArray(this.genresArr) && !this.genresArr.length)) {
            msg += 'Genres, ';
            test = false;
        }
        if (angular.isUndefined(this.newVideo.type)) {
            msg += 'Type, ';
            test = false;
        }
        if (angular.isUndefined(this.newVideo.language)) {
            msg += 'Language, ';
            test = false;
        }
        if (this.newVideo.hosting_type !== 'script') {
            if (this.newVideo.runTime == 0) {
                msg += 'Duration';
                test = false;
            }
        }
        if (!test) {
            this.$rootScope.toastMessage(msg);
            alert(msg);
        }
        return test;
    }

    syncGenres (bool: boolean, item: Object) {
        if (bool) {
            // add item
            this.genresArr.push(item);
        } else {
            // remove item
            for (let i = 0; i < this.genresArr.length; i++) {
                if (this.genresArr[i].id == item.id) {
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

    getDefaultImage () {
        return this.newVideo.hosting_type === 'script' ? 'https://cdn.filepicker.io/api/file/XFaspYLQTreMc63hx9ng' : 'https://getindiewise.com/assets/img/default_video_thumbnail.jpg'
    }

    submitNewVideo () {
        let self = this;
        if (!!self.validateNewVideoForm()) {
            if (angular.isArray(self.genresArr) && self.genresArr.length) {
                self.newVideo.genres = self._.pluck(self.genresArr, 'id');
            }

            let filmParams = {
                name: self.newVideo.name,
                description: self.newVideo.description,
                director: self.newVideo.director,
                writer: self.newVideo.writer,
                producers: self.newVideo.producers,
                keyCast: self.newVideo.keyCast,
                completionDate: moment({year: self.newVideo.completionDate}).startOf('year').format('YYYY-MM-DD HH:MM:SS'),
                owner_id: self.newVideo.owner,
                runTime: self.newVideo.runTime,
                video_url: self.newVideo.video_url,
                thumbnail_url: (self.newVideo.thumbnail_url === ''|| self.newVideo.thumbnail_url === null) ? self.getDefaultImage() : self.newVideo.thumbnail_url,
                hosting_type: self.newVideo.hosting_type,
                hosting_id: self.newVideo.hosting_id,
                tags: self.newVideo.tags,
                disableComments: self.newVideo.disableComments || false,
                disableCritique: self.newVideo.disableCritique || false,
                language_id: self.newVideo.language,
                filmingCountry_id: self.newVideo.filmingCountry,
                // originCountry: self.newVideo.originCountry,
                type_id: self.newVideo.type,
                unlist: self.newVideo.unlist,
                nsfw: self.newVideo.nsfw,
                copyrightOwner: self.newVideo.copyrightOwner,
                genres: self.newVideo.genres
            };

            self.DataService.save('projects', filmParams)
                .then(function (project) {
                    console.log(project.body.data);
                    self.$rootScope.toastMessage('Project Uploaded Successfully');
                    // register Action
                    self.$state.go('video', {url_id: project.body.data.url_id});
                    //return film;
                }, function (err) {
                    // console.log(err);
                    alert('Failed to create new project, with error: ' + err.message);
                });

        } else {
            self.$rootScope.toastMessage('Please check the form!');
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
                customSourcePath: self.user.url_id + '/films/'
            },
            function (Blob: Object){
                self.newVideo.thumbnail_url = Blob.url + '?cache=true';
                self.$rootScope.$digest();
            }
        );
    }

    uploadArtwork (file: any) {
        let self = this;
        this.Upload.upload({
            url: 'https://api.cloudinary.com/v1_1/indiewise/upload',
            params: {upload_preset: 'dzachn6p'},
            data: {file: file},
            skipAuthorization: true  // `Authorization: Bearer <token>` will not be sent on this request.
        })
            .then(resp=>self.newVideo.thumbnail_url = resp.data.secure_url,
                resp => console.log('Error status: ' + resp.status),
            evt => console.log('progress: ' + parseInt(100.0 * evt.loaded / evt.total) + '% ' + evt.config.data.file.name));
    }

    pickFile () {
        this.filepickerService.pick({
                mimetype: 'video/mp4',
                customSourcePath: this.user.url_id + this.newVideo.hosting_type === 'script' ? '/scripts/' : '/films/'
            },
            this.onSuccess
        ).bind(this);
    }

    onSuccess (Blob: Object) {
        this.newVideo.hosting_type = this.newVideo.hosting_type === 'script' ? 'script' : 'HTML5';
        this.newVideo.video_url = Blob.url + '?cache=true';
        // self.files.push(Blob);
        // $window.localStorage.setItem('files', JSON.stringify(self.files));
    }

}

angular.module('IndieWise.profile')
    .component('profileUpload', {
        require: {
            ProfileCtrl: '^^profile'
        },
        templateUrl: 'profile/profile-upload.html',
        controller: ProfileUploadController,
        controllerAs: 'UC',
        bindings: {user: '<', userStats: '<', projects: '<'}
    });