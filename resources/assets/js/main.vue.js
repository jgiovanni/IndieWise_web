const Vue = window.Vue;

import authenticationModal from '../app/auth/authentication-modal.vue';
import navHeader from '../app/common/nav-header.vue';
import navMobile from '../app/common/nav-mobile.vue';
import home from '../app/home/home.vue';
import browse from '../app/browse/browse.vue';
import latest from '../app/latest/latest.vue';
import project from '../app/projects/project.vue';
import projectBreadcrumbs from '../app/projects/project-breadcrumbs.vue';
import projectVideoPlayer from '../app/projects/project-video-player.vue';
import projectScriptViewer from '../app/projects/project-script-viewer.vue';
import critique from '../app/critiques/critique.vue';
import winners from '../app/winners/winners.vue';

Vue.http.options.root = '/api';
Vue.http.interceptors.push((request, next) => {
    let token, headers;

    token = localStorage.getItem('jwt-token');
    headers = request.headers || (request.headers = {});

    request.headers.set('X-CSRF-TOKEN', $('meta[name="csrf-token"]').attr('content'));
    if (token !== null && token !== 'undefined') {
        request.headers.set('Authorization', token);
    }

    // continue to next interceptor
    next(response => {
        if (response.status && response.status.code === 401) {
            localStorage.removeItem('jwt-token')
        }
        if (response.headers && response.headers.Authorization) {
            localStorage.setItem('jwt-token', response.headers.Authorization)
        }
        if (response.entity && response.entity.token && response.entity.token.length > 10) {
            localStorage.setItem('jwt-token', 'Bearer ' + response.entity.token)
        }

    });
});

// Vue Filters
Vue.filter('vmUtc', function (value) {
    return moment.utc(value);
});

Vue.filter('vmLocal', function (value) {
    return moment.isMoment(value) ? value.local() : null;
});

Vue.filter('vmDateFormat', function (value, format) {
    function amDateFormatFilter(value, format) {
        if (_.isUndefined(value) || _.isNull(value)) {
            return '';
        }

        // var date = amMoment.preprocessDate(value);
        let date = moment(value);
        if (!date.isValid()) {
            return '';
        }

        return date.format(format);
    }

    // amDateFormatFilter.$stateful = angularMomentConfig.statefulFilters;

    return amDateFormatFilter(value, format);
});

Vue.filter('vmTimeAgo', function (date, suffix, from) {
    let dateFrom;
    if (typeof date === 'undefined' || date === null) {
        return '';
    }

    date = moment(date);
    if (!date.isValid()) {
        return '';
    }

    dateFrom = moment(from);
    if (typeof from !== 'undefined' && dateFrom.isValid()) {
        return date.from(dateFrom, suffix);
    }

    return date.fromNow(suffix);

});

Vue.filter('truncate', function (text, length, end) {
    if (_.isString(text)) {
        if (isNaN(length))
            length = 10;

        if (end === undefined)
            end = "...";

        if (text.length <= length || text.length - end.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length - end.length) + end;
        }
    }
});

Vue.filter('secondsToTimeLength', function (seconds) {
    let SOT = moment().year(1970).startOf('year');
    let time = SOT.add(seconds, 's');
    return time.isSameOrAfter(SOT.add(1, 'h')) ? time.format('HH:mm:ss') : time.format('mm:ss');
    // return moment.duration(seconds, 'seconds').humanize();
});

Vue.directive('toggleShowMore', {
    inserted(el, binding) {
        //show more and less
        jQuery(el).showMore({
            speedDown: 300,
            speedUp: 300,
            height: binding.value ? binding.value + 'px' : '165px',
            showText: 'Show more',
            hideText: 'Show less'
        });
    }
});

