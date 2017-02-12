@extends('master')

@section('layout')
    <div id="overlay"></div>

    <!--breadcrumbs-->
    <section id="breadcrumb" class="md-layout md-flex-100">
        <div class="md-layout row md-gutter">
            <div class="md-layout md-flex-50" style="align-items: center;">
                <nav aria-label="You are here:" role="navigation">
                    <ul class="breadcrumbs">
                        <li><i class="fa fa-home"></i><a href="">Home</a></li>
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


    <project id="{{ $project->id }}"></project>
@endsection

@section('js')
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tween.js/16.3.5/Tween.min.js"></script>
    {{--<script type="text/javascript" src="{{ elixir('js/videojs.js') }}"></script>--}}
    <script type="text/javascript" src="{{ elixir('js/projects.vue.js') }}"></script>
@endsection
