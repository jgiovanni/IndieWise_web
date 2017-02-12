const Vue = window.Vue;
require('./mixins.vue');
import * as AppResources from './mixins.vue';

import authenticationModal from '../app/authentication-modal.vue';
import navHeader from '../app/nav-header.vue';
import navMobile from '../app/nav-mobile.vue';
import project from '../app/projects/project.vue';
import projectBreadcrumbs from '../app/projects/project-breadcrumbs.vue';
import projectVideoPlayer from '../app/projects/project-video-player.vue';
import projectScriptViewer from '../app/projects/project-script-viewer.vue';
import critique from '../app/critiques/critique.vue';

new Vue({
    el: '#app',
    http: {
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            // 'Authorization': localStorage.getItem('jwt-token')
        }
    },
    components: {
        navHeader,
        navMobile,
        authenticationModal,

        project,
        projectBreadcrumbs,
        projectVideoPlayer,
        projectScriptViewer,
        critique,
    },
    data: _.extend(AppResources.AppData, {
        playerResponsiveMode: localStorage.playerResponsiveMode ? JSON.parse(localStorage.playerResponsiveMode) : _.contains(['small', 'medium', 'large'], Foundation.MediaQuery.current),
    }),
    computed: AppResources.AppComputed,
    methods: AppResources.AppMethods,
    created() {
        let self = this;
        AppResources.AppCreated(this);

        this.$root.$on('playerResponsiveMode', function (mode) {
            self.playerResponsiveMode = mode;
        });

    },
    mounted(){
        let self = this;
        AppResources.AppMounted(this);
    }

});