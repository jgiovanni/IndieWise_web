@extends('master')

@section('layout')
    <!--breadcrumbs-->
    <section id="breadcrumb" class="breadMargin">
        <div class="row">
            <div class="large-12 columns">
                <nav aria-label="You are here:" role="navigation">
                    <ul class="breadcrumbs">
                        <li><i class="fa fa-home"></i><a href="/">Home</a></li>
                        <li>
                            <span class="show-for-sr">Current: </span>Latest
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
    <!--end breadcrumbs-->
    <latest></latest>
@endsection