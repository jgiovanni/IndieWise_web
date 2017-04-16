@extends('user.index')

@section('view')
    <user-critiques :user="{{ json_encode(['id' => $user->id, 'url_id' => $user->url_id]) }}"></user-critiques>
@endsection