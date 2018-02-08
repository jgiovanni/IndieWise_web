@extends('master')

@section('layout')
    <!--breadcrumbs-->
    <section id="breadcrumb" class="md-layout md-size-100">
        <div class="md-layout row md-gutter">
            <div class="md-layout md-size-100" style="align-items: center;">
                <nav aria-label="You are here:" role="navigation">
                    <ul class="breadcrumbs">
                        <li><i class="fa fa-home"></i><a href="/">Home</a></li>
                        <li>
                            <a href="{{ URL::to('user/' . $critique->project->owner->url_id) }}">{{$critique->project->owner->fullName}}</a>
                        </li>
                        <li>
                            <a href="{{ URL::to($critique->project->url_id) }}">{{$critique->project->name}}</a>
                        </li>
                        <li>
                            <span class="show-for-sr">Current: </span> Critique by {{$critique->user->fullName}}
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </section>
    <!--end breadcrumbs-->

    <div class="md-layout row">
        <!-- left side content area -->
        <div class="large-8 columns">
            <!-- single post description -->
            <critique id="{{ $critique->id }}"></critique>
            <!-- End single post description -->

            <!-- Comments -->
            <comments ref="comments" :parent="{ id: '{{ $critique->id }}', comments_count: '{{ $critique->comments_count }}', unlist: '{{ $critique->unlist }}'}" critique-id="{{ $critique->id }}" :disable="false" :child="false"></comments>
            <!-- End Comments -->

        </div>
        <!-- end left side content area -->

        <!-- sidebar -->
        <div class="large-4 columns">
            <aside class="secBg sidebar">
                <div class="row">
                    <!-- most view Widget -->
                    <div class="large-12 medium-7 medium-centered columns">
                        <div class="widgetBox">
                            <div class="widgetTitle">
                                <h5>Watch The Video</h5>
                            </div>
                            <div class="widgetContent">
                                <div class="video-box thumb-border">
                                    <a class="video-img-thumb" href="{{ $critique->project->url_id }}">
                                        <img src="{{ $critique->project->thumbnail_url or '/assets/img/default_video_thumbnail.jpg' }}" alt="View the Project">
                                        <!--<a href="#" class="hover-posts">
                                            <span><i class="fa fa-play"></i>Watch Video</span>
                                        </a>-->
                                    </a>
                                    <div class="video-box-content">
                                        <h6><a href="{{ $critique->project->url_id }}">{{$critique->project->name}}</a></h6>

                                        <p>
                                            <span><i class="fa fa-user"></i><a href="'user/{{$critique->project->owner->url_id}}">{{$critique->project->owner->fullName}}</a></span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end most view Widget -->

                    <!-- ad banner widget -->
                    <div class="large-12 medium-7 medium-centered columns">
                        <div class="widgetBox">
                            <div class="widgetTitle">
                                <h5>Recent post videos</h5>
                            </div>
                            <div class="widgetContent">
                                <div class="advBanner text-center">
                                    {{--<broadstreet-zone zone="51349" width="300" height="250"></broadstreet-zone>--}}
                                    <!--<a href="#"><img src="/assets/images/sideradv.png" alt="sidebar adv"></a>-->
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- end ad banner widget -->
                </div>
            </aside>
        </div>
        <!-- end sidebar -->
    </div>
@endsection

@section('js')
    <script type="text/javascript" src="{{ elixir('js/projects.vue.js') }}"></script>
@endsection