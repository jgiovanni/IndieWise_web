@extends('user.index')

@section('view')
    <user-upload :user="{{ json_encode(['id' => $user->id, 'url_id' => $user->url_id]) }}"></user-upload>
@endsection