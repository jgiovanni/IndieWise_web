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
                            <span class="show-for-sr">Current: </span> About Us
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section><!--end breadcrumbs-->

    <section class="category-content">
        <div class="row">
            <!-- left side content area -->
            <div class="large-8 columns">
                <section class="content content-with-sidebar">
                    <!-- newest video -->
                    <div class="main-heading removeMargin">
                        <div class="row secBg padding-14 removeBorderBottom">
                            <div class="medium-8 small-8 columns">
                                <div class="head-title">
                                    <i class="fa fa-user"></i>
                                    <h4>About IndieWise</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row secBg">
                        <div class="large-12 columns">
                            <article class="page-content">
                                <p>The purpose of IndieWise is to allow for an open forum of independent filmmakers and artists who seek feedback on their work from peers and wish to also participate in the feedback and judging of other projects or works.</p>
                            </article>
                        </div>
                    </div>
                </section>
                <br>
                <section class="content content-with-sidebar">
                    <!-- newest video -->
                    <div class="main-heading removeMargin">
                        <div class="row secBg padding-14 removeBorderBottom">
                            <div class="medium-8 small-8 columns">
                                <div class="head-title">
                                    <i class="fa fa-play"></i>
                                    <h4>View the IndieWise Tutorial Below</h4>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row secBg">
                        <div class="large-12 columns">
                            <article class="page-content">
                                <video width="100%" height="100%" controls preload="none">
                                    <source src='https://cdn.filepicker.io/api/file/HtPPnJQTISIbgPyE3v4o+.mp4'>
                                </video>
                            </article>
                        </div>
                    </div>
                </section>
                <!-- ad Section -->
                {{--<div class="googleAdv">
                    <a href="#"><img src="/assets/images/goodleadv.png" alt="googel ads"></a>
                </div>--}}
                <!-- End ad Section -->
            </div><!-- end left side content area -->

            <!-- sidebar -->
            @include('misc.static-sidebar')
            <!-- end sidebar -->
        </div>
    </section><!-- End Category Content-->

@endsection
