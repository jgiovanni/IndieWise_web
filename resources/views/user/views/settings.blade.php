@extends('user.index')

@section('view')
    <user-settings :user="{{ json_encode(['id' => $user->id, 'url_id' => $user->url_id, 'settings' => $user->settings]) }}"></user-settings>
@endsection