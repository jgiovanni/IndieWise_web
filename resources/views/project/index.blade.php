@extends('master')

@section('layout')
    <div id="overlay"></div>

    <!--breadcrumbs-->
    <section id="breadcrumb" class="md-layout md-flex-100">
        <div class="md-layout row md-gutter">
            <div class="md-layout md-flex-50" style="align-items: center;">
                <nav aria-label="You are here:" role="navigation">
                    <ul class="breadcrumbs">
                        <li><i class="fa fa-home"></i><a href="/">Home</a></li>
                        <li>
                            <a href="user/{{ $project->owner->url_id }}/about">{{$project->owner->fullName}}</a>
                        </li>
                        <li>
                            <span class="show-for-sr">Current: </span> {{$project->name}}
                        </li>

                    </ul>
                </nav>
            </div>
            <div class="md-layout md-flex-50 md-align-end">
                <project-breadcrumbs></project-breadcrumbs>
            </div>
        </div>
    </section>
    <!--end breadcrumbs-->

    <!-- full width Video -->
    <div class="md-layout md-flex-100 md-column">
        <section class="fullwidth-single-video" v-bind:class="{'no-padding': playerResponsiveMode}">
            <div class="row" style="width: 100%;" v-bind:class="{'no-max-width': playerResponsiveMode}">
                <div class="large-12" v-bind:class="{'columns': !playerResponsiveMode}">
                    <div class="flex-video widescreen">
                        <!--<div class="switch"></div>-->
                        @if($project->hosting_type !== 'script')
                            <project-video-player :project="{{ json_encode(['id'=>$project->id,'video_url'=>$project->video_url,'name'=>$project->name,'thumbnail_url'=>$project->thumbnail_url,'description'=>$project->description,'hosting_type'=>$project->hosting_type,'hosting_id'=>$project->hosting_id,]) }}" type="{{ $project->hosting_type }}"></project-video-player>
                        @else
                            <project-script-viewer :project="{{ json_encode(['id'=>$project->id,'video_url'=>$project->video_url,'name'=>$project->name,'thumbnail_url'=>$project->thumbnail_url,'description'=>$project->description,'hosting_type'=>$project->hosting_type,'hosting_id'=>$project->hosting_id,]) }}"></project-script-viewer>
                        @endif

                    </div>
                    <div style="clear: both;"></div>
                </div>
                <div style="clear: both;"></div>
            </div>
        </section>
    </div>

    <div md-flex="100" md-gutter="8" class="md-layout row">

        <!-- left side content area -->
        <div class="md-layout md-flex-small-100 md-flex-66">
            <project id="{{ $project->id }}"></project>

            <md-tabs md-fixed md-dynamic-height md-centered class="md-transparents">
                @if($project->critiques_count === 0)
                <md-tab md-active md-label="Critiques">
                @elseif($project->critiques_count === 1)
                <md-tab md-active md-label="1 Critique">
                @else
                <md-tab md-active md-label="{{ $project->critiques_count }} Critiques">
                @endif
                    <!-- Critiques -->
                    <critique-view parent-url-id="{{ $project->url_id }}"
                                   parent-owner-id="{{ $project->owner_id }}"></critique-view>

                    <critiques parent-url-id="{{ $project->url_id }}" :params="{ include: 'comments:limit(1|0)', project: '{{ $project->id }}', sort: 'comments_count', per_page: 25}"
                               parent-owner-id="{{ $project->owner_id }}" :disable="{{ $project->disableCritique ? 'true' : 'false' }}"></critiques>
                    <!-- End Critiques -->
                </md-tab>
                        @if($project->nominations_count === 0)
                        <md-tab md-label="Nominations">
                        @elseif($project->nominations_count === 1)
                        <md-tab md-label="1 Nomination">
                        @else
                        <md-tab md-label="{{ $project->nominations_count }} Nominations">
                        @endif
                    <!-- Nominations -->
                    <project-nominations id="{{ $project->id }}" nominations-count="{{ $project->nominations_count }}"></project-nominations>
                    <!-- End Awards -->
                </md-tab>
            </md-tabs>
        </div>
        <!-- end left side content area -->


        <!-- sidebar -->
        <div class="md-layout md-flex-small-100 md-flex-33">
            <div class="secBg sidebar">
                <!-- IndieWise Average Widget -->
                <div class="show-for-large">
                    <div class="widgetBox">
                        <div class="widgetTitle">
                            <project-average view="sidebar" :rating="{{ $project->iwRating }}"
                                             :critiques="{{ $project->critiques_count }}"></project-average>
                        </div>
                    </div>
                </div>
                <!-- End IndieWise Average Widget -->


                <!-- Awards Widget -->
                <div class=" show-for-large">
                    <!--<project-awards project="project"></project-awards>-->

                    <div class="widgetBox">
                        <div class="widgetTitle">
                            <h5 class="has-tip" style="display: block;">
                                {{$project->wins_count > 0 ? ($project->wins_count . ' ') : ''}}Awards
                                <md-tooltip md-direction="top">You need at least 5 nominations of the same award to win</md-tooltip>
                            </h5>
                        </div>
                        <div class="widgetContent">
                            <project-awards id="{{ $project->id }}" :awards="{{ $project->wins_count }}"></project-awards>
                        </div>

                    </div>
                </div>
                <!-- End Awards Widget -->

                <!-- Reactions Widget -->
                @if($project->reactions_count > 0)
                <div class=" show-for-large">
                    <div class="widgetBox">
                        <div class="widgetTitle">
                            <h5>Reactions</h5>
                        </div>
                        <div class="widgetContent">
                            <md-list>
                                <project-reactions id="{{ $project->id }}" :reactions-count="{{ $project->reactions_count }}"></project-reactions>
                            </md-list>
                        </div>
                    </div>
                </div>
                @endif
                <!-- End Reactions Widget -->

                <!-- most view Widget -->
                <div class="">
                    <div class="widgetBox">
                        <div class="widgetTitle">
                            <h5>Recommended Next</h5>
                        </div>
                        <div class="widgetContent">
                            <project-related id="{{ $project->id }}"></project-related>
                        </div>
                    </div>
                </div>
                <!-- end most view Widget -->


                <!-- ad banner widget -->
                <div class="">
                    <div class="widgetBox">
                        <!--<div class="widgetTitle">
                            <h5>Sponsored Ad</h5>
                        </div>-->
                        <div class="widgetContent">
                            <div class="advBanner text-center">
                                <!--<broadstreet-zone zone="51349" width="300" height="250"></broadstreet-zone>-->
                                <!--<a><img src="/assets/images/sideradv.png" alt="sidebar adv"></a>-->
                            </div>
                        </div>
                    </div>
                </div>
                <!-- end ad banner widget -->
            </div>
        </div>
        <!-- end sidebar -->

    </div>

@endsection

@section('js')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tween.js/16.3.5/Tween.min.js"></script>
    {{--<script type="text/javascript" src="{{ elixir('js/videojs.js') }}"></script>--}}
    <script type="text/javascript" src="{{ elixir('js/projects.vue.js') }}"></script>
@endsection
