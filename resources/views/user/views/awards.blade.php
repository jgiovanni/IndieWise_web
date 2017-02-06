@extends('user.index')

@section('view')
    <user-awards :user="{{ json_encode(['id' => $user->id, 'url_id' => $user->url_id]) }}"></user-awards>
@endsection