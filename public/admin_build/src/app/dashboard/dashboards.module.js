(function ()
{
    'use strict';

    angular
        .module('app.dashboard', ['app.dashboards.project'])
        .config(config);

    /** @ngInject */
    function config(msNavigationServiceProvider)
    {
        // Navigation
        msNavigationServiceProvider.saveItem('fuse', {
            title : 'Console',
            group : true,
            weight: 1
        });

        msNavigationServiceProvider.saveItem('fuse.dashboard', {
            title : 'Dashboard',
            icon  : 'icon-tile-four',
            state: 'app.dashboard',
            weight: 1
        });

        /*msNavigationServiceProvider.saveItem('apps.dashboards.project', {
            title: 'Project',
            state: 'app.dashboards_project'
        });

        msNavigationServiceProvider.saveItem('apps.dashboards.server', {
            title: 'Server',
            state: 'app.dashboards_server'
        });

        msNavigationServiceProvider.saveItem('apps.dashboards.analytics', {
            title: 'Analytics',
            state: 'app.dashboards_analytics'
        });*/
    }

})();