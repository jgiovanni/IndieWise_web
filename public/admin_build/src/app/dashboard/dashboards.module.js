(function ()
{
    'use strict';

    angular
        .module('app.dashboards', ['app.dashboards.project'])
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

        msNavigationServiceProvider.saveItem('fuse.dashboards', {
            title : 'Dashboard',
            icon  : 'icon-tile-four',
            state: 'app.dashboards_project',
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