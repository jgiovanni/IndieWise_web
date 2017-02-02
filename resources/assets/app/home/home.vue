<template>
    <div>
        <!-- layerslider -->
        <layer-slider></layer-slider>
        <!--end slider-->

        <!-- Premium Videos -->
        <premium-carousel></premium-carousel>
        <!-- End Premium Videos -->

        <!-- Trending Videos -->
        <home-projects-list sort="trending" :per-page="8" :type="type"></home-projects-list>

        <!-- ad Section -->
        <div class="googleAdv text-center">
            <!--<broadstreet-zone zone="51348" width="728" height="90"></broadstreet-zone>-->
            <!--<script>window.broadstreet.zone(51348);</script>-->
            <!--<a href="#"><img src="/assets/images/goodleadv.png" alt="googel ads"></a>-->
        </div><!-- End ad Section -->

        <!-- Highest Rated  video -->
        <home-projects-list sort="rating" :per-page="8" :type="type"></home-projects-list>

        <!-- ad Section -->
        <div class="googleAdv text-center">
            <!--<broadstreet-zone zone="51348" width="728" height="90"></broadstreet-zone>-->
            <!--<script>window.broadstreet.zone(51348);</script>-->
            <!--<a href="#"><img src="/assets/images/goodleadv.png" alt="googel ads"></a>-->
        </div><!-- End ad Section -->

        <!-- Highest Awarded video -->
        <home-projects-list sort="awards" :per-page="8" :type="type"></home-projects-list>

        <!-- ad Section -->
        <div class="googleAdv text-center">
            <!--<broadstreet-zone zone="51348" width="728" height="90"></broadstreet-zone>-->
            <!--<script>window.broadstreet.zone(51348);</script>-->
            <!--<a href="#"><img src="/assets/images/goodleadv.png" alt="googel ads"></a>-->
        </div><!-- End ad Section -->

        <!-- Recently Added video -->
        <home-projects-list sort="recent" :per-page="8" :type="type"></home-projects-list>

        <div class="googleAdv text-center">
            <!--<broadstreet-zone zone="51348" width="728" height="90"></broadstreet-zone>-->
            <!--<script>window.broadstreet.zone(51348);</script>-->
            <!--<a href="#"><img src="/assets/images/goodleadv.png" alt="googel ads"></a>-->
        </div><!-- End ad Section -->
        <!-- End main content -->

        <!--</div>&lt;!&ndash; end left side content area &ndash;&gt;-->
        <!-- sidebar -->
        <!--
            <div class="large-4 columns padding-right-remove">
                <aside class="secBg sidebar">
                    <div class="row">
                        &lt;!&ndash; most view Widget &ndash;&gt;
                        <div class="large-12 medium-7 medium-centered columns">
                            <div class="widgetBox">
                                <div class="widgetTitle">
                                    <h5>People Are Watching</h5>
                                </div>
                                <div class="widgetContent">
                                    <div class="media-object stack-for-small" ng-repeat="w in latest.watched.data|limitTo:5">
                                        <div class="media-object-section">
                                            <div class="recent-img">
                                                <img ng-src="{{::latest.watched.relatedObjects.Film[w.film].thumbnail_url||'/assets/img/default_video_thumbnail.jpg'}}" alt="recent">
                                                <a ui-sref="video({id: w.film})" class="hover-posts">
                                                    <span><i class="fa fa-play"></i></span>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="media-object-section">
                                            <div class="media-content">
                                                <h6><a ui-sref="video({id: w.film})">{{::latest.watched.relatedObjects.Film[w.film].name|truncate:50}}</a></h6>
                                                <p><i class="fa fa-user"></i><span>admin</span><i class="fa fa-clock-o"></i><span>5 january 16</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>&lt;!&ndash; end most view Widget &ndash;&gt;

                        &lt;!&ndash; social Fans Widget &ndash;&gt;
                        <div class="large-12 medium-7 medium-centered columns">
                            <div class="widgetBox">
                                <div class="widgetTitle">
                                    <h5>social fans</h5>
                                </div>
                                <div class="widgetContent">
                                    <div class="social-links">
                                        <a class="socialButton" href="https://www.facebook.com/getindiewise">
                                            <i class="fa fa-facebook"></i>
                                            <span>528</span>
                                            <span>fans</span>
                                        </a>
                                        <a class="socialButton" href="https://twitter.com/getindiewise">
                                            <i class="fa fa-twitter"></i>
                                            <span>526</span>
                                            <span>followers</span>
                                        </a>
                                        <a class="socialButton" href="https://www.instagram.com/getindiewise/">
                                            <i class="fa fa-instagram"></i>
                                            <span>422</span>
                                            <span>followers</span>
                                        </a>
                                        &lt;!&ndash;<a class="socialButton" href="#">
                                            <i class="fa fa-youtube"></i>
                                            <span>168k</span>
                                            <span>followers</span>
                                        </a>&ndash;&gt;
                                        &lt;!&ndash;<a class="socialButton" href="#">
                                            <i class="fa fa-vimeo"></i>
                                            <span>498</span>
                                            <span>followers</span>
                                        </a>&ndash;&gt;
                                    </div>
                                </div>
                            </div>
                        </div>
                        &lt;!&ndash; End social Fans Widget &ndash;&gt;

                        &lt;!&ndash; ad banner widget &ndash;&gt;
                        <div class="large-12 medium-7 medium-centered columns">
                            <div class="widgetBox">
                                <div class="widgetTitle">
                                    <h5>Recent post videos</h5>
                                </div>
                                <div class="widgetContent">
                                    <div class="advBanner text-center">
                                        <a href="#"><img src="/assets/images/sideradv.png" alt="sidebar adv"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        &lt;!&ndash; end ad banner widget &ndash;&gt;

                        &lt;!&ndash; Recent post videos &ndash;&gt;
                        &lt;!&ndash;<div class="large-12 medium-7 medium-centered columns">
                            <div class="widgetBox">
                                <div class="widgetTitle">
                                    <h5>Recently Watched Videos</h5>
                                </div>
                                <div class="widgetContent">
                                    <div class="media-object stack-for-small">
                                        <div class="media-object-section">
                                            <div class="recent-img">
                                                <img src= "http://placehold.it/120x80" alt="recent">
                                                <a href="#" class="hover-posts">
                                                    <span><i class="fa fa-play"></i></span>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="media-object-section">
                                            <div class="media-content">
                                                <h6><a href="#">The lorem Ipsumbeen the industry's standard.</a></h6>
                                                <p><i class="fa fa-user"></i><span>admin</span><i class="fa fa-clock-o"></i><span>5 january 16</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>&ndash;&gt;
                        &lt;!&ndash; End Recent post videos &ndash;&gt;

                        &lt;!&ndash; tags &ndash;&gt;
                        &lt;!&ndash;<div class="large-12 medium-7 medium-centered columns">
                            <div class="widgetBox">
                                <div class="widgetTitle">
                                    <h5>Tags</h5>
                                </div>
                                <div class="tagcloud">
                                    <a href="#">3D Videos</a>
                                    <a href="#">Videos</a>
                                    <a href="#">HD</a>
                                    <a href="#">Movies</a>
                                    <a href="#">Sports</a>
                                    <a href="#">3D</a>
                                    <a href="#">Movies</a>
                                    <a href="#">Animation</a>
                                    <a href="#">HD</a>
                                    <a href="#">Music</a>
                                    <a href="#">Recreation</a>
                                </div>
                            </div>
                        </div>&ndash;&gt;
                        &lt;!&ndash; End tags &ndash;&gt;
                    </div>
                </aside>
            </div>&lt;!&ndash; end sidebar &ndash;&gt;
        -->
        <!--</div>-->

        <!-- Category -->
        <sponsor-carousel v-once></sponsor-carousel>
        <!-- End Category -->

        <!-- ad Section -->
        <!--<div class="googleAdv text-center">
            <a href="#"><img src="/assets/images/goodleadv.png" alt="googel ads"></a>
        </div>-->
        <!-- End ad Section -->

        <!--<md-content id="content" class="" layout-wrap>-->
        <!--<md-grid-list md-cols="5" md-row-height="16:9" md-gutter-gt-md="16px" md-gutter-gt-sm="8px" md-gutter="4px">
          <md-grid-tile ng-repeat="tile in featuredProjects" ng-style="{'background': tile.color}"
                        md-colspan-gt-sm="1" md-rowspan-gt-sm="1">
              <md-icon md-svg-icon="{{tile.icon}}"></md-icon>
              <md-grid-tile-footer><h3>{{tile.title}}</h3></md-grid-tile-footer>
          </md-grid-tile>
        </md-grid-list>-->
        <!-- Featured Area -->
        <!--<section flex="100" class="hero-bg stretch md-padding" style="">
            <mighty-slider class="mightySlider mightyslider_windows8_skins"></mighty-slider>
        </section>-->

        <!-- <section flex="100" class="hero-bg stretch" style="">
             <grid-folio></grid-folio>
         </section>

         <section flex="100" class="white">
             <div class="container">
                 <div class="" layout="row" layout-sm="column" layout-wrap layout-align="space-around flex-start">

                     &lt;!&ndash; Latest Watched &ndash;&gt;
                     <div class="md-padding" flex="33" flex-sm="100">
                         <h3 class="md-display-1 card-title grey-text text-darken-4">
                             People Are Watching
                             <md-progress-linear md-mode="{{latest.watchedLoaded}}" class="md-accent"></md-progress-linear>
                         </h3>
                         <md-list>
                             <md-list-item class="md-2-lines wrap-text" ng-repeat-start="w in latest.watched"
                                           ui-sref="video({id: w.attributes.film.id})">
                                 <img ng-src="{{::w.attributes.film.attributes.thumbnail_url||'/assets/img/default_video_thumbnail.jpg'}}" class="md-avatar"
                                      style="border-radius: 0;">
                                 <a ui-sref="video({id: w.attributes.film.id})">{{::w.attributes.film.attributes.name}}</a>
                             </md-list-item>
                             <md-divider ng-repeat-end ng-if="!$last"></md-divider>
                         </md-list>
                     </div>

                     &lt;!&ndash; Latest Comments and Reactions &ndash;&gt;
                     <div class="md-padding" flex="33" flex-sm="100">
                         <h3 class="md-display-1 grey-text text-darken-4">Latest</h3>
                         <md-tabs md-dynamic-height md-border-bottom>
                             <md-tab label="Reactions">
                                 <md-content>
                                     <md-progress-linear md-mode="{{latest.reactionsLoaded}}"
                                                         class="md-accent"></md-progress-linear>
                                     <md-list>
                                         <md-list-item class="md-2-line wrap-text" ng-repeat="c in latest.reactions">
                                             <img ng-src="{{::c.attributes.author.attributes.avatar || '/assets/img/avatar-1.png'}}"
                                                  class="md-avatar" ui-sref="user.about({id: c.attributes.author.id})">

                                             <div class="md-list-item-text" layout="column">
                                                 <h3><a ui-sref="video({id: c.attributes.parent.id})">{{::c.attributes.parent.attributes.name}}</a>
                                                 </h3>
                                                 <h4>made <a ui-sref="user.about({id: c.attributes.user.id})">{{::c.attributes.user.attributes.first_name}}
                                                     {{::c.attributes.user.attributes.last_name}}</a> feel
                                                     {{::c.attributes.emotion}}.</h4>
                                             </div>
                                             <md-divider ng-if="!$last"></md-divider>
                                         </md-list-item>
                                     </md-list>
                                 </md-content>
                             </md-tab>
                             <md-tab label="Comments">
                                 <md-content>
                                     <md-progress-linear md-mode="{{latest.commentsLoaded}}"
                                                         class="md-accent"></md-progress-linear>
                                     <md-list>
                                         <md-list-item class="md-2-line wrap-text" ng-repeat="c in latest.comments">
                                             <img ng-src="{{::c.attributes.author.attributes.avatar || '/assets/img/avatar-1.png'}}"
                                                  class="md-avatar" ui-sref="user.about({id: c.attributes.author.id})">

                                             <div class="md-list-item-text" layout="column">
                                                 <h3 ng-if="c.attributes.parentFilm">
                                                     <a ui-sref="user.about({id: c.attributes.author.id})">{{::c.attributes.author.attributes.first_name}}
                                                         {{::c.attributes.author.attributes.last_name}}</a>
                                                     <span ng-if="c.attributes.parentComment">replied to <a
                                                             ui-sref="user.about({id: c.attributes.parentComment.attributes.author.id})">{{::c.attributes.parentComment.attributes.author.attributes.first_name}}</a> on</span>
                                                     <span ng-if="!c.attributes.parentComment">commented on</span>
                                                     <a ui-sref="video({id: c.attributes.parentFilm.id})">{{::c.attributes.parentFilm.attributes.name}}</a>
                                                 </h3>

                                                 <h3 ng-if="c.attributes.parentCritique">
                                                     <a ui-sref="user.about({id: c.attributes.author.id})">{{::c.attributes.author.attributes.first_name}}
                                                         {{::c.attributes.author.attributes.last_name}}</a>
                                                     <span ng-if="c.attributes.parentComment">replied to <a
                                                             ui-sref="video_critique({video_id:c.attributes.parentCritique.attributes.parent.id, id: c.attributes.parentCritique.id})">{{::c.attributes.parentCritique.attributes.author.attributes.first_name}}'s</a></span>
                                                     <span ng-if="!c.attributes.parentComment">commented on <a
                                                             ui-sref="video_critique({video_id:c.attributes.parentCritique.attributes.parent.id, id: c.attributes.parentCritique.id})">{{::c.attributes.parentCritique.attributes.author.attributes.first_name}}'s</a></span>
                                                     <a ui-sref="video_critique({video_id:c.attributes.parentCritique.attributes.parent.id, id: c.attributes.parentCritique.id})">critique</a>
                                                 </h3>
                                                 <h4 ng-bind="::c.attributes.body"></h4>
                                             </div>
                                             <md-divider ng-if="!$last"></md-divider>
                                         </md-list-item>
                                     </md-list>
                                 </md-content>
                             </md-tab>
                         </md-tabs>

                     </div>

                     &lt;!&ndash; Latest Critiques &ndash;&gt;
                     <div class="md-padding" flex="33" flex-sm="100">
                         <h3 class="md-display-1 grey-text text-darken-4">
                             Latest Critiques
                             <md-progress-linear md-mode="{{latest.critiquesLoaded}}"
                                                 class="md-accent"></md-progress-linear>
                         </h3>
                         <md-content>
                             <md-list>
                                 <md-list-item class="md-2-line wrap-text" ng-repeat="c in latest.critiques">
                                     <img ng-src="{{::c.attributes.author.attributes.avatar || '/assets/img/avatar-1.png'}}"
                                          class="md-avatar" ui-sref="user.about({id: c.attributes.author.id})">

                                     <div class="md-list-item-text" layout="column">
                                         <h3><a ui-sref="user.about({id: c.attributes.author.id})">{{::c.attributes.author.attributes.first_name}}
                                             {{::c.attributes.author.attributes.last_name}}</a></h3>
                                         <h4>Gave <a ui-sref="video({id: c.attributes.parent.id})">{{::c.attributes.parent.attributes.name}}</a>
                                             a {{::c.attributes.overall|number:1}}</h4>
                                     </div>
                                     <md-divider ng-if="!$last"></md-divider>
                                 </md-list-item>
                             </md-list>
                         </md-content>
                     </div>
                 </div>
             </div>
         </section>
         <md-divider></md-divider>
         <section flex="100" class="white">
             <div class="container">
                 <div class="" layout="row" layout-wrap layout-align="space-around flex-start">
                     <section flex="100" class="container">
                         <div class="" layout="row" layout-wrap layout-padding layout-align="space-around flex-start">
                             <div flex="100" class="md-toolbar-tools">
                                 <h6 class="md-display-1">Trending</h6>
                                 <span flex></span>
                                 <md-button class="md-primary" ui-sref="browse({sort:'trending'})" aria-label="Browse Trending">
                                     Browse Trending
                                     <md-icon class="md-secondary" md-svg-icon="chevron-right"></md-icon>
                                 </md-button>
                             </div>
                             <project-card class="no-shadow" flex-sm="50" flex-md="25" flex-lg="25" flex-gt-lg="25"
                                           ng-repeat="video in trending" video="video"></project-card>
                         </div>
                     </section>
                 </div>
             </div>
         </section>
         <md-divider></md-divider>
         <section flex="100" class="white">
             <div class="container">
                 <div class="" layout="row" layout-wrap layout-align="space-around flex-start">
                     <section flex="100" class="container">
                         <div layout="row" layout-wrap layout-padding layout-align="space-around flex-start">
                             <div flex="100" class="md-toolbar-tools">
                                 <h6 class="md-display-1">Highest Rated</h6>
                                 <span flex></span>
                                 <md-button class="md-primary" ui-sref="browse({sort:'rating'})" aria-label="Browse Highest Rated">
                                     Browse Highest Rated
                                     <md-icon class="md-secondary" md-svg-icon="chevron-right"></md-icon>
                                 </md-button>
                             </div>

                             <project-card class="no-shadow" flex-sm="50" flex-md="25" flex-lg="25" flex-gt-lg="25"
                                           ng-repeat="video in highestRated|limitTo:4" video="video"></project-card>

                         </div>
                     </section>
                 </div>
             </div>
         </section>
         <md-divider></md-divider>
         <section flex="100" class="white">
             <div class="container">
                 <div class="" layout="row" layout-wrap layout-align="space-around flex-start">
                     <section flex="100" class="container">
                         <div layout="row" layout-wrap layout-padding layout-align="space-around flex-start">
                             <div flex="100" class="md-toolbar-tools">
                                 <h6 class="md-display-1">Award Winning</h6>
                                 <span flex></span>
                                 <md-button class="md-primary" ui-sref="browse({sort:'awards'})" aria-label="Browse Award Winning">
                                     Browse Award Winning
                                     <md-icon class="md-secondary" md-svg-icon="chevron-right"></md-icon>
                                 </md-button>
                             </div>

                             <project-card class="no-shadow" flex-sm="50" flex-md="25" flex-lg="25" flex-gt-lg="25"
                                           ng-repeat="video in highestAwarded|limitTo:4" video="video"></project-card>

                         </div>
                     </section>
                 </div>
             </div>
         </section>
         <md-divider></md-divider>
         <section flex="100" class="white">
             <div class="container">
                 <div class="" layout="row" layout-wrap layout-align="space-around flex-start">
                     <section flex="100" class="container">
                         <div layout="row" layout-wrap layout-padding layout-align="space-around flex-start">
                             <div flex="100" class="md-toolbar-tools">
                                 <h6 class="md-display-1">Recently Added</h6>
                                 <span flex></span>
                                 <md-button class="md-primary" ui-sref="browse({sort:'trending'})" aria-label="Browse Recently Added">
                                     Browse Recently Added
                                     <md-icon class="md-secondary" md-svg-icon="chevron-right"></md-icon>
                                 </md-button>
                             </div>
                             <project-card class="no-shadow fadeIn" flex-sm="50" flex-md="25" flex-lg="25" flex-gt-lg="25"
                                           ng-repeat="video in recentFilms|limitTo:4" video="video"></project-card>

                         </div>
                     </section>
                 </div>
             </div>
         </section>-->

        <!--</md-content>-->
    </div>
</template>
<script type="text/babel">
    import homeProjectsList from './home-projects-list.vue';
    import layerSlider from './layer-slider.vue';
    import premiumCarousel from './premium-carousel.vue';
    import sponsorCarousel from './sponsor-carousel.vue';
    export default {
        name: 'home',
        components: {homeProjectsList, layerSlider, premiumCarousel, sponsorCarousel},
        data(){
            return {
                type: 'grid-default'
            }
        },
        methods: {},
        mounted(){

        }
    }
</script>