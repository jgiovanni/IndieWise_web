const Vue = window.Vue;
import * as AppResources from './mixins.vue';
require('./mixins.vue');

import authenticationModal from '../app/authentication-modal.vue';
import navHeader from '../app/nav-header.vue';
import navMobile from '../app/nav-mobile.vue';
import contactForm from '../app/contact-form.vue';
import projectCard from '../app/common/project-card.vue'

import layerSlider from '../app/home/layer-slider.vue';
import premiumCarousel from '../app/home/premium-carousel.vue';
import sponsorCarousel from '../app/home/sponsor-carousel.vue';
import homeProjectsList from '../app/home/home-projects-list.vue';

import browse from '../app/browse/browse.vue';
import watchingCarousel from '../app/browse/watching-carousel.vue';

import latest from '../app/latest/latest.vue';
import winners from '../app/winners/winners.vue';

import upload from '../app/upload.vue';

new Vue({
    el: '#app',
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
        projectCard,

        browse,
        watchingCarousel,

        latest,
        winners,
        upload,
    },
    data: _.extend(AppResources.AppData, {
        layoutType: 'grid-default'
    }),
    computed: AppResources.AppComputed,
    methods: _.extend(AppResources.AppMethods, {
        toggleType(type){
            this.layoutType = type;
        }
    }),
    created() {
        let self = this;
        AppResources.AppCreated(self);
    },
    mounted(){
        let self = this;
        AppResources.AppMounted(self);
    }

});