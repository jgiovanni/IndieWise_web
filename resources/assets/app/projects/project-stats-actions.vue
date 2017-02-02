<template>
    <section class="SinglePostStats" id="SinglePostStats">
        <!-- newest video -->
        <div class="row secBg">
            <div class="large-12 columns">
                <div class="media-object stack-for-small">
                    <div class="media-object-section">
                        <div class="author-img-sec">
                            <div class="thumbnail author-single-post">
                                <a href="'user/' + project.owner.url_id + '/about'">
                                    <img :src="project.owner.avatar" alt="post">
                                </a>
                            </div>
                            <p class="text-center">
                                <a href="'user/' + project.owner.url_id + '/about'">
                                    {{project.owner.fullName}}
                                </a>
                            </p>
                        </div>
                    </div>
                    <div class="media-object-section object-second">
                        <div class="author-des clearfix">
                            <div class="post-title">
                                <h4>{{project.name}} <span v-if="project.nsfw"
                                                           style="padding: 5px;cursor: default;color: #CC181E;border-color: #CC181E"
                                                           class="button tiny alert hollow">Mature</span></h4>
                                <p>
                                <span>
                                    <i class="fa fa-clock-o"></i>
                                    <i class="md-caption">{{ project.created_at | vmTimeAgo }}</i>
                                </span>
                                    <span><i class="fa fa-smile-o"></i>{{project.reactions_count||0}}</span>
                                    <span class="double-thumbs"><i class="fa fa-thumbs-o-up"></i><i
                                            class="fa fa-thumbs-o-up"></i>{{project.up_ratings_count||0}}</span>
                                    <span class="double-thumbs"><i class="fa fa-thumbs-o-down"></i><i
                                            class="fa fa-thumbs-o-down"></i>{{project.down_ratings_count||0}}</span>
                                    <!--<span><i class="fa fa-commenting"></i>{{project.commentCount||0}}</span>-->
                                </p>
                            </div>
                            <div class="subscribe">
                                <form>
                                    <button @click="openReactionDialog()">
                                        <span v-if="canReact===true" class="fa fa-smile-o"></span>
                                        <span v-if="canReact===true">I'm feeling ...</span>
                                        <span v-if="canReact!==true && canReact != 'login'">
                                        <md-icon class="emoticon" :mdsrc="canReactIcon()"></md-icon>
                                        I'm feeling {{canReact.emotion}}
                                    </span>
                                    </button>
                                    <a class="primary button tiny show-for-small-only"
                                       @click="openCritiqueDialog()" v-if="canCritique">
                                        <span class="fa fa-star"></span>
                                        <span v-if="canCritique===true">Judge</span>
                                        <span v-if="canCritique!==true && canCritique != 'login'">
                                        Judged: <span>{{canCritique.overall}}</span>
                                    </span>
                                    </a>
                                    <a class="primary button small hide-for-small-only" v-cloak
                                       @click="openCritiqueDialog()" v-if="canCritique">
                                        <span class="fa fa-star"></span>
                                        <span v-if="canCritique===true">Judge</span>
                                        <span v-if="canCritique!==true && canCritique != 'login'">
                                        Judged: <span>{{canCritique.overall}}</span>
                                    </span>
                                    </a>
                                </form>
                            </div>
                        </div>
                        <div class="social-share hide-for-small-only">
                            <div class="post-like-btn clearfix">
                                <form>
                                    <a class="double-thumbs primary button tiny text-white" @click="rate('up')"
                                       :class="{'active':canRate.up}">
                                        <i class="fa fa-thumbs-o-up"></i><i class="fa fa-thumbs-o-up"></i>
                                    </a>
                                    <a class="double-thumbs primary button tiny text-white" @click="rate('down')"
                                       :class="{'active':canRate.down}">
                                        <i class="fa fa-thumbs-o-down"></i><i class="fa fa-thumbs-o-down"></i>
                                    </a>
                                    <!--<project-playlists :project="project"></project-playlists>-->
                                    <a class="button tiny text-white" @click="openShareDialog"><i
                                            class="fa fa-share"></i>Share
                                    </a>
                                    <a id="reportDialogButtonA" class="button tiny alert text-white" @click="openReportDialog($event)">
                                        <i class="fa fa-flag"></i> Flag
                                    </a>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div class="social-share show-for-small-only">
                        <div class="post-like-btn clearfix">
                            <form>
                                <a class="double-thumbs primary button tiny text-white" @click="rate('up')"
                                   :class="{'active':canRate.up}">
                                    <i class="fa fa-thumbs-o-up"></i><i class="fa fa-thumbs-o-up"></i>
                                </a>
                                <a class="double-thumbs primary button tiny text-white" @click="rate('down')"
                                   :class="{'active':canRate.down}">
                                    <i class="fa fa-thumbs-o-down"></i><i class="fa fa-thumbs-o-down"></i>
                                </a>
                                <!--<project-playlists :project="project"></project-playlists>-->
                                <a class="button  text-white" @click="openShareDialog"><i
                                        class="fa fa-share"></i>Share
                                </a>
                                <a id="reportDialogButtonB" class="button tiny alert text-white" @click="openReportDialog($event)">
                                    <i class="fa fa-flag"></i> Flag
                                </a>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </div>

        <share-dialog :id="project.id" :url="project.url_id" :name="project.name" :description="project.description"></share-dialog>
        <report-project-dialog :project-id="project.id"></report-project-dialog>
    </section>
