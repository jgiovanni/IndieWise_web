@extends('master')

@section('layout')
    <!--breadcrumbs-->
    <section id="breadcrumb" class="md-layout md-size-100 breadMargins">
        <div class="md-layout row md-gutter">
            <div class="md-layout md-size-100" style="align-items: center;">
                <nav aria-label="You are here:" role="navigation">
                    <ul class="breadcrumbs">
                        <li><i class="fa fa-home"></i><a href="/">Home</a></li>
                        <li>
                            <span class="show-for-sr">Current: </span> Contact Us
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section><!--end breadcrumbs-->

    <div class="row secBg">
            <div class="large-12 columns">
                <div class="login-register-content">
                    <div class="row collapse borderBottom">
                        <div class="medium-6 large-centered medium-centered">
                            <div class="page-heading text-center">
                                <h3>Contact Us</h3>
                                <!--<p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</p>-->
                            </div>
                        </div>
                    </div>
                    <div class="row" data-equalizer data-equalize-on="medium" id="test-eq">
                        <div class="large-6 columns">
                            <h4>Contact Details:</h4>
                            <div class="map">
                                <img src="/assets/img/default_video_thumbnail.jpg" width="570" alt="map">
                            </div>
                            <div class="user-contacts">
                                <div class="row">
                                    <div class="large-6 medium-6 columns">
                                        <div class="contact-stats">
                                            <i class="fa fa-map-marker"></i>
                                            <h6>Office Address</h6>
                                            <!--<p>We currently reside in the digital space</p>-->
                                            <p>TBA</p>
                                        </div>
                                    </div>
                                    <div class="large-6 medium-6 columns">
                                        <div class="contact-stats">
                                            <i class="fa fa-envelope"></i>
                                            <h6>Email Address</h6>
                                            <p><a href="mailto:getindiewise@gmail.com">admin@getindiewise.com</a><br><br></p>
                                        </div>
                                    </div>
                                    <div class="large-6 medium-6 columns">
                                        <div class="contact-stats">
                                            <i class="fa fa-phone"></i>
                                            <h6>Phone Numbers</h6>
                                            <p><strong>Office No :</strong> <a href="tel:305-999-5910">305-999-5910</a></p>
                                        </div>
                                    </div>
                                    <div class="large-6 medium-6 columns">
                                        <div class="contact-stats">
                                            <i class="fa fa-share"></i>
                                            <h6>Social Media</h6>
                                            <p>
                                                <a class="secondary-button" href="https://www.facebook.com/getindiewise"><i class="fa fa-facebook"></i></a>
                                                <a class="secondary-button" href="https://twitter.com/getindiewise"><i class="fa fa-twitter"></i></a>
                                                <a class="secondary-button" href="https://www.instagram.com/getindiewise/"><i class="fa fa-instagram"></i></a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="large-6 columns">
                            <h4>We'd Love to hear from you!</h4>
                            <div class="register-form">
                                <contact-form></contact-form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

@endsection
