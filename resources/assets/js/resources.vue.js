window.Vue = require('vue/dist/vue.min');
require('vue-resource');
let VueMaterial = require('vue-material');
let VeeValidate = require('vee-validate');
// import VueAdsense from 'vue-adsense';
// import VueSocial from '@blocklevel/vue-social'

// Global Components
// Vue.component('adsense', VueAdsense);
// Vue.use(require('vue-cookie'));
Vue.use(VueMaterial);
Vue.material.registerTheme({
    'default': {
        primary: 'indigo',
        accent: 'amber',
        warn: 'red',
        // background: { color: 'grey', hue: 300 }
        background: 'white'
    },
    'dark': {
        primary: 'indigo',
        accent: 'indigo',
        warn: 'red',
        background: { color: 'grey', hue: 900 }
    }
});
Vue.use(VeeValidate);
Vue.use(require('vue-localforage'));
Vue.use(require('vue-social-sharing'));
import VueAnalytics from 'vue-ua';
Vue.use(VueAnalytics, {
    appName: 'IndieWise',
    appVersion: '2.0',
    trackingId: 'UA-27155404-17',
    debug: true, // Whether or not display console logs debugs (optional)
});
