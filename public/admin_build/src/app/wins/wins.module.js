(function () {
    'use strict';

    angular.module('app.wins', [
        'datatables', 'datatables.light-columnfilter'
    ])
        .config(config);

    function config($stateProvider, $translatePartialLoaderProvider, msNavigationServiceProvider) {
        $stateProvider
            .state('app.wins', {
                url: '/wins',
                authenticate: true,
                views: {
                    'content@app': {
                        templateUrl: 'app/wins/layouts/list.html',
                        controller : 'WinsController as vm'
                    }
                }/*,
                resolve: {
                    Wins: function (apiResolver) {
                        return apiResolver.resolve('wins@get', {per_page: 50});
                    }
                }*/
            })
            /*.state('app.win', {
                url: '/win/{id}',
                views: {
                    'content@app': {
                        templateUrl: 'app/wins/layouts/win.html',
                        controller : 'WinController as vm'
                    }
                },
                resolve: {
                    Win: function (apiResolver, $stateParams) {
                        return apiResolver.resolve('wins@get', {id: $stateParams.id});
                    }
                }
            })*/

        ;

        // Translation
        $translatePartialLoaderProvider.addPart('app/wins');


        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'Console',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.wins', {
            title    : 'Wins',
            icon     : 'icon-star',
            state    : 'app.wins',
            /*stateParams: {
             'param1': 'page'
             },*/
            // translate: 'SAMPLE.SAMPLE_NAV',
            weight   : 1
        });

    }
})();