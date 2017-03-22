@extends('master')

@section('layout')
    <!--breadcrumbs-->
    <section id="breadcrumb" class="md-layout md-flex-100 breadMargin">
        <div class="md-layout row md-gutter">
            <div class="md-layout md-flex-100" style="align-items: center;">
                <nav aria-label="You are here:" role="navigation">
                    <ul class="breadcrumbs">
                        <li><i class="fa fa-home"></i><a href="/">Home</a></li>
                        <li>
                            <span class="show-for-sr">Current: </span>Winners
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
    <!--end breadcrumbs-->

    <section class="content row columns">
        <!-- newest video -->
        <div class="main-heading removeMargin">
            <div class="row secBg padding-14 removeBorderBottom">
                <div class="small-12 columns">
                    <div class="head-title">
                        <i class="fa fa-star"></i>
                        <h4>Winners</h4>
                    </div>
                </div>
            </div>
        </div>

        <div class="row secBg">
            <div class="large-12 columns">
                <winners></winners>
            </div>
        </div>

    </section>

@endsection