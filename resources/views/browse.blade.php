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
                            <span class="show-for-sr">Current: </span>Search Results
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section><!--end breadcrumbs-->
    <div class="row">
        <!-- Category -->
        <watching-carousel></watching-carousel>
        <!-- End Category -->

        <browse></browse>
    </div>
@endsection

@section('js')
    <script src="/assets/js/owl.carousel.min.js"></script>
@endsection