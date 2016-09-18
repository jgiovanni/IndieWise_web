(function () {
    'use strict';

    angular.module('app.users', [
        'datatables'
    ])
        .config(config);

    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
        $stateProvider
            .state('app.users', {
                url: '/users',
                views: {
                    'content@app': {
                        templateUrl: 'app/users/layouts/list.html',
                        controller : 'UsersController as vm'
                    }
                }/*,
                resolve: {
                    Users: function (apiResolver) {
                        return apiResolver.resolve('users@get', {per_page: 50});
                    }
                }*/
            })
            /*.state('app.user', {
                url: '/user/{id}',
                views: {
                    'content@app': {
                        templateUrl: 'app/users/layouts/user.html',
                        controller : 'UserController as vm'
                    }
                },
                resolve: {
                    User: function (apiResolver, $stateParams) {
                        return apiResolver.resolve('users@get', {id: $stateParams.id});
                    }
                }
            })*/

        ;

        // Translation
        $translatePartialLoaderProvider.addPart('app/users');


        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'Users',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.users', {
            title    : 'Users',
            icon     : 'icon-account-multiple',
            state    : 'app.users',
            /*stateParams: {
             'param1': 'page'
             },*/
            // translate: 'SAMPLE.SAMPLE_NAV',
            weight   : 1
        });

    }
})();