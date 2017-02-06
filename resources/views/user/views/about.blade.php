@extends('user.index')

@section('view')
    <user-about :user="{{ json_encode(['id' => $user->id, 'url_id' => $user->url_id]) }}"></user-about>
@endsection