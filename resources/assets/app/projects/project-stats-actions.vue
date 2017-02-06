<template>
    <md-layout md-flex class="SinglePostStats" id="SinglePostStats">
    <!-- newest video -->
    <md-layout md-flex md-column class="secBg">
        <md-layout style="border-bottom: 1px solid #efefef">
            <md-layout md-align="center" md-flex=20>
                <md-avatar class="md-large">
                    <img :src="project.owner.avatar" alt="post">
                </md-avatar>
                <p class="text-center">
                    <a :href="'/user/' + project.owner.url_id">
                        {{project.owner.fullName}}
                    </a>
                </p>
            </md-layout>
            <md-layout md-column md-align="center">
                <h1 class="md-headline">
                    {{project.name}}&nbsp;
                    <span v-if="project.nsfw" style="padding: 5px;cursor: default;color: #CC181E;border-color: #CC181E"
                          class="button tiny alert hollow">Mature</span>
                    <!--<a href="'user/' + project.owner.url_id + '/about'">{{project.owner.fullName}}</a>-->
                </h1>
                <div class="md-caption">
                    <i class="fa fa-clock-o"></i>
                    <abbr :title="project.created_at|vmUtc|vmLocal|vmDateFormat('lll')">
                        {{ project.created_at | vmTimeAgo }}
                    </abbr>
                    &nbsp;&middot;&nbsp;
                    <i class="fa fa-smile-o"></i>&nbsp;&nbsp;{{project.reactions_count||0}}
                    &nbsp;&middot;&nbsp;
                    <span class="double-thumbs"><i class="fa fa-thumbs-o-up"></i><i
                            class="fa fa-thumbs-o-up"></i>&nbsp;&nbsp;{{project.up_ratings_count||0}}</span>
                    &nbsp;&middot;&nbsp;
                    <span class="double-thumbs"><i class="fa fa-thumbs-o-down"></i><i
                            class="fa fa-thumbs-o-down"></i>&nbsp;&nbsp;{{project.down_ratings_count||0}}</span>
                </div>
            </md-layout>
        </md-layout>
        <md-layout md-column-xsmall>
            <md-layout style="order: 2" md-align="end" md-align-xsmall="center">
                <md-button class="md-primary md-dense" @click.stop.prevent="openReactionDialog()">
                    <span v-if="canReact!==true && canReact !== 'login' && canReact !==false">
                        <md-icon class="emoticon" :md-src="canReactIcon()"></md-icon>
                        {{canReact.emotion}}
                    </span>
                    <span v-else>
                        <md-icon>face</md-icon>
                        I'm feeling ...</span>
                </md-button>

                <md-button class="md-primary md-dense" @click.stop.prevent="openCritiqueDialog()">
                    <span v-if="canCritique!==true && canCritique !== 'login' && canCritique !== false">
                        Judged: <span>{{canCritique.overall}}</span>
                    </span>
                    <span v-else>
                        <md-icon>star</md-icon>
                        Judge
                    </span>
                </md-button>
            </md-layout>
            <md-layout style="order: 1" md-align="start" md-align-xsmall="center">
                <md-button class="md-raise md-dense double-thumbs md-primary" @click="rate('up')"
                           :class="{'md-raised':canRate.up}">
                    <i class="fa fa-thumbs-o-up"></i><i class="fa fa-thumbs-o-up"></i>
                </md-button>
                <md-button class="md-raise md-dense double-thumbs md-primary" @click="rate('down')"
                           :class="{'md-raised':canRate.down}">
                    <i class="fa fa-thumbs-o-down"></i><i class="fa fa-thumbs-o-down"></i>
                </md-button>
                <!--<project-playlists :project="project"></project-playlists>-->
                <md-button class="md-icon-button md-accent" @click="openShareDialog">
                    <md-icon>share</md-icon>
                </md-button>
                <md-button id="reportDialogButtonA" class="md-icon-button md-warn "
                           @click="openReportDialog($event)">
                    <md-icon>flag</md-icon>
                </md-button>

            </md-layout>
        </md-layout>
        <!--<div class="media-object-section">
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
			<md-layout class="author-des" md-column-xsmall>
				<md-layout md-row md-align="start" class="post-title">
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
						&lt;!&ndash;<span><i class="fa fa-commenting"></i>{{project.commentCount||0}}</span>&ndash;&gt;
					</p>
				</md-layout>
				<md-layout md-row md-align="end">
						<md-button class="md-primary" @click.stop.prevent="openReactionDialog()">
							<md-icon v-if="canReact===true" class="">face</md-icon>
							<span v-if="canReact===true">I'm feeling ...</span>
							<span v-if="canReact!==true && canReact != 'login'">
								<md-icon class="emoticon" :md-src="canReactIcon()"></md-icon>
								{{canReact.emotion}}
							</span>
						</md-button>

						<md-button class="md-primary" v-cloak
						   @click.stop.prevent="openCritiqueDialog()" v-if="canCritique">
							<md-icon>star</md-icon>
							<span v-if="canCritique===true">Judge</span>
							<span v-if="canCritique!==true && canCritique != 'login'">
							Judged: <span>{{canCritique.overall}}</span>
						</span>
						</md-button>
					</md-layout>
			</md-layout>
			<div class="social-share hide-for-small-only">
				<div class="post-like-btn clearfix">
					<md-layout md-align="center">
						<md-button class="md-raise md-dense double-thumbs md-primary" @click="rate('up')"
								   :class="{'md-raised':canRate.up}">
							<i class="fa fa-thumbs-o-up"></i><i class="fa fa-thumbs-o-up"></i>
						</md-button>
						<md-button class="md-raise md-dense double-thumbs md-primary" @click="rate('down')"
								   :class="{'md-raised':canRate.down}">
							<i class="fa fa-thumbs-o-down"></i><i class="fa fa-thumbs-o-down"></i>
						</md-button>
						&lt;!&ndash;<project-playlists :project="project"></project-playlists>&ndash;&gt;
						<md-button class="md-raise md-accent md-dense" @click="openShareDialog">
							<md-icon>share</md-icon> Share
						</md-button>
						<md-button id="reportDialogButtonA" class="md-raise md-dense md-warn "
								   @click="openReportDialog($event)">
							<md-icon>flag</md-icon> Flag
						</md-button>
					</md-layout>
				</div>
			</div>
		</div>
		<div class="social-share show-for-small-only">
			<div class="post-like-btn clearfix">
				<md-layout md-align="center">
					<md-button class="md-raise md-dense double-thumbs md-primary" @click="rate('up')"
					   :class="{'md-raised':canRate.up}">
						<i class="fa fa-thumbs-o-up"></i><i class="fa fa-thumbs-o-up"></i>
					</md-button>
					<md-button class="md-raise md-dense double-thumbs md-primary" @click="rate('down')"
					   :class="{'md-raised':canRate.down}">
						<i class="fa fa-thumbs-o-down"></i><i class="fa fa-thumbs-o-down"></i>
					</md-button>
					&lt;!&ndash;<project-playlists :project="project"></project-playlists>&ndash;&gt;
					<md-button class="md-raise md-accent md-dense" @click="openShareDialog">
						<md-icon>share</md-icon> Share
					</md-button>
					<md-button id="reportDialogButtonB" class="md-raise md-dense md-warn "
					   @click="openReportDialog($event)">
						<md-icon>flag</md-icon> Flag
					</md-button>
				</md-layout>
			</div>
		</div>-->
    </md-layout>

    <share-dialog :id="project.id" :url="project.url_id" :name="project.name"
                  :description="project.description"></share-dialog>
    <report-project-dialog :project-id="project.id"></report-project-dialog>
    <critique-project-dialog v-if="canCritique === true" :project="project" ></critique-project-dialog>
    <reaction-dialog></reaction-dialog>
