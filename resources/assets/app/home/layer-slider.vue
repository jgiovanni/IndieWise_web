<template>
    <section id="carouselSlider" class="md-flex-100">
        <md-layout md-row>
            <md-layout class="item hide-xs" md-flex>
                <md-layout md-column>
                    <md-layout class="inner-item" md-flex>
                        <img src="https://getindiewise.com/assets/images/sliderimages/The%20IndieWise%20Tutorial.PNG" alt="images">
                        <a href="about" class="hover-posts">
                            <span><i class="fa fa-play"></i></span>
                        </a>
                        <div class="item-title">
                            <span>What is IndieWise?</span>
                            <!--<h6>The IndieWise Tutorial</h6>-->
                        </div>
                    </md-layout>
                    <md-layout class="inner-item" md-flex>
                        <img src="https://getindiewise.com/assets/images/sliderimages/FAQ.jpg" alt="images">
                        <a href="faq" class="hover-posts">
                            <span><i class="fa fa-question-circle"></i></span>
                        </a>
                        <div class="item-title">
                            <span>FAQ</span>
                            <!--<h6>Get Wise About IndieWise</h6>-->
                        </div>
                    </md-layout>
                </md-layout>
            </md-layout>
            <md-layout class="item" md-flex="50" md-flex-xsmall="100">
                <md-layout md-column>
                    <md-layout class="inner-item inner-item-big" md-flex>
                        <div id="layerslider" style="width:100%;height:400px;">
                            <!--<div class="ls-slide" data-ls="transition2d:1;" style="background-image: url({{::BASE}}assets/images/fRugjfO-happy-halloween-wallpaper.jpg);background-position: center center;background-size: cover">
                                &lt;!&ndash;<img ng-src="{{::BASE}}assets/images/fRugjfO-happy-halloween-wallpaper.jpg" class="ls-bg" alt="Slide background"/>&ndash;&gt;
                                &lt;!&ndash;<a href="single-video-v1.html" class="ls-l hover-posts">
                                    <span><i class="fa fa-play"></i></span>
                                </a>&ndash;&gt;
                                <div class="ls-l item-title">
                                    <span>WORLD’S LARGEST</span>
                                    <h6>VIRTUAL FILM FESTIVAL You be the Judge...</h6>
                                </div>
                                &lt;!&ndash;<img class="ls-l ls-linkto-2" style="top:400px;left:50%;white-space: nowrap;" data-ls="offsetxin:-50;delayin:1000;rotatein:-40;offsetxout:-50;rotateout:-40;" ng-src="{{::BASE}}assets/images/sliderimages/left.png" alt="">&ndash;&gt;
                                &lt;!&ndash;<img class="ls-l ls-linkto-2" style="top:400px;left:52%;white-space: nowrap;" data-ls="offsetxin:50;delayin:1000;offsetxout:50;" ng-src="{{::BASE}}assets/images/sliderimages/right.png" alt="">&ndash;&gt;
                            </div>-->
                            <a class="ls-slide" data-ls="transition2d:1;" v-for="project in projects.data" :href="project.url_id" :style="'background-image: url(' + (project.thumbnail_url||'https://getindiewise.com/assets/img/default_video_thumbnail.jpg') + ');'" style="background-position: center center;background-size: cover">
                                <!--<img ng-src="{{::project.thumbnail_url}}" class="ls-bg" alt="{{::project.name}}"/>-->
                                <!--<a href="single-video-v1.html" class="ls-l hover-posts">
                                    <span><i class="fa fa-play"></i></span>
                                </a>-->
                                <div class="ls-l item-title" style="">
                                    <span>This Week's Favorites</span>
                                    <h6>{{project.name}}</h6>
                                </div>
                                <!--<img class="ls-l ls-linkto-{{$last ? 1 : $index+2}}" style="top:80%;left:50%;white-space: nowrap;" data-ls="offsetxin:-50;delayin:1000;rotatein:-40;offsetxout:-50;rotateout:-40;" ng-src="{{::BASE}}assets/images/sliderimages/left.png" alt="">-->
                                <!--<img class="ls-l ls-linkto-{{$last ? 1 : $index+2}}" style="top:80%;left:52%;white-space: nowrap;" data-ls="offsetxin:50;delayin:1000;offsetxout:50;" ng-src="{{::BASE}}assets/images/sliderimages/right.png" alt="">-->
                            </a>
                        </div>

                    </md-layout>
                </md-layout>
            </md-layout>
            <md-layout class="item hide-xs" md-flex>
                <md-layout md-column>
                    <md-layout class="inner-item" md-flex>
                        <img src="https://getindiewise.com/assets/images/sliderimages/Join%20the%20Discussion.jpg" alt="images">
                        <a href="forum" class="hover-posts">
                            <span><i class="fa fa-comments-o"></i></span>
                        </a>
                        <div class="item-title">
                            <span>Community Forum (Coming Soon)</span>
                            <!--<h6>Join the Discussion!</h6>-->
                        </div>
                    </md-layout>
                    <md-layout class="inner-item" md-flex>
                        <img src="https://getindiewise.com/assets/images/sliderimages/Contact%20Us1.png" alt="images">
                        <a href="contact" class="hover-posts">
                            <span><i class="fa fa-phone"></i></span>
                        </a>
                        <div class="item-title">
                            <span>Contact Us</span>
                            <!--<h6>How Can We Better Serve You</h6>-->
                        </div>
                    </md-layout>
                </md-layout>
            </md-layout>
        </md-layout>
    </section><!--end slider-->
</template>
<style scoped></style>
<script type="text/babel">
    export default {
        name: 'layer-slider',
        data(){
            return {
                projects: [],
            }
        },
        methods: {},
        mounted(){
            this.$http.get('projects', { params: { random: true, per_page: 3}}).then(function (response) {
                this.projects = response.data;
            }).then(function () {
                jQuery("#layerslider").layerSlider({
                    responsive: true,
                    // responsiveUnder: 950,
                    slideDelay: 5000,
                    layersContainer: 950,
                    skin: 'noskin',
                    hoverPrevNext: false,
                    skinsPath: self.BASE + 'assets/layerslider/skins/'
                });
            })
        }
    }
</script>