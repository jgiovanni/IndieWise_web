const Vue = window.Vue;
require('./mixins.vue');
import * as AppResources from './mixins.vue';

import authenticationModal from '../app/authentication-modal.vue';
import navHeader from '../app/nav-header.vue';
import navMobile from '../app/nav-mobile.vue';
import contactForm from '../app/contact-form.vue';

import layerSlider from '../app/home/layer-slider.vue';
import premiumCarousel from '../app/home/premium-carousel.vue';
import sponsorCarousel from '../app/home/sponsor-carousel.vue';
import homeProjectsList from '../app/home/home-projects-list.vue';

import browse from '../app/browse/browse.vue';
import watchingCarousel from '../app/browse/watching-carousel.vue';

import latest from '../app/latest/latest.vue';
import winners from '../app/winners/winners.vue';

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
        contactForm,

        // home,
        layerSlider,
        premiumCarousel,
        sponsorCarousel,
        homeProjectsList,

        browse,
        watchingCarousel,

        latest,
        winners,
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