</md-layout>
</template>
<style scoped></style>
<script type="text/babel">
    import projectPlaylists from './project-playlists.vue';
    import reportProjectDialog from './modal/report-project-dialog.vue';
    import critiqueProjectDialog from './modal/critique-project-dialog.vue';
    import reactionDialog from './modal/reaction-dialog.vue';
    import shareDialog from '../common/share-dialog.vue';
    export default {
        name: 'project-stats-actions',
        components: {projectPlaylists, critiqueProjectDialog, reactionDialog, reportProjectDialog, shareDialog},
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
                preppedCritique: null,
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
                if (this.isAuthenticated) {
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
            handleActions(type, data){
                this.$emit('handle-actions', type, data);
            },
            react(emotion) {
                let self = this;
                if (_.isObject(emotion)) {
                    if (!this.isAuthenticated) {
                        this.loginModal();
                        return false;
                    }

                    if (this.isNotVerified) {
                        this.$root.$emit('toastAction', 'Please verify your account and join the conversation! Check your spam folder too.', 'Verify Now', this.requestVerificationEmail);
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
                            
                            self.checkUserActions();
                            self.handleActions('reaction', resA.data.data);
                        });
                    } else if (_.isObject(self.canReact)) {
                        if (self.canReact.emotion !== emotion.emotion) {
                            this.$http.put('reactions/' + self.canReact.id, {
                                emotion: emotion.emotion
                            }).then(function (resA) {
                                self.canReact = resA.data;
                                
                                self.checkUserActions();
                                self.handleActions('reaction', resA.data.data);
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

                if (!this.isAuthenticated) {
                    this.loginModal();
                    return false;
                }

                if (this.isNotVerified) {
                    this.$root.$emit('toastAction', 'Please verify your account so you can rate videos! Check your spam folder too.', 'Verify Now', this.requestVerificationEmail);
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

                        
                        _.extend(res.data, {projectOwner: self.project.owner_id});
                        self.checkUserActions();
                        self.handleActions('rate', res.data.data);
                    });

                } else if (_.isObject(self.canRate)) {
                    //up is false && down is false
                    let ratingsResource = this.$resource('ratings{/id}');

                    if (!self.canRate.up && !self.canRate.down) {
                        ratingsResource.update({id: self.canRate.id}, {
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
                                _.extend(res.data, {projectOwner: self.project.owner_id});
                                //self.checkUserActions();
                                self.handleActions('rate', res.data.data);
                            });

                        // up is already true && direction is up
                    } else if (!!self.canRate.up && direction === 'up') {
                        //$http.delete('Rating', self.canRate.id)
                        _.extend(self.canRate, {up: false});
                        ratingsResource.update({id: self.canRate.id}, { up: false, down: false})
                            .then(function (res) {
                                self.project.up_ratings_count--;
                                _.extend(res.data, {projectOwner: self.project.owner_id});
                                //self.checkUserActions();
                                self.handleActions('rate', res.data.data);
                            });

                        // down is already true && direction is down
                    } else if (!!self.canRate.down && direction === 'down') {
                        //$http.delete('Rating', self.canRate.id)
                        _.extend(self.canRate, {down: false});
                        ratingsResource.update({id: self.canRate.id}, { up: false, down: false})
                            .then(function (res) {
                                self.project.down_ratings_count--;
                                
                                _.extend(res.data, {projectOwner: self.project.owner_id});
                                //self.checkUserActions();
                                self.handleActions('rate', res.data.data);
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
                        ratingsResource.update({id: self.canRate.id}, { up: up, down: down}).then(function (res) {
                            //self.checkUserActions();
                            _.extend(res.data, {projectOwner: self.project.owner_id});
                            self.handleActions('rate', res.data.data);
                        });
                    }
                }
                setTimeout(function () {
                    self.rateThrottled = false;
                }, 1000);
            },

            openCritiqueDialog($event) {
                let self = this;

                if (this.canCritique !== true && this.canCritique !== false) {
                    return window.location = this.project.url_id + '/critique/' + this.canCritique.url_id;
                }

                // is logged in
                if (this.canCritique) {

                    if (self.isNotVerified) {
                        self.$root.$emit('toastAction', 'Please verify your account and join the conversation! Check your spam folder too.', 'Verify Now', self.requestVerificationEmail);
                        return false;
                    }

                    if (self.project.owner_id === self.$root.user.id) {
                        self.$root.$emit('toastMessage', 'You cannot critique your own content.');
                        return false;
                    }

                    this.$root.$emit('openCritiqueDialog');

                } else self.loginModal();
            },

            openShareDialog() {
                this.$root.$emit('openShareDialog-' + this.project.id);
            },

            openReactionDialog() {
                let self = this;
                // is logged in
                if (this.isAuthenticated) {

                    if (this.isNotVerified) {
                        this.$root.$emit('toastAction', 'Please verify your account and join the conversation! Check your spam folder too.', 'Verify Now', this.$rootScope.requestVerificationEmail);
                        return false;
                    }

                    this.$root.$emit('openReactionDialog');
                } else {
                    self.loginModal()
                }

            },

            canReactIcon () {
                if (_.isObject(this.canReact)) {
                    let emoticon = _.findWhere(this.emotions, {'emotion': this.canReact.emotion});
                    return _.isObject(emoticon) ? emoticon.src : '';
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
            let self = this;
            this.$parent.projectStats = this;
            this.emotions = this.generateReactions();

            if (this.isAuthenticated) {
                this.checkUserActions();
            }

            this.$root.$on('userHasLoggedIn', function () {
                self.checkUserActions();
            });
            this.$root.$on('projectReactionSelected', function (e) {
                self.react(e);
            });
        }
    }
</script>