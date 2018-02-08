@extends('user.index')

@section('view')
    <user-projects :user="{{ json_encode(['id' => $user->id, 'url_id' => $user->url_id]) }}"></user-projects>
@endsection

@section('js')
    <script type="text/javascript" src="//api.filestackapi.com/filestack.js"></script>
    <script type="text/javascript" src="//widget.cloudinary.com/global/all.js"></script>
@endsection