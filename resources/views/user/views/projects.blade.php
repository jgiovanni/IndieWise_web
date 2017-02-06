@extends('user.index')

@section('view')
    <user-projects :user="{{ json_encode(['id' => $user->id, 'url_id' => $user->url_id]) }}"></user-projects>
@endsection