</template>
<style scoped></style>
<script type="text/babel">
    import projectPlaylists from './project-playlists.vue';
    import reportProjectDialog from './modal/report-project-dialog.vue';
    import shareDialog from '../common/share-dialog.vue';
    export default {
        name: 'project-stats-actions',
        components: {projectPlaylists, reportProjectDialog, shareDialog},
        props: {
            project: {
                type: Object,
                required: true
            },
        },
        data(){
            return {
                canRate: false,
                canReact: false,
                canCritique: false,
                isFaved: false,
                isSaved: false,
                rateThrottled: false,
                emotions: [],
            }
        },
        computed: {

        },
        methods: {
            canReactCheck(id){
                return this.$promise(function (resolve, reject) {
                    if (this.$root.user) {
                        this.$http.get('reactions', {params: {project: id, user: this.$root.user.id}})
                            .then(function (response) {
                                response.data.data.length
                                    // critique exists already from this user
                                    ? reject(response.data.data[0])
                                    // user hasn't critiqued yet
                                    : resolve(true);
                            });
                    } else {
                        reject(false);
                    }
                });
            },
            canCritiqueCheck(id){
                return this.$promise(function (resolve, reject) {
                    if (this.$root.user) {
                        this.$http.get('critiques', {params: {project: id, user: this.$root.user.id}})
                            .then(function (response) {
                                response.data.data.length
                                    // critique exists already from this user
                                    ? reject(response.data.data[0])
                                    // user hasn't critiqued yet
                                    : resolve(true);
                            });
                    } else {
                        reject(false);
                    }
                });
            },
            canRateCheck(id){
                return this.$promise(function (resolve, reject) {
                    if (this.$root.user) {
                        this.$http.get('ratings', {params: {project: id, user: this.$root.user.id}})
                            .then(function (response) {
                                response.data.ratings.length
                                    // critique exists already from this user
                                    ? reject(response.data.ratings[0])
                                    // user hasn't critiqued yet
                                    : resolve(true);
                            });
                    } else {
                        reject(false);
                    }
                });
            },
            checkUserActions() {
                let self = this;
                if (this.isAuthenticated()) {
                    this.canReactCheck(self.project.id).then(function (res) {
                        self.canReact = res;
                    }, function (error) {
                        self.canReact = error;
                    });

                    if (self.project.disableCritique || (self.project.owner_id === this.$root.user.id)) {
                        console.log('owner');
                        self.canCritique = false;
                    } else {
                        this.canCritiqueCheck(self.project.id).then(function (res) {
                            self.canCritique = res;
                        }, function (error) {
                            self.canCritique = error;
                        });
                    }

                    this.canRateCheck(self.project.id).then(function (res) {
                        self.canRate = res;
                    }, function (error) {
                        self.canRate = error;
                    });
                } else {
                    self.canCritique = true;
                }
            },

            react(emotion) {
                let self = this;
                if (_.isObject(emotion)) {
                    if (!this.isAuthenticated()) {
                        this.loginModal();
                        return false;
                    }

                    if (this.isNotVerified()) {
                        this.$root.$emit('VerifyAction', 'Please verify your account and join the conversation! Check your spam folder too.', 'Verify Now', this.requestVerificationEmail);
                        return false;
                    }

                    let actionVerb = 'react';
                    if (self.canReact === true) {
                        this.$http.post('reactions', {
                            user_id: this.$root.user.id,
                            project_id: self.project.id,
                            emotion: emotion.emotion
                        }).then(function (resA) {
                            self.project.reactions_count++;
                            // self.updateVideoObj();
                            self.checkUserActions();
                            self.projectCtrl.handleActions('reaction', resA.data.data);
                        });
                    } else if (_.isObject(self.canReact)) {
                        if (self.canReact.emotion !== emotion.emotion) {
                            this.$http.put('reactions', self.canReact.id, {
                                emotion: emotion.emotion
                            }).then(function (resA) {
                                self.canReact = resA.data;
                                // self.updateVideoObj();
                                self.checkUserActions();
                                self.projectCtrl.handleActions('reaction', resA.data.data);
                            });
                        }
                    }
                }
            },

            rate(direction) {
                let self = this;
                if (this.rateThrottled) {
                    return false;
                }

                if (!this.isAuthenticated()) {
                    this.loginModal();
                    return false;
                }

                if (this.$rootScope.isNotVerified()) {
                    this.$root.$emit('toastAction', 'Please verify your account so you can rate videos! Check your spam folder too.', 'Verify Now', this.$rootScope.requestVerificationEmail);
                    return false;
                }

                this.rateThrottled = true;
                let actionVerb = 'like';
                if (this.canRate === true) {
                    this.$http.post('ratings', {
                        author_id: this.$root.user.id,
                        project_id: this.project.id,
                        up: direction === 'up',
                        down: direction === 'down'
                    }).then(function (res) {
                        // console.log(res);
                        switch (direction) {
                            case 'up':
                                // Increment project up_ratings_count
                                self.project.up_ratings_count++;
                                break;
                            case 'down':
                                // Increment project down_ratings_count
                                self.project.down_ratings_count++;
                                actionVerb = 'unlike';
                                break;
                        }

                        // self.updateVideoObj();
                        _.extend(res.data, {projectOwner: self.project.owner_id});
                        self.checkUserActions();
                        self.projectCtrl.handleActions('rate', res.data.data);
                    });

                } else if (_.isObject(self.canRate)) {
                    //up is false && down is false
                    if (!self.canRate.up && !self.canRate.down) {
                        this.$http.put('ratings', self.canRate.id, {
                            up: direction === 'up',
                            down: direction === 'down',
                        })
                            .then(function (res) {
                                switch (direction) {
                                    case 'up':
                                        // Increment project up_ratings_count
                                        self.project.up_ratings_count++;
                                        break;
                                    case 'down':
                                        // Increment project down_ratings_count
                                        self.project.down_ratings_count++;
                                        actionVerb = 'unlike';
                                        break;
                                }
                                _.extend(self.canRate, {up: direction === 'up', down: direction === 'down'});
                                //self.updateVideoObj();
                                _.extend(res.data, {projectOwner: self.project.owner_id});
                                //self.checkUserActions();
                                self.projectCtrl.handleActions('rate', res.data.data);
                            });

                        // up is already true && direction is up
                    } else if (!!self.canRate.up && direction === 'up') {
                        //DataService.delete('Rating', self.canRate.id)
                        _.extend(self.canRate, {up: false});
                        this.$http.put('ratings', self.canRate.id, {up: false, down: false})
                            .then(function (res) {
                                self.project.up_ratings_count--;
                                //self.updateVideoObj();
                                _.extend(res.data, {projectOwner: self.project.owner_id});
                                //self.checkUserActions();
                                self.projectCtrl.handleActions('rate', res.data.data);
                            });

                        // down is already true && direction is down
                    } else if (!!self.canRate.down && direction === 'down') {
                        //DataService.delete('Rating', self.canRate.id)
                        _.extend(self.canRate, {down: false});
                        this.$http.put('ratings', self.canRate.id, {up: false, down: false})
                            .then(function (res) {
                                self.project.down_ratings_count--;
                                //self.updateVideoObj();
                                _.extend(res.data, {projectOwner: self.project.owner_id});
                                //self.checkUserActions();
                                self.projectCtrl.handleActions('rate', res.data.data);
                            });

                        // down is true && direction is up || up is true && direction is down -> reversal
                    } else if ((!!self.canRate.down && direction === 'up') || (!!self.canRate.up && direction === 'down')) {
                        let up = false, down = false;
                        switch (direction) {
                            case 'up':
                                up = true;
                                self.project.up_ratings_count++;
                                self.project.down_ratings_count--;
                                _.extend(self.canRate, {up: up, down: down});
                                break;
                            case 'down':
                                down = true;
                                self.project.up_ratings_count--;
                                self.project.down_ratings_count++;
                                _.extend(self.canRate, {up: up, down: down});
                                actionVerb = 'unlike';
                                break;
                        }
                        this.$http.put('ratings', self.canRate.id, {up: up, down: down}).then(function (res) {
                            //self.updateVideoObj();
                            //self.checkUserActions();
                            _.extend(res.data, {projectOwner: self.project.owner_id});
                            self.projectCtrl.handleActions('rate', res.data.data);
                        });
                    }
                }
                this.$timeout(function () {
                    self.rateThrottled = false;
                }, 1000);
            },

            openCritiqueDialog($event) {
                let self = this;
                if (self.canCritique !== true && self.canCritique !== false) {
                    return this.$state.go('video_critique', {
                        video_url_id: self.project.url_id,
                        url_id: self.canCritique.url_id
                    });
                }

                CritiqueDialogController.$inject = ['$scope', '$modalInstance', 'critique', 'project', '$q', 'Analytics'];
                function CritiqueDialogController($scope, $modalInstance, critique, project, $q, Analytics) {
                    // zIndexPlayer();
                    $scope.critique = critique;
                    $scope.project = project;
                    $scope.ratingMax = 10;
                    $scope.makePrivateHelp = false;
                    $scope.processing = false;
                    $scope.canNominate = false;
                    $scope.errors = [];

                    if ($scope.project.type.id === '39704d3d-2941-11e6-b8db-86ac961c55b2') {
                        self.$http.get('awards', { params: {trailer: true}}).then(function (result) {
                            $scope.awardsList = result.data.Awards;
                        });
                    } else {
                        self.$http.get('awards').then(function (result) {
                            $scope.awardsList = result.data.Awards;
                        });
                    }

                    $scope.dialogModel = {
                        award_id: null
                    };

                    $scope.nominated = {
                        award_id: $scope.dialogModel.award_id,
                        user_id: self.$root.user.id,
                        project_id: $scope.critique.project_id,
                        critique_id: undefined
                    };

                    $scope.starArray = _.clone([{"num": 0}, {"num": 1}, {"num": 2}, {"num": 3}, {"num": 4}, {"num": 5}, {"num": 6}, {"num": 7}, {"num": 8}, {"num": 9}, {"num": 10}].reverse());

                    $scope.calcOverall = function () {
                        switch ($scope.critique.type) {
                            case 'script':
                                $scope.critique.overall = ($scope.critique.originality + $scope.critique.pacing + $scope.critique.structure +
                                    $scope.critique.writing + $scope.critique.style + $scope.critique.theme + $scope.critique.dialogue +
                                    $scope.critique.characters + $scope.critique.presentation + $scope.critique.concept) / 10;
                                break;
                            case 'video':
                            default:
                                $scope.critique.overall = ($scope.critique.originality + $scope.critique.direction + $scope.critique.writing +
                                    $scope.critique.cinematography + $scope.critique.performances + $scope.critique.production +
                                    $scope.critique.pacing + $scope.critique.structure + $scope.critique.audio + $scope.critique.music) / 10;
                                break;
                        }
                    };

                    $scope.$watchCollection('critique', function () {
                        $scope.calcOverall();
                    });

                    $scope.$watch('critique.overall', function (newValue) {
                        $scope.canNominate = newValue >= 6;
                    });

                    $scope.validateCritique = function () {
                        $scope.errors = [];

                        let failA = true;
                        let failB = true;
                        $scope.critique.body.trim();
                        failA = $scope.critique.body.length < 1;
                        if (failA) {
                            $scope.errors.push('Tell us why you gave this critique an overall rating of ' + $scope.critique.overall);
                        }
                        switch ($scope.critique.type) {
                            case 'script':
                                failB = $scope.critique.originality < 1 || $scope.critique.pacing < 1 || $scope.critique.writing < 1 ||
                                    $scope.critique.structure < 1 || $scope.critique.style < 1 || $scope.critique.theme < 1 ||
                                    $scope.critique.dialogue < 1 || $scope.critique.characters < 1 || $scope.critique.presentation < 1 || $scope.critique.concept < 1;
                                break;
                            case 'video':
                            default:
                                failB = $scope.critique.originality < 1 || $scope.critique.direction < 1 || $scope.critique.writing < 1 ||
                                    $scope.critique.cinematography < 1 || $scope.critique.performances < 1 || $scope.critique.production < 1 ||
                                    $scope.critique.pacing < 1 || $scope.critique.structure < 1 || $scope.critique.audio < 1 || $scope.critique.music < 1;
                                break;
                        }

                        if (failB) {
                            $scope.errors.push('Be sure to put a minimum of 1-star in every category.')
                        }

                        if (!failA && !failB) {
                            $scope.postCritique();
                        }
                    };

                    $scope.closeDialog = function () {
                        // zIndexPlayer(true);
                        $modalInstance.close(true);
                    };

                    $scope.cancel = function () {
                        // zIndexPlayer(true);
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.hoveringOver = function (value) {
                        $scope.overStar = value;
                        $scope.percent = 100 * (value / $scope.max);
                    };

                    $scope.postCritique = function () {
                        if ($scope.processing) {
                            return false;
                        }

                        $scope.processing = true;
                        $scope.critique.url_id = moment().valueOf();
                        self.$http.post('critiques?include=user,award', $scope.critique).then(function (res) {
                            let obj = res.data.data;

                            self.critiques.push(obj);
                            self.calcIwAverage(self.critiques);
                            // Increment project critiques_count
                            self.project.critiques_count++;

                            // register Action
                            Analytics.trackEvent('video', 'critique', self.project.name);

                            // if an award has been selected, create a nomination
                            if (!!$scope.dialogModel.award_id && _.isString($scope.dialogModel.award_id)) {
                                $scope.nominated.critique_id = obj.id;
                                $scope.nominated.award_id = $scope.dialogModel.award_id;
                                self.$http.post('nominations', $scope.nominated).then(function (nom) {
                                    // Increment project commentCount
                                    self.project.nominationCount++;
                                    // self.updateVideoObj();
                                    // register Action
                                    // self.qNominations();
                                    nom.critique = obj;
                                    Analytics.trackEvent('video', 'nominate', self.project.name);
                                }, function (error) {
                                    alert('Failed to create new nomination, with error code: ' + error.message);
                                })
                            } else {

                            }
                            self.projectCtrl.handleActions('rate', critique.data.data);

                        }, function (error) {
                            alert('Failed to create new critique, with error code: ' + error.message);
                            $scope.processing = false;
                        }).then(function () {
                            // self.qCritiques();
                            self.checkUserActions();
                            $scope.closeDialog();
                        });
                    };
                }

                this.canCritique(self.project.id).then(function (res) {
                    // is logged in
                    if (res) {

                        if (self.$rootScope.isNotVerified()) {
                            self.$root.$emit('toastAction', 'Please verify your account and join the conversation! Check your spam folder too.', 'Verify Now', self.$rootScope.requestVerificationEmail);
                            return false;
                        }

                        if (self.project.owner_id === self.$root.user.id) {
                            self.$rootScope.toastMessage('You cannot critique your own content.');
                            return false;
                        }

                        self.$modal.open({
                            templateUrl: 'projects/modal/critique-dialog.html',
                            resolve: {
                                critique: function () {
                                    return {
                                        originality: 0,
                                        direction: 0,
                                        writing: 0,
                                        cinematography: 0,
                                        performances: 0,
                                        production: 0,
                                        pacing: 0,
                                        structure: 0,
                                        audio: 0,
                                        music: 0,
                                        overall: 0,
                                        private: false,
                                        user_id: self.$root.user.id,
                                        body: '',
                                        project_id: self.project.id,
                                        type: self.project.hosting_type === 'script' ? 'script' : 'video',
                                        style: 0,
                                        theme: 0,
                                        dialogue: 0,
                                        characters: 0,
                                        presentation: 0,
                                        concept: 0,
                                    };
                                },
                                project: function () {
                                    return self.project;
                                }
                            },
                            controller: CritiqueDialogController,
                            keyboard: true
                        });
                    }
                }, function (err) {
                    if (_.isObject(err)) {
                        return false;
                    } else self.loginModal();
                });
            },

            openShareDialog() {
                this.$root.$emit('openShareDialog-' + this.project.id);
            },

            openReactionDialog() {
                let self = this;
                // is logged in
                if (this.isAuthenticated()) {

                    if (this.$rootScope.isNotVerified()) {
                        this.$root.$emit('toastAction', 'Please verify your account and join the conversation! Check your spam folder too.', 'Verify Now', this.$rootScope.requestVerificationEmail);
                        return false;
                    }

                    let modalInstance = this.$modal.open({
                        templateUrl: 'projects/modal/reaction-dialog.html',
                        resolve: {
                            Video: function () {
                                return self.project;
                            },
                            Reaction: function () {
                                return self.canReact || null;
                            },
                            Emotions: function () {
                                return self.emotions;
                            }
                        },
                        size: window.Foundation.MediaQuery.atLeast('medium') ? 'tiny' : 'full',
                        controller: ['$scope', '$modalInstance', 'Video', 'Reaction', 'Emotions', '_', function ($scope, $modalInstance, Video, Reaction, Emotions, _) {
                            // zIndexPlayer();
                            $scope.video = Video;
                            $scope.emotions = Emotions;

                            $scope.getEmoticonByEmotion = function (emotion) {
                                return _.findWhere($scope.emotions, {emotion: emotion});
                            };

                            $scope.selectedEmotion = function (e) {
                                // zIndexPlayer(true);
                                //$modalInstance.dismiss('cancel');
                                $modalInstance.close(e);
                            };

                            $scope.cancel = function () {
                                // zIndexPlayer(true);
                                $modalInstance.dismiss('cancel');
                            };

                            $scope.closeDialog = function () {
                                // zIndexPlayer(true);
                                $modalInstance.dismiss('cancel');
                            };

                        }]
                    });

                    modalInstance.result.then(function (reaction) {
                        self.react(reaction);
                    }, function () {
                        // console.info('Modal dismissed at: ' + new Date());
                    }).then(function () {
                        self.$timeout(function () {
                            // console.log('remove is-reveal-open');
                            jQuery('body').removeClass('is-reveal-open')
                        }, 500);
                    });
                } else {
                    self.loginModal()
                }

            },

            canReactIcon () {
                if (_.isObject(this.canReact)) {
                    let emoticon = _.findWhere(this.emotions, {'emotion': this.canReact.emotion});
                    return _.isObject(emoticon) ? emoticon.icon : false;
                } else return false;
            },

            openAddToDialog () {
                this.$modal.open({
                    templateUrl: 'common/share-dialog.html',
                    resolve: {
                        Video: function () {
                            return self.project;
                        }
                    },
                    size: window.Foundation.MediaQuery.atLeast('large') ? 'tiny' : 'small',
                    controller: ['$scope', '$modalInstance', 'Video', function ($scope, $modalInstance, Video) {
                        // zIndexPlayer();
                        $scope.video = Video;
                        $scope.shareLink = window.location.origin + '/' + Video.url_id;
                        $scope.cancel = function () {
                            // zIndexPlayer(true);
                            $modalInstance.close();
                        };
                    }]
                })
            },

            openReportDialog (event) {
                let self = this;
                this.$root.$emit('openReportDialog', event.target.id);
            },
        },
        mounted(){
            this.$parent.projectStats = this;
            this.emotions = this.generateReactions();

            if (!this.isAuthenticated()) {
                /*let endWatch = this.$rootScope.$watch('AppData.User', function (newValue, oldValue) {
                 if (newValue && _.isString(newValue.id)) {
                 console.log('User Logged In');
                 this.checkUserActions();
                 endWatch();
                 }
                 }.bind(this));*/
            } else this.checkUserActions();
        }
    }
</script>