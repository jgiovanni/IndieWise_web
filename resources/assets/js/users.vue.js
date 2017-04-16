const Vue = window.Vue;
require('./mixins.vue');
import * as AppResources from './mixins.vue';
import authenticationModal from '../app/authentication-modal.vue';
import navHeader from '../app/nav-header.vue';
import navMobile from '../app/nav-mobile.vue';

import user from '../app/user/user.vue';
import userTop from '../app/user/user-top.vue';
import userSidenav from '../app/user/user-sidenav.vue';
import userAbout from '../app/user/user-about.vue';
import userProjects from '../app/user/user-projects.vue';
import userCritiques from '../app/user/user-critiques.vue';
import userReactions from '../app/user/user-reactions.vue';
import userAwards from '../app/user/user-awards.vue';
import userSettings from '../app/user/user-settings.vue';

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

        // Profile
        user,
        userTop,
        userSidenav,
        userAbout,
        userProjects,
        userCritiques,
        userReactions,
        userAwards,
        userSettings,
    },
    data: AppResources.AppData,
    computed: AppResources.AppComputed,
    methods: AppResources.AppMethods,
    created() {
        let self = this;
        AppResources.AppCreated(this);
    },
    mounted(){
        let self = this;
        AppResources.AppMounted(this);
    }

});
