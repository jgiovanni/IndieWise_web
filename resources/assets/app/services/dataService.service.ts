// import {IndieWise} from '../../js/app';
    export interface IDataService {
        collection: (name: string, params?: Object | null) => Object;
        item: (name: string, id: string, include?: string | null, search?: string | null) => any;
        save: (name: string, data?: Object, params?: any | null) => any;
        update: (name: string, id: string, data: any, params?: Object | null) => any;
        delete: (name: string, id: string) => any;
        mail: (route: string, params?: any | null) => any;
        notifyMe: (params: any) => any;
    }

    export default class DataService implements IDataService {
        static $inject = ['$http', 'API'];
        constructor(private $http: ng.IHttpService, private API: string) {}

        collection(name: string, params?: Object | null) {
            let data = angular.extend({per_page: 10, page: 1}, params);
            return this.$http({
                method: 'GET',
                url: this.API + name,
                params: data
            });
        };

        item(name: string, id: string, include?: string | null, search?: string | null) {
            return this.$http({
                method: 'GET',
                url: this.API + name + '/' + id,
                params: {
                    include: include,
                    search: search
                }
            });
        }

        save(name: string, data?: Object, params?: any | null) {
            return this.$http({
                method: 'POST',
                url: this.API + name,
                params: params,
                data: data
            });
        }

        update(name: string, id: string, data: any, params?: Object | null) {
            return this.$http({
                method: 'PUT',
                url: this.API + name + '/' + id,
                params: params,
                data: data
            });
        }

        delete(name: string, id: string) {
            return this.$http({
                method: 'DELETE',
                url: this.API + name + '/' + id
            });
        }

        mail(route: string, params?: any | null) {
            return this.$http.post(this.API + route, params);
        }


        // Newsletter Form
        notifyMe(params: any) {
            return this.$http.post('utils/notify-me.php', params);
        }
    }

    angular.module('IndieWise.services')
        .service('DataService', DataService);