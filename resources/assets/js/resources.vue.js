window.Vue = require('vue');
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import axios from 'axios';
axios.defaults.baseURL = '/api';
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
let csrfToken = document.head.querySelector('meta[name="csrf-token"]').content;
if (csrfToken) {
    axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;
}

Vue.prototype.$http = axios;
// Resource duplicate of vue-resource for axios
// Inspired by https://github.com/pagekit/vue-resource/blob/develop/src/resource.js
let URI = require('urijs');
let URITemplate = require('urijs/src/URITemplate');
function Resource (url, params, actions, options) {
    let resource = {};
    actions = Object.assign({},
        Resource.actions,
        actions
    );

    _.each(actions, (action, name) => {
        action = merge({url, params: Object.assign({}, params)}, options, action);

        resource[name] = function () {
            if (options)
                debugger;
            let args = opts(action, arguments);
            return (Vue.prototype.$http)(args);
        };
    });

    return resource;
}
function merge(target) {
    let ref = [], slice = ref.slice;
    let args = slice.call(arguments, 1);

    args.forEach(source => {
        merger(target, source, true);
    });

    return target;
}
function merger(target, source, deep) {
    let key;
    for (key in source) {
        if (deep && (_.isObject(source[key]) || _.isArray(source[key]))) {
            if (_.isObject(source[key]) && !_.isObject(target[key])) {
                target[key] = {};
            }
            if (_.isArray(source[key]) && !_.isArray(target[key])) {
                target[key] = [];
            }
            merger(target[key], source[key], deep);
        } else if (source[key] !== undefined) {
            target[key] = source[key];
        }
    }
}
function opts(action, args) {
    let options = Object.assign({}, action), params = {}, body;
    // Use URI Template
    let template = new URITemplate(options.url);
    switch (args.length) {

        case 2:
            params = args[0];
            body = args[1];
            break;

        case 1:
            if (/^(POST)$/i.test(options.method)) {
                body = args[0];
            } else if (/^(PUT|PATCH)$/i.test(options.method)) {
                params = args[1];
            } else {
                params = args[0];
            }

            break;

        case 0:

            break;

        default:

            throw 'Expected up to 2 arguments [params, body], got ' + args.length + ' arguments';
    }

    options.data = body;
    options.params = Object.assign({}, action.params, options.params, params);
    options.url = template.expand(options.params);

    // clean variables from params if used in url template
    let usedParams = _.isObject(template.parts[1]) ? _.pluck(template.parts[1].variables, 'name') : [];
    _.each(usedParams, function (param) {
        delete options.params[param]
    });

    return options;
}
Resource.actions = {
    get: {method: 'GET'},
    post: {method: 'POST'},
    save: {method: 'POST'},
    query: {method: 'GET'},
    update: {method: 'PUT'},
    put: {method: 'PUT'},
    remove: {method: 'DELETE'},
    delete: {method: 'DELETE'}
};
// Resource END
Vue.prototype.$resource = Resource;

// import VueAdsense from 'vue-adsense';
// import VueSocial from '@blocklevel/vue-social'

// Global Components
// Vue.component('adsense', VueAdsense);
// Vue.use(require('vue-cookie'));
Vue.use(VueMaterial);
Vue.use(require('vee-validate'));
Vue.use(require('vue-localforage'));
Vue.use(require('vue-social-sharing'));
import VueAnalytics from 'vue-ua';
Vue.use(VueAnalytics, {
    appName: 'IndieWise',
    appVersion: '2.0',
    trackingId: 'UA-27155404-17',
    debug: false, // Whether or not display console logs debugs (optional)
});
