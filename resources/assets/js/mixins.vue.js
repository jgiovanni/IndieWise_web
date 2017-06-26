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

Vue.http.options.root = '/api';
Vue.http.interceptors.push((request, next) => {
    let token, headers;

    token = localStorage.getItem('jwt-token');
    headers = request.headers || (request.headers = {});

    request.headers.set('X-CSRF-TOKEN', $('meta[name="csrf-token"]').attr('content'));
    if (token !== null && token !== 'undefined') {
        request.headers.set('Authorization', token);
    }

    // Show Spinners in all components where they exist
    if (_.contains(['GET', 'POST', 'PUT'], request.method.toUpperCase()) && request.root === '/api') {
        if (this.$refs && this.$refs.spinner && !request.params.hideLoader) {
            switch (request.method.toUpperCase()) {
                case 'GET':
                    this.$refs.spinner.show({text: 'Loading'});
                    break;
                case 'POST':
                    this.$refs.spinner.show({text: 'Saving'});
                    break;
                case 'PUT':
                    this.$refs.spinner.show({text: 'Updating'});
                    break;
            }
        }
    }


    // continue to next interceptor
    next(response => {

        // Hide Spinners in all components where they exist
        if (this.$refs && this.$refs.spinner && !_.isUndefined(this.$refs.spinner._started)) {
            this.$refs.spinner.hide();
        }

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

Vue.mixin({
    data() {
        return {
            authModalOpen: false,
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
            return this.$root.user && this.$root.user.verified;
        },
        isNotVerified() {
            return !this.isVerified;
        },
        /*genresList() {
         return this.$root.genresList;
         },
         typesList() {
         return this.$root.typesList;
         },
         countryList() {
         return this.$root.countryList;
         },
         languageList() {
         return this.$root.languageList;
         },*/
    },
    methods: {
        // Auth Methods
        doSignOut() {
            localStorage.removeItem('jwt-token');
            this.$removeItem('user');
            this.authenticated = false;
            location.href = location.origin + '/logout';
            /*this.$http.post('/logout').then(function () {
                this.$root.$emit('userHasLoggedOut', this.$root.user);
                this.$removeItem('user');
                this.authenticated = false;
            });*/
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

        // Sort Methods
        sortByAsc(array, property){
            return array.sort(function (a, b) {
                var textA = a[property].toUpperCase();
                var textB = b[property].toUpperCase();
                return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
            })
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
                        self.$root.typesList = self.sortByAsc(data, 'name');
                        resolve(self.$root.typesList);
                    } else {
                        self.$http.get('types').then(function (result) {
                            let types = self.sortByAsc(result.body.types, 'name');
                            self.$root.typesList = types;
                            self.$setItem('types', types);
                            self.$setItem('timestamp', moment().toISOString());
                            resolve(types);
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
                        self.$root.genresList = self.sortByAsc(data, 'name');
                        resolve(self.$root.genresList);
                    } else {
                        self.$http.get('genres').then(function (result) {
                            let genres = self.sortByAsc(result.body.genres, 'name');
                            self.$root.genresList = genres;
                            self.$setItem('genres', genres);
                            self.$setItem('timestamp', moment().toISOString());
                            resolve(genres);
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
                        self.$root.countryList = self.sortByAsc(data, 'name');
                        resolve(self.$root.countryList);
                    } else {
                        self.$http.get('countries').then(function (result) {
                            let countries = self.sortByAsc(result.body.countries, 'name');
                            self.$root.countryList = countries;
                            self.$setItem('countries', countries);
                            self.$setItem('timestamp', moment().toISOString());
                            resolve(countries);
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
                        self.$root.languageList = self.sortByAsc(data, 'English');
                        resolve(self.$root.languageList);
                    } else {
                        self.$http.get('languages').then(function (result) {
                            let languages = self.sortByAsc(result.body.languages, 'English');
                            self.$root.languageList = languages;
                            self.$setItem('languages', languages);
                            self.$setItem('timestamp', moment().toISOString());
                            resolve(languages);
                        });
                    }
                });
            });
        },
        generateReactions() {
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

let AppData = {
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

    genresList: [],
    typesList: [],
    countryList: [],
    languageList: [],

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
    authProviders: {
        facebook: {
            authorizationEndpoint: 'https://www.facebook.com/v2.8/dialog/oauth',
            scope: ['email'],
            clientId: '150687055270744',
            url: '/auth/facebook',
            redirectUri: window.location.origin + '/auth/facebook',
        },
        google: {
            authorizationEndpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
            scope: ['email', 'profile'],
            clientId: '322274582930-4m1dueb708gvdic28n12e5dhqq121a6b.apps.googleusercontent.com',
            url: '/auth/google',
            redirectUri: window.location.origin + '/auth/google/callback'
        }
    }
};
function AppComputed() {

}
let AppMethods = {
    logout(){
        this.user = null;
        this.authenticated = false;
        localStorage.removeItem('jwt-token');
        self.$removeItem('user')
    },
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
    getNotificationToken (type, id) {
        return this.$http.get('notifications/token?type=' + type).then(function (res) {
            return res.data.token;
        });
    },
    subscribeUserFeeds () {
        let self = this;
        this.getNotificationToken('notification', self.user.id).then(function (token) {
            let feed = self.StreamClient.feed('notification', self.user.id, token);
            feed.subscribe(function (obj) {
                console.log('Notification: ', obj);
                self.getNotificationsFeed();
            }).then(function () {
                self.getNotificationsFeed();
            });
        });
        /*this.getNotificationToken('message', this.user.id).then(function (token) {
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
};
function AppCreated(vm) {
    console.log('Vue Ready');
    // Comment these three for local build.
    // Vue.config.devtools = false;
    // Vue.config.debug = false;
    // Vue.config.silent = true;


    vm.StreamClient = AppData.StreamClient = stream.connect(AppData.StreamConfig.streamApiKey, null, AppData.StreamConfig.streamApp, {location: 'us-east'})

    // Init LocalForage
    vm.$storageConfig({
        //driver: 'localStorageWrapper', // if you want to force a driver
        name: 'iw', // name of the database and prefix for your data, it is 'lf' by default
        version: 1.0, // version of the database, you shouldn't have to use this
        storeName: 'keyvaluepairs', // name of the table
        description: ''
    });

    vm.generateGenres();
    vm.generateTypes();

    vm.$on('toastAction', function (message, button, action, duration) {
        vm.toastType = 'action';
        vm.toastMessage = message;
        vm.toastButton = button;
        vm.toastAction = action;
        vm.toastDuration = duration || 4000;
        vm.$refs.snackbar.open();
    });
    vm.$on('toastMessage', function (message, duration) {
        vm.toastType = 'message';
        vm.toastMessage = message;
        vm.toastDuration = duration || 4000;
        vm.$refs.snackbar.open();
    });
    vm.$on('verifyAction', function (message) {
        vm.$emit('toastAction', message, 'Verify Now', vm.requestVerificationEmail);
    });

    vm.$on('userHasLoggedIn', function (user) {
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
                    vm.$http.put('users/me/' + newValue.id, {
                        push_id: userId
                    });
                    // DataService.update('users', newValue.id, { push_id: userId});
                    // (Output) OneSignal User ID: 270a35cd-4dda-4b3f-b04e-41d7463a2316
                });
        }

        // initialize stream
        vm.subscribeUserFeeds();
        //vm.listenNotifications(newValue.username);
        // vm.getNewMessages();
    });
}
function AppMounted(vm) {
    let self = vm;

    if (!localStorage.hasOwnProperty('jwt-token')) {
        vm.$removeItem('user');
        vm.$emit('checkedAuthentication', 'true');
    } else {
        // Check validity of token
        let tokenData = vm.parseJwt(localStorage.getItem('jwt-token'));
        if (moment.unix(tokenData.exp).isBefore()) {
            localStorage.removeItem('jwt-token');
            vm.$removeItem('user');
            vm.authenticated = false;
            vm.$emit('checkedAuthentication', true);
        } else {
            // Load user data
            vm.getUser().then(function (data) {
                vm.user = data;
                vm.authenticated = true;
                vm.$emit('userHasLoggedIn', data);
                vm.$emit('checkedAuthentication', data);
            });
        }
    }

    // Some Template JS
    jQuery(document).foundation();

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

    //vertical thumb slider
    let thumb = jQuery('.thumb-slider .thumbs').find('.ver-thumbnail');
    jQuery(thumb).on('click', function () {
        let id = jQuery(thisthis).attr('id');
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

    window.fbAsyncInit = function() {
        FB.init({
            appId: '150687055270744',
            status: true,
            cookie: true,
            xfbml: true,
            version: 'v2.9'
        });

        FB.AppEvents.activateApp();
    }
}

export { AppData, AppComputed, AppMethods, AppCreated, AppMounted};