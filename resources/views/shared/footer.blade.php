<!-- footer -->
<footer style="padding: 0;" ng-cloak>
    <div class="row" style="margin: 80px auto;">
        <div class="large-6 columns">
            <div class="large-6 medium-6 columns">
                <div class="widgetBox">
                    <div class="widgetTitle">
                        <h5>About IndieWise</h5>
                    </div>
                    <div class="textwidget">
                        The purpose of IndieWise is to allow for an open platform of Independent Filmmakers,
                        Artists, and Art Lovers, who seek Objective Feedback on their work from peers, and wish
                        to also participate in providing feedback and judging other projects or works.
                    </div>
                    <hr>
                    <div class="">
                        <a class="tiny expanded button" ui-sref="privacy">Privacy Policy</a>
                        <a class="tiny expanded button" ui-sref="faq">FAQ</a>
                        <a class="tiny expanded button" ui-sref="advertise">Advertise</a>
                        <a class="tiny expanded button" ui-sref="tos">Terms of Service</a>
                        <a class="tiny expanded button" ui-sref="contact">Contact</a>
                        <a class="tiny expanded button" ui-sref="about">About</a>
                    </div>
                </div>
            </div>
            <div class="large-6 medium-6 columns">
                <div class="widgetBox">
                    <div class="widgetTitle">
                        <h5>Recent Videos</h5>
                    </div>
                    <div class="widgetContent">
                        <div class="media-object" ng-repeat="video in Body.footerRecentVideos.data|limitTo:3">
                            <div class="media-object-section">
                                <div class="recent-img">
                                    <img ng-src="@{{::video.thumbnail_url||'/assets/img/default_video_thumbnail.jpg'}}" alt="recent">
                                    <a ui-sref="video({url_id: video.url_id})" class="hover-posts">
                                        <span><i class="fa fa-play"></i></span>
                                    </a>
                                </div>
                            </div>
                            <div class="media-object-section">
                                <div class="media-content">
                                    <h6><a ui-sref="video({url_id: video.url_id})">@{{::video.name|truncate:50}}</a></h6>

                                    <p>
                                        <i class="fa fa-user"></i><span><a ui-sref="user.about({url_id: video.owner.url_id})">@{{::video.owner.fullName}}</a></span>
                                        <i class="fa fa-clock-o"></i><span class="md-caption" am-time-ago="::video.created_at"></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="large-6 columns">
            <div class="large-6 medium-6 columns">
                <div class="widgetBox">
                    <div class="widgetTitle">
                        <h5>We're a Social Bunch</h5>
                    </div>
                    <div class="widgetContent">
                        <div class="social-links">
                            <a class="secondary-button" href="https://www.facebook.com/getindiewise"><i
                                        class="fa fa-facebook"></i></a>
                            <a class="secondary-button" href="https://twitter.com/getindiewise"><i
                                        class="fa fa-twitter"></i></a>
                            <a class="secondary-button" href="https://www.instagram.com/getindiewise/"><i
                                        class="fa fa-instagram"></i></a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="large-6 medium-6 columns">
                <div class="widgetBox">
                    <div class="widgetTitle">
                        <h5>Subscribe Now</h5>
                    </div>
                    <div class="widgetContent">
                        <form data-abide ng-submit="Body.newsletterRegister(Body.notifyMe)" name="notifyMe">
                            <p>Subscribe to get exclusive videos</p>

                            <div class="input">
                                <input type="text" name="fname" ng-model="Body.notifyMe.fname"
                                       placeholder="First Name" required>
                                <span class="form-error">
                                            Yo, you had better fill this out, it's required.
                                        </span>
                            </div>
                            <div class="input">
                                <input type="text" name="lname" ng-model="Body.notifyMe.lname"
                                       placeholder="Last Name" required>
                                <span class="form-error">
                                            Yo, you had better fill this out, it's required.
                                        </span>
                            </div>
                            <div class="input">
                                <input type="email" name="email" ng-model="Body.notifyMe.email"
                                       placeholder="Email address" required>
                                <span class="form-error">
                                          I'm required!
                                        </span>
                            </div>
                            <div class="input">
                                <select name="country" ng-model="Body.notifyMe.country" required>
                                    <option value="" selected>Select Country</option>
                                    @foreach(App\Country::orderBy('name', 'desc')->get() as $country)
                                        <option value="{{ $country->cca2 }}">{{ $country->name }}</option>
                                    @endforeach
                                </select>
                            </div>
                            <button class="button" type="submit">Subscribe Now</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <a href="#" id="back-to-top" title="Back to top"><i class="fa fa-angle-double-up"></i></a>
</footer>
<div id="footer-bottom" style="padding: 0;" ng-cloak>
    <div style="margin: 25px auto;">
        <div class="logo text-center">
            <img src="/assets/img/Logo_alt2_web_87x45_white.png" alt="footer logo">
        </div>
        <div class="btm-footer-text text-center">
            <p>2015 - {{ date('Y') }} &copy; IndieWise</p>
        </div>
    </div>
</div>

<!-- footer -->