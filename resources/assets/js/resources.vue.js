window.Vue = require('vue');
require('vue-resource');
import VueAnalytics from 'vue-ua';
// import VueAdsense from 'vue-adsense';
// import VueSocial from '@blocklevel/vue-social'

// Global Components
// Vue.use(Vuex);
// Vue.component('adsense', VueAdsense);
// Vue Form Validation
// Vue.use(require('vue-cookie'));
// Vue.use(VueSocial);
/*Vue.social.auth = {
 facebook: 'api/auth/facebook',
 // twitter: 'api/auth/twitter',
 google: 'api/auth/google',
 };*/

Vue.use(require('vee-validate'));
Vue.use(require('vue-localforage'));
Vue.use(require('vue-material'));
Vue.material.registerTheme({
    'default': {
        primary: 'indigo',
        accent: 'amber',
        warn: 'red',
        // background: { color: 'grey', hue: 300 }
        background: 'white'
    },
    /*'social': {
        primary: 'indigo',
        accent: 'indigo',
        warn: 'red',
        background: { color: 'grey', hue: 300 }
    }*/
});
Vue.use(require('vue-social-sharing'));
Vue.use(VueAnalytics, {
    appName: 'IndieWise', // Mandatory
    appVersion: '2.0', // Mandatory
    trackingId: 'UA-27155404-17', // Mandatory
    debug: true, // Whether or not display console logs debugs (optional)
    // ignoredViews: ['homepage'], // If router, you can exclude some routes name (case insensitive) (optional)
    // globalDimensions: [ // Optional
    // {dimension: 1, value: 'MyDimensionValue'},
    // {dimension: 2, value: 'AnotherDimensionValue'}
    // ],
    // globalMetrics: [ // Optional
    // {metric: 1, value: 'MyMetricValue'},
    // {metric: 2, value: 'AnotherMetricValue'}
    // ]
});