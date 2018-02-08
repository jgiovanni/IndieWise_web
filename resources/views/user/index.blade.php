@extends('master')

@section('layout')
    <!--breadcrumbs-->
    <section id="breadcrumb" class="md-layout md-size-100 breadMargins">
        <div class="md-layout row md-gutter">
            <div class="md-layout md-size-100" style="align-items: center;">
                <nav aria-label="You are here:" role="navigation">
                    <ul class="breadcrumbs">
                        <li><i class="fa fa-home"></i><a ui-sref="home">Home</a></li>
                        <li>
                            <span class="show-for-sr">Current: </span> {{$user->firstName}} {{$user->lastName}} Profile
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section><!--end breadcrumbs-->

    <user-top class="md-layout md-size-100" view="{{ $view or '' }}" :user="{{ json_encode(['id' => $user->id, 'url_id' => $user->url_id, 'coverPhoto' => $user->coverPhoto, 'avatar' => $user->avatar, 'fullName' => $user->fullName, 'created_at' => $user->created_at->toDateTimeString()]) }}" :stats="{{ json_encode($stats) }}"></user-top>

    <div class="row columns">
        <!-- left sidebar -->
        <user-sidenav view="{{ $view or '' }}" :user="{{ json_encode(['id' => $user->id, 'url_id' => $user->url_id, 'coverPhoto' => $user->coverPhoto, 'avatar' => $user->avatar, 'fullName' => $user->fullName, 'created_at' => $user->created_at->toDateTimeString()]) }}" :stats="{{ json_encode($stats) }}"></user-sidenav>
        <!-- end left side content area -->

        <!-- right side content area -->
        <div class="small-12 large-8 columns profile-inner">
            @yield('view')
        </div>
        <!-- end right side content area -->


    </div>
@endsection

@section('js')
    <script type="text/javascript" src="//api.filestackapi.com/filestack.js"></script>
    <script type="text/javascript" src="//widget.cloudinary.com/global/all.js"></script>
@endsection