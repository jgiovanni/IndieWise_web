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
import projectRelated from '../app/projects/project-related.vue';
import projectReactions from '../app/projects/project-reactions.vue';
import projectAverage from '../app/projects/project-average.vue';
import projectAwards from '../app/projects/project-awards.vue';
import projectNominations from '../app/projects/project-nominations.vue';
import critiques from '../app/critiques/critiques.vue';
import critiqueView from '../app/critiques/critique-view.vue';

import critique from '../app/critiques/critique.vue';
import comments from '../app/comments/comments.vue';

// VideoPlayer
import VueVideoPlayer from 'vue-video-player';
Vue.use(VueVideoPlayer);

require('videojs-youtube');
require('./videojs-vimeo.min');
require('videojs-contrib-hls');
require('videojs-resolution-switcher');
//    require('videojs-resolution-switcher/lib/videojs-resolution-switcher.css');


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
        projectRelated,
        projectAverage,
        projectAwards,
        projectReactions,
        projectNominations,
        critiques,
        critiqueView,
        critique,
        comments,
    },
    data: _.extend(AppResources.AppData, {
        selectedCritique: null,
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