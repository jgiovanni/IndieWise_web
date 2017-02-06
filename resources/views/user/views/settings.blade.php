@extends('user.index')

@section('view')
    <user-settings :user="{{ json_encode(['id' => $user->id, 'url_id' => $user->url_id]) }}"></user-settings>
@endsection