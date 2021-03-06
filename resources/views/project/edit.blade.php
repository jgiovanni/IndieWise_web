@extends('master')

@section('layout')
    <div class="profile-inner row md-layout md-size-100">
        <!-- profile settings -->
        <section class="submit-post padding-24 md-size-100">
            <div class="row secBg">
                <div class="large-12 columns" style="min-width: 100%;">
                    <div class="heading">
                        <i class="fa fa-upload"></i>
                        <h4>Add a New Project</h4>
                    </div>
                    <div class="row">
                        <upload :is-update="true" id="{{ $project_id }}"></upload>
                    </div>
                </div>
            </div>
        </section>
        <!-- End profile settings -->
    </div>
@endsection

@section('js')
    <script type="text/javascript" src="//api.filestackapi.com/filestack.js"></script>
    <script type="text/javascript" src="//widget.cloudinary.com/global/all.js"></script>
@endsection