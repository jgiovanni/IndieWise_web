@extends('master')

@section('layout')
    <!--breadcrumbs-->
    <section id="breadcrumb" class="md-layout md-size-100 breadMargin">
        <div class="md-layout row md-gutter">
            <div class="md-layout md-size-100" style="align-items: center;">
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