Vue.mixin({
    data() {
        return {
            authModalOpen: false,
            genresList: [],
            typesList: [],
            countryList: [],
            languageList: [],
        }
    },
    computed: {
        isIOS (){
            return !!(navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i));
        },
        isAndroid(){
            return !!navigator.userAgent.match(/Android/i);
        },
        isAuthenticated() {
            return this.$root.authenticated;
        },
        isVerified() {
            return this.$root.user.verified;
        },
        isNotVerified() {
            return !this.$root.user.verified;
        }
    },
    methods: {
        // Auth Methods
        doSignOut() {
            localStorage.removeItem('jwt-token');
            this.$removeItem('user');
            this.authenticated = false;
            window.location = '/logout';
        },
        justVerified() {
            return false;
        },
        requestVerificationEmail() {
            return this.$http.get('request_verification')
                .then((response) => {
                    return response;
                }, (error) => {
                    return error;
                });
        },

        // Misc Methods
        isMobile() {
            return this.isIOS || this.isAndroid || Foundation.MediaQuery.current === 'small';
        },
        isFirstUrlSegment(url) {
            return location.pathname.split('/').slice(1, 2).toString() === url;
        },
        isCurrentUrlChild(url, child) {
            let arr = location.pathname.split('/');
            arr = arr.splice(1);
            return _.contains(arr, url) && _.contains(arr, child);
        },
        generateTypes(){
            let self = this;
            return this.$promise(function (resolve, reject) {
                self.$getItem('types', function (err, data) {
                    if (data) {
                        self.typesList = data;
                        resolve(data);
                    } else {
                        self.$http.get('types').then(function (result) {
                            self.typesList = result.data.Types;
                            self.$setItem('types', result.data.Types);
                            self.$setItem('timestamp', moment().toISOString());
                            resolve(result.data.Types);
                        });
                    }
                });
            });
        },
        generateGenres(){
            let self = this;
            return this.$promise(function (resolve, reject) {
                self.$getItem('genres', function (err, data) {
                    if (data) {
                        self.genresList = data;
                        resolve(data);
                    } else {
                        self.$http.get('genres').then(function (result) {
                            self.genresList = result.data.Genres;
                            self.$setItem('genres', result.data.Genres);
                            self.$setItem('timestamp', moment().toISOString());
                            resolve(result.data.Genres);
                        });
                    }
                });
            });
        },
        generateCountries(){
            let self = this;
            return this.$promise(function (resolve, reject) {
                self.$getItem('countries', function (err, data) {
                    if (data) {
                        self.countryList = data;
                        resolve(data);
                    } else {
                        self.$http.get('countries').then(function (result) {
                            self.countryList = result.data.Countries;
                            self.$setItem('countries', result.data.Countries);
                            self.$setItem('timestamp', moment().toISOString());
                            resolve(result.data.Countries);
                        });
                    }
                });
            });
        },
        generateLanguages(){
            let self = this;
            return this.$promise(function (resolve, reject) {
                self.$getItem('languages', function (err, data) {
                    if (data) {
                        self.languageList = data;
                        resolve(data);
                    } else {
                        self.$http.get('languages').then(function (result) {
                            self.languageList = result.data.Languages;
                            self.$setItem('languages', result.data.Languages);
                            self.$setItem('timestamp', moment().toISOString());
                            resolve(result.data.Languages);
                        });
                    }
                });
            });
        },
        generateReactions () {
            return [
                {name: 'Happy', emotion: 'happy', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Sad', emotion: 'sad', icon: 'sad', src: '/assets/svg/emoticons/sad.svg'},
                {name: 'Offended', emotion: 'offended', icon: 'annoyed', src: '/assets/svg/emoticons/annoyed.svg'},
                {name: 'Amused', emotion: 'amused', icon: 'grinning', src: '/assets/svg/emoticons/grinning.svg'},
                {name: 'Mad', emotion: 'mad', icon: 'mad', src: '/assets/svg/emoticons/mad.svg'},
                {name: 'Furious', emotion: 'furious', icon: 'angry', src: '/assets/svg/emoticons/angry.svg'},
                {name: 'Awesome', emotion: 'awesome', icon: 'woah', src: '/assets/svg/emoticons/woah.svg'},
                {name: 'Terrified', emotion: 'terrified', icon: 'shocked', src: '/assets/svg/emoticons/shocked.svg'},
                {name: 'Confused', emotion: 'confused', icon: 'confused', src: '/assets/svg/emoticons/confused.svg'},
                {name: 'In-Love', emotion: 'in-love', icon: 'love', src: '/assets/svg/emoticons/love.svg'},
                {name: 'Amazed', emotion: 'amazed', icon: 'woah', src: '/assets/svg/emoticons/woah.svg'},
                {
                    name: 'Motivated',
                    emotion: 'motivated',
                    icon: 'interested',
                    src: '/assets/svg/emoticons/interested.svg'
                },
                {
                    name: 'Inspired',
                    emotion: 'inspired',
                    icon: 'interested',
                    src: '/assets/svg/emoticons/interested.svg'
                },
                {name: 'Bored', emotion: 'bored', icon: 'bored', src: '/assets/svg/emoticons/bored.svg'},
                {name: 'Sleepy', emotion: 'sleepy', icon: 'bored', src: '/assets/svg/emoticons/bored.svg'},
                {
                    name: 'Emotional',
                    emotion: 'emotional',
                    icon: 'emotional',
                    src: '/assets/svg/emoticons/emotional.svg'
                },
                {name: 'Excited', emotion: 'excited', icon: 'big-smile', src: '/assets/svg/emoticons/big-smile.svg'},
                {
                    name: 'Nostalgic',
                    emotion: 'nostalgic',
                    icon: 'nostalgic',
                    src: '/assets/svg/emoticons/nostalgic.svg'
                },
                {name: 'Annoyed', emotion: 'annoyed', icon: 'annoyed', src: '/assets/svg/emoticons/annoyed.svg'},
                {name: 'Sorry', emotion: 'sorry', icon: 'sad-tear', src: '/assets/svg/emoticons/sad-tear.svg'},
                {name: 'Ashamed', emotion: 'ashamed', icon: 'sad-tear', src: '/assets/svg/emoticons/sad-tear.svg'},
                {name: 'Meh', emotion: 'meh', icon: 'meh', src: '/assets/svg/emoticons/meh.svg'},
                {name: 'Special', emotion: 'special', icon: 'wink', src: '/assets/svg/emoticons/wink.svg'},
                {name: 'Sick', emotion: 'sick', icon: 'mute', src: '/assets/svg/emoticons/mute.svg'},
                {name: 'Great', emotion: 'great', icon: 'grinning', src: '/assets/svg/emoticons/grinning.svg'},
                {name: 'Guilty', emotion: 'guilty', icon: 'sympathetic', src: '/assets/svg/emoticons/sympathetic.svg'},
                {name: 'Hopeful', emotion: 'hopeful', icon: 'hopeful', src: '/assets/svg/emoticons/hopeful.svg'},
                {name: 'Hopeless', emotion: 'hopeless', icon: 'sad', src: '/assets/svg/emoticons/sad.svg'},
                {name: 'Secure', emotion: 'secure', icon: 'nerdy', src: '/assets/svg/emoticons/nerdy.svg'},
                {name: 'Blessed', emotion: 'blessed', icon: 'grinning', src: '/assets/svg/emoticons/grinning.svg'},
                {
                    name: 'Interested',
                    emotion: 'interested',
                    icon: 'interested',
                    src: '/assets/svg/emoticons/interested.svg'
                },
                {name: 'Comfortable', emotion: 'comfortable', icon: 'hehe', src: '/assets/svg/emoticons/hehe.svg'},
                {name: 'Disturbed', emotion: 'disturbed', icon: 'confused', src: '/assets/svg/emoticons/confused.svg'},
                {name: 'Stupid', emotion: 'stupid', icon: 'confused', src: '/assets/svg/emoticons/confused.svg'},
                {name: 'Sexy', emotion: 'sexy', icon: 'sexy', src: '/assets/svg/emoticons/sexy.svg'},
                {name: 'Relaxed', emotion: 'relaxed', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Empowered', emotion: 'empowered', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Cool', emotion: 'cool', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Pumped', emotion: 'pumped', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Turned On', emotion: 'turned on', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Proud', emotion: 'Proud', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Disgusted', emotion: 'disgusted', icon: 'annoyed', src: '/assets/svg/emoticons/annoyed.svg'},
                {name: 'Sympathetic', emotion: 'sympathetic', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Overwhelmed', emotion: 'overwhelmed', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Passionate', emotion: 'passionate', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Thrilled', emotion: 'thrilled', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Loved', emotion: 'loved', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Thankful', emotion: 'thankful', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Appreciated', emotion: 'appreciated', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Romantic', emotion: 'romantic', icon: 'love', src: '/assets/svg/emoticons/love.svg'},
                {name: 'Chill', emotion: 'chill', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Pissed Off', emotion: 'pissed off', icon: 'annoyed', src: '/assets/svg/emoticons/annoyed.svg'},
                {name: 'Accomplished', emotion: 'accomplished', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Honored', emotion: 'honored', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Young', emotion: 'young', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Wild', emotion: 'wild', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Old', emotion: 'old', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Free', emotion: 'free', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Epic', emotion: 'epic', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Fired Up', emotion: 'fired up', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Detached', emotion: 'detached', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {
                    name: 'Disconnected',
                    emotion: 'disconnected',
                    icon: 'confused',
                    src: '/assets/svg/emoticons/confused.svg'
                },
                {name: 'Connected', emotion: 'connected', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Beautiful', emotion: 'beautiful', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Confident', emotion: 'confident', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Positive', emotion: 'positive', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Negative', emotion: 'negative', icon: 'annoyed', src: '/assets/svg/emoticons/annoyed.svg'},
                {
                    name: 'Heartbroken',
                    emotion: 'heartbroken',
                    icon: 'emotional',
                    src: '/assets/svg/emoticons/emotional.svg'
                },
                {name: 'Silly', emotion: 'silly', icon: 'hehe', src: '/assets/svg/emoticons/hehe.svg'},
                {name: 'Disappointed', emotion: 'disappointed', icon: 'sad', src: '/assets/svg/emoticons/sad.svg'},
                {name: 'Stressed', emotion: 'stressed', icon: 'annoyed', src: '/assets/svg/emoticons/annoyed.svg'},
                {
                    name: 'Fantastic',
                    emotion: 'fantastic',
                    icon: 'big-smile',
                    src: '/assets/svg/emoticons/big-smile.svg'
                },
                {name: 'Hungry', emotion: 'hungry', icon: 'annoyed', src: '/assets/svg/emoticons/annoyed.svg'},
                {name: 'Shocked', emotion: 'shocked', icon: 'shocked', src: '/assets/svg/emoticons/shocked.svg'},
                {name: 'Frustrated', emotion: 'frustrated', icon: 'annoyed', src: '/assets/svg/emoticons/annoyed.svg'},
                {
                    name: 'Engrossed',
                    emotion: 'engrossed',
                    icon: 'interested',
                    src: '/assets/svg/emoticons/interested.svg'
                },
                {name: 'Peaceful', emotion: 'peaceful', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Surprised', emotion: 'surprised', icon: 'woah', src: '/assets/svg/emoticons/woah.svg'},
                {name: 'Satisfied', emotion: 'satisfied', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Incomplete', emotion: 'incomplete', icon: 'sad', src: '/assets/svg/emoticons/sad.svg'},
                {name: 'Complete', emotion: 'complete', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Entertained', emotion: 'entertained', icon: 'hehe', src: '/assets/svg/emoticons/hehe.svg'},
                {name: 'Enlightened', emotion: 'enlightened', icon: 'interested', src: '/assets/svg/emoticons/interested.svg'},
                {name: 'Relieved', emotion: 'relieved', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Concerned', emotion: 'concerned', icon: 'sympathetic', src: '/assets/svg/emoticons/sympathetic.svg'},
                {name: 'Strong', emotion: 'strong', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Optimistic', emotion: 'optimistic', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Discouraged', emotion: 'discouraged', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Lucky', emotion: 'lucky', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Scared', emotion: 'scared', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Brave', emotion: 'brave', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Naughty', emotion: 'naughty', icon: 'sexy', src: '/assets/svg/emoticons/sexy.svg'},
                {name: 'Alert', emotion: 'alert', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Alive', emotion: 'alive', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Perfect', emotion: 'perfect', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Nervous', emotion: 'nervous', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Tense', emotion: 'tense', icon: 'annoyed', src: '/assets/svg/emoticons/annoyed.svg'},
                {name: 'Impatient', emotion: 'impatient', icon: 'annoyed', src: '/assets/svg/emoticons/annoyed.svg'},
                {name: 'Philosophical', emotion: 'philosophical', icon: 'interested', src: '/assets/svg/emoticons/interested.svg'},
                {name: 'Empty', emotion: 'empty', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Informed', emotion: 'informed', icon: 'nerdy', src: '/assets/svg/emoticons/nerdy.svg'},
                {name: 'Playful', emotion: 'playful', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Wise', emotion: 'wise', icon: 'nerdy', src: '/assets/svg/emoticons/nerdy.svg'},
                {name: 'Refreshed', emotion: 'refreshed', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Wanted', emotion: 'wanted', icon: 'annoyed', src: '/assets/svg/emoticons/annoyed.svg'},
                {name: 'Thirsty', emotion: 'thirsty', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'},
                {name: 'Desperate', emotion: 'desperate', icon: 'happy', src: '/assets/svg/emoticons/happy.svg'}
            ];
        },
        loginModal(){
            this.$root.$emit('openAuthModal');
            this.authModalOpen = true;
        }
    }
});

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

        home,
        browse,
        latest,
        project,
        projectBreadcrumbs,
        projectVideoPlayer,
        projectScriptViewer,
        critique,
        winners,
    },
    data: {
        filepickerApiKey: 'APbjTx44SlSuCI6P58jwvz',
        showSuccess: false,
        showError: false,
        // showSuccess: false,
        authenticated: false,
        toastType: 'action',
        toastDuration: 4000,
        toastMessage: '',
        toastButton: '',
        toastAction: null,

        searchText: '',
        user: null,
        notifications: {
            loaded: false,
            list: [],
            unseen: 0,
            unread: 0
        },
        StreamConfig: {
            streamApiKey: '97wfnrargt9f',
            streamApiSecret: '4t8dpp9bsap2svjhvu2n4x3h3bvwyyb3kgvg7san3bab2esu6vmnquffq2u95z82',
            streamApp: '6408',
        },
        StreamClient: null,

        //project page
        playerResponsiveMode: localStorage.playerResponsiveMode ? JSON.parse(localStorage.playerResponsiveMode) : _.contains(['small', 'medium', 'large'], Foundation.MediaQuery.current),
    },
    computed: {
        /*user(){
         return this.$getItem('user').then(function (data) {
         return data;
         });
         },*/
    },
    methods: {
        setUser() {

        },
        getUser(){
            let self = this;
            return this.$promise(function (resolve, reject) {
                self.$getItem('user').then(function (data) {
                    if (_.isNull(data)) {
                        self.$http.get('authenticate')
                            .then((response) => {
                                self.$setItem('user', self.user = response.data.user, function (err, data) {
                                    resolve(data);
                                });
                                // this.$setItem.put('iw_token', this.$auth.getToken(), {secure: true});
                            }, (error) => {
                                reject(error);
                            });
                    } else {
                        resolve(data);
                    }
                });
            })
        },
        parseJwt(token) {
            let base64Url = token.split('.')[1];
            let base64 = base64Url.replace('-', '+').replace('_', '/');
            return JSON.parse(atob(base64));
        },
        getNewToken (type, id) {
            return this.$http.get('notifications/token?type=' + type).then(function (res) {
                return res.data.token;
            });
        },
        subscribeUserFeeds () {
            let self = this;
            this.getNewToken('notification', self.user.id).then(function (token) {
                let feed = self.StreamClient.feed('notification', self.user.id, token);
                feed.subscribe(function (obj) {
                    console.log('Notification: ', obj);
                    self.getNotificationsFeed();
                }).then(function () {
                    self.getNotificationsFeed();
                });
            });
            /*this.getNewToken('message', this.user.id).then(function (token) {
                let feed = this.StreamClient.feed('message', this.user.id, token);
                feed.subscribe(function (obj) {
                    console.log('Messages: ', obj);
                    this.getMessagesFeed(feed);
                }).then(function () {
                    this.getMessagesFeed(feed);
                });
            });*/
        },
        getNotificationsFeed () {
            this.$http.get('notifications/feed').then(function (res) {
                console.log('Notification: ', res.data.activities);
                this.notifications = {
                    loaded: true,
                    list: res.data.activities,
                    unseen: res.data.unseen,
                    unread: res.data.unread
                };
            });
        },
        /*getMessagesFeed (feed) {
            feed.get({limit: 10}, function (error, response, body) {
                console.log('Messages Notifications: ', body);
                try {
                    //let data = UtilsService.enrichRawNotifications(body.results);
                    //console.log(data);
                    this.AppData.MessageNotifications = {
                        loaded: '',
                        list: body.results,
                        unseen: body.unseen,
                        unread: body.unread
                    };
                    console.log(this.AppData.MessageNotifications);
                } catch (e) {
                    console.log(e);
                }
            });
        }*/
    },
    created() {
        let self = this;
        console.log('Vue Ready');

        this.StreamClient = stream.connect(this.StreamConfig.streamApiKey, null, this.StreamConfig.streamApp, {location: 'us-east'})

        // Init LocalForage
        this.$storageConfig({
            //driver: 'localStorageWrapper', // if you want to force a driver
            name: 'iw', // name of the database and prefix for your data, it is 'lf' by default
            version: 1.0, // version of the database, you shouldn't have to use this
            storeName: 'keyvaluepairs', // name of the table
            description: ''
        });

        this.generateGenres();
        this.generateTypes();

        if (!localStorage.hasOwnProperty('jwt-token')) {
            this.$removeItem('user');
        } else {
            // Check validity of token
            let tokenData = this.parseJwt(localStorage.getItem('jwt-token'));
            if (moment.unix(tokenData.exp).isBefore()) {
                localStorage.removeItem('jwt-token');
                this.$removeItem('user');
                this.authenticated = false;
            } else {
                // Load user data
                this.getUser().then(function (data) {
                    this.user = data;
                    this.authenticated = true;
                    this.$emit('userHasLoggedIn', data);
                });
            }
        }

        this.$on('toastAction', function (message, button, action, duration) {
            debugger;
            this.toastType = 'action';
            this.toastMessage = message;
            this.toastButton = button;
            this.toastAction = action;
            this.toastDuration = duration || 4000;
            this.$refs.snackbar.open();
        });
        this.$on('toastMessage', function (message, duration) {
            this.toastType = 'message';
            this.toastMessage = message;
            this.toastDuration = duration || 4000;
            this.$refs.snackbar.open();
        });
        this.$on('verifyAction', function (message) {
            debugger;
            this.$emit();
        });

        this.$on('userHasLoggedIn', function (user) {
            let newValue = user;
            // Intercom
            newValue.name = newValue.fullName;
            newValue.app_id = window.intercomSettings.app_id;
            window.Intercom('boot', newValue);
            // $intercom.show();

            // Push Notifications
            let OneSignal = window.OneSignal || [];
            OneSignal.push(["init", {
                appId: "9972c4b2-7bd1-47c0-a2f8-213b8c767cd8",
                safari_web_id: 'web.onesignal.auto.3f58661c-f8ad-4946-a9b6-84125eec4421',
                autoRegister: true,
                notifyButton: {
                    enable: false /* Set to false to hide */
                }
            }]);

            if (!newValue.push_id) {
                OneSignal.getUserId()
                    .then(function (userId) {
                        // console.log("OneSignal User ID:", userId);
                        this.$http.put('users/me/' + newValue.id, {
                            push_id: userId
                        });
                        // DataService.update('users', newValue.id, { push_id: userId});
                        // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316
                    });
            }

            // initialize stream
            this.subscribeUserFeeds();
            //this.listenNotifications(newValue.username);
            // this.getNewMessages();
        });

        this.$root.$on('playerResponsiveMode', function (mode) {
            self.playerResponsiveMode = mode;
        });

    },
    mounted(){
// Some Template JS
        jQuery(document).foundation();
        // jQuery(document).ready(function (jQuery) {
        //back to top
        let backtotop = '#back-to-top';
        if (jQuery(backtotop).length) {
            let scrollTrigger = 100; // px
            let backToTop = function () {
                let scrollTop = jQuery(window).scrollTop();
                if (scrollTop > scrollTrigger) {
                    jQuery(backtotop).addClass('show');
                } else {
                    jQuery(backtotop).removeClass('show');
                }
            };
            backToTop();
            jQuery(window).on('scroll', function () {
                backToTop();
            });
            jQuery('#back-to-top').on('click', function (e) {
                e.preventDefault();
                jQuery('html,body').animate({
                    scrollTop: 0
                }, 700);
            });
        }

        //register form
        jQuery('div.social-login').mouseenter(function () {
            jQuery('i.arrow-left').addClass('active');
        }).mouseleave(function () {
            jQuery('i.arrow-left').removeClass('active');
        });
        jQuery('div.register-form').mouseenter(function () {
            jQuery('i.arrow-right').addClass('active');
        }).mouseleave(function () {
            jQuery('i.arrow-right').removeClass('active');
        });

        //vertical thumb slider
        let thumb = jQuery('.thumb-slider .thumbs').find('.ver-thumbnail');
        jQuery(thumb).on('click', function () {
            let id = jQuery(this).attr('id');
            //alert(id);
            let thisIMG = jQuery('.image');
            thisIMG.eq(0).show();
            thisIMG.hide();
            thisIMG.hide();
            jQuery('.' + id).fadeIn();
        });

        let $par = jQuery('.thumb-slider .thumbs .thumbnails').scrollTop(0);
        jQuery('.thumb-slider .thumbs a').click(function (e) {
            e.preventDefault();                      // Prevent default Anchors behavior
            let n = jQuery(this).hasClass('down') ? '+=200' : '-=200'; // Direction
            $par.animate({scrollTop: n});
        });
        // });
    }